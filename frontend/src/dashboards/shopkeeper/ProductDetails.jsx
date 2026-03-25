import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import DonateModal from "./DonateModal";
import RecordSaleModal from "./RecordSaleModal";
import AddBatchModal from "./AddBatchModal";

import { getProductById } from "../../services/products";
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

export default function ProductDetails() {
  const { id } = useParams();

  // ======================
  // STATE
  // ======================
  const [product, setProduct] = useState(null);
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Modals
  const [openDonate, setOpenDonate] = useState(false);
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [openSale, setOpenSale] = useState(false);
  const [openAddBatch, setOpenAddBatch] = useState(false);

  // ======================
  // NORMALIZE BATCHES
  // ======================
  const normalizeBatches = (rawBatches) => {
    const normalized = rawBatches.map((b) => {
      const expiryDate = new Date(b.expiry_date);
      const daysRemaining = (expiryDate - new Date()) / (1000 * 60 * 60 * 24);

      return {
        id: b.id,
        batchNumber: b.batch_number,
        quantity: b.quantity,
        expiry: expiryDate.toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
        urgency: daysRemaining <= 15 ? "HIGH" : "LOW",
      };
    });

    const totalStock = normalized.reduce((sum, b) => sum + b.quantity, 0);

    let status = "SAFE";
    if (totalStock <= 5) status = "LOW_STOCK";
    else if (normalized.some((b) => b.urgency === "HIGH"))
      status = "NEAR_EXPIRY";

    setBatches(normalized);
    setProduct((p) => ({
      ...p,
      totalStock,
      status,
    }));
  };

  // ======================
  // FETCH PRODUCT + BATCHES
  // ======================
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const productData = await getProductById(id);
        const batchRes = await api.get(`/batches/product/${id}`);

        setProduct({
          id: productData.id,
          name: productData.name,
          category: productData.category,
          totalStock: 0,
          status: "SAFE",
        });

        normalizeBatches(batchRes.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load product details");
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  // ======================
  // LOADING / ERROR
  // ======================
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Loading product details…
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        {error}
      </div>
    );
  }

  // ======================
  // UI
  // ======================
  return (
    <div className="min-h-screen bg-neutral-50 px-6 py-10">
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible">
          <h1 className="text-3xl font-semibold text-gray-900">
            {product.name}
          </h1>
          <p className="mt-1 text-gray-600">Category: {product.category}</p>
        </motion.div>

        {/* SUMMARY */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
          className="mt-6 p-6 bg-white rounded-xl border shadow-sm flex justify-between items-center"
        >
          <div>
            <div className="text-sm text-gray-500">Total Stock</div>
            <div className="text-2xl font-semibold text-gray-900">
              {product.totalStock}
            </div>
          </div>

          <span
            className={`text-sm px-4 py-2 rounded-full font-medium ${
              product.status === "SAFE"
                ? "bg-emerald-100 text-emerald-700"
                : product.status === "NEAR_EXPIRY"
                ? "bg-orange-100 text-orange-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {product.status.replace("_", " ")}
          </span>
        </motion.div>

        {/* ACTIONS */}
        <div className="mt-6 flex gap-3">
          <button
            onClick={() => setOpenAddBatch(true)}
            className="px-5 py-2.5 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700"
          >
            + Add Batch
          </button>

          <button
            onClick={() => setOpenSale(true)}
            disabled={product.totalStock === 0}
            className="px-5 py-2.5 rounded-lg bg-white border text-gray-700 hover:bg-gray-50 disabled:opacity-50"
          >
            Record Sale
          </button>
        </div>

        {/* BATCHES */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={2}
          className="mt-10"
        >
          <h2 className="text-xl font-medium text-gray-900">Batches</h2>

          <div className="mt-4 space-y-4">
            {batches.map((batch, i) => (
              <motion.div
                key={batch.id}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={i + 3}
                className="bg-white rounded-xl border shadow-sm p-5 flex justify-between items-center"
              >
                <div>
                  <div className="font-medium">Batch {batch.batchNumber}</div>
                  <div className="text-sm text-gray-500">
                    Expiry: {batch.expiry}
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-sm">
                    Qty: <span className="font-medium">{batch.quantity}</span>
                  </div>

                  <span
                    className={`text-xs px-3 py-1 rounded-full ${
                      batch.urgency === "HIGH"
                        ? "bg-orange-100 text-orange-700"
                        : "bg-emerald-100 text-emerald-700"
                    }`}
                  >
                    {batch.urgency === "HIGH" ? "Use Soon" : "Stable"}
                  </span>

                  {batch.urgency === "HIGH" && (
                    <button
                      onClick={() => {
                        setSelectedBatch(batch);
                        setOpenDonate(true);
                      }}
                      className="text-sm px-3 py-1.5 rounded-lg bg-emerald-600 text-white"
                    >
                      Donate
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ADD BATCH MODAL */}
      <AddBatchModal
        open={openAddBatch}
        onClose={() => setOpenAddBatch(false)}
        productId={product.id}
        onSuccess={async () => {
          const batchRes = await api.get(`/batches/product/${product.id}`);
          normalizeBatches(batchRes.data);
        }}
      />

      {/* DONATE MODAL */}
      {selectedBatch && (
        <DonateModal
          open={openDonate}
          onClose={() => setOpenDonate(false)}
          productName={product.name}
          batchNumber={selectedBatch.batchNumber}
          expiry={selectedBatch.expiry}
          maxQuantity={selectedBatch.quantity}
          batchId={selectedBatch.id}
          onSuccess={(donatedQty) => {
            normalizeBatches(
              batches.map((b) =>
                b.id === selectedBatch.id
                  ? { ...b, quantity: b.quantity - donatedQty }
                  : b
              )
            );
          }}
        />
      )}

      {/* RECORD SALE MODAL */}
      <RecordSaleModal
        open={openSale}
        onClose={() => setOpenSale(false)}
        productId={product.id}
        productName={product.name}
        maxQuantity={product.totalStock}
        onSuccess={(soldQty) => {
          setProduct((p) => ({
            ...p,
            totalStock: p.totalStock - soldQty,
          }));
        }}
      />
    </div>
  );
}
