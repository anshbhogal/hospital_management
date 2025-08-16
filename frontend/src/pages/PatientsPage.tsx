import { Layout } from "@/components/Layout";
import { useQuery } from "@tanstack/react-query";
import { getPatients } from "../api/patients";
import { PatientsTable } from "../components/PatientsTable";
import { PatientForm } from "../components/forms/PatientForm";
import { Button } from "@/components/ui/button";

const PatientsPage = () => {
  const { data: patientsData, isLoading, isError } = useQuery({ queryKey: ['patients'], queryFn: getPatients });

  if (isLoading) return <div>Loading patients...</div>;
  if (isError) return <div>Error loading patients.</div>;

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Patients Management</h1>
          <PatientForm />
        </div>
        <p>This page will display a table of patients and allow for CRUD operations.</p>
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">All Patients</h2>
          <PatientsTable patients={patientsData || []} />
        </div>
      </div>
    </Layout>
  );
};

export default PatientsPage;
