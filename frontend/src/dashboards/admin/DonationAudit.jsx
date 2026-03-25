import { useEffect, useState } from "react";
import api from "../../services/api";

export default function DonationAudit() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    api.get("/admin/donations").then((res) => setLogs(res.data));
  }, []);

  return (
    <div className="min-h-screen bg-emerald-50/60 px-6 py-10">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-gray-900">
            Donation Audit
          </h1>
          <p className="mt-2 text-gray-700 max-w-2xl">
            Complete record of donation activity across the system.
          </p>
        </div>

        {/* TABLE SURFACE */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-emerald-50 border-b">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-emerald-800">
                  Product
                </th>
                <th className="px-4 py-3 text-left font-medium text-emerald-800">
                  Qty
                </th>
                <th className="px-4 py-3 text-left font-medium text-emerald-800">
                  Shopkeeper
                </th>
                <th className="px-4 py-3 text-left font-medium text-emerald-800">
                  NGO
                </th>
                <th className="px-4 py-3 text-left font-medium text-emerald-800">
                  Status
                </th>
                <th className="px-4 py-3 text-left font-medium text-emerald-800">
                  Created
                </th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {logs.map((l) => (
                <tr key={l.id} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-3 text-gray-900">{l.product_name}</td>
                  <td className="px-4 py-3 text-gray-700">{l.quantity}</td>
                  <td className="px-4 py-3 text-gray-700">{l.shopkeeper}</td>
                  <td className="px-4 py-3 text-gray-700">{l.ngo ?? "-"}</td>
                  <td className="px-4 py-3 text-gray-700">{l.status}</td>
                  <td className="px-4 py-3 text-gray-600">
                    {new Date(l.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* EMPTY STATE */}
          {logs.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              No donation records found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
