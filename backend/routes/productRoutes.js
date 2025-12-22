const express = require("express");
const Product = require("../models/Product");
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

/* ======================================================
   CREATE PRODUCT (ADMIN)
====================================================== */
router.post("/", protect, admin, async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      discountPrice,
      countInStock,
      category,
      brand,
      collections,
      images,
      isFeatured,
      isPublished,
      tags,
      sku,
    } = req.body;

    if (!name || !description || !price || !category || !sku) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const product = new Product({
      name,
      description,
      price,
      discountPrice,
      countInStock,
      category,
      brand,
      collections,
      images,
      isFeatured,
      isPublished,
      tags,
      sku,
      user: req.user._id,
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    console.error("Create product error:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

/* ======================================================
   UPDATE PRODUCT (ADMIN)
====================================================== */
router.put("/:id", protect, admin, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    Object.keys(req.body).forEach(key => {
      if (req.body[key] !== undefined) product[key] = req.body[key];
    });

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (error) {
    console.error("Update product error:", error);
    if (error.code === 11000) return res.status(400).json({ message: "SKU already exists" });
    res.status(500).json({ message: "Server Error" });
  }
});

/* ======================================================
   DELETE PRODUCT (ADMIN)
====================================================== */
router.delete("/:id", protect, admin, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    await product.deleteOne();
    res.json({ message: "Product removed" });
  } catch (error) {
    console.error("Delete product error:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

/* ======================================================
   GET ALL PRODUCTS WITH FILTERS
====================================================== */
router.get("/", async (req, res) => {
  try {
    const { collection, brand, minPrice, maxPrice, sortBy, search, category, limit, bestSeller } = req.query;
    let query = {};

    if (collection && collection.toLowerCase() !== "all") query.collections = new RegExp(`^${collection}$`, "i");
    if (category && category.toLowerCase() !== "all") query.category = new RegExp(`^${category}$`, "i");
    if (brand) query.brand = { $in: brand.split(",").map(b => new RegExp(`^${b}$`, "i")) };

    const min = minPrice ? Number(minPrice) : 0;
    const max = maxPrice ? Number(maxPrice) : Number.MAX_SAFE_INTEGER;
    if (min || maxPrice) query.price = { $gte: min, $lte: max };

    if (search && search.length <= 50) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    if (bestSeller === "true") query.isFeatured = true;

    let sort = {};
    switch (sortBy) {
      case "priceAsc": sort = { price: 1 }; break;
      case "priceDesc": sort = { price: -1 }; break;
      case "nameAsc": sort = { name: 1 }; break;
      case "nameDesc": sort = { name: -1 }; break;
      case "popularity": sort = { isFeatured: -1 }; break;
    }

    const lim = limit ? Math.min(Number(limit), 50) : 20;
    const products = await Product.find(query).sort(sort).limit(lim);
    res.json(products);
  } catch (error) {
    console.error("Fetch products error:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

/* ======================================================
   GET SINGLE PRODUCT
====================================================== */
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    console.error("Single product error:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

/* ======================================================
   GET SIMILAR PRODUCTS
====================================================== */
router.get("/similar/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const similarProducts = await Product.find({
      _id: { $ne: product._id },
      category: product.category,
    }).limit(4);

    res.json(similarProducts);
  } catch (error) {
    console.error("Similar products error:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

/* ======================================================
   GET NEW ARRIVALS
====================================================== */
router.get("/new-arrivals", async (req, res) => {
  try {
    const newArrivals = await Product.find().sort({ createdAt: -1 }).limit(8);
    res.json(newArrivals);
  } catch (error) {
    console.error("New arrivals error:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
