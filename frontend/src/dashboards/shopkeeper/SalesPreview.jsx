import { useEffect, useState } from "react";
import { getTodaySales } from "../../services/sales";

export default function SalesPreview() {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    getTodaySales().then(setSales);
  }, []);

  return (
    <div className="bg-white p-6 rounded-2xl border shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900"> Today’s Sales</h2>

      {sales.length === 0 ? (
        <p className="mt-4 text-sm text-gray-500">No sales recorded today.</p>
      ) : (
        <ul className="mt-4 space-y-2 text-sm">
          {sales.map((s, i) => (
            <li key={i} className="flex justify-between">
              <span>{s.product_name}</span>
              <span className="font-medium">{s.total_sold}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
