// Import nodemailer to send reset password emails
const nodemailer = require("nodemailer");
const User = require("../model/UserModel");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const Profile = require("../model/ProfileModel");

const createOrUpdateProfile = async (req, res) => {
  const { shopName, typeOfService, city, address, location } = req.body;

  // Build profile object
  const profileFields = {
    user: req.user.id, // Assuming the user ID is available here
    shopName,
    typeOfService,
    city,
    address,
  };

  // Convert location string "lat, lng" to GeoJSON format for MongoDB
  if (location) {
    const [latitude, longitude] = location.split(', ').map(Number);
    profileFields.location = {
      type: "Point",
      coordinates: [longitude, latitude] // MongoDB expects [longitude, latitude]
    };
  }

  try {
    let profile = await Profile.findOne({ user: req.user.id });

    if (profile) {
      // Update existing profile
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      );
      return res.json(profile);
    }

    // Create new profile if not exist
    profile = new Profile(profileFields);
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};



// Assuming the Profile model is imported at the top
// const Profile = require('../models/Profile');

const getAllProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar']);
    // Populating 'user' to get user details like name and avatar along with each profile
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};


// Get the current user's profile
const getCurrentUserProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      "user",
      ["name", "avatar"]
    );
    // Populate 'user' is optional, to include user details like name and avatar from the User model

    if (!profile) {
      return res.status(400).json({ msg: "There is no profile for this user" });
    }
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
}

// Controller to request password reset
const requestPasswordReset = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Use generateResetToken function to generate and save the token
    const resetToken = await generateResetToken(user);

    // Send an email to the user with the password reset link
    const resetLink = `http://localhost:3000/reset-password/${resetToken}`;
    const mailOptions = {
      to: user.email,
      subject: "Password Reset",
      text: `Click on the following link to reset your password: ${resetLink}`,
    };

    // Use nodemailer to send the email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.SMPT_PASSWORD,
      },
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
    });

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        res.status(500).send("Error sending password reset email");
      } else {
        console.log("Email sent: " + info.response);
        res.status(200).json({ message: "Password reset email sent" });
      }
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

const resetPassword = async (req, res) => {
  const { resetToken, newPassword } = req.body;
  try {
    const hashedResetToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    const user = await User.findOne({
      resetPasswordToken: hashedResetToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      console.log("Invalid or expired token");
      return res.status(400).json({ error: "Invalid or expired token" });
    }

    // Update the user's password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    // Clear the reset token and expiration
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();
    return res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

module.exports = {
  requestPasswordReset,
  resetPassword,
  createOrUpdateProfile,
  getCurrentUserProfile,
  getAllProfiles
};
