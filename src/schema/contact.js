const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    status: {
      type: String,
      enum: ['Pending', 'Replyed'],
      default: 'Pending', // Set default status to 'Pending'
    },
  },
  { timestamps: true, versionKey: false }
);

const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;
