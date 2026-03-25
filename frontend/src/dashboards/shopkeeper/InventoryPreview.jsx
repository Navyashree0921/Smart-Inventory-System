// import { useEffect, useState } from "react";
// import api from "../../services/api";
// import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
export default function InventoryPreview() {


  return (
    <div className="mt-12">
      <motion.div
        whileHover={{ scale: 1.02 }}
        onClick={() => navigate("/shopkeeper/products")}
        className="cursor-pointer bg-white border rounded-2xl p-8 shadow-sm hover:shadow-md transition"
      >
        <h2 className="text-xl font-semibold text-gray-900">
          📦 Inventory Management
        </h2>

        <p className="mt-2 text-gray-600 max-w-xl">
          View all products, track stock status, add new products, and manage
          batches from one place.
        </p>

        <div className="mt-4 text-sm font-medium text-emerald-600">
          Go to Inventory →
        </div>
      </motion.div>
    </div>
  );
}
