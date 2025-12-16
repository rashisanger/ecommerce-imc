const express=require("express");
const User=require("../models/user");
const jwt=require("jsonwebtoken");
const {protect}=require("../middleware/authMiddleware")

const router=express.Router();
//@route POST /api/user/register
//@desc register a new user
//@access Public
router.post("/register",async (req,res)=>{
    const {name,email,password}=req.body;
    try{
        let user=await User.findOne({email});
        if(user) return res.status(400).json({message:"user already exists"});
        user=new User({name,email,password});
        await user.save();
        //JWT payload
        const payload={user:{id:user._id,role:user.role}};
        //sign and return the token along with user data
        jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:"1h"},(err,token)=>{
            if(err) throw err;
            res.status(201).json({
                user:{
                    _id:user._id,
                    name:user.name,
                    email:user.email,
                    role:user.role,
                },
                token,
            })
        })

    }catch(error){
        console.log(error);
        res.status(500).send("server error");
    }
});
//@ route POST /api/users/login
//authenticate user
//@acess public
router.post('/login',async (req,res)=>{
    const {email,password}=req.body;
    try{
        //find the user by email
        let user=await User.findOne({email});
        if(!user) return res.status(400).json({message:"Invalid credentials"});
        const isMatch=await user.matchPassword(password);
        if(!isMatch) return res.status(400).json({message:"Invalid credentials"});

        const payload={user:{id:user._id,role:user.role}};
        //sign and return the token along with user data
        jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:"1h"},(err,token)=>{
            if(err) throw err;
            res.json({
                user:{
                    _id:user._id,
                    name:user.name,
                    email:user.email,
                    role:user.role,
                },
                token,
            })
        })
    }catch(error){
        console.error(error);
        res.status(500).send("server error");
    }
})

//@route GET /api/products
//@desc Get all products with filters
//@access Public
router.get("/", async (req, res) => {
  try {
    const {
      category,
      minPrice,
      maxPrice,
      sortBy,
      search,
    } = req.query;

    let query = {};

    // 🔹 Category filter
    if (category) {
      query.category = category;
    }

    // 🔹 Price filter
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    // 🔹 Search by name
    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    // 🔹 Sorting
    let sortOption = {};
    if (sortBy === "priceLow") sortOption.price = 1;
    if (sortBy === "priceHigh") sortOption.price = -1;
    if (sortBy === "nameAZ") sortOption.name = 1;
    if (sortBy === "nameZA") sortOption.name = -1;

    const products = await Product.find(query).sort(sortOption);

    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports=router;