// backend/config/db.js
const mongoose = require("mongoose");

const connectDB = async () => {
  if (mongoose.connection.readyState) {
    // Use existing connection if it exists
    return;
  }
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("MongoDB connection failed:", err);
    throw err; // Important for Vercel to know
  }
};

module.exports = connectDB;
