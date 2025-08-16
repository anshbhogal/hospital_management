import { Layout } from "@/components/Layout";
import { useQuery } from "@tanstack/react-query";
import { getDoctors } from "../api/doctors";
import { DoctorsTable } from "../components/DoctorsTable";
import { DoctorForm } from "../components/forms/DoctorForm";

const DoctorsPage = () => {
  const { data: doctorsData, isLoading, isError } = useQuery({ queryKey: ['doctors'], queryFn: getDoctors });

  if (isLoading) return <div>Loading doctors...</div>;
  if (isError) return <div>Error loading doctors.</div>;

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Doctors Management</h1>
          <DoctorForm />
        </div>
        <p>This page will display a table of doctors and allow for CRUD operations.</p>
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">All Doctors</h2>
          <DoctorsTable doctors={doctorsData || []} />
        </div>
      </div>
    </Layout>
  );
};

export default DoctorsPage;
