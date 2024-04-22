// routes/serviceRequests.js
const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

const auth = require("../middleware/auth");
const {
  createServiceRequest,
  getServiceRequests,
  getServiceRequestById,
  updateServiceRequest,
  deleteServiceRequest,
  getRequestHistory,
  findMechanics,
  assignMechanic
} = require("../controller/requestController");

// POST a new service request
router.get('/find-mechanics', auth, findMechanics); // Specific route for finding mechanics

// POST a new service request
router.post('/', [auth, [
    check('location', 'Location is required').not().isEmpty(),
    check('carType', 'Car type is required').not().isEmpty(),
    check('serviceType', 'Service type is required').not().isEmpty(),
    check('description', 'Description is required').not().isEmpty(),
]], createServiceRequest);


router.put('/assign-mechanic', auth, assignMechanic);

// GET all service requests for a user
router.get('/', auth, getServiceRequests);

// GET a specific service request by ID
router.get('/:id', auth, getServiceRequestById);

// PUT (update) a specific service request by ID
router.put('/:id', auth, updateServiceRequest);

// DELETE a specific service request by ID
router.delete('/:id', auth, deleteServiceRequest);

router.get('/history', auth, getRequestHistory);


module.exports = router;