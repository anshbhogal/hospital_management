import { Layout } from "@/components/Layout";
import { useQuery } from "@tanstack/react-query";
import { getAppointments } from "../api/appointments";
import { AppointmentsTable } from "../components/AppointmentsTable";
import { AppointmentForm } from "../components/forms/AppointmentForm";

const AppointmentsPage = () => {
  const { data: appointmentsData, isLoading, isError } = useQuery({ queryKey: ['appointments'], queryFn: getAppointments });

  if (isLoading) return <div>Loading appointments...</div>;
  if (isError) return <div>Error loading appointments.</div>;

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Appointments Management</h1>
          <AppointmentForm />
        </div>
        <p>This page will display a table of appointments and allow for CRUD operations.</p>
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">All Appointments</h2>
          <AppointmentsTable appointments={appointmentsData || []} />
        </div>
      </div>
    </Layout>
  );
};

export default AppointmentsPage;
