import { useState } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function AddProduct() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [unit, setUnit] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await api.post("/products", { name, category, unit });

      // ✅ Redirect to inventory after successful add
      navigate("/shopkeeper/inventory");
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to add product. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-lg bg-white rounded-2xl shadow-sm border border-gray-100 p-8"
      >
        <h1 className="text-2xl font-semibold text-gray-900">
          Add New Product
        </h1>
        <p className="mt-1 text-sm text-gray-600">
          Create a product before adding batches or stock.
        </p>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          {/* PRODUCT NAME */}
          <div>
            <label className="block text-sm text-gray-700 mb-1">
              Product Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Paracetamol"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-200 focus:outline-none"
            />
          </div>

          {/* CATEGORY */}
          <div>
            <label className="block text-sm text-gray-700 mb-1">Category</label>
            <input
              type="text"
              required
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Medicine / Grocery"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-200 focus:outline-none"
            />
          </div>

          {/* UNIT */}
          <div>
            <label className="block text-sm text-gray-700 mb-1">Unit</label>
            <input
              type="text"
              required
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              placeholder="Kg / Strip / Litre"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-200 focus:outline-none"
            />
          </div>

          {/* ERROR */}
          {error && <p className="text-sm text-red-600 text-center">{error}</p>}

          {/* ACTIONS */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 rounded-lg bg-emerald-600 text-white font-medium hover:bg-emerald-700 transition disabled:opacity-60"
            >
              {loading ? "Saving..." : "Add Product"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
