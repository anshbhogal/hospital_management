import { Layout } from "@/components/Layout";
import { useQuery } from "@tanstack/react-query";
import { getAllMedicalRecords } from "../api/medical_records";
import { MedicalRecordsTable } from "../components/MedicalRecordsTable";
import { MedicalRecordForm } from "../components/forms/MedicalRecordForm";

const MedicalRecordsPage = () => {
  const { data: medicalRecordsData, isLoading, isError } = useQuery({ queryKey: ['medicalRecords'], queryFn: getAllMedicalRecords });

  if (isLoading) return <div>Loading medical records...</div>;
  if (isError) return <div>Error loading medical records.</div>;

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Medical Records Management</h1>
          <MedicalRecordForm />
        </div>
        <p>This page will display medical records and allow for adding/viewing.</p>
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">All Medical Records</h2>
          <MedicalRecordsTable medicalRecords={medicalRecordsData || []} />
        </div>
      </div>
    </Layout>
  );
};

export default MedicalRecordsPage;
