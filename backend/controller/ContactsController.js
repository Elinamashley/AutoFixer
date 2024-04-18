// controllers/contactsController.js
const { validationResult } = require('express-validator');
const Contact = require('../model/ContactsModel');
const mongoose = require('mongoose');

exports.createContact = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { phoneNumber, groupId, ...otherData } = req.body;
    console.log(phoneNumber, groupId, otherData)
    // Adjusted to use _id based on the structure of the user object

    const userId = req.user._id; 

    // Validate groupId if provided
    if (groupId) {
      const groupExists = await Group.findById(groupId);
      if (!groupExists) {
        return res.status(404).json({ message: "Group not found" });
      }
    }

    // Construct the contact data, including userId 
    const contactData = {
      ...otherData,
      phoneNumber,
      userId, // Include userId in the contact data
      ...(groupId && { groupId }),
    };

    // Check for existing contact
    const existingContact = await Contact.findOne({
      phoneNumber,
      userId, // Consider userId to identify unique contacts for the user
      ...(groupId && { groupId }),
    });

    if (existingContact) {
      // Update existing contact
      const updatedContact = await Contact.findByIdAndUpdate(existingContact._id, contactData, { new: true });
      return res.status(200).json(updatedContact);
    } else {
      // Create a new contact
      const newContact = new Contact({
        ...req.body, // other contact fields
        userId: req.user.id, // Include the authenticated user's ID
      });
      await newContact.save();
      return res.status(201).json(newContact);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};





// Get all contacts, most recent first

exports.getAllContacts = async (req, res) => {
  try {
    // If groupId is provided in the query
    if (req.query.groupId) {
      // Check if the provided groupId is a valid ObjectId
      if (!mongoose.Types.ObjectId.isValid(req.query.groupId)) {
        return res.status(400).send('Invalid group ID format');
      }

      // Fetch contacts that belong to the provided groupId
      const contacts = await Contact.find({ groupId: req.query.groupId }).sort({ createdAt: -1 });

      // Check if the group exists but has no contacts
      const groupExists = await Group.findById(req.query.groupId);
      if (!groupExists) {
        return res.status(404).send('Group not found');
      }

      // Return the contacts of the group if any, or an empty array if the group is empty
      return res.status(200).json(contacts);
    } 

    // If no groupId is provided, return all contacts
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(contacts);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};
