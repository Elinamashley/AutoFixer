

// require('dotenv').config(); // Ensure you have this line to use environment variables
// const axios = require('axios');

// const sendSMS = async ({ to,from, content }) => {
//   const url = `https://sms.hubtel.com/v1/messages/send`;


//   // Construct the Basic Auth string from clientId and clientSecret
//   const clientId = process.env.CLIENT_ID;
//   const clientSecret = process.env.CLIENT_SECRET;
//   const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

//   try {
//     const response = await axios.post(url, {
//       From: from,
//       To: to,
//       Content: content
//     }, {
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Basic ${basicAuth}`
//       }
//     });

//     console.log('SMS sent successfully:', response.data);
//     return response.data; 
//   } catch (error) {
//     console.error('Error sending SMS:', error.response ? error.response.data : error.message);
//     throw error; // Rethrow or handle error appropriately
//   }
// };

// // Example usage (ensure to replace 'TO_PHONE_NUMBER' with actual phone number and handle errors properly)
// sendSMS({ 
//   to: '0543869957', 
//   from:"Testfrm",
//   content: 'This Is A Test Message' 
// }).catch(console.error);

require('dotenv').config();
const axios = require('axios');

const sendSMS = async ({ recipients, content }) => {
  const from = "techfix"; // The 'from' number provided by your SMS service
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

// Example usage for a single recipient
let res = await sendSMS({ 
  recipients: ['233543869957'], // Single recipient
  content: 'Welcome to the Techfix single SMS test' 
}).catch(console.error);

console.log(res)
// // Example usage for multiple recipients
// sendSMS({ 
//   recipients: ['233243168689', '2330504169806'], // Multiple recipients
//   content: 'Welcome to the Techfix bulk SMS test' 
// }).catch(console.error);

