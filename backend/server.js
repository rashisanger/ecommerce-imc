const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const path = require("path");
const cors = require("cors");

// Routes
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

// Middleware
app.use(express.json());

// CORS
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://imc-frontend-mu.vercel.app",
      "https://imc-frontend-afgzejyb2-rashi-sangers-projects.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

// Serve images
app.use("/images", express.static(path.join(__dirname, "images")));

// Test route
app.get("/", (req, res) => res.send("Backend is running!"));

// API Routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRouts);
app.use("/api/checkout", CheckoutRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api", subscribeRoute);

app.use("/api/admin/users", adminRoutes);
app.use("/api/admin/products", productAdminRoutes);
app.use("/api/admin/orders", adminOrderRoutes);

// Connect DB once
(async () => {
  try {
    await connectDB();
    console.log("DB ready");
  } catch (err) {
    console.error("DB connection failed", err);
  }
})();

module.exports = app;
