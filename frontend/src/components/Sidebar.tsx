import { 
  Calendar, 
  Users, 
  UserCheck, 
  FileText, 
  CreditCard, 
  BarChart3, 
  Settings,
  Stethoscope,
  User,
  Shield,
  UserCog,
  LogIn,
  LogOut
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Import useAuth

const navigation = [
  { name: "Login / Register", icon: LogIn, href: "/login", allowedRoles: ["Guest"] },
  { name: "Doctor Dashboard", icon: Stethoscope, href: "/", allowedRoles: ["Doctor"] },
  { name: "Patient Portal", icon: User, href: "/patient", allowedRoles: ["Patient"] },
  { name: "Staff Dashboard", icon: UserCog, href: "/staff", allowedRoles: ["Staff"] },
  { name: "Admin Dashboard", icon: Shield, href: "/admin", allowedRoles: ["Admin"] },
  { name: "Patients", icon: Users, href: "/patients", allowedRoles: ["Admin", "Staff"] },
  { name: "Doctors", icon: UserCheck, href: "/doctors", allowedRoles: ["Admin"] },
  { name: "Appointments", icon: Calendar, href: "/appointments", allowedRoles: ["Admin", "Doctor", "Patient"] },
  { name: "Medical Records", icon: FileText, href: "/records", allowedRoles: ["Doctor", "Patient"] },
  { name: "Billing", icon: CreditCard, href: "/billing", allowedRoles: ["Admin", "Patient"] },
  { name: "Reports", icon: BarChart3, href: "/reports", allowedRoles: ["Admin"] },
  { name: "Settings", icon: Settings, href: "/settings", allowedRoles: ["Admin", "Doctor", "Patient", "Staff"] },
];

export const Sidebar = () => {
  const location = useLocation();
  const { user, userRole, isAuthenticated, logout } = useAuth(); // Destructure user, userRole, isAuthenticated, logout

  const filteredNavigation = navigation.filter(item => {
    if (item.allowedRoles.includes("Guest") && !isAuthenticated()) {
      return true; // Show Login/Register to unauthenticated users
    }
    if (isAuthenticated() && item.allowedRoles.includes(userRole)) {
      return true; // Show if authenticated and role matches
    }
    return false;
  });

  return (
    <div className="hidden md:flex md:w-64 md:flex-col">
      <div className="flex flex-col flex-grow pt-5 overflow-y-auto bg-sidebar border-r border-sidebar-border">
        {/* Logo */}
        <div className="flex items-center flex-shrink-0 px-4 mb-8">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-primary rounded-lg">
              <Stethoscope className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-sidebar-foreground">MediCare</h2>
              <p className="text-xs text-sidebar-foreground/70">Hospital Management</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-5 flex-1 px-2 space-y-1">
          {filteredNavigation.map((item) => {
            const Icon = item.icon;
            const isCurrentPath = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`
                  group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-smooth
                  ${isCurrentPath 
                    ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-primary" 
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  }
                `}
              >
                <Icon className="mr-3 h-5 w-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* User Info and Logout */}
        {isAuthenticated() && user ? (
          <div className="flex-shrink-0 p-4 border-t border-sidebar-border">
            <div className="flex items-center space-x-3 mb-4">
              <div className="h-8 w-8 bg-gradient-secondary rounded-full flex items-center justify-center">
                <span className="text-secondary-foreground text-sm font-medium">{user.name ? user.name.charAt(0).toUpperCase() : ''}{user.name && user.name.split(' ').length > 1 ? user.name.split(' ')[1].charAt(0).toUpperCase() : ''}</span>
              </div>
              <div>
                <p className="text-sm font-medium text-sidebar-foreground">{user.name}</p>
                <p className="text-xs text-sidebar-foreground/70">{userRole}</p>
              </div>
            </div>
            <button
              onClick={logout}
              className="w-full flex items-center justify-center px-3 py-2 text-sm font-medium rounded-md transition-smooth text-sidebar-foreground hover:bg-red-500 hover:text-white"
            >
              <LogOut className="mr-3 h-5 w-5" />
              Logout
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};