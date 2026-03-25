import { useEffect, useState } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

export default function PendingDonationsPreview() {
  const [donations, setDonations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/donations/pending")
      .then((res) => setDonations(res.data.slice(0, 5)));
  }, []);

  return (
    <div className="bg-white p-6 rounded-2xl border shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900">
         Available Donations
      </h2>

      {donations.length === 0 ? (
        <p className="mt-4 text-sm text-gray-500">
          No donations available right now.
        </p>
      ) : (
        <ul className="mt-4 space-y-3">
          {donations.map((d) => (
            <li
              key={d.id}
              onClick={() => navigate("/ngo/donations")}
              className="cursor-pointer flex justify-between text-sm hover:text-emerald-600"
            >
              <span>{d.product_name}</span>
              <span>View →</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
