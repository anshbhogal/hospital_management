import { Layout } from "@/components/Layout";
import { useQuery } from "@tanstack/react-query";
import { getBills } from "../api/billing";
import { BillingTable } from "../components/BillingTable";
import { BillingForm } from "../components/forms/BillingForm";

const BillingPage = () => {
  const { data: billingData, isLoading, isError } = useQuery({ queryKey: ['billing'], queryFn: getBills });

  if (isLoading) return <div>Loading billing records...</div>;
  if (isError) return <div>Error loading billing records.</div>;

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Billing & Payments Management</h1>
          <BillingForm />
        </div>
        <p>This page will display billing records and allow for managing payments.</p>
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">All Billing Records</h2>
          <BillingTable billing={billingData || []} />
        </div>
      </div>
    </Layout>
  );
};

export default BillingPage;
