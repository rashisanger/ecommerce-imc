const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const path = require("path");

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

// 🔥 CORS — FIXED
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://imc-frontend-seven.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// middleware
app.use(express.json());

// serve images folder
app.use("/images", express.static(path.join(__dirname, "images")));

// DB
connectDB();

// test route
app.get("/", (req, res) => {
  res.send("welcome");
});

// API routes
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


module.exports = app;
