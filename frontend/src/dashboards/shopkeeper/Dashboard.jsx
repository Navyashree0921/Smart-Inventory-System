import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import DashboardCard from "./DashboardCard";
import InventoryPreview from "./InventoryPreview";
import SalesPreview from "./SalesPreview";
import DonationPreview from "./DonationPreview";

export default function ShopkeeperDashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 px-6 py-10">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-semibold text-gray-900">
            Shopkeeper Dashboard
          </h1>
          <p className="mt-2 text-gray-600 max-w-xl">
            A clear view of your inventory, alerts, and contribution toward
            reducing food waste.
          </p>
        </motion.div>

        {/* ALERT / NAVIGATION CARDS */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div
            onClick={() => navigate("/shopkeeper/alerts/low-stock")}
            className="cursor-pointer"
          >
            <DashboardCard
              title="Low Stock Alerts"
              value="View items"
              subtitle="Products that require restocking"
              tone="warning"
            />
          </div>

          <div
            onClick={() => navigate("/shopkeeper/alerts/expiry")}
            className="cursor-pointer"
          >
            <DashboardCard
              title="Expiring Soon"
              value="View batches"
              subtitle="Items approaching expiry"
              tone="danger"
            />
          </div>

          <div
            onClick={() => navigate("/shopkeeper/donations")}
            className="cursor-pointer"
          >
            <DashboardCard
              title="Donations"
              value="View history"
              subtitle="Your contribution so far"
              tone="success"
            />
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* INVENTORY MANAGEMENT */}
          <motion.div
            whileHover={{ scale: 1.015 }}
            onClick={() => navigate("/shopkeeper/inventory")}
            className="cursor-pointer bg-white border border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-md transition"
          >
            <h2 className="text-xl font-semibold text-gray-900">
              Inventory Management
            </h2>

            <p className="mt-3 text-gray-600 max-w-xl leading-relaxed">
              View all products, monitor stock levels, add new items, and manage
              batches in one place.
            </p>

            <div className="mt-4 text-sm font-medium text-emerald-600">
              Go to Inventory →
            </div>
          </motion.div>

          {/* SALES PREVIEW (unchanged) */}
          <SalesPreview />
        </div>

        {/* DONATION IMPACT */}
        <div className="mt-14">
          <DonationPreview />
        </div>
      </div>
    </div>
  );
}
