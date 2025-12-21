// server.js
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const path = require("path");
const cors = require("cors");

// Import routes
const userRoutes = require("./routes/userRouts");
const productRoutes = require("./routes/productRoutes");
const cartRouts = require("./routes/cartRouts");
const CheckoutRoutes = require("./routes/checkoutRoutes");
const orderRoutes = require("./routes/orderRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const subscribeRoute = require("./routes/subscribeRoute");
const adminRoutes = require("./routes/adminRoutes");
const productAdminRoutes = require("./routes/productAdminRoutes");
const adminOrderRoutes = require("./routes/adminOrderRoutes");

dotenv.config();

const app = express();

// --------------------
// Middleware
// --------------------
app.use(express.json());

// --------------------
// CORS Configuration
// --------------------
app.use(
  cors({
    origin: [
      "http://localhost:5173", // local dev
      "https://imc-frontend-mu.vercel.app",
      "https://imc-frontend-afgzejyb2-rashi-sangers-projects.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

// --------------------
// Middleware to connect DB per request
// --------------------
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    res.status(500).json({ message: "Database connection failed" });
  }
});

// --------------------
// Serve Images
// --------------------
app.use("/images", express.static(path.join(__dirname, "images")));

// --------------------
// Test Route
// --------------------
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// --------------------
// API Routes
// --------------------
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRouts);
app.use("/api/checkout", CheckoutRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api", subscribeRoute);

// Admin routes
app.use("/api/admin/users", adminRoutes);
app.use("/api/admin/products", productAdminRoutes);
app.use("/api/admin/orders", adminOrderRoutes);

// --------------------
// Export App for Vercel
// --------------------
module.exports = app;
