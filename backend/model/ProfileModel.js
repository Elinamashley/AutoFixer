const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: "user",
  },
  shopName: String,
  typeOfService: String,
  city: String,
  address: String,
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number], 
      required: true
    }
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

ProfileSchema.index({ location: '2dsphere' });
module.exports = mongoose.model("Profile", ProfileSchema);
