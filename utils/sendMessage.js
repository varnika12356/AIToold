const accountSid = process.env.TWILLIO_ID;
const authToken = process.env.TWILLIO_KEY;
const client = require("twilio")(accountSid, authToken);

const sendSms = async (from, to,body) => {
  let msgOptions = {
    from,
    to,
    body,
  };
  try {
    const message = await client.messages.create(msgOptions);
    console.log(message);
  } catch (error) {
    console.log(error);
  }
};

module.exports = sendSms;

// from: "+17748068874",
// to: "+919413735065",