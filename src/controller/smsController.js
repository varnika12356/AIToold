const Sms = require("../schema/sms");
const sendSms = require("../../utils/sendMessage");

// @desc   Set Send Message
// @route  POST /sendsms
//@access Private
const sendMessage = async (req, res) => {
  const { mobile, message } = req.body;
  console.log(mobile);
  try {
    const smsData = await Sms.create({ mobile: mobile, message: message });
    res.status(200).json(smsData);
  } catch (error) {
    console.log(error);
  }

  //send message using sendGrid
  from = "+17748068874";
  to = mobile;
  body = message;

  sendSms(from, to, body);
};

module.exports = sendMessage;
