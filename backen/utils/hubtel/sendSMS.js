require('dotenv').config();
const axios = require('axios');

const sendSMS = async ({ recipients, from, content }) => {
  const clientId = process.env.CLIENT_ID; // Your SMS service client ID
  const clientSecret = process.env.CLIENT_SECRET; // Your SMS service client secret
  const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
  
  // Decide the endpoint based on the number of recipients
  const url = recipients.length === 1
    ? "https://sms.hubtel.com/v1/messages/send"
    : "https://sms.hubtel.com/v1/messages/batch/simple/send";

  // Prepare the data payload based on the number of recipients
  const data = recipients.length === 1
    ? { From: from, To: recipients[0], Content: content }
    : { From: from, Recipients: recipients, Content: content };

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
    console.error('Error sending SMS:', error.response ? error.response.data : error.message);
    throw error;
  }
};

module.exports = sendSMS