const serverless = require("serverless-http");
const express = require("express");
const connectDB = require("../config/db");
const app = require("../server");

// Serverless-safe DB connection
let dbConnected = false;

const handler = async (req, res) => {
  if (!dbConnected) {
    await connectDB();
    dbConnected = true;
  }

  // Explicit CORS headers (for preflight)
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,DELETE,OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );

  // Preflight
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  return app(req, res);
};

module.exports = serverless(handler);
