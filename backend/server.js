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
const checkoutRoutes = require("./routes/checkoutRoutes");
const orderRoutes = require("./routes/orderRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const subscribeRoute = require("./routes/subscribeRoute");
const adminRoutes = require("./routes/adminRoutes");
const productAdminRoutes = require("./routes/productAdminRoutes");
const adminOrderRoutes = require("./routes/adminOrderRoutes");

dotenv.config();
connectDB();

const app = express();

/* -------------------- */
/* Middleware           */
/* -------------------- */
app.use(express.json());

/* -------------------- */
/* ✅ CORS (FIXED)       */
/* -------------------- */
app.use(
  cors({
    origin: true, // ✅ allow all origins (important for Vercel previews)
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Handle preflight explicitly
app.options("*", cors());

/* -------------------- */
/* Serve Images         */
/* -------------------- */
app.use("/images", express.static(path.join(__dirname, "images")));

/* -------------------- */
/* Test Route           */
/* -------------------- */
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

/* -------------------- */
/* API Routes           */
/* -------------------- */
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRouts);
app.use("/api/checkout", checkoutRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api", subscribeRoute);

// Admin routes
app.use("/api/admin/users", adminRoutes);
app.use("/api/admin/products", productAdminRoutes);
app.use("/api/admin/orders", adminOrderRoutes);

/* -------------------- */
/* Export for Vercel    */
/* -------------------- */
module.exports = app;