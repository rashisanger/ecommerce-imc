const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/Product");
const User = require("./models/user");
const Cart = require("./models/cart");
const products = require("./data/products-updated");

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    // Clear existing products only
    await Product.deleteMany();

    // Remove existing admin (optional but clean)
    await User.deleteMany({ role: "admin" });
    await Cart.deleteMany();

    // Create admin user
    const createdUser = await User.create({
      name: "Admin User",
      email: "admin@example.com",
      password: "123456789", // should be hashed via schema middleware
      role: "admin",
    });

    // Assign the default user ID to each product
    const userID = createdUser._id;

    const sampleProducts = products.map((product) => ({
      ...product,
      user: userID,
    }));

    // Insert the products into the database 
    await Product.insertMany(sampleProducts);

    console.log("Product data seeded successfully");
    process.exit();
  } catch (error) {
    console.error("Error seeding data:", error);
    process.exit(1);
  }
};

seedData();
