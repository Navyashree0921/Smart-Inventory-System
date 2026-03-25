import { useEffect, useState } from "react";
import api from "../../services/api";

export default function AdminAlerts() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    api.get("/admin/alerts").then((res) => setAlerts(res.data));
  }, []);

  return (
    <div className="min-h-screen bg-emerald-50/60 px-6 py-10">
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-gray-900">
            System Alerts
          </h1>
          <p className="mt-2 text-gray-700 max-w-2xl">
            Alerts generated across the system that may require administrative
            attention.
          </p>
        </div>

        {/* EMPTY STATE */}
        {alerts.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center shadow-sm">
            <p className="text-gray-600">No system alerts at the moment.</p>
            <p className="mt-2 text-sm text-gray-500">
              Everything is currently operating within expected parameters.
            </p>
          </div>
        ) : (
          <ul className="space-y-4">
            {alerts.map((a) => (
              <li
                key={a.id}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition"
              >
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <p className="text-lg font-medium text-gray-900">
                      {a.product_name}
                    </p>

                    <p className="mt-1 text-sm text-gray-700 leading-relaxed">
                      {a.message}
                    </p>

                    <p className="mt-2 text-xs text-gray-500">
                      {new Date(a.created_at).toLocaleString()}
                    </p>
                  </div>

                  <span className="text-xs px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 whitespace-nowrap">
                    Alert
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
