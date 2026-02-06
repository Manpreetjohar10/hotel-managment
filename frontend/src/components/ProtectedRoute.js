import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import decodeJwt from '../utils/decodeJwt';

export default function ProtectedRoute() {
  const token = localStorage.getItem('token');
  
  if (!token) {
    return <Navigate to="/" replace />;
  }

  try {
    decodeJwt(token);
    return <Outlet />;
  } catch (err) {
    localStorage.removeItem('token');
    return <Navigate to="/" replace />;
  }
}
