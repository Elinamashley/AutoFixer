
// controllers/groupController.js
const Group = require('../model/GroupsModel')

// Add a new group
exports.addGroup = async (req, res) => {
  console.log("calling add group")
  const { groupName, description } = req.body;
  
  try {
    let group = await Group.findOne({ groupName });
    if (group) {
      return res.status(400).json({ msg: 'Group already exists' });
    }

    group = new Group({
      groupName,
      description
    });

    await group.save();
    res.status(201).json(group);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get all groups
exports.getAllGroups = async (req, res) => {
  console.log("calling get all groups")

    try {
      const groups = await Group.find().sort({ createdAt: -1 });
      res.json(groups);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  };


  // Delete a group
  exports.deleteGroup = async (req, res) => {
    console.log(req.params.id, "calling delete group");

    try {
        const group = await Group.findByIdAndDelete({ _id: req.params.id })

        if (!group) {
            return res.status(404).json({ msg: 'Group not found' });
        }

        res.json({ msg: 'Group removed' });
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Group not found' });
        }
        res.status(500).send('Server error');
    }
};

 