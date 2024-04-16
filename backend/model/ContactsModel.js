const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
  fullName: {
    type: String,
  },
  email: {
    type: String
  },
  phoneNumber: {
    type: String,
    required: true
  },
  facebookId: {
    type: String
  },
  instagramId: {
    type: String
  },
  dob: {
    type: Date
  },
  importOption: {
    type: Boolean,
    default: false
  },
  groupId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Group',
    default: null
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user' // This should match the name you used when calling mongoose.model() for your User model
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Middleware to set updatedAt on update operations
ContactSchema.pre('findOneAndUpdate', function() {
  this.set({ updatedAt: new Date() });
});

module.exports = mongoose.model('Contact', ContactSchema);
