const mongoose = require('mongoose');

const ServiceRequestSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  mechanic: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Profile',  // Assuming mechanic profiles are stored in 'Profile' model
  },
  location: {
    type: String,
    required: true,
  },
  carType: {
    type: String,
    required: true,
  },
  serviceType: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  serviceTime: {
    type: Date,
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending',
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('ServiceRequest', ServiceRequestSchema);
