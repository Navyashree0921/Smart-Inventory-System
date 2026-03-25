import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { createDonation } from "../../services/donations";

export default function DonateModal({
  open,
  onClose,
  productName,
  batchNumber,
  expiry,
  maxQuantity,
  batchId,
  onSuccess,
}) {
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!open) return null;

  const handleDonate = async () => {
    setError("");
    setLoading(true);

    try {
      await createDonation(batchId, quantity);

      // Notify parent to refresh batches
      onSuccess(quantity);

      onClose();
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-white rounded-2xl shadow-lg max-w-md w-full p-8"
        >
          <h2 className="text-xl font-semibold text-gray-900">Donate Items</h2>

          <p className="mt-2 text-sm text-gray-600">
            You’re donating items before they expire — thank you for reducing
            waste.
          </p>

          <div className="mt-6 text-sm text-gray-700 space-y-1">
            <div>
              Product: <strong>{productName}</strong>
            </div>
            <div>
              Batch: <strong>{batchNumber}</strong>
            </div>
            <div>
              Expiry: <strong>{expiry}</strong>
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm mb-1">Quantity to donate</label>
            <input
              type="number"
              min={1}
              max={maxQuantity}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-full px-4 py-2 border rounded-lg"
            />
            <p className="mt-1 text-xs text-gray-500">
              Available: {maxQuantity}
            </p>
          </div>

          {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

          <div className="mt-8 flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm rounded-lg text-gray-600 hover:bg-gray-100"
            >
              Cancel
            </button>

            <motion.button
              whileTap={{ scale: 0.98 }}
              disabled={loading}
              onClick={handleDonate}
              className="px-5 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-60"
            >
              {loading ? "Donating..." : "Confirm Donation"}
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
