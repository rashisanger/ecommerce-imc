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
        if(!isMatch) res.status(400).json({message:"Invalid credentials"});

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

//@route GET /api/users/profile
//@desc get looged in user profile {protected route}
//@access private
router.get("/profile",protect,async (req,res)=>{
    res.json(req.user);

})
module.exports=router;