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
import { AuthProvider, useAuth } from "./context/AuthContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/patient" element={<PatientPortal />} />
            <Route path="/staff" element={<StaffDashboard />} />
            <Route path="/admin" element={<AdminDashboard />} />
            {/* TODO: Add routes for Doctors, Appointments, Medical Records, Billing with appropriate PrivateRoute and allowedRoles */}

            {/* Doctors Management (Admin) */}
            <Route
              path="/doctors"
              element={
                <PrivateRoute allowedRoles={['Admin']}>
                  <DoctorsPage />
                </PrivateRoute>
              }
            />

            {/* Appointments Management (Admin/Doctor/Patient) */}
            <Route
              path="/appointments"
              element={
                <PrivateRoute allowedRoles={['Admin', 'Doctor', 'Patient']}>
                  <AppointmentsPage />
                </PrivateRoute>
              }
            />

            {/* Medical Records Management (Doctor/Patient) */}
            <Route
              path="/records"
              element={
                <PrivateRoute allowedRoles={['Doctor', 'Patient']}>
                  <MedicalRecordsPage />
                </PrivateRoute>
              }
            />

            {/* Billing Management (Admin/Patient) */}
            <Route
              path="/billing"
              element={
                <PrivateRoute allowedRoles={['Admin', 'Patient']}>
                  <BillingPage />
                </PrivateRoute>
              }
            />

            {/* Settings Page (Admin/Doctor/Patient) */}
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
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
