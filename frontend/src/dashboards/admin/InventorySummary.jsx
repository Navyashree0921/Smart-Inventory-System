import { useEffect, useState } from "react";
import api from "../../services/api";

export default function InventorySummary() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    api.get("/admin/inventory").then((res) => setItems(res.data));
  }, []);

  return (
    <div className="min-h-screen bg-emerald-50/60 px-6 py-10">
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-gray-900">
            Inventory Summary
          </h1>
          <p className="mt-2 text-gray-700 max-w-2xl">
            System-wide view of product availability across all shops.
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
                  Total Stock
                </th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {items.map((i) => (
                <tr key={i.id} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-3 text-gray-900">{i.name}</td>
                  <td className="px-4 py-3 text-gray-700">
                    {i.total_stock ?? 0}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* EMPTY STATE */}
          {items.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              No inventory data available.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
