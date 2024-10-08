// Tool.js

const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  { name: { type: String, required: true } },
  { collection: "category", timestamps: true, versionKey: false },
  { toolCount: { type: String }},
  { icon: { type: String }}
);

categorySchema.index({ name: 1 }, { unique: true });
const Category = mongoose.model("category", categorySchema);

module.exports = Category;
