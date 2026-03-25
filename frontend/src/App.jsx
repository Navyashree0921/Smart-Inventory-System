import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ShopkeeperDashboard from "./dashboards/shopkeeper/Dashboard";
import ProtectedRoute from "./app/ProtectedRoute";
import Inventory from "./dashboards/shopkeeper/Inventory";
import ProductDetails from "./dashboards/shopkeeper/ProductDetails";
import NGODashboard from "./dashboards/ngo/Dashboard";
import AdminDashboard from "./dashboards/admin/Dashboard";
import AdminUsers from "./dashboards/admin/Users";
import InventorySummary from "./dashboards/admin/InventorySummary";
import DonationAudit from "./dashboards/admin/DonationAudit";
import AdminAlerts from "./dashboards/admin/Alerts";
import ShopkeeperDonationHistory from "./dashboards/shopkeeper/DonationHistory";
import NGODonationHistory from "./dashboards/ngo/DonationHistory";
import PendingDonations from "./dashboards/ngo/PendingDonations";
import AcceptedDonations from "./dashboards/ngo/AcceptedDonations";
import TodaySales from "./dashboards/shopkeeper/TodaySales";
import SalesReport from "./dashboards/shopkeeper/SalesReport";
import AddProduct from "./dashboards/shopkeeper/AddProduct";
import LowStockAlerts from "./dashboards/shopkeeper/LowStockAlerts";
import ExpiryAlerts from "./dashboards/shopkeeper/ExpiryAlerts";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/shopkeeper"
        element={
          <ProtectedRoute allowedRoles={["SHOPKEEPER"]}>
            <ShopkeeperDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/shopkeeper/inventory"
        element={
          <ProtectedRoute allowedRoles={["SHOPKEEPER"]}>
            <Inventory />
          </ProtectedRoute>
        }
      />
      <Route
        path="/shopkeeper/products/:id"
        element={
          <ProtectedRoute allowedRoles={["SHOPKEEPER"]}>
            <ProductDetails />
          </ProtectedRoute>
        }
      />
      <Route
        path="/ngo"
        element={
          <ProtectedRoute allowedRoles={["NGO"]}>
            <NGODashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={["ADMIN"]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/shopkeeper/donations"
        element={
          <ProtectedRoute allowedRoles={["SHOPKEEPER"]}>
            <ShopkeeperDonationHistory />
          </ProtectedRoute>
        }
      />
      <Route
        path="/ngo/donations"
        element={
          <ProtectedRoute allowedRoles={["NGO"]}>
            <NGODonationHistory />
          </ProtectedRoute>
        }
      />
      <Route
        path="/shopkeeper/sales/today"
        element={
          <ProtectedRoute allowedRoles={["SHOPKEEPER"]}>
            <TodaySales />
          </ProtectedRoute>
        }
      />

      <Route
        path="/shopkeeper/sales/report"
        element={
          <ProtectedRoute allowedRoles={["SHOPKEEPER"]}>
            <SalesReport />
          </ProtectedRoute>
        }
      />
      <Route
        path="/shopkeeper/products/new"
        element={
          <ProtectedRoute allowedRoles={["SHOPKEEPER"]}>
            <AddProduct />
          </ProtectedRoute>
        }
      />

      <Route
        path="/shopkeeper/alerts/low-stock"
        element={
          <ProtectedRoute allowedRoles={["SHOPKEEPER"]}>
            <LowStockAlerts />
          </ProtectedRoute>
        }
      />

      <Route
        path="/shopkeeper/alerts/expiry"
        element={
          <ProtectedRoute allowedRoles={["SHOPKEEPER"]}>
            <ExpiryAlerts />
          </ProtectedRoute>
        }
      />
      <Route
        path="/ngo/donations/pending"
        element={
          <ProtectedRoute allowedRoles={["NGO"]}>
            <PendingDonations />
          </ProtectedRoute>
        }
      />

      <Route
        path="/ngo/donations/accepted"
        element={
          <ProtectedRoute allowedRoles={["NGO"]}>
            <AcceptedDonations />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={["ADMIN"]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/users"
        element={
          <ProtectedRoute allowedRoles={["ADMIN"]}>
            <AdminUsers />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/inventory"
        element={
          <ProtectedRoute allowedRoles={["ADMIN"]}>
            <InventorySummary />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/donations"
        element={
          <ProtectedRoute allowedRoles={["ADMIN"]}>
            <DonationAudit />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/alerts"
        element={
          <ProtectedRoute allowedRoles={["ADMIN"]}>
            <AdminAlerts />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
