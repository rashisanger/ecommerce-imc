const express = require("express");
const Order = require("../models/order");
const {protect, admin} = require("../middleware/authMiddleware");

const router = express.Router();

// @route GET /api/admin/ordes
// @desc Get all order (Admin only)
// @access Private/Admin
router.get("/", protect, admin, async(req, res) => {
    try{
        const orders = await Order.find({}).populate("user", "name email");
        res.json(orders);
    }catch(error){
        console.error(error);
        res.status(500).json({message: "Server Error"});
    }
});

// @route PUT /api/admin/ordes/:id
// @desc Update order status
// @access Private/Admin
router.put("/:id", protect, admin, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email"
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    const { status } = req.body;

    if (status) {
      order.status = status;

      if (status === "Delivered") {
        order.isDelivered = true;
        order.deliveredAt = Date.now(); //  FIXED
      }
    }

    const updatedOrder = await order.save();

    res.json(updatedOrder); //  FIXED
  } catch (error) {
    console.error("Update order error:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// @route DELETE /api/admin/order/:id
// @desc Delete an order
// @access Private/Admin
router.delete("/:id", protect, admin, async(req, res) => {
    try{
        const order = await Order.findById(req.params.id);
        if(order){
            await order.deleteOne();
            res.json({message: "Order removed"});
        }else{
            res.status(404).json({message: "Order not found"});
        }
    }catch(error){
        console.error(error);
        res.status(500).json({message: "Server Error"});
    }
})
module.exports = router;