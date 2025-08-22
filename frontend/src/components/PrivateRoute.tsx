import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

interface PrivateRouteProps {
  allowedRoles: string[];
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ allowedRoles }) => {
  console.log("PrivateRoute: Component started rendering");
  const { isAuthenticated, userRole } = useAuth();
  console.log("PrivateRoute: isAuthenticated =", isAuthenticated());
  console.log("PrivateRoute: userRole =", userRole);
  console.log("PrivateRoute: allowedRoles =", allowedRoles);

  if (!isAuthenticated()) {
    console.log("PrivateRoute: Not authenticated, redirecting to /login");
    // Not logged in, redirect to login page
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
    console.log(`PrivateRoute: User role ${userRole} not in allowed roles ${allowedRoles}, redirecting to /`);
    // Logged in but not authorized, redirect to a forbidden page or home
    return <Navigate to="/" replace />; // Or a /forbidden page
  }

  console.log("PrivateRoute: Authorized, rendering children");
  return <Outlet />;
};

export default PrivateRoute;
