import { useEffect, useState } from "react";
import api from "../../services/api";

export default function ExpiryAlerts() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    api.get("/alerts/expiry").then((res) => setItems(res.data));
  }, []);

  return (
    <div className="min-h-screen bg-emerald-50/60 px-6 py-10">
      <div className="max-w-5xl mx-auto">
        {/* HEADER */}
        <div className="mb-10">
          <h1 className="text-3xl font-semibold text-gray-900">
            Expiry Alerts
          </h1>
          <p className="mt-2 text-gray-700 max-w-2xl leading-relaxed">
            These items are approaching their expiry date. Timely action can
            help prevent waste or enable donation.
          </p>
        </div>

        {/* EMPTY STATE */}
        {items.length === 0 && (
          <div className="bg-white rounded-2xl p-8 text-center shadow-sm">
            <p className="text-gray-600">No expiring items at the moment.</p>
            <p className="mt-2 text-sm text-gray-500">
              Your inventory is currently in a healthy state.
            </p>
          </div>
        )}

        {/* EXPIRY LIST */}
        <div className="space-y-4">
          {items.map((i) => (
            <div
              key={i.batch_id}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-start justify-between gap-6">
                <div>
                  <p className="text-lg font-medium text-gray-900">
                    {i.product_name}
                  </p>

                  <p className="mt-1 text-sm text-gray-600">
                    Batch:{" "}
                    <span className="font-medium text-gray-700">
                      {i.batch_number}
                    </span>
                  </p>

                  <p className="mt-1 text-sm text-gray-600">
                    Expires in{" "}
                    <span className="font-medium text-emerald-700">
                      {i.days_remaining} days
                    </span>
                  </p>
                </div>

                <div className="text-sm text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full whitespace-nowrap">
                  Near expiry
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
