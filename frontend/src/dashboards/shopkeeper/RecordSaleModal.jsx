import { useState } from "react";
import { motion } from "framer-motion";
import { recordSale } from "../../services/sales";

export default function RecordSaleModal({
  open,
  onClose,
  productId,
  productName,
  maxQuantity,
  onSuccess,
}) {
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!open) return null;

  const handleSubmit = async () => {
    if (quantity < 1 || quantity > maxQuantity) {
      setError("Invalid quantity");
      return;
    }

    try {
      setLoading(true);
      await recordSale(productId, quantity);
      onSuccess(quantity);
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to record sale");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white p-6 rounded-xl w-full max-w-md"
      >
        <h2 className="text-lg font-semibold text-gray-900">
          Record Sale – {productName}
        </h2>

        <div className="mt-4">
          <label className="text-sm">Quantity sold</label>
          <input
            type="number"
            min={1}
            max={maxQuantity}
            value={quantity}
            onChange={(e) => setQuantity(+e.target.value)}
            className="mt-1 w-full border px-3 py-2 rounded"
          />
          <p className="text-xs text-gray-500">
            Available stock: {maxQuantity}
          </p>
        </div>

        {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

        <div className="mt-6 flex justify-end gap-3">
          <button onClick={onClose} className="text-sm text-gray-600">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-emerald-600 text-white px-4 py-2 rounded"
          >
            {loading ? "Saving..." : "Confirm"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
