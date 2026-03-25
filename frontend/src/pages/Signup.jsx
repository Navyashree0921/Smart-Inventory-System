import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const fade = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function Signup() {
  const navigate = useNavigate();

  // STATE
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  // SUBMIT HANDLER
  const handleSubmit = async (e) => {
    e.preventDefault(); // 🔥 VERY IMPORTANT

    try {
      await axios.post("http://localhost:4000/api/auth/signup", {
        name,
        email,
        password,
        role,
      });

      alert("Signup successful!");
      navigate("/login");
    } catch (error) {
      console.error("Signup error:", error);
      alert("Signup failed");
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
        <h1 className="text-2xl font-semibold text-gray-900">
          Create your account
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          Join a community working to reduce waste and support those in need.
        </p>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          {/* NAME */}
          <div>
            <label className="block text-sm text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-200 focus:outline-none"
              required
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="block text-sm text-gray-700 mb-1">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-200 focus:outline-none"
              required
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="block text-sm text-gray-700 mb-1">Password</label>
            <input
              type="password"
              placeholder="Create a secure password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-200 focus:outline-none"
              required
            />
          </div>

          {/* ROLE */}
          <div>
            <label className="block text-sm text-gray-700 mb-1">
              I am joining as
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-emerald-200 focus:outline-none"
              required
            >
              <option value="">Select your role</option>
              <option value="Shopkeeper">Shopkeeper</option>
              <option value="NGO">NGO</option>
              <option value="Admin">Administrator</option>
            </select>
          </div>

          {/* SUBMIT BUTTON */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full mt-6 py-3 rounded-lg bg-emerald-600 text-white font-medium hover:bg-emerald-700 transition"
          >
            Create account
          </motion.button>
        </form>

        {/* FOOTER */}
        <div className="mt-6 text-sm text-center text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-emerald-600 font-medium hover:underline"
          >
            Sign in
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
