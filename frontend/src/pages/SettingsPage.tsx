import { Layout } from "@/components/Layout";

const SettingsPage = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Settings</h1>
        <p>This page will allow users to manage their application settings.</p>
        {/* TODO: Integrate settings components here */}
      </div>
    </Layout>
  );
};

export default SettingsPage;
