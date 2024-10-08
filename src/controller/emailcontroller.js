const Email = require("../schema/email");
const sendEmail = require("../../utils/sendEmail");
const Contact = require("../schema/contact");

//@desc   SendQuery Email
//@route  POST /emails
//@access Private
const replyOnQuery = async (req, res) => {
  try {
    const { email, message, id } = req.body;

    if (!email || !message) throw new Error("Please Add All Fields");

    const from = "vidtesting001@gmail.com";
    const to = email;
    const subject = "Reply on Your Query";

    const output = `
    <p>You have a new Contact Request</p>
    <h3>Thank you for Reach</h3>                                          
    <ul>
    <li>Message:${message}</li>
    </ul>
    `;

    sendEmail(to, from, subject, output);

    // Create a new email address document
    const newEmail = new Email({ email, message: message });
    const updateContact = await Contact.updateOne(
      { _id: id },
      { status: "Replyed" }
    );
    await newEmail.save();

    // Return the newly created email address
    res.status(201).json(newEmail);
  } catch (error) {
    // Handle any errors
    console.error("Error creating email address:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { replyOnQuery };
