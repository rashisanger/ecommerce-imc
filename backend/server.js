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

let cachedDB = null;

async function connectDBOnce() {
  if (cachedDB) return cachedDB; // reuse existing connection
  const db = await connectDB();   // your existing connectDB function
  cachedDB = db;
  return db;
}
 // Connect to MongoDB
(async () => {
  try {
    await connectDB();
    console.log("DB ready");
  } catch (err) {
    console.error("DB not connected, app still running");
  }
})();


const app = express();

// --------------------
// Middleware
// --------------------
app.use(express.json());

// --------------------
// CORS Configuration
// --------------------

const cors = require("cors");

const corsOptions = {
  origin: true, // allow requests from any origin
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
};

app.use(cors(corsOptions));


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
