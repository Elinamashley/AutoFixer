require('dotenv').config();
const axios = require('axios');

const fetchSMSStatus = async (messageId) => {
  const clientId = process.env.CLIENT_ID; // Your SMS service client ID
  const clientSecret = process.env.CLIENT_SECRET; // Your SMS service client secret
  const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
  
  const url = `https://sms.hubtel.com/v1/messages/${messageId}`;

  try {
    const response = await axios.get(url, {
      headers: {
        'Authorization': `Basic ${basicAuth}`
      }
    });

    console.log(`SMS status fetched successfully:`, response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching SMS status:', error.response ? error.response.data : error.message);
    throw error;
  }
};

module.exports =fetchSMSStatus
