const mongoose = require('mongoose');

const MessageStatusSchema = new mongoose.Schema({
  contacts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Contact',
    required: true
  }],
  messageId: {
    type: String,
    required: true
  },
  from: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['Delivered', 'Failed'],
    required: true
  },
  networkId: {
    type: String
  },
  clientReference: {
    type: String
  },
  statusDescription: {
    type: String
  },
  sentAt: {
    type: Date,
    default: Date.now
  },
  messageCount: {
    type: Number,
    required: true,
    default: 0
  },
  accountBalance: {
    type: Number,
    required: true,
    default: 0 // Assuming starting balance is 0, adjust as necessary
  }
});

module.exports = mongoose.model('MessageStatus', MessageStatusSchema);
