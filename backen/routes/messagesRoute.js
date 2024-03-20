const express = require('express');
const { check } = require('express-validator');
const { sendMessage } = require('../controller/messageController');


const router = express.Router();

router.post('/',
  [
    check('to', 'Recipient number is required').not().isEmpty(),
    check('from', 'Sender number is required').not().isEmpty(),
    check('content', 'Message content is required').not().isEmpty(),
  ],
  sendMessage
);

module.exports = router;
