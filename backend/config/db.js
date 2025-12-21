const mongoose = require("mongoose");

const connectDB = async () => {
  // Reuse existing connection (important for serverless)
  if (mongoose.connections[0].readyState) {
    console.log("Using existing MongoDB connection");
    return;
  }

  try {
    // No need for useNewUrlParser or useUnifiedTopology
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("MongoDB connection failed:", err);
    throw err;
  }
};

module.exports = connectDB;
