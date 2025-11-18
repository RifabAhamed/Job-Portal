import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ children, roles = [] }) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>; // Or spinner

  if (!user.role) return <Navigate to="/login" />;

  // Check roles
  if (roles.length > 0 && !roles.includes(user.role)) {
    return <Navigate to="/" />; // redirect if not authorized
  }

  return children;
};

export default PrivateRoute;
