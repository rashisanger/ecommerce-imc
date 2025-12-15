const express = require("express")
const router = express.Router();
const Subscriber = require("../models/Subscriber");

// @route POST /api/subscriber
// @desc Handle newsletter subscription
// @access Public
router.post("/subscribe", async(req, res) => {
    const {email} = req.body;

    if(!email) {
        return res.status(400).json({message: "Email is required"});
    }

    try{
        // Check if the email is already subscribed
        let subscriber = await Subscriber.findOne({ email });
    
        // Create new subscriber
        subscriber = new Subscriber({email});
        await subscriber.save();

        res
        .status(201)
        .json({message: "Successfully subscribed to the newsletter!"});
    }catch(error){
        console.error(error);
        res.status(500).json({message: "Server Error"});
    }
});

module.exports = router;