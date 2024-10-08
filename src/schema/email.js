const mongoose = require("mongoose");

const emailSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    message: { type: String },
  },
  { timestamps: true, versionKey: false }
);

const Email = mongoose.model("emails", emailSchema);
module.exports = Email;
