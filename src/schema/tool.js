const mongoose = require("mongoose");
const slugify = require("slugify");

const toolSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: { type: String, required: true },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'category',
    },
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
    // filter: {
    //   type: String,
    //   enum: ["new", "popular", "featured"],
    //   default: "new",
    // },
    firebase_image_url: { type: String, required: true }, 
    isFree: { type: Boolean, default: false }, 
    isFeatured: { type: Boolean, default: false },
    isVerified: { type: Boolean, default: false }, 
    tags: { type: [String], default: [] }, 
    ranking: { type: Number, required: false }, 
    slug: { type: String, unique: true } 
  },
  { collection: "tools", timestamps: true, versionKey: false }
);

toolSchema.pre('save', function(next) {
  if (this.title) {
    this.slug = slugify(this.title, { lower: true });
  }
  next();
});

const Tool = mongoose.model("tool", toolSchema);

module.exports = Tool;
