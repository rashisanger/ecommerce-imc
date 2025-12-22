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
app.use(cors({
  origin: process.env.FRONTEND_URL || "*", // Set your frontend deployed URL here
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
}));

// Static files
app.use("/images", express.static(path.join(__dirname, "images")));

// Test route
app.get("/", (req, res) => res.send("Backend is running!"));

// Debug route to check DB connection
app.get("/debug/db", async (req, res) => {
  try {
    await connectDB();
    res.json({ mongooseState: require("mongoose").connection.readyState });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Routes
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

// Start server with DB connection
const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error("❌ Failed to connect to DB:", err.message);
  });

module.exports = app;
