// src/admin/AdminProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem('isAdminLoggedIn') === 'true';
  return isLoggedIn ? children : <Navigate to="/admin/login" />;
};

export default AdminProtectedRoute;
