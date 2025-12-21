const serverless = require("serverless-http");
const app = require("../server"); // import your Express app
const connectDB = require("../config/db");

module.exports.handler = serverless(async (req, res) => {
  try {
    await connectDB(); // safe: will reuse existing connection
    return app(req, res); // pass request to Express
  } catch (err) {
    console.error("DB connection failed:", err);
    res.status(500).json({ message: "Database connection failed" });
  }
});