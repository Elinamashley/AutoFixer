const express = require("express");
const { check } = require("express-validator");
const {
  createUserDetails,
  updateUserProfile,
} = require("../controller/userController");
const upload = require("../utils/mutterUpload");

const router = express.Router();

router
  .route("/create-user")
  .post(
    [
      check("name", "Name is required").not().isEmpty(),
      check("email", "Enter a valid email").isEmail(),
      check("password", "Enter a valid password").isLength({ min: 6 }),
    ],
    createUserDetails
  );

router.put(
  "/update-user/:id",upload,
  [
    check("name", "Name is required").notEmpty(),
    check("email", "Enter a valid email").isEmail(),
    check('userType', 'User type is invalid').isIn(['mechanic', 'user', 'admin']),
  ],
  updateUserProfile
);



module.exports = router;


