import { Layout } from "@/components/Layout";
import { StatsCard } from "@/components/StatsCard";
import { PatientAppointments } from "@/components/PatientAppointments";
import { PatientMedicalRecords } from "@/components/PatientMedicalRecords";
import { PatientBilling } from "@/components/PatientBilling";
import { PatientQuickActions } from "@/components/PatientQuickActions";
import { Calendar, FileText, CreditCard, Heart } from "lucide-react";

const PatientPortal = () => {
  return (
    <Layout>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="gradient-secondary rounded-xl p-8 text-white">
          <div className="max-w-3xl">
            <h1 className="text-3xl font-bold mb-3">
              Welcome back, Sarah Johnson
            </h1>
            <p className="text-lg opacity-90 mb-6">
              You have 2 upcoming appointments and your recent lab results are ready for review.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                <span className="text-sm font-medium">Next Appointment: Tomorrow 2:00 PM</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                <span className="text-sm font-medium">Health Score: Excellent</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Upcoming Appointments"
            value="2"
            icon={Calendar}
            subtitle="Next: Tomorrow 2:00 PM"
            change="Cardiology checkup"
            changeType="neutral"
          />
          <StatsCard
            title="Medical Records"
            value="18"
            icon={FileText}
            subtitle="Last updated: 2 days ago"
            change="New lab results available"
            changeType="positive"
          />
          <StatsCard
            title="Outstanding Balance"
            value="$125.00"
            icon={CreditCard}
            subtitle="Last payment: Dec 15"
            change="Due: Jan 15, 2025"
            changeType="negative"
          />
          <StatsCard
            title="Health Score"
            value="92/100"
            icon={Heart}
            subtitle="Excellent health status"
            change="+5 points this month"
            changeType="positive"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Appointments & Records */}
          <div className="lg:col-span-2 space-y-6">
            <PatientAppointments />
            <PatientMedicalRecords />
          </div>

          {/* Right Column - Quick Actions & Billing */}
          <div className="space-y-6">
            <PatientQuickActions />
            <PatientBilling />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PatientPortal;