import { Navigate } from "react-router-dom";

const PrivateRoutes = ({ children }) => {
  const isAdmin = localStorage.getItem("isAdmin");

  if (!isAdmin) return <Navigate to="/login" replace />;

  return children;
};

export default PrivateRoutes;