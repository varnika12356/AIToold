const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    number: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    username:{ type: String },
    dob: { type: String },
    gender: { type: String },
    city: { type: String },
    state: { type: String },
    country:{ type: String },
    status: { type: Boolean, default: true },
    role: { type: String }, 
  },
  { timestamps: true, versionKey: false }
);

const User = mongoose.model("Users", UsersSchema);
module.exports = User;
