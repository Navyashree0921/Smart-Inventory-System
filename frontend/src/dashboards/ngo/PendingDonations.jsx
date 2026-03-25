// import { useEffect, useState } from "react";
// import api from "../../services/api";

// export default function PendingDonations() {
//   const [donations, setDonations] = useState([]);

//   useEffect(() => {
//     api.get("/donations/pending").then((res) => setDonations(res.data));
//   }, []);

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-semibold">Pending Donations</h1>

//       {donations.length === 0 ? (
//         <p className="mt-4 text-gray-500">No donations available right now.</p>
//       ) : (
//         donations.map((d) => (
//           <div key={d.id} className="mt-4 bg-white p-4 rounded border">
//             <strong>{d.product_name}</strong>
//             <p>Batch: {d.batch_number}</p>
//             <button className="mt-2 bg-emerald-600 text-white px-3 py-1 rounded">
//               Accept Donation
//             </button>
//           </div>
//         ))
//       )}
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import api from "../../services/api";

export default function PendingDonations() {
  const [donations, setDonations] = useState([]);
  const [loadingId, setLoadingId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPendingDonations();
  }, []);

  const fetchPendingDonations = async () => {
    try {
      const res = await api.get("/donations/pending");
      setDonations(res.data);
    } catch (err) {
      console.error("Failed to load pending donations", err);
    } finally {
      setLoading(false);
    }
  };

  const acceptDonation = async (donationId) => {
    try {
      setLoadingId(donationId);

      // ✅ MATCHES BACKEND ROUTE
      await api.put(`/donations/accept/${donationId}`);

      // Remove accepted donation from UI
      setDonations((prev) => prev.filter((d) => d.id !== donationId));
    } catch (err) {
      console.error("Accept donation failed", err);
      alert("Failed to accept donation");
    } finally {
      setLoadingId(null);
    }
  };

  if (loading) {
    return <div className="p-6 text-gray-500">Loading pending donations…</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold">Pending Donations</h1>

      {donations.length === 0 ? (
        <p className="mt-4 text-gray-500">No donations available right now.</p>
      ) : (
        <div className="mt-6 space-y-4">
          {donations.map((d) => (
            <div
              key={d.id}
              className="bg-white p-4 rounded-lg border flex justify-between items-center"
            >
              <div>
                <div className="font-medium text-gray-900">
                  {d.product_name}
                </div>
                <div className="text-sm text-gray-600">
                  Batch: {d.batch_number}
                </div>
              </div>

              <button
                onClick={() => acceptDonation(d.id)}
                disabled={loadingId === d.id}
                className="px-4 py-1.5 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-60"
              >
                {loadingId === d.id ? "Accepting…" : "Accept"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
