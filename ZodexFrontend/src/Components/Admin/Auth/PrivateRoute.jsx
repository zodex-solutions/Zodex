// utils/PrivateRoute.jsx
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const isAuthenticated = localStorage.getItem("admin_token"); // Set this after login

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
