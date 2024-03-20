const { validationResult } = require("express-validator");
const User = require("../model/UserModel");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { payWithMomo, payWithCard } = require("../moddleware/payWithMomoorCard");
const { findUserById, getMostRecentPayment, verifyPayment, calculateAccountBalance, tokenValue } = require("../moddleware/otherHelperFunctions");
const { updatePaymentStatus } = require("../moddleware/updatePaymentStatus");
dotenv.config();
const mongoose = require("mongoose");
const generateUniqueToken = require("../utils/generateUniqueUsertoken");

const Paystack = require("paystack")(process.env.PAYSTACK_KEY); // Replace with your secret key

//@rout POST api/v1/users/create-user
//@desc test route
//access public
const createUserDetails = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password } = req.body;

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
    });

    // Save the new user
    await user.save();

    // Instead of returning a token, just confirm the user's creation
    res.status(201).json({ message: "User created successfully" });

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};



//pay for token
//@rout POST api/v1/payment/pay
//@desc payment route
//access private
const payToken = async (req, res) => {
  const { paymentMethod, amount } = req.body;
  try {
    let user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).send("User not found");
    }

    const { email } = user;

    let paymentResult;
    if (paymentMethod === "momo") {
      paymentResult = await payWithMomo(email, amount);
    } else if (paymentMethod === "card") {
      paymentResult = await payWithCard(email, amount);
    } else {
      return res.status(400).json({ error: "Invalid payment method" });
    }

    res.status(200).json(paymentResult);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error@PaymentMethod");
  }
};



//get payment status
//@route GET api/v1/payment/verify
//@desc payment route
//access private
const verifyPament = async (req, res) => {
  try {
    //find the current user
    const user = await findUserById(req.user.id);

    if (!user) {
      return res.status(404).send("User not found");
    }

    //get the very last payment
    const mostRecentPayment = getMostRecentPayment(user.payments);

    if (!mostRecentPayment) {
      return res.status(400).send("No payment found for the user");
    }

    //get the payment reference
    const reference = mostRecentPayment.reference;
    const paymentDetails = await verifyPayment(reference);

    if (paymentDetails.status === "success") {
      const updatedUser = await updatePaymentStatus(
        user._id,
        mostRecentPayment._id,
        mostRecentPayment.amount
      );

      // Wait for the balance update to complete before sending the response
      const totalAccountBalance = calculateAccountBalance(updatedUser.payments);
      const tokenBalance = tokenValue(totalAccountBalance);

      res.send(updatedUser);
    } else {
      res.status(400).send("Payment verification failed");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

//updated user profile
const updateUserProfile = async (req, res) => {
  const userId = req.params.id; 
  const updatedData = req.body;

  try {
    // Make sure to handle the case where the provided id is not a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: 'Invalid user id' });
    }

    // Assuming you want to update the user with the provided id
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Handle the update logic based on the edited data
    // Update the user properties as needed
    user.name = updatedData.name || user.name;
    user.email = updatedData.email || user.email;
    user.phone = updatedData.phone || user.phone;

    await user.save();

    // Respond with the updated user data and a message
    res.status(200).json({
      message: 'User profile updated successfully',
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error4');
  }
};

// buyProduct - handles product purchase by subtracting amount from user's balance
//@route POST api/v1/payment/buy-product
//@desc Buy a product
//access private
const buyProduct = async (req, res) => {
  const { amount } = req.body; // This is the amount to deduct from totalBalance
  const numericAmount = parseFloat(amount); // Ensure amount is a number
  
  try {
    let user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Log to debug
    console.log(`User totalBalance before purchase: ${user.balance.totalBalance}, Purchase amount: ${numericAmount}`);

    // Validate user's totalBalance and the numericAmount
    if (isNaN(user.balance.totalBalance) || isNaN(numericAmount)) {
      return res.status(400).json({ error: "Invalid totalBalance or amount" });
    }

    // Check if the user's totalBalance is sufficient for the purchase
    if (user.balance.totalBalance < numericAmount) {
      return res.status(400).json({ error: "Total balance is too low for this purchase" });
    }

    // Deduct the amount from the user's totalBalance
    user.balance.totalBalance -= numericAmount;

    // Update tokenBalance based on the new totalBalance
    // Assuming 1 totalBalance = 10 tokenBalance
    user.balance.tokenValue = user.balance.totalBalance * 10;

    await user.save();

    res.status(200).json({
      message: "Purchase successful",
      newTotalBalance: user.balance.totalBalance,
      newTokenBalance: user.balance.tokenValue
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error during purchase");
  }
};




module.exports = {
  verifyPament,
  createUserDetails,
  payToken,
  updateUserProfile,
  buyProduct 
};
