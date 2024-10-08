const mongoose = require("mongoose");

const footerSchema = new mongoose.Schema(
  {
    image: { type: String, required: true },
    website_Title: { type: String, required: true },
    website_About: { type: String, required: true },
    gmail_Url: { type: String, required: true },
    facebook_Url: { type: String, required: true },
    twitter_Url: { type: String, required: true },
    instagram_Url: { type: String, required: true },
    linkedin_Url: { type: String, required: true },
    copy_Right: { type: String, required: true },
    subscribe_About: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("footers",footerSchema);