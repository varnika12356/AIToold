require("dotenv").config();
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(
  process.env.SENDGRID_KEY
);

const   sendEmail = async (to, from, subject, text) => {
  const msg = {
    to,
    from,
    subject,
    text,
  };
  await sgMail.send(msg, function (err, result) {
    if (err) {
      console.log("Email not Sent Error Occured");
    } else {
      console.log("Email was Sent");
    }
  });
};

module.exports = sendEmail;
