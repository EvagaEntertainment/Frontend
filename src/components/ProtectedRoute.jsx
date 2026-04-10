'use client';
// src/components/ProtectedRoute.js

import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { auth } = useAuth();

  if (!auth.isAuthenticated) {
    return /* TODO: Replace Navigate */ <div data-redirect="/" />;
  }

  if (!allowedRoles.includes(auth.role)) {
    return /* TODO: Replace Navigate */ <div data-redirect="/" />;
  }

  return children;
};

export default ProtectedRoute;

