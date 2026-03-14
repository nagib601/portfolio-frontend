import { Navigate } from "react-router-dom";

const PrivateRoutes = ({ children }) => {
  const isAdmin = localStorage.getItem("isAdmin");

  // Redirect to /admin/login instead of /login
  if (!isAdmin) return <Navigate to="/admin/login" replace />;

  return children;
};

export default PrivateRoutes;