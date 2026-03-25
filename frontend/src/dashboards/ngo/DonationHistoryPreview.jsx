import { useEffect, useState } from "react";
import api from "../../services/api";

export default function DonationHistoryPreview() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    api
      .get("/donations/history")
      .then((res) => setHistory(res.data.slice(0, 5)));
  }, []);

  return (
    <div className="bg-white p-6 rounded-2xl border shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900">
        Recent Donations
      </h2>

      {history.length === 0 ? (
        <p className="mt-4 text-sm text-gray-500">
          You haven’t accepted any donations yet.
        </p>
      ) : (
        <ul className="mt-4 space-y-2 text-sm">
          {history.map((h) => (
            <li key={h.id} className="flex justify-between">
              <span>{h.product_name}</span>
              <span className="text-gray-500">{h.status}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
