const express = require("express")
const Product = require("../models/Product")
const {protect, admin} = require("../middleware/authMiddleware")
const router = express.Router();
//  @route POST /api/products
//  @desc Create a new Product
//  @access Private/Admin
router.post("/", protect, admin, async (req, res)=> {
    try {
        const {name, 
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

        // basic validation
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
            user: req.user._id, //reference to the admin user who created it
        });

        const createProduct = await product.save();
        res.status(201).json(createProduct)

    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error")
    }
});

// @route PUT /api/products/:id
// @desc Update an existing product ID
// @access Private/Admin
router.put("/:id", protect, admin, async (req, res) => {
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

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Update fields safely
    if (name !== undefined) product.name = name;
    if (description !== undefined) product.description = description;
    if (price !== undefined) product.price = price;
    if (discountPrice !== undefined) product.discountPrice = discountPrice;
    if (countInStock !== undefined) product.countInStock = countInStock;
    if (category !== undefined) product.category = category;
    if (brand !== undefined) product.brand = brand;
    if (collections !== undefined) product.collections = collections;
    if (images !== undefined) product.images = images;
    if (tags !== undefined) product.tags = tags;
    if (sku !== undefined) product.sku = sku;

    if (isFeatured !== undefined) product.isFeatured = isFeatured;
    if (isPublished !== undefined) product.isPublished = isPublished;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (error) {
    console.error(error);

    // Handle duplicate SKU
    if (error.code === 11000) {
      return res.status(400).json({ message: "SKU already exists" });
    }

    res.status(500).json({ message: "Server Error" });
  }
});

// @route DELETE /api/products/:id
// @desc Delete a product by ID
// @access Private/admin

router.delete("/:id", protect, admin, async (req, res) => {
    try {
        // Find the product by ID
        const product = await Product.findById(req.params.id);

        if(product) {
            // remove the product from DB
            await product.deleteOne();
            res.json({message: "Product removed"});
        }else{
            res.status(404).json({message: "Product not found"});
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error"); 
    }
});
//@route get /api/products
//@desc get all products with optional query filters
//@acess public
router.get("/",async(req,res)=>{
  try{
      const {collection,brand,minPrice,maxPrice,sortBy,search,category, limit}=req.query;
      let query={};

      // Filter logic
      if (collection && collection.toLowerCase() !== "all") {
        query.collections = { $regex: new RegExp(`^${collection}$`, "i") };
      }

      if (category && category.toLowerCase() !== "all") {
        query.category = { $regex: new RegExp(`^${category}$`, "i") };
      }


      if (brand) {
        query.brand = { $in: brand.split(",").map(b => new RegExp(`^${b}$`, "i")) };
      }

      if(minPrice ||maxPrice) {
        query.price = {};
        if(minPrice) query.price.$gte = Number(minPrice);
        if(maxPrice) query.price.$lte = Number(maxPrice);
      }
      if(search) {
        query.$or = [
          {name: {$regex: search, $options: "i"}},
          {description: {$regex: search, $options: "i"}},
        ]
      }

      // Sort Logic
      let sort = {};
      if(sortBy){
        switch (sortBy) {
          case "priceAsc":
            sort = {price: 1};
            break;
          case "priceDesc":
            sort = {price: -1};
            break;
          case "popularity":
            sort = {rating: -1};
            break;
          default:
            break;
        }
      }
      

      // Fetch products and apply sorting and limit
      let products = await Product.find(query)
        .sort(sort)
        .limit(Number(limit) || 0);
      res.json(products);

  }catch (error){
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// @route GET /api/products/similar/:id
// @desc Retrieve similar products
// @access Public
router.get("/similar/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const similarProducts = await Product.find({
      _id: { $ne: req.params.id },
      category: product.category,
    }).limit(4);

    res.json(similarProducts);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// @route GET /api/products/best-seller
// @desc Retrieve the product with highest rarting
// @access Public
router.get("/best-seller", async (req, res) => {
  try {
    const bestSeller = await Product.findOne().sort({rating: -1});
    if(bestSeller) {
      res.json(bestSeller);
    } else {
      res.status(404).json({message: "No best seller found"});
    }
  } catch(error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// @route GET api/products/new-arrivals
// @desc Retrieve latest * products  - Creation data
// @access Public

router.get("/new-arrivals", async (req, res) => {
  try {
    // Fetch latest 8 products
    const newArrivals = await Product.find().sort({createdAt: -1}).limit(8);
    res.json(newArrivals);
  } catch(error) {
    console.error(error);
    res.status(500).send("Serve Error");
  }
})

// @route GET /api/products/:id
// @desc Get a single product by ID
// @access Public
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});



module.exports = router;