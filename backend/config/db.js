const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000, // ⬅️ IMPORTANT
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection FAILED ❌");
    console.error(error.message);
    throw error; // ⬅️ IMPORTANT for Vercel
  }
};

module.exports = connectDB;

