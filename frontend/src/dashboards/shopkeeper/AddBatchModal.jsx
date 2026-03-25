import { useState } from "react";
import api from "../../services/api";

export default function AddBatchModal({ open, onClose, productId, onSuccess }) {
  const [batchNumber, setBatchNumber] = useState("");
  const [quantity, setQuantity] = useState("");
  const [expiryDate, setExpiryDate] = useState("");

  if (!open) return null;

  const submit = async () => {
    await api.post("/batches", {
      productId,
      batchNumber, // ✅ camelCase
      quantity,
      expiryDate, // ✅ camelCase
    });
    onSuccess();
    onClose();
  };


  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-xl p-6 shadow-lg">
        <h2 className="text-lg font-semibold text-gray-900">Add New Batch</h2>

        <div className="mt-4 space-y-3">
          <input
            className="w-full px-3 py-2 border rounded-lg"
            placeholder="Batch Number"
            onChange={(e) => setBatchNumber(e.target.value)}
          />

          <input
            type="number"
            className="w-full px-3 py-2 border rounded-lg"
            placeholder="Quantity"
            onChange={(e) => setQuantity(e.target.value)}
          />

          <input
            type="date"
            className="w-full px-3 py-2 border rounded-lg"
            onChange={(e) => setExpiryDate(e.target.value)}
          />
        </div>

        <div className="mt-5 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-lg text-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={submit}
            className="px-4 py-2 bg-emerald-600 text-white rounded-lg"
          >
            Add Batch
          </button>
        </div>
      </div>
    </div>
  );
}
