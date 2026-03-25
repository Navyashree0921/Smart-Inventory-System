import { useEffect, useState } from "react";
import api from "../../services/api";

export default function LowStockAlerts() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    api.get("/alerts/low-stock").then((res) => setAlerts(res.data));
  }, []);

  return (
    <div className="min-h-screen bg-emerald-50/60 px-6 py-10">
      <div className="max-w-5xl mx-auto">
        {/* HEADER */}
        <div className="mb-10">
          <h1 className="text-3xl font-semibold text-gray-900">
            Low Stock Alerts
          </h1>
          <p className="mt-2 text-gray-700 max-w-2xl leading-relaxed">
            These items are running low and may require timely restocking to
            avoid missed sales or disruptions.
          </p>
        </div>

        {/* EMPTY STATE */}
        {alerts.length === 0 && (
          <div className="bg-white rounded-2xl p-8 text-center shadow-sm">
            <p className="text-gray-600">No low stock alerts at the moment.</p>
            <p className="mt-2 text-sm text-gray-500">
              Your inventory levels are currently stable.
            </p>
          </div>
        )}

        {/* ALERT LIST */}
        <div className="space-y-4">
          {alerts.map((a) => (
            <div
              key={a.product_id}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-start justify-between gap-6">
                <div>
                  <p className="text-lg font-medium text-gray-900">
                    {a.product_name}
                  </p>

                  <p className="mt-1 text-sm text-gray-600">
                    Remaining stock:{" "}
                    <span className="font-medium text-emerald-700">
                      {a.total_stock}
                    </span>
                  </p>
                </div>

                <div className="text-sm text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full whitespace-nowrap">
                  Low stock
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
