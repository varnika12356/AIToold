const mongoose = require("mongoose");

const toolSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    longDescription: { type: String, required: false }, 
    visit_link: { type: String, required: true },
    pricing: {
      price: { type: String, required: true }, 
      type: {
        type: String,
        required: true,
        enum: ["freemium", "trial", "premium"],
        message: "{VALUE} not supported!",
      },
      pricing_url: { type: String, required: false },  
      pricing_image: { type: String, required: false } 
    },
    status: { type: Boolean, default: false },
    visit_count: { type: Number, default: 0 },
    filter: {
      type: String,
      enum: ["new", "popular", "featured"],
      default: "new",
    },
    firebase_image_url: { type: String, required: true }, 
    rating: { type: Number, default: 0 }, 
    isFree: { type: Boolean, default: false }, 
    isVerified: { type: Boolean, default: false }, 
    tags: { type: [String], default: [] }, 
    ranking: { type: Number, required: false }, 

  },
  { collection: "tools", timestamps: true, versionKey: false }
);

const Tool = mongoose.model("Tool", toolSchema); // Use 'Tool' for consistency

module.exports = Tool;
