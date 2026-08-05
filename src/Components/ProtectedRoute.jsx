import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext.jsx';

/**
 * ProtectedRoute Wrapper Component
 * Enforces JWT authentication and Role Middleware checks for UI routes.
 */
const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user, token, loading } = useAuth();
  const location = useLocation();

  // Show neutral luxury loading state while verifying persistent session
  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[#F7F3EA] dark:bg-[#0B0E14]">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-3 border-[#C9A455]/30 border-t-[#C9A455]" />
          <span className="text-xs font-medium uppercase tracking-widest text-[#8A7A50] dark:text-[#C9A455]">
            Verifying Security Session...
          </span>
        </div>
      </div>
    );
  }

  // If token or verified user is missing, navigate to login saving the intended path and any booking parameters
  if (!token || !user) {
    return <Navigate to="/login" state={{ from: location.pathname + location.search, bookingState: location.state }} replace />;
  }

  // Role Middleware check: Only Admin can access admin dashboard routes
  if (adminOnly && user.role !== 'admin') {
    // Normal Customer cannot access Admin Dashboard -> redirect to Customer Dashboard
    return <Navigate to="/customer/dashboard" replace />;
  }

  // If validation passes, render child elements or child router outlet
  return children ? children : <Outlet />;
};

export default ProtectedRoute;
