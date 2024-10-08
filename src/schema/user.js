const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    number: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    username: String,
    dob: String,
    gender: String,
    city: String,
    state: String,
    country: String,
    role: String,
    status: { type: Boolean, default: true },
  },
  { timestamps: true, versionKey: false }
);

const User = mongoose.model("Users", UsersSchema);
module.exports = User;
