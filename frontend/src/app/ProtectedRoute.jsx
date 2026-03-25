import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children, allowedRoles }) {
  const { user } = useAuth();

  // Not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const userRole = user.role?.toUpperCase();

  // Role not allowed
  if (!allowedRoles.includes(userRole)) {
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        <h2>You do not have permission to access this page.</h2>
      </div>
    );
  }

  return children;
}
