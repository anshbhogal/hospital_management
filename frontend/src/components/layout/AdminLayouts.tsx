import React from "react";
import { Link } from "react-router-dom";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-4 flex flex-col">
        <h2 className="text-xl font-bold mb-6">Hospital Admin</h2>
        <nav className="flex flex-col gap-4">
          <Link to="/admin" className="hover:bg-gray-700 p-2 rounded">
            Dashboard
          </Link>
          <Link to="/admin/patients" className="hover:bg-gray-700 p-2 rounded">
            Patients
          </Link>
          <Link to="/admin/doctors" className="hover:bg-gray-700 p-2 rounded">
            Doctors
          </Link>
          <Link to="/admin/appointments" className="hover:bg-gray-700 p-2 rounded">
            Appointments
          </Link>
          <Link to="/admin/billing" className="hover:bg-gray-700 p-2 rounded">
            Billing
          </Link>
          <Link to="/admin/reports" className="hover:bg-gray-700 p-2 rounded">
            Reports
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-50 overflow-y-auto">{children}</main>
    </div>
  );
};

export default AdminLayout;
