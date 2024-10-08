const mongoose = require("mongoose");

const aiTutorialSchema = new mongoose.Schema(
  {
    toolId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tool", 
      required: true,
    },
    tutorialUrl: {
      type: String,
      required: true, 
    },
  },
  { timestamps: true, versionKey: false } 
);

const AITutorial = mongoose.model("AITutorial", aiTutorialSchema);

module.exports = AITutorial;
