const serverless = require("serverless-http");
const express = require("express");
const app = require("../server"); // your main Express app
const connectDB = require("../config/db");
const cors = require("cors");

// Create a mini express instance to wrap app with CORS
const handler = express();

// Apply CORS here (dynamic, any frontend)
handler.use(cors({
  origin: true,          // allow requests from any origin
  credentials: true,     // allow cookies
  methods: ["GET","POST","PUT","DELETE","OPTIONS"]
}));

// Mount your main Express app
handler.use(app);

// Serverless handler
module.exports.handler = serverless(async (req, res) => {
  try {
    await connectDB();    // safe DB connection (reuses if already connected)
    return handler(req, res);
  } catch (err) {
    console.error("DB connection failed:", err);
    res.status(500).json({ message: "Database connection failed" });
  }
});
