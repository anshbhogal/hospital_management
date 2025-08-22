import { Layout } from "@/components/Layout";
// import { StatsCard } from "@/components/StatsCard";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Progress } from "@/components/ui/progress";
// import {
//   DollarSign,
//   Users,
//   Calendar,
//   TrendingUp,
//   UserCheck,
//   Building,
//   AlertCircle,
//   Activity,
//   PieChart,
//   BarChart3,
//   Eye,
//   Settings,
//   Download
// } from "lucide-react";

const AdminDashboard = () => {
  // console.log("AdminDashboard: Component started rendering");

  return (
    <Layout>
      {/* {console.log("AdminDashboard: Rendering Layout with content")} */}
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h1>Hello Admin!</h1>
        <p>If you see this, the basic AdminDashboard component is rendering.</p>
      </div>
    </Layout>
  );
};

export default AdminDashboard;