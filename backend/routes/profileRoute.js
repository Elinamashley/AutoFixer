const express = require("express");
const { check } = require("express-validator");
const auth = require("../middleware/auth");

const router = express.Router();

const {
  requestPasswordReset,
  resetPassword,
  createOrUpdateProfile,
  getCurrentUserProfile,
  getAllProfiles,
} = require("../controller/profileController");

// Request password reset route
router
  .route("/request-password-reset")
  .post(
    [check("email", "Enter a valid email").isEmail()],
    requestPasswordReset
  );

router.get("/me", auth, getCurrentUserProfile).get('/', getAllProfiles);;



// Reset password route
router
  .route("/reset-password")
  .post(
    [check("newPassword", "Enter a valid password").isLength({ min: 6 })],
    resetPassword
  );

router.post(
  "/",
  [
    auth,
    check("shopName", "Shop name is required").notEmpty(),
    check("typeOfService", "Type of service is required").notEmpty(),
    check("city", "City is required").notEmpty(),
    check("address", "Address is required").notEmpty(), 
  ],
  createOrUpdateProfile
);

module.exports = router;
