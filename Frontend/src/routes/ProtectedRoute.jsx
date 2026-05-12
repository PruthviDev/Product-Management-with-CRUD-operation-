// src/routes/ProtectedRoute.jsx
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
  const token = localStorage.getItem("token");

  // If token exists, render the Outlet (the sub-routes)
  // If not, redirect to login
  return token ? <Outlet /> : <Navigate to="/login" replace />;
}

export default ProtectedRoute;