const mongoose = require("mongoose");

let isConnected = false; // track connection

const connectDB = async () => {
  if (isConnected) {
    console.log("✅ Using existing MongoDB connection");
    return;
  }

  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is not defined in environment variables");
  }

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      bufferCommands: false,  // disable mongoose buffering
      // useUnifiedTopology and useNewUrlParser are default now
    });

    isConnected = conn.connections[0].readyState === 1;
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
    throw err;
  }
};

module.exports = connectDB;
