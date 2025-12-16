// uploadAndMapImages.js
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const path = require("path");
require("dotenv").config();

// Load existing products
const products = require("./data/products");

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Folder containing images named as SKU
const folderPath = path.join(__dirname, "images");

// Upload images and map to products
fs.readdir(folderPath, async (err, files) => {
  if (err) return console.error("Error reading folder:", err);

  for (const file of files) {
    const sku = path.parse(file).name; // Filename without extension
    const product = products.find(p => p.sku === sku);
    if (!product) {
      console.log(`No product found for SKU: ${sku}`);
      continue;
    }

    try {
      const result = await cloudinary.uploader.upload(path.join(folderPath, file), {
        folder: "products",
        public_id: sku,
      });
      // Update product image URL
      product.images = [{ url: result.secure_url, altText: product.name }];
      console.log(`Updated ${sku} → ${result.secure_url}`);
    } catch (uploadErr) {
      console.error(`Upload failed for ${sku}:`, uploadErr);
    }
  }

  // Save updated products back to file
  fs.writeFileSync(path.join(__dirname, "products-updated.js"),
    "const products = " + JSON.stringify(products, null, 2) + ";\n\nmodule.exports = products;\n"
  );
  console.log("All products updated and saved to products-updated.js");
});
