import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ isAdmin, role = "user", user, children }) => {
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (isAdmin && role !== "admin") {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

export default ProtectedRoute;
