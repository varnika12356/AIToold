  const mongoose = require('mongoose');
  const reviewSchema = new mongoose.Schema({
    reviewContent: {
      type: String,
      required: true
    },
    rating: {
      type: Number,
      required: true
    },
    toolId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'tool', 
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true, versionKey: false }

);

  const Review = mongoose.model('Review', reviewSchema);

  module.exports = Review;
