import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { clearCart } from "../../redux/slices/cartSlice";
import {
  createCheckout,
  payCheckout,
  finalizeCheckout,
  resetCheckout,
} from "../../redux/slices/checkoutSlice";

// helper function
const loadRazorpay = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  /* ---------------- REDUX STATE ---------------- */
  const cart = useSelector((state) => state.cart); // ✅ IMPORTANT FIX
  const { checkout, loading } = useSelector((state) => state.checkout);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
        navigate("/login?redirect=checkout");
    }
    }, [user, navigate]);

  /* ---------------- LOCAL STATE ---------------- */
  const [shippingAddress, setShippingAddress] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    pincode: "",
    country: "",
    phone: "",
  });

  /* ---------------- CALCULATIONS ---------------- */
  const totalPrice =
    cart.products?.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    ) || 0;

  /* ---------------- CREATE CHECKOUT ---------------- */
  const handleCreateCheckout = (e) => {
    e.preventDefault();

    if (!cart.products || cart.products.length === 0) {
      alert("Cart is empty");
      return;
    }

    const checkoutData = {
      checkoutItems: cart.products.map((item) => ({
        productId: item.productId,
        name: item.name,
        image: item.image,
        price: item.price,
        quantity: item.quantity,
      })),
      shippingAddress: {
        address: shippingAddress.address,
        city: shippingAddress.city,
        pincode: shippingAddress.pincode,
        country: shippingAddress.country,
      },
      paymentMethod: "Razorpay",
      totalPrice,
    };

    dispatch(createCheckout(checkoutData));
  };

  /* ---------------- RAZORPAY PAYMENT ---------------- */
  const handleRazorpay = async () => {
    if (!checkout?._id) {
      alert("Checkout not created");
      return;
    }

    const razorpayLoaded = await loadRazorpay();

    if (!razorpayLoaded) {
      alert("Razorpay SDK failed to load");
      return;
    }

    const options = {
      key: "rzp_test_RpumuNI5z3nB20", // same key you were using
      amount: checkout.totalPrice * 100,
      currency: "INR",
      name: "IMC Store",
      description: "Order Payment",
      handler: async function (response) {
        try {
          await dispatch(
            payCheckout({
              checkoutId: checkout._id,
              paymentDetails: response,
              paymentStatus: "Paid",
            })
          ).unwrap();

          await dispatch(finalizeCheckout(checkout._id)).unwrap();

          // ✅ CLEAR CART & CHECKOUT STATE
          dispatch(clearCart());
          dispatch(resetCheckout());
          navigate("/profile");

        } catch (err) {
          alert("Payment succeeded but order failed");
        }
      },
      prefill: {
        name: `${shippingAddress.firstName} ${shippingAddress.lastName}`,
        email: user?.email || "user@example.com",
        contact: shippingAddress.phone,
      },
      theme: {
        color: "#000000",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  /* ---------------- UI ---------------- */
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto py-10 px-6 tracking-tighter mt-20">

      {/* LEFT: FORM */}
      <div className="bg-white rounded-lg p-6">
        <h2 className="text-2xl uppercase mb-6 font-semibold">Checkout</h2>

        <form onSubmit={handleCreateCheckout}>
          <h3 className="text-lg mb-4">Delivery</h3>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <input
              placeholder="First Name"
              className="p-2 border rounded"
              required
              value={shippingAddress.firstName}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  firstName: e.target.value,
                })
              }
            />
            <input
              placeholder="Last Name"
              className="p-2 border rounded"
              required
              value={shippingAddress.lastName}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  lastName: e.target.value,
                })
              }
            />
          </div>

          <input
            placeholder="Address"
            className="p-2 border rounded w-full mb-4"
            required
            value={shippingAddress.address}
            onChange={(e) =>
              setShippingAddress({
                ...shippingAddress,
                address: e.target.value,
              })
            }
          />

          <div className="grid grid-cols-2 gap-4 mb-4">
            <input
              placeholder="City"
              className="p-2 border rounded"
              required
              value={shippingAddress.city}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  city: e.target.value,
                })
              }
            />
            <input
              placeholder="Pincode"
              className="p-2 border rounded"
              required
              value={shippingAddress.pincode}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  pincode: e.target.value,
                })
              }
            />
          </div>

          <input
            placeholder="Country"
            className="p-2 border rounded w-full mb-4"
            required
            value={shippingAddress.country}
            onChange={(e) =>
              setShippingAddress({
                ...shippingAddress,
                country: e.target.value,
              })
            }
          />

          <input
            placeholder="Phone"
            className="p-2 border rounded w-full mb-6"
            required
            value={shippingAddress.phone}
            onChange={(e) =>
              setShippingAddress({
                ...shippingAddress,
                phone: e.target.value,
              })
            }
          />

          {!checkout ? (
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white py-3 rounded"
            >
              {loading ? "Creating Checkout..." : "Continue To Payment"}
            </button>
          ) : (
            <button
              type="button"
              onClick={handleRazorpay}
              className="w-full bg-blue-600 text-white py-3 rounded"
            >
              Pay ₹{checkout.totalPrice}
            </button>
          )}
        </form>
      </div>

      {/* RIGHT: ORDER SUMMARY (UNCHANGED) */}
      <div className="bg-gray-50 p-6 rounded-lg shadow-sm h-fit">
        <h3 className="text-lg mb-4 font-semibold">Order Summary</h3>

        <div className="border-t mb-4 py-4">
          {cart.products.map((product) => (
            <div
              key={product.productId}
              className="flex items-start justify-between py-3 border-b last:border-none"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-20 h-20 object-cover rounded-md"
              />

              <div className="flex-1 px-4">
                <h4 className="text-md font-medium">{product.name}</h4>
                <p className="text-gray-500 text-sm">
                  Price: ₹{product.price}
                </p>
                <p className="text-gray-500 text-sm">
                  Quantity: {product.quantity}
                </p>
              </div>

              <p className="font-semibold">
                ₹{product.price * product.quantity}
              </p>
            </div>
          ))}

          <div className="flex justify-between items-center text-lg mt-4 pt-4">
            <p>Total</p>
            <p>₹{totalPrice.toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
