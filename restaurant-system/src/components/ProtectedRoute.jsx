import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Wrap a page: only logged-in users (optionally only admins) can see it.
function ProtectedRoute({ adminOnly = false, children }) {
  const { isLoggedIn, isAdmin } = useAuth();
  const location = useLocation();

  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  if (adminOnly && !isAdmin) {
    return (
      <div>
        <h1>Access Denied</h1>
        <p>You need an administrator account to view this page.</p>
      </div>
    );
  }

  return children;
}

export default ProtectedRoute;
