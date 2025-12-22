const serverless = require("serverless-http");
const app = require("../server"); // path to server.js
const connectDB = require("../config/db");

// Wrap app to ensure DB connects on every request (serverless-safe)
const handler = async (req, res) => {
  await connectDB();
  return app(req, res);
};

module.exports = serverless(handler);
