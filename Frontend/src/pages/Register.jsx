import { useState } from "react";
import { Link } from "react-router-dom";
import { registerUser } from "../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser({ name, email, password }));
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/60 px-4 z-50">
      <div className="bg-gray/10 backdrop-blur-xl shadow-2xl rounded-2xl p-8 w-full max-w-md border border-white/40">
        <h2 className="text-3xl font-semibold text-center text-white mb-8">
          Create Your Account
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2 text-white">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border border-white/30 rounded bg-white/10 text-white"
              placeholder="Enter your name"
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2 text-white">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-white/30 rounded bg-white/10 text-white"
              placeholder="Enter your email"
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2 text-white">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-white/30 rounded bg-white/10 text-white"
              placeholder="Enter your password"
            />
          </div>

          {/* ERROR MESSAGE */}
          {error && (
            <div className="mb-4 text-red-400 text-sm text-center">
              {error.toLowerCase().includes("exists")
                ? "This email is already registered. Please login instead."
                : error}
            </div>
          )}


          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg transition ${
              loading
                ? "bg-green-400 cursor-not-allowed"
                : "bg-green-700 hover:bg-green-800"
            } text-white`}
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>

          <p className="mt-6 text-center text-white/90">
            Already have an account?{" "}
            <Link to="/login" className="text-green-300 font-medium hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
