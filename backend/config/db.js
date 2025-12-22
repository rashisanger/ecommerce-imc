const mongoose = require("mongoose");

let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;

  if (!process.env.MONGO_URI) throw new Error("MONGO_URI is not defined");

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      bufferCommands: false
    });
    isConnected = conn.connections[0].readyState === 1;
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
    throw err;
  }
};

module.exports = connectDB;
