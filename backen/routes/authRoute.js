const express = require("express");
const router = express.Router();
const auth =require('../moddleware/auth.js')
const { check, } = require("express-validator");

const {
  getAuthenticatedUser, authenticateUser,
} = require("../controller/authController.js");

router
  .route("/")
  .get(auth, getAuthenticatedUser)
  .post([
    // Validate that the email is provided and correctly formatted
    check("email", "Enter a valid email").isEmail(),
    // Validate that the password is provided and meets the length requirement
    check("password", "Password is required and should be at least 6 characters").isLength({ min: 6 }),
  ], authenticateUser);

module.exports = router;
