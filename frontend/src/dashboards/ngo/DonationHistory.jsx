import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getDonationHistory } from "../../services/donations";

export default function NGODonationHistory() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
    useEffect(() => {
      getDonationHistory()
        .then((data) => {
          console.log("RAW NGO DONATIONS:", data);
          setHistory(data);
        })
        .finally(() => setLoading(false));
    }, []);

  useEffect(() => {
    getDonationHistory()
      .then(setHistory)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading…
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-semibold text-gray-900">
          Accepted Donations
        </h1>

        {history.length === 0 && (
          <div className="mt-12 text-center text-gray-500">
            No accepted donations yet.
          </div>
        )}

        <div className="mt-8 space-y-4">
          {history.map((d) => (
            <div
              key={d.id}
              className="bg-white p-5 rounded-xl border shadow-sm"
            >
              <div className="font-medium">{d.product_name}</div>
              <div className="text-sm text-gray-600">
                Quantity received: {d.quantity}
              </div>
              <div className="text-sm text-gray-500">
                From shopkeeper:{d.shopkeeper_id}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
