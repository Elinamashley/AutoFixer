const MessageStatus = require("../../model/MessageStatusModel");
const Contact = require("../../model/ContactsModel");

async function handleSMSResponse(response, phoneNumbers, content, from) {
  const recipients = typeof phoneNumbers === 'string' ? phoneNumbers.split(',').map(phone => phone.trim()) : phoneNumbers;
  const isBatchResponse = Array.isArray(response.data); // Check if the response is a batch response

  let contactIds = []; // Array to store contactIds for all recipients
  let messageId; // Declare messageId outside the loop

  for (const phoneNumber of recipients) {
    const contact = await findOrCreateContact(phoneNumber);
    messageId = isBatchResponse
      ? (response.data.find(item => item.recipient === phoneNumber) || {}).messageId // Find the corresponding messageId for each phoneNumber in batch response
      : response.messageId; // Use the provided messageId for single messages

    if (!messageId) {
      continue;
    }

    // Extract the contactId from the contact object and push it to the array
    const contactId = contact._id;
    contactIds.push(contactId);
  }

  // Prepare the message status document
  let messageStatus = {
    contacts: contactIds, // Populate the contacts array with all contactIds
    messageId: messageId, // Assign the messageId outside the loop
    content: content,
    from: from,
    status: response.status === 0 ? 'Delivered' : 'Failed',
    sentAt: new Date(),
    // messageCount, accountBalance, etc., can be added as per requirements
  };

  await MessageStatus.create(messageStatus);
}




async function findOrCreateContact(phoneNumber) {
  
  let contact = await Contact.findOne({ phoneNumber }).exec();
  if (!contact) {
    contact = new Contact({ phoneNumber });
    await contact.save();
  }
  return contact;
}


module.exports = handleSMSResponse;


