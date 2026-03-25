import { useEffect, useState } from "react";
import api from "../../services/api";

export default function AcceptedDonations() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    api.get("/donations/history").then((res) => setHistory(res.data));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold">Accepted Donations</h1>

      {history.length === 0 ? (
        <p className="mt-4 text-gray-500">
          You haven’t accepted any donations yet.
        </p>
      ) : (
        history.map((h) => (
          <div key={h.id} className="mt-4 bg-white p-4 rounded border">
            <strong>{h.product_name}</strong>
            <p>Batch: {h.batch_number}</p>
            <p>Status: {h.status}</p>
          </div>
        ))
      )}
    </div>
  );
}
