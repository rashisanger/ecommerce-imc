import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import MyOrdersPage from "./MyOrdersPage";
import { logout } from "../redux/slices/authSlice";
import { clearCart } from "../redux/slices/cartSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCart());
    navigate("/login");
  };

  // ✅ NOT LOGGED IN CASE
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white shadow-lg rounded-lg p-8 text-center max-w-md w-full">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            You are not logged in
          </h2>
          <button
            onClick={() => navigate("/login")}
            className="w-full bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition mb-3"
          >
            Go to Login
          </button>
          <button
            onClick={() => navigate("/")}
            className="text-sm text-gray-600 hover:text-black transition"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    );
  }

  // ✅ LOGGED IN CASE
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="container mx-auto p-6">
        <div className="flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0">

          {/* Left Section */}
          <div className="w-full md:w-1/3 lg:w-1/4 bg-white shadow-lg rounded-lg p-6">
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center text-2xl font-bold text-gray-600 mb-4">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <h1 className="text-2xl md:text-3xl font-bold mb-1 text-gray-800">
                {user.name}
              </h1>
              <p className="text-gray-600 mb-6">{user.email}</p>

              <button
                onClick={handleLogout}
                className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition font-semibold"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Right Section */}
          <div className="w-full md:w-2/3 lg:w-3/4 bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              My Orders
            </h2>
            <MyOrdersPage />
          </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;