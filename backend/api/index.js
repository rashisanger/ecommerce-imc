const serverless = require("serverless-http");
const app = require("../server"); // path to your server.js

module.exports = serverless(app);
