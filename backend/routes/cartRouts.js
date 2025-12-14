const express = require("express");
const Cart = require("../models/cart");
const Product = require("../models/Product");

const router = express.Router();

// Helper function
const getCart = async (userId, guestId) => {
  if (userId) return await Cart.findOne({ user: userId });
  if (guestId) return await Cart.findOne({ guestId });
  return null;
};

// @route POST /api/cart
// @desc Add product to cart
// @access Public
router.post("/", async (req, res) => {
  const { productId, quantity, guestId, userId } = req.body;

  try {
    if (!quantity || quantity < 1) {
      return res.status(400).json({ message: "Invalid quantity" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let cart = await getCart(userId, guestId);

    const cartItem = {
      productId,
      name: product.name,
      image: product.images?.[0]?.url || "",
      price: product.price,
      quantity,
    };

    if (cart) {
      const index = cart.products.findIndex(
        (p) => p.productId.toString() === productId
      );

      if (index > -1) {
        cart.products[index].quantity += quantity;
      } else {
        cart.products.push(cartItem);
      }

      cart.totalPrice = cart.products.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      await cart.save();
      return res.json(cart);
    }

    const newCart = await Cart.create({
      user: userId || undefined,
      guestId: guestId || undefined,
      products: [cartItem],
      totalPrice: product.price * quantity,
    });

    res.status(201).json(newCart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// @route PUT /api/cart
// @desc Update quantity / remove product
// @access Public
router.put("/", async (req, res) => {
  const { productId, quantity, guestId, userId } = req.body;

  try {
    let cart = await getCart(userId, guestId);
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const index = cart.products.findIndex(
      (p) => p.productId.toString() === productId
    );

    if (index === -1) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    // update quamtity
    const qty = Number(quantity);

    if (qty > 0) {
    cart.products[index].quantity = qty;
    } else {
    cart.products.splice(index, 1);
    }

    cart.totalPrice = cart.products.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    await cart.save();
    res.json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// @route DELETE /api/cart
// @desc remove a product from the cart
// @access Public
router.delete("/", async (req, res) => {
    const {productId, guestId, userId} = req.body;
    try{
        let cart = await getCart(userId, guestId);

        if(!cart) {
            return res.status(404).json({message: "cart not found"});
        }

        const productIndex = cart.products.findIndex(
            (p) => p.productId.toString() === productId
        );

        if(productIndex > -1){
            cart.products.splice(productIndex, 1);

            cart.totalPrice = cart.products.reduce(
                (acc, item) => acc+item.price * item.quantity, 0
            );
            await cart.save();
            return res.status(200).json(cart);
        }else{
            return res.status(404).json({message: "Product not found in the cart"});
        }
    } catch(error){
        console.error(error);
        return res.status(500).json({message: "Server Error"});
    }
});

// @route GET /api/cart
// @desc Get logged-in users or guest users cart
//  @access Public
router.get("/", async (req, res) => {
    const {userId, guestId} = req.query;

    try {
        const cart = await getCart(userId, guestId);
        if(cart){
            res.json(cart);
        } else {
            res.status(404).json({message: "Cart not found"});
        }
    } catch(error) {
        console.error(error);
        return res.status(500).json({message: "Server Error"});
    }
});

// @route POST /api/cart/merge
//  @desc Merge guest cart into user cart on login
//  @access Private
router.post("/merge", async (req, res) => {
    const {guestId} = req.body;

    try {
        // Find the guest cart and user cart
        const guestCart = await Cart.findOne({guestId});
        const userCart = await Cart.findOne({user: req.user._id});

        if(guestCart) {
            if(guestCat.products.length === 0) {
                return res.status(400).json({message: "Guest cart is empty"});

                if(userCart) {
                    // Merge guest cart into user cart
                    guestCart.products.forEach((guestItem) => {
                        const productIndex = userCart.products.findIndex((item) => item.productId.toString() === guestItem.productId.toString()
                    );

                    if(productIndex > -1) {
                        // If item exists in cart, update quantity
                        userCart.products[productIndex].quantity+=guestItem.quantity;
                    }else{
                        // Otherwise, add the guest item to the cart
                        userCart.products.push(guestItem);
                    }
                    });

                    userCart.totalPrice = userCart.products.reduce(
                        (acc, item) => acc + item.price * item.quantity, 0
                    );
                    await userCart.save();

                    // Remove the guest cart after merging
                    try {
                        await Cart.findOneAndDelete({guestId});
                    } catch(error){
                        console.error("Error deleting uest cart: ", error);
                    }
                }else{
                    // If the user has no existing cart, assign the guest cart to the user
                    guestCart.user = req.user._id;
                    guestCart.guestId = undefined;

                    await guestId.save();

                    res.status(200).json(guestCart);
                }
            }
        } else {
            if(userCart){
                // Guest cart has already been merged, return user cart
                return res.status(200).json(userCart);
            }
            res.status(404).json({message: "Guest cart bot found"});
        }
    } catch(error) {
        console.error(error);
        res.status(500).json({message: "Server Error"})
    }
})

module.exports = router;
