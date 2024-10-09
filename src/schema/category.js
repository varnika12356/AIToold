const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    icon: { type: String }, 
  },
  { collection: "category", timestamps: true, versionKey: false }
);

categorySchema.index({ name: 1 }, { unique: true });
const Category = mongoose.model("category", categorySchema);

module.exports = Category;