const { validationResult } = require('express-validator');
const sendSMS = require('../utils/hubtel/sendSMS');
const fetchSMSStatus = require('../utils/hubtel/getSMSStatus');
const Contact = require('../model/ContactsModel');

exports.sendMessage = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    try {
      const { recipients, from, content } = req.body;
  
      // Call your SMS sending utility function
      const response = await sendSMS({ recipients, from, content });
  
      if (response.status === 0) {
        // Assuming status 0 means success
        recipients.forEach(async (recipient) => {
          // Assuming recipients is an array of contact IDs
          const contact = await Contact.findById(recipient);
          if (contact) {
            const newMessageStatus = new MessageStatus({
              contact: recipient,
              messageId: response.messageId,
              content,
              status: 'Delivered',
              networkId: response.networkId,
              clientReference: response.clientReference,
              statusDescription: response.statusDescription,
              sentAt: new Date() // or use the timestamp from response if available
            });
            await newMessageStatus.save();
          }
        });
        return res.status(200).json(response);
      } else {
        // Handle failure scenario
        return res.status(500).json({ message: "Message sending failed" });
      }
    } catch (error) {
      console.error('Error sending SMS:', error);
      return res.status(500).send('Server Error');
    }
  };
  



exports.getSMSStatus = async (req, res) => {
  try {
    const { messageId } = req.params;
    if (!messageId) {
      return res.status(400).json({ message: "Message ID is required" });
    }
    
    const response = await fetchSMSStatus(messageId);
    console.log('SMS Status:', response);
    return res.status(200).json(response);
  } catch (error) {
    console.error('Error fetching SMS status:', error);
    return res.status(500).send('Server Error');
  }
};
