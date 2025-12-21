// server.js
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const path = require("path");

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
 // Connect to MongoDB
const mongoose = require("mongoose");

const connectDB = async () => {
  if (mongoose.connections[0].readyState) return; // Use existing connection in serverless
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("Connection failed:", err);
    throw err;
  }
};
connectDB();


const app = express();

// --------------------
// Middleware
// --------------------
app.use(express.json());

// --------------------
// CORS Configuration
// --------------------

const cors = require("cors");

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://imc-frontend-mu.vercel.app",
    "https://imc-frontend-afgzejyb2-rashi-sangers-projects.vercel.app",
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true
}));


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
