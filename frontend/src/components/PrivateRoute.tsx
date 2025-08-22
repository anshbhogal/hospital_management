import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

interface PrivateRouteProps {
  allowedRoles: string[];
  children: React.ReactNode; // accept children
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ allowedRoles, children }) => {
  console.log("PrivateRoute: Component started rendering");
  const { isAuthenticated, userRole } = useAuth();
  console.log("PrivateRoute: isAuthenticated =", isAuthenticated());
  console.log("PrivateRoute: userRole =", userRole);
  console.log("PrivateRoute: allowedRoles =", allowedRoles);

  // Not logged in
  if (!isAuthenticated()) {
    console.log("PrivateRoute: Not authenticated, redirecting to /login");
    return <Navigate to="/login" replace />;
  }

  // Logged in but role not allowed
  if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
    console.log(
      `PrivateRoute: User role ${userRole} not in allowed roles ${allowedRoles}, redirecting to /`
    );
    return <Navigate to="/" replace />;
  }

  // Authorized
  console.log("PrivateRoute: Authorized, rendering children");
  return <>{children}</>; // render the wrapped component
};

export default PrivateRoute;
