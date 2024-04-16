// Import necessary modules and dependencies
const cron = require('node-cron');
const Contact = require('../model/ContactsModel');
const User = require('../model/UserModel');
const sendSMS = require('./hubtel/sendSMS');
const handleSMSResponse = require('./hubtel/handleResponse');

const scheduleBirthdayReminder = () => {
    // Schedule a task to run every day at 3:25 am
    cron.schedule('5 4 * * *', async () => {
      try {
        // Get today's date
        const today = new Date();
        const todayDayMonth = today.toISOString().slice(5, 10); // Extract day and month (MM-DD) from today's date

        // Find contacts whose DOB matches today's day and month
        const contacts = await Contact.find({
          $expr: {
            $eq: [
              { $substrCP: ['$dob', 5, 5] }, // Extract day and month (MM-DD) from the DOB field
              todayDayMonth
            ]
          }
        });

        // Log the fetched contacts

        // Construct and send birthday messages
        for (const contact of contacts) {
          // Fetch user associated with the contact
          const user = await User.findById(contact.userId);

          // Check if user exists before accessing its properties
          if (user) {
            // Construct the birthday message including user's name
            const birthdayMessage = `Dear ${contact.fullName}, as a new chapter begins in your life, ${user.name} would like to wish you all the joy and success you could ever want in life. Happy birthday to you.`;

            // Send birthday message via email or SMS
            const response = await sendSMS({ recipients: contact.phoneNumber, from: user.name, content: birthdayMessage });
            let to= contact.phoneNumber, content= birthdayMessage, from= user.name
            await handleSMSResponse(response, to, content, from);

            // Log a message for successful send
            console.log(`Birthday message sent successfully to ${contact.fullName}`);
          } else {
            // Log an error if user is not found
            console.error(`User with ID ${contact.userId} not found for contact ${contact.fullName}`);
          }
        }
      } catch (error) {
        // Handle any errors that occur during the process
        console.error('Error sending birthday messages:', error);
      }
    });
};

// Export the cron job function
module.exports = scheduleBirthdayReminder;
