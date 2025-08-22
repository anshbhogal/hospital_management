import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute"; // Import PrivateRoute
import Index from "./pages/Index";
import PatientPortal from "./pages/PatientPortal";
import StaffDashboard from "./pages/StaffDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import PatientsPage from "./pages/PatientsPage";
import DoctorsPage from "./pages/DoctorsPage";
import AppointmentsPage from "./pages/AppointmentsPage";
import MedicalRecordsPage from "./pages/MedicalRecordsPage";
import BillingPage from "./pages/BillingPage";
import SettingsPage from "./pages/SettingsPage";
import HomePage from "./pages/HomePage"; // Import HomePage
import { AuthProvider, useAuth } from "./context/AuthContext";
import ErrorBoundary from "./components/ErrorBoundary"; // Import ErrorBoundary

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <ErrorBoundary> {/* Wrap RouterContent with ErrorBoundary */}
          <RouterContent />
        </ErrorBoundary>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

const RouterContent = () => {
  const { isAuthenticated, userRole } = useAuth();

  const getDashboardPath = (role: string | null): string => {
    switch (role) {
      case "Admin":
        return "/admin";
      case "Doctor":
        return "/"; // Doctor dashboard is the root path for logged in doctors
      case "Patient":
        return "/patient";
      case "Staff":
        return "/staff";
      default:
        return "/login"; // Fallback if no role or unauthenticated
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />

        {/* Root path handling */}
        <Route
          path="/"
          element={
            isAuthenticated() ? (
              <Navigate to={getDashboardPath(userRole)} replace />
            ) : (
              <HomePage />
            )
          }
        />

        {/* Doctor Dashboard is now part of private routes, or accessible directly via / */}
        <Route path="/dashboard" element={<PrivateRoute allowedRoles={["Doctor"]}><Index /></PrivateRoute>} />
        <Route path="/patient" element={<PrivateRoute allowedRoles={["Patient"]}><PatientPortal /></PrivateRoute>} />
        <Route path="/staff" element={<PrivateRoute allowedRoles={["Staff"]}><StaffDashboard /></PrivateRoute>} />
        <Route path="/admin" element={<PrivateRoute allowedRoles={["Admin"]}><AdminDashboard /></PrivateRoute>} />

        {/* Other protected routes */}
        <Route
          path="/doctors"
          element={
            <PrivateRoute allowedRoles={['Admin']}>
              <DoctorsPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/appointments"
          element={
            <PrivateRoute allowedRoles={['Admin', 'Doctor', 'Patient']}>
              <AppointmentsPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/records"
          element={
            <PrivateRoute allowedRoles={['Doctor', 'Patient']}>
              <MedicalRecordsPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/billing"
          element={
            <PrivateRoute allowedRoles={['Admin', 'Patient']}>
              <BillingPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/settings"
          element={
            <PrivateRoute allowedRoles={['Admin', 'Doctor', 'Patient']}>
              <SettingsPage />
            </PrivateRoute>
          }
        />

        {/* Catch-all route for 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
