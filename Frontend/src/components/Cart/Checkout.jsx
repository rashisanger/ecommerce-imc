import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const CartProducts = [
        {
            productId: 1,
            name: "T-shirt",
            size: "M",
            color: "Red",
            quantity: 1,
            price: 150,
            image: "https://picsum.photos/200?random=1"
        },
        {
            productId: 2,
            name: "Jean",
            size: "M",
            color: "White",
            quantity: 1,
            price: 350,
            image: "https://picsum.photos/200?random=2"
        },
    ];
const Checkout = () => {
    const [checkoutId,setCheckoutId]=useState(null);
    const navigate=useNavigate();
    const [shippingAddress,setShippingAddress]=useState({
        firstName:"",
        lastName:"",
        address:"",
        city:"",
        pincode:"",
        country:"",
        phone:"",
    });
    const handelcreateCheckout=(e)=>{
        e.preventDefault();
        setCheckoutId(123);
    }
    const handleRazorpay = () => {
    const totalAmount = CartProducts.reduce((sum, item) => {
        return sum + item.price * item.quantity;
    }, 0);

    const options = {
        key: "rzp_test_RpumuNI5z3nB20",  // Replace with your Razorpay Test Key
        amount: totalAmount * 100,  // Amount in paise
        currency: "INR",
        name: "Your Store Name",
        description: "Order Payment",
        image: "https://your-logo-url.com/logo.png",
        handler: function (response) {
            alert("Payment Successful! Payment ID: " + response.razorpay_payment_id);
        },
        prefill: {
            name: shippingAddress.firstName + " " + shippingAddress.lastName,
            email: "user@example.com",
            contact: shippingAddress.phone,
        },
        theme: {
            color: "#000000",
        },
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.open();
};


  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto py-10 px-6 tracking-tighter'>
        {/* Left Section */}
        <div className='bg-white rounded-lg p-6'>
            <h2 className="text-2xl uppercase mb-6 font-semibold">Checkout</h2>
            
            <form action="" onSubmit={handelcreateCheckout}>
                <h3 className='text-l mb-4'>Contact Details</h3>
                <div className='mb-4'>
                    <label htmlFor="" className='block text-gray-700'>Email</label>
                    <input type="email" value="user@example.com" className='w-full p-2 border rounded' disabled/>
                </div>
                <h3 className='text-lg mb-4'>Delivery</h3>
                <div className='mb-4 grid grid-cols-2 gap-4'>
                    <div>
                        <label className='block text-gray-700'>First Name</label>
                        <input 
                            type="text"
                            className='w-full p-2 border rounded' 
                            required   
                            value={shippingAddress.firstName}
                            onChange={(e)=>{setShippingAddress({...shippingAddress,firstName:e.target.value})}}/>
                    </div>
                    <div>
                        <label className='block text-gray-700'>Last Name</label>
                        <input 
                            type="text"
                            className='w-full p-2 border rounded' 
                            required   
                            value={shippingAddress.lastName}
                            onChange={(e)=>{setShippingAddress({...shippingAddress,lastName:e.target.value})}}/>
                    </div>
                </div>
                <div className='mb-4'>
                    <label htmlFor="" className='block text-gray-700'>Address</label>
                    <input type="text" value={shippingAddress.address}
                    onChange={(e)=>setShippingAddress({...shippingAddress,address:e.target.value})}
                    className='p-2 border rounded w-full' required/>
                </div>
                <div className='mb-4 grid grid-cols-2 gap-4'>
                    <div>
                        <label className='block text-gray-700'>City</label>
                        <input 
                            type="text"
                            className='w-full p-2 border rounded' 
                            required   
                            value={shippingAddress.city}
                            onChange={(e)=>{setShippingAddress({...shippingAddress,city:e.target.value})}}/>
                    </div>
                    <div>
                        <label className='block text-gray-700'>PinCode</label>
                        <input 
                            type="text"
                            className='w-full p-2 border rounded' 
                            required   
                            value={shippingAddress.pincode}
                            onChange={(e)=>{setShippingAddress({...shippingAddress,pincode:e.target.value})}}/>
                    </div>
                </div>
                <div className='mb-4'>
                    <label htmlFor="" className='block text-gray-700'>Country</label>
                    <input type="text" value={shippingAddress.country}
                    onChange={(e)=>setShippingAddress({...shippingAddress,country:e.target.value})}
                    className='p-2 border rounded w-full' required/>
                </div>
                <div className='mb-4'>
                    <label htmlFor="" className='block text-gray-700'>Phone Number</label>
                    <input type="text" value={shippingAddress.phone}
                    onChange={(e)=>setShippingAddress({...shippingAddress,phone:e.target.value})}
                    className='p-2 border rounded w-full' required/>
                </div>
                <div className='mt-6 '>
                    {!checkoutId ?(
                        <button type="submit" className="w-full bg-black text-white py-3 rounded">Continue To Payment</button>
                    ):(
                        <div>
                            <h3 className='text-lg mb-4'>Pay With RazorPay</h3>
                            <button 
                                type="button" 
                                onClick={handleRazorpay}
                                className="w-full bg-blue-600 text-white py-3 rounded"
                            >
                                Pay ₹{CartProducts.reduce((s,i)=>s + i.price*i.quantity,0)}
                            </button>
                            </div>
                    )}
                </div>
            </form>
            
        </div>
        <div className="bg-gray-50 p-6 rounded-lg shadow-sm h-fit">
            <h3 className="text-lg mb-4 font-semibold">Order Summary</h3>

            <div className="border-t mb-4 py-4">
                {CartProducts.map((product, index) => (
                <div
                    key={index}
                    className="flex items-start justify-between py-3 border-b last:border-none"
                >
                    {/* Left: Image */}
                    <img
                    src={product.image}
                    alt={product.name}
                    className="w-20 h-20 object-cover rounded-md"
                    />

                    {/* Right: Text */}
                    <div className="flex-1 px-4">
                    <h4 className="text-md font-medium">{product.name}</h4>
                    <p className="text-gray-500 text-sm">Price: ₹{product.price}</p>
                    <p className="text-gray-500 text-sm">Quantity: {product.quantity}</p>
                    </div>

                    {/* Per item total */}
                    <p className="font-semibold">
                    ₹{product.price * product.quantity}
                    </p>
                </div>
                ))}

                <div className='flex justify-between items-center text-lg mt-4 pt-4'>
                    <p>Total</p>
                    <p>₹{CartProducts.reduce(
                            (acc, item) => acc + item.price * item.quantity,0).toLocaleString()}
                    </p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Checkout