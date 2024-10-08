const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://aditya:1234567890@cluster0.oje5zln.mongodb.net/ai_tools");
// mongoose.connect("mongodb://localhost:27017/ai_tools");
// mongoose.connect(
//   "mongodb+srv://aditya:1234567890@cluster0.oje5zln.mongodb.net/your_database_name"
// );
const db = mongoose.connection;

db.on("connecting", () => {
  console.info("Connecting to MongoDB...");
});

db.on("error", (error) => {
  console.error(`MongoDB connection error: ${error}`);
  mongoose.disconnect();
});

db.on("connected", () => {
  console.info("Connected to MongoDB!");
});
