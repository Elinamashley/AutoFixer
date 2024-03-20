const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
  groupName: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
    default: '',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  // If you need to store references to the members of the group:
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Contact',
  }],
});

const Group = mongoose.model('Group', groupSchema);

module.exports = Group;
