const mongoose = require("mongoose");

const smsSchema = new mongoose.Schema({
  mobile: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const sendSms = mongoose.model("sms", smsSchema);
module.exports = sendSms;
