import { Layout } from "@/components/Layout";
import { StatsCard } from "@/components/StatsCard";
import { AppointmentsTable } from "@/components/DashboardAppointmentsSummary";
import { QuickActions } from "@/components/QuickActions";
import { RecentActivity } from "@/components/RecentActivity";
import { Users, UserCheck, Calendar, CreditCard } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getPatients } from "../api/patients";
import { getDoctors } from "../api/doctors";
import { getAppointments } from "../api/appointments";
import { getBillingSummary } from "../api/billing"; // Import getBillingSummary
import { useAuth } from "../context/AuthContext";

const Index = () => {
  const { user } = useAuth();

  const { data: patientsData } = useQuery({ queryKey: ['patients'], queryFn: getPatients });
  const { data: doctorsData } = useQuery({ queryKey: ['doctors'], queryFn: getDoctors });
  const { data: appointmentsData } = useQuery({ queryKey: ['appointments'], queryFn: getAppointments });
  const { data: billingSummaryData } = useQuery({ queryKey: ['billingSummary'], queryFn: getBillingSummary }); // Fetch billing summary

  const totalPatients = patientsData ? patientsData.length : 0;
  const activeDoctors = doctorsData ? doctorsData.length : 0;
  const todaysAppointments = appointmentsData ? appointmentsData.filter(app => new Date(app.appointment_date).toDateString() === new Date().toDateString()).length : 0;
  const totalAppointments = appointmentsData ? appointmentsData.length : 0;
  const totalRevenue = billingSummaryData ? parseFloat(billingSummaryData.total_revenue).toLocaleString('en-US', { style: 'currency', currency: 'USD' }) : "$0";

  return (
    <Layout>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-hero rounded-xl p-8 text-white">
          <div className="max-w-3xl">
            <h1 className="text-3xl font-bold mb-3">
              Welcome back, {user?.name || user?.email || 'User'}
            </h1>
            <p className="text-lg opacity-90 mb-6">
              You have {todaysAppointments} appointments today and 3 urgent notifications requiring your attention.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                <span className="text-sm font-medium">Today: {new Date().toLocaleDateString()}</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                <span className="text-sm font-medium">Next Appointment: {appointmentsData && appointmentsData.length > 0 ? new Date(appointmentsData[0].appointment_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'N/A'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Total Patients"
            value={totalPatients.toString()}
            icon={Users}
            change="+12% from last month"
            changeType="positive"
            subtitle="Active patients in system"
          />
          <StatsCard
            title="Active Doctors"
            value={activeDoctors.toString()}
            icon={UserCheck}
            change="2 new this week"
            changeType="positive"
            subtitle="Medical staff on duty"
          />
          <StatsCard
            title="Total Appointments"
            value={totalAppointments.toString()}
            icon={Calendar}
            change="8 pending confirmations"
            changeType="neutral"
            subtitle="Scheduled appointments"
          />
          <StatsCard
            title="Revenue (Month)"
            value={totalRevenue} // Use fetched revenue data
            icon={CreditCard}
            change="+8% from last month"
            changeType="positive"
            subtitle="Current month earnings"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Appointments */}
          <div className="lg:col-span-2">
            <AppointmentsTable appointments={appointmentsData || []} />
          </div>

          {/* Right Column - Quick Actions & Activity */}
          <div className="space-y-6">
            <QuickActions />
            <RecentActivity />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
