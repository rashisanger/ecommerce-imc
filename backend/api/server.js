// api/server.js
const serverless = require("serverless-http");
const app = require("../server"); // import the Express app you exported

module.exports = (req, res) => {
  return serverless(app)(req, res);
};