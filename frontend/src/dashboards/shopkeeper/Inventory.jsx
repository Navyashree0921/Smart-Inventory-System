import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProducts } from "../../services/products";
import api from "../../services/api";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

export default function Inventory() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();

        const enrichedProducts = await Promise.all(
          data.map(async (product) => {
            const batchRes = await api.get(`/batches/product/${product.id}`);
            const batches = batchRes.data;

            const totalStock = batches.reduce((sum, b) => sum + b.quantity, 0);

            const hasNearExpiry = batches.some((b) => {
              const daysRemaining =
                (new Date(b.expiry_date) - new Date()) / (1000 * 60 * 60 * 24);
              return daysRemaining <= 15;
            });

            let status = "SAFE";
            if (totalStock <= 5) status = "LOW_STOCK";
            else if (hasNearExpiry) status = "NEAR_EXPIRY";

            return {
              id: product.id,
              name: product.name,
              category: product.category,
              unit: product.unit,
              totalStock,
              status,
            };
          })
        );

        setProducts(enrichedProducts);
      } catch (err) {
        setError("Failed to load inventory");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-emerald-50/60 flex items-center justify-center text-gray-600">
        Loading inventory…
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-emerald-50/60 flex items-center justify-center text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-emerald-50/60 px-6 py-10">
      <div className="max-w-6xl mx-auto">
        {/* HEADER + ACTION */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-10"
        >
          <div>
            <h1 className="text-3xl font-semibold text-gray-900">Inventory</h1>
            <p className="mt-2 text-gray-700">
              View all products, stock health, and batch details.
            </p>
          </div>

          <button
            onClick={() => navigate("/shopkeeper/products/new")}
            className="mt-4 sm:mt-0 px-5 py-2.5 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition"
          >
            Add Product
          </button>
        </motion.div>

        {/* EMPTY STATE */}
        {products.length === 0 && (
          <div className="bg-white rounded-2xl p-8 text-center shadow-sm">
            <p className="text-gray-600">No products found.</p>
            <p className="mt-2 text-sm text-gray-500">
              Add your first product to get started.
            </p>
          </div>
        )}

        {/* PRODUCT GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={i + 1}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between"
            >
              <div>
                <h2 className="text-lg font-medium text-gray-900">
                  {product.name}
                </h2>
                <p className="text-sm text-gray-500">
                  {product.category} • {product.unit}
                </p>

                <div className="mt-4">
                  <p className="text-sm text-gray-500">Total stock</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {product.totalStock}
                  </p>
                </div>
              </div>

              {/* STATUS + ACTION */}
              <div className="mt-5 flex items-center justify-between">
                <span
                  className={`text-xs px-3 py-1 rounded-full font-medium ${
                    product.status === "SAFE"
                      ? "bg-emerald-50 text-emerald-700"
                      : product.status === "NEAR_EXPIRY"
                      ? "bg-amber-50 text-amber-700"
                      : "bg-red-50 text-red-700"
                  }`}
                >
                  {product.status === "SAFE"
                    ? "Safe"
                    : product.status === "NEAR_EXPIRY"
                    ? "Near expiry"
                    : "Low stock"}
                </span>

                <Link
                  to={`/shopkeeper/products/${product.id}`}
                  className="text-sm font-medium text-emerald-600 hover:underline"
                >
                  Manage →
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
