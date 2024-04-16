const { validationResult } = require("express-validator");
const sendSMS = require("../utils/hubtel/sendSMS");
const fetchSMSStatus = require("../utils/hubtel/getSMSStatus");
const handleMessageResponse = require("../utils/hubtel/handleResponse");
const MessageStatus = require("../model/MessageStatusModel");
const handleSMSResponse = require("../utils/hubtel/handleResponse");

exports.sendMessage = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    let { to, from, content } = req.body;
    console.log(to, from, content);

    let recipients =
      typeof to === "string" ? to.split(",").map((phone) => phone.trim()) : to;

    // Sending the message
    const response = await sendSMS({ recipients, from, content });

    // Handling the response with the adjusted 'to' parameter
    await handleSMSResponse(response, to, content, from); // Ensure handleSMSResponse is correctly imported

    console.log("SMS Response:", response);
    return res.status(200).json(response);
  } catch (error) {
    console.error("Error sending SMS:", error);
    return res.status(500).send("Server Error");
  }
};

exports.getSMSStatus = async (req, res) => {
  try {
    const { messageId } = req.params;
    if (!messageId) {
      return res.status(400).json({ message: "Message ID is required" });
    }

    const response = await fetchSMSStatus(messageId);
    console.log("SMS Status:", response);
    return res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching SMS status:", error);
    return res.status(500).send("Server Error");
  }
};

exports.getAllMessageStatuses = async (req, res) => {
  try {
    const statuses = await MessageStatus.find().populate("contacts");
    res.json(statuses);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};
