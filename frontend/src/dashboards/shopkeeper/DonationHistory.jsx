import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getDonationHistory } from "../../services/donations";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

export default function ShopkeeperDonationHistory() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await getDonationHistory();
        setHistory(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-emerald-50/60 flex items-center justify-center text-gray-600">
        Loading donation history…
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
        {/* HEADER */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mb-10"
        >
          <h1 className="text-3xl font-semibold text-gray-900">
            Donation History
          </h1>
          <p className="mt-2 text-gray-700 max-w-2xl leading-relaxed">
            A record of surplus items you’ve responsibly redirected instead of
            letting them go to waste.
          </p>
        </motion.div>

        {/* EMPTY STATE */}
        {history.length === 0 && (
          <div className="bg-white rounded-2xl p-8 text-center shadow-sm">
            <p className="text-gray-600">You haven’t donated any items yet.</p>
            <p className="mt-2 text-sm text-gray-500">
              When donations are made, they will appear here.
            </p>
          </div>
        )}

        {/* HISTORY LIST */}
        <div className="space-y-4">
          {history.map((d, i) => (
            <motion.div
              key={d.id}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={i + 1}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition"
            >
              <div className="text-lg font-medium text-gray-900">
                {d.product_name}
              </div>

              <div className="mt-1 text-sm text-gray-600">
                Batch:{" "}
                <span className="font-medium text-gray-700">
                  {d.batch_number}
                </span>
              </div>

              <div className="mt-2 text-sm text-gray-700">
                Quantity donated:{" "}
                <span className="font-medium">{d.quantity}</span>
              </div>

              <div className="mt-1 text-sm text-gray-500">
                Status:{" "}
                <span className="font-medium text-gray-700">{d.status}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
