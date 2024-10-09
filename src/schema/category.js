const mongoose = require("mongoose");
const slugify = require("slugify"); // Ensure slugify is installed

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    icon: { type: String },
    slug: { type: String, unique: true }, // Ensure slug is required
  },
  { collection: "category", timestamps: true, versionKey: false }
);

// Pre-save hook to generate slug from the name
categorySchema.pre("save", function (next) {
  if (this.isNew || this.isModified("name")) {
    this.slug = slugify(this.name, { lower: true }); // Generate slug
  }
  next();
});

categorySchema.index({ name: 1 }, { unique: true });
const Category = mongoose.model("category", categorySchema);

module.exports = Category;
