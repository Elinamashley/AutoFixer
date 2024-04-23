// controllers/serviceRequestController.js
const { validationResult } = require("express-validator");
const ServiceRequest = require("../model/RequestModel.js");
const Profile = require("../model/ProfileModel");
const io = require("../socket.js").io;
// Function to create a new service request
exports.createServiceRequest = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { location, carType, serviceType, description, serviceTime } = req.body;
  try {
    const serviceRequest = new ServiceRequest({
      user: req.user.id,
      location,
      carType,
      serviceType,
      description,
      serviceTime,
    });

    await serviceRequest.save();
    res.status(201).json(serviceRequest);
  } catch (error) {
    console.error("Service Request Creation Error:", error.message);
    res.status(500).send("Server Error");
  }
};

// Function to get all service requests for a user
// exports.getServiceRequests = async (req, res) => {
//   try {
//     const serviceRequests = await ServiceRequest.find({
//       user: req.user.id,
//     }).sort({ date: -1 });
//     res.json(serviceRequests);
//   } catch (error) {
//     console.error("Get Service Requests Error:", error.message);
//     res.status(500).send("Server Error");
//   }
// };

// Function to get all service requests assigned to a specific mechanic
exports.getServiceRequests = async (req, res) => {
  console.log('Fetching requests for user ID:', req.user.id);

  try {
    // Assuming `mechanicId` is stored in `req.user.id` if the user is a mechanic
    const serviceRequests = await ServiceRequest.find({
mechanic: req.user.id,
    }).sort({ date: -1 });

    res.json(serviceRequests);
  } catch (error) {
    console.error("Get Assigned Requests Error:", error.message);
    res.status(500).send("Server Error");
  }
};


exports.getServiceRequestById = async (req, res) => {
  try {
    const serviceRequest = await ServiceRequest.findById(req.params.id);

    if (!serviceRequest) {
      return res.status(404).json({ msg: "Service request not found" });
    }

    // Check user authorization (optional, depends on your requirements)
    if (serviceRequest.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    res.json(serviceRequest);
  } catch (error) {
    console.error("Error fetching service request:", error.message);
    if (error.kind === "ObjectId") {
      return res.status(404).json({ msg: "Service request not found" });
    }
    res.status(500).send("Server Error");
  }
};

// Function to update a service request by ID
exports.updateServiceRequest = async (req, res) => {
  const { location, carType, serviceType, description, serviceTime } = req.body;

  // Build service object based on the fields submitted
  const serviceFields = {};
  if (location) serviceFields.location = location;
  if (carType) serviceFields.carType = carType;
  if (serviceType) serviceFields.serviceType = serviceType;
  if (description) serviceFields.description = description;
  if (serviceTime) serviceFields.serviceTime = serviceTime;

  try {
    let serviceRequest = await ServiceRequest.findById(req.params.id);

    if (!serviceRequest)
      return res.status(404).json({ msg: "Service request not found" });

    // Check user authorization (optional, depends on your requirements)
    if (serviceRequest.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    serviceRequest = await ServiceRequest.findByIdAndUpdate(
      req.params.id,
      { $set: serviceFields },
      { new: true }
    );

    res.json(serviceRequest);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

// Function to delete a service request by ID
exports.deleteServiceRequest = async (req, res) => {
  try {
    const serviceRequest = await ServiceRequest.findById(req.params.id);

    if (!serviceRequest)
      return res.status(404).json({ msg: "Service request not found" });

    // Check user authorization
    if (serviceRequest.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    await ServiceRequest.findByIdAndRemove(req.params.id);

    res.json({ msg: "Service request deleted" });
  } catch (error) {
    console.error(error.message);
    if (error.kind === "ObjectId") {
      return res.status(404).json({ msg: "Service request not found" });
    }
    res.status(500).send("Server Error");
  }
};

exports.getRequestHistory = async (req, res) => {
  try {
    const serviceRequests = await ServiceRequest.find({
      user: req.user.id,
    }).sort({ date: -1 });
    res.json(serviceRequests);
  } catch (error) {
    console.error("Error fetching service requests:", error.message);
    res.status(500).send("Server Error");
  }
};

// controller/requestController.js

// In requestController.js

// Function to find mechanics based on location and service type
exports.findMechanics = async (req, res) => {
  const { location, serviceType } = req.query;

  try {
    // Assuming location is provided as "latitude,longitude"
    const coords = location.split(",").map(Number);
    const correctedCoords = [coords[1], coords[0]]; // Switch to "longitude,latitude" for GeoJSON

    // First try to find mechanics that exactly match the service type within 5km
    let mechanics = await Profile.find({
      typeOfService: serviceType,
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: correctedCoords,
          },
          $maxDistance: 5000, // 5 kilometers
        },
      },
    }).limit(5);

    // If fewer than 5 exact matches, fill with nearest mechanics regardless of service type
    if (mechanics.length < 5) {
      const additionalMechanics = await Profile.find({
        location: {
          $near: {
            $geometry: {
              type: "Point",
              coordinates: correctedCoords,
            },
            $maxDistance: 5000, // Extend or retain the same range
          },
        },
      }).limit(5 - mechanics.length); // Only fetch enough to fill up to 5

      mechanics = mechanics.concat(additionalMechanics);
    }
    console.log(mechanics);
    res.json(mechanics);
  } catch (error) {
    console.error("Find Mechanics Error:", error.message);
    res.status(500).send("Server Error");
  }
};

// POST endpoint to assign a mechanic to a service request

exports.assignMechanic = async (req, res) => {
  const { requestId, mechanicId } = req.body;
  console.log(requestId, mechanicId, "ids");

  try {
    const serviceRequest = await ServiceRequest.findById(requestId);
    if (!serviceRequest) {
      return res.status(404).json({ msg: "Service request not found" });
    }

    // Updating the mechanic field and status to 'assigned'
    serviceRequest.mechanic = mechanicId;
    serviceRequest.status = "assigned";  // Update status to 'assigned'
    await serviceRequest.save();

    // Emit event to specific mechanic and update any listeners about the new assignment
    io.to(`mechanic_${mechanicId}`).emit("assignedRequest", serviceRequest);

    // Optionally, you can also broadcast to a general channel if other parts of the application need to be aware
    io.emit("serviceRequestUpdated", {
      requestId: serviceRequest._id,
      status: "assigned",
      mechanicId: mechanicId,
    });

    res.json(serviceRequest);
  } catch (error) {
    console.error("Assign Mechanic Error:", error.message);
    res.status(500).send("Server Error");
  }
};
