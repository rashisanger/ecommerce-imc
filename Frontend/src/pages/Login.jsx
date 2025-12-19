import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Listen to Redux auth state
  const { user, loading, error } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  // Redirect after successful login
  useEffect(() => {
    if (user) {
      navigate("/"); // go to home
    }
  }, [user, navigate]);

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/60 px-4 z-50">
      <div className="bg-gray/10 backdrop-blur-xl shadow-2xl rounded-2xl p-8 w-full max-w-md border border-white/40">
        <h2 className="text-3xl font-semibold text-center text-white mb-8">
          Login to Your Account
        </h2>

        {/* Error message */}
        {error && (
          <p className="mb-4 text-center text-red-400 font-medium">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2 text-white">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-white/30 rounded bg-white/10 text-white"
              placeholder="Enter your email address"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-bold mb-2 text-white">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-white/30 rounded bg-white/10 text-white"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-700 text-white py-3 rounded-lg hover:bg-green-800 transition disabled:opacity-50"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>

          <p className="mt-6 text-center text-white/90">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-green-300 font-medium hover:underline"
            >
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
