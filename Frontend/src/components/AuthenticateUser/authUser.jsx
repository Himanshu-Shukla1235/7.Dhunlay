import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ isAuthenticated }) => {
  
  // Allow access to login and register even if not authenticated
  if (!isAuthenticated && (pathname === "/login" || pathname === "/register")) {
    return <Outlet />;
  }
   // Redirect to landing page if not authenticated and not on login/register
   if (!isAuthenticated && pathname==="") {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
