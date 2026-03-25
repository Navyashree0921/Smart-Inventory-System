import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginUser } from "../services/auth";
import { useAuth } from "../context/AuthContext";

const fade = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function Login() {
  // ======================
  // STATE
  // ======================
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("SHOPKEEPER");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  // ======================
  // SUBMIT HANDLER
  // ======================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await loginUser(email, password, role);

      const normalizedRole = data.user?.role?.toUpperCase();
      if (!normalizedRole) {
        throw new Error("Role missing in response");
      }

      // Save user in AuthContext
      login({
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
        role: normalizedRole,
        token: data.token,
      });

      // ✅ ROLE-BASED REDIRECTION (MATCHES App.jsx)
      if (normalizedRole === "SHOPKEEPER") {
        navigate("/shopkeeper");
      } else if (normalizedRole === "STAFF") {
        navigate("/shopkeeper"); // staff shares shopkeeper dashboard
      } else if (normalizedRole === "NGO") {
        navigate("/ngo");
      } else if (normalizedRole === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (err) {
      const message =
        err.response?.data?.message || err.message || "Login failed";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center px-4">
      <motion.div
        variants={fade}
        initial="hidden"
        animate="visible"
        className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-gray-100 p-8"
      >
        <h1 className="text-2xl font-semibold text-gray-900">Welcome back</h1>
        <p className="mt-2 text-sm text-gray-600">
          Sign in to continue.
        </p>

        {/* FORM */}
        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm text-gray-700 mb-1">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-200 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-200 focus:outline-none"
            />
          </div>

          {/* ROLE SELECT */}
          <div>
            <label className="block text-sm text-gray-700 mb-1">
              Continue as
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-emerald-200 focus:outline-none"
            >
              <option value="SHOPKEEPER">Shopkeeper</option>
              <option value="NGO">NGO</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>

          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full mt-6 py-3 rounded-lg bg-emerald-600 text-white font-medium hover:bg-emerald-700 transition disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign in"}
          </motion.button>
        </form>

        {/* ERROR */}
        {error && (
          <p className="mt-4 text-sm text-red-600 text-center">{error}</p>
        )}

        {/* FOOTER */}
        <div className="mt-6 text-sm text-center text-gray-600">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-emerald-600 font-medium hover:underline"
          >
            Create one
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
