const express=require("express");
const cors=require("cors")
const dotenv=require("dotenv");
const connectDB=require('./config/db');
const userRoutes=require("./routes/userRouts");
const productRoutes=require("./routes/productRoutes");
const cartRouts=require("./routes/cartRouts");
const CheckoutRoutes=require("./routes/checkoutRoutes");
const orderRoutes=require("./routes/orderRoutes");
const uploadRoutes=require("./routes/uploadRoutes");
const subscribeRoute=require("./routes/subscribeRoute");
const adminRoutes=require("./routes/adminRoutes");
const productAdminRoutes=require("./routes/productAdminRoutes");
const adminOrderRoutes=require("./routes/adminOrderRoutes");

dotenv.config();
const app=express();
app.use(express.json())
app.use(cors())//to communicate with react server

console.log(process.env.PORT)
const PORT=process.env.PORT || 3000;
//connect to db
connectDB();

app.get("/",(req,res)=>{
    res.send("welcome");
})
//API routes
app.use("/api/users",userRoutes);
app.use("/api/products",productRoutes);
app.use("/api/routes",cartRouts);
app.use("/api/checkout",CheckoutRoutes)
app.use("/api/orders",orderRoutes)
app.use("/api/upload",uploadRoutes)
app.use("/api",subscribeRoute)

// Admin
app.use("/api/admin/users",adminRoutes)
app.use("/api/admin/products",productAdminRoutes)
app.use("/api/admin/orders",adminOrderRoutes)

app.listen(PORT,()=>{
    console.log(`server is running on http://localhost:${PORT}`)
});