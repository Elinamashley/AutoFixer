const { validationResult } = require("express-validator");
const User = require("../model/UserModel");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
dotenv.config();
const upload = require('../utils/mutterUpload');

//@rout POST api/v1/users/create-user
//@desc user route
//access public
const createUserDetails = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password, userType } = req.body;

  try {
    // Check if the user already exists
    let user = await User.findOne({
      $or: [
        { email: email ? email : undefined }, 
      ],
    });

    if (user) {
      return res.status(401).json({ errors: [{ msg: "User already exists" }] });
    }

    // Continue with user creation
    // Get user's gravatar
    const avatar = gravatar.url(email || '', {
      s: '200', // Ensure the size is a string
      r: 'pg',
      d: 'mm',
    });

    

    // Encrypt password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    user = new User({
      name,
      email,
      password: hashedPassword, // Use the encrypted password
      avatar,
      userType
    });

    // Save the new user
    await user.save();

    // Instead of returning a token, just confirm the user's creation
    res.status(201).json(user)

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");  
  }
};



//updated user profile
 

// Modify the updateUserProfile to include Multer middleware
const updateUserProfile = async (req, res) => {
  upload(req, res, async (err) => {
    if(err){
      // Handle errors
      res.status(500).json({error: err}); 
    } else {
      // Proceed with user update
      const userId = req.params.id;
      let updatedData = req.body;

      if(req.file){
        // Assuming your User model has an avatar field to store the image path
        updatedData.avatar = req.file.path;
      }
// check if user id is valid
      try {
        if (!mongoose.Types.ObjectId.isValid(userId)) {
          return res.status(400).json({ error: 'Invalid user id' });
        }

        // find user id
        const user = await User.findById(userId);

        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }

        // Update user with new data
        user.name = updatedData.name || user.name;
        user.email = updatedData.email || user.email;
        user.avatar = updatedData.avatar || user.avatar;

        await user.save();

        res.status(200).json({message: 'User profile updated successfully'});
      } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
      }
    }
  });
};






module.exports = {
  createUserDetails,
  updateUserProfile, 
};
