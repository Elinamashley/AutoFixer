// routes/contacts.js
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { getAllContacts, createContact } = require('../controller/ContactsController');

router.post('/',
  [
    check('fullName', 'Full name is required').not().isEmpty(),
    check('phoneNumber', 'Please include a valid phone number').isMobilePhone()
  ],
  createContact 
);

router.get('/', getAllContacts);

module.exports = router;
