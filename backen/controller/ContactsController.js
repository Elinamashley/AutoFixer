// controllers/contactsController.js
const { validationResult } = require('express-validator');
const Contact = require('../model/ContactsModel');
const Group = require('../model/GroupsModel');
const mongoose = require('mongoose');

// Create a new contact
exports.createContact = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { phoneNumber, groupId, ...otherData } = req.body;

    // If handling groups, ensure groupId is considered
    if (groupId) {
      // Ensure groupId is valid and exists
      const groupExists = await Group.findById(groupId);
      if (!groupExists) {
        return res.status(404).json({ message: "Group not found" });
      }
    }

    // Handle a single contact object with consideration for groupId
    const update = { ...otherData, ...(groupId && { groupId }) };

    // Check if a contact with the same phoneNumber and groupId exists
    const existingContact = await Contact.findOne({
      phoneNumber,
      ...(groupId && { groupId }),
    });

    if (existingContact) {
      // Update existing contact if it exists
      const updatedContact = await Contact.findByIdAndUpdate(existingContact._id, update, { new: true });
      return res.status(200).json(updatedContact);
    } else {
      // Create a new contact if it does not exist
      const newContact = new Contact({
        phoneNumber,
        ...update,
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
