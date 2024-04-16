require('dotenv').config();
const axios = require('axios'); 



const sendSMS = async ({ recipients, from, content }) => {
  const clientId = process.env.CLIENT_ID;
  const clientSecret = process.env.CLIENT_SECRET;
  const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

  // Check if recipients is a string and contains commas, indicating multiple recipients
  const isBatch = typeof recipients === 'string' && recipients.includes(',');
  const recipientList = isBatch ? recipients.split(',').map(num => num.trim()) : Array.isArray(recipients) ? recipients : [recipients];

  const url = recipientList.length > 1 ? "https://sms.hubtel.com/v1/messages/batch/simple/send" : "https://sms.hubtel.com/v1/messages/send";
  const data = recipientList.length > 1 
    ? { From: from, Recipients: recipientList, Content: content }
    : { From: from, To: recipientList[0], Content: content };

  try {
    const response = await axios.post(url, data, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${basicAuth}`
      }
    });

    console.log(`SMS sent successfully:`, response.data);
    return response.data;
  } catch (error) {
    console.error('Error sending SMS:', error.response ? error.response.data : error);
    throw error;
  }
};

// Example usage:
// sendSMS({ recipients: '0543869957', from: 'YourSenderID', content: 'Hello World!' })
//   .then(console.log)
//   .catch(console.error);

// sendSMS({ recipients: ['0543869957', '0504169806'], from: 'YourSenderID', content: 'Hello Group!' })
//   .then(console.log)
//   .catch(console.error);

module.exports = sendSMS;
