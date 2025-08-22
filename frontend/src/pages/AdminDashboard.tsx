import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

// Dummy data for chart
const appointmentData = [
  { month: "Jan", appointments: 40 },
  { month: "Feb", appointments: 55 },
  { month: "Mar", appointments: 70 },
  { month: "Apr", appointments: 65 },
  { month: "May", appointments: 90 },
];

const AdminDashboard: React.FC = () => {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="shadow-lg rounded-2xl">
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold">Patients</h2>
            <p className="text-2xl font-bold">1,240</p>
          </CardContent>
        </Card>

        <Card className="shadow-lg rounded-2xl">
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold">Doctors</h2>
            <p className="text-2xl font-bold">85</p>
          </CardContent>
        </Card>

        <Card className="shadow-lg rounded-2xl">
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold">Appointments</h2>
            <p className="text-2xl font-bold">320</p>
          </CardContent>
        </Card>

        <Card className="shadow-lg rounded-2xl">
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold">Revenue</h2>
            <p className="text-2xl font-bold">₹ 1.2M</p>
          </CardContent>
        </Card>
      </div>

      {/* Chart */}
      <Card className="shadow-lg rounded-2xl">
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold mb-4">Appointments Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={appointmentData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="appointments" stroke="#8884d8" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
