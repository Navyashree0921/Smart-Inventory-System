import { useEffect, useState } from "react";
import { getDonationHistory } from "../../services/donations";

export default function DonationPreview() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    getDonationHistory().then((data) => setCount(data.length));
  }, []);

  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm">
      <h2 className="text-xl font-semibold text-gray-900">Community Impact</h2>

      <p className="mt-2 text-gray-600 max-w-xl leading-relaxed">
        Through responsible inventory management and timely donations, you have
        helped redirect surplus food to those in need.
      </p>

      <div className="mt-6">
        <p className="text-sm text-gray-500">Total donations made</p>
        <p className="mt-1 text-4xl font-semibold text-emerald-700">{count}</p>
      </div>
    </div>
  );
}
