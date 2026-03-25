import { useEffect, useState } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/admin/stats").then((res) => setStats(res.data));
  }, []);

  if (!stats) {
    return (
      <div className="min-h-screen bg-emerald-50/60 flex items-center justify-center text-gray-600">
        Loading dashboard…
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-emerald-50/60 px-6 py-10">
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <div className="mb-10">
          <h1 className="text-3xl font-semibold text-gray-900">
            Admin Dashboard
          </h1>
          <p className="mt-2 text-gray-700 max-w-2xl leading-relaxed">
            System-wide overview, governance, and operational monitoring.
          </p>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {Object.entries(stats).map(([key, value]) => (
            <div
              key={key}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition"
            >
              <p className="text-sm text-gray-500 capitalize">
                {key.replace(/_/g, " ")}
              </p>
              <p className="mt-2 text-3xl font-semibold text-gray-900">
                {value}
              </p>
            </div>
          ))}
        </div>

        {/* NAVIGATION */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AdminNavCard
            title="Users"
            description="Manage users and roles"
            onClick={() => navigate("/admin/users")}
          />

          <AdminNavCard
            title="Inventory"
            description="Monitor inventory across shops"
            onClick={() => navigate("/admin/inventory")}
          />

          <AdminNavCard
            title="Donations"
            description="Audit donation activity"
            onClick={() => navigate("/admin/donations")}
          />

          <AdminNavCard
            title="Alerts"
            description="Review system alerts"
            onClick={() => navigate("/admin/alerts")}
          />
        </div>
      </div>
    </div>
  );
}

function AdminNavCard({ title, description, onClick }) {
  return (
    <div
      onClick={onClick}
      className="
        cursor-pointer
        bg-white
        rounded-2xl
        p-8
        shadow-sm
        hover:shadow-md
        transition
      "
    >
      <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
      <p className="mt-2 text-sm text-gray-600">{description}</p>

      <div className="mt-4 text-sm font-medium text-emerald-600">View →</div>
    </div>
  );
}
