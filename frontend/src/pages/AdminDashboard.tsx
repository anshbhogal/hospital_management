import { Layout } from "@/components/Layout";
import { StatsCard } from "@/components/StatsCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  DollarSign, 
  Users, 
  Calendar, 
  TrendingUp,
  UserCheck,
  Building,
  AlertCircle,
  Activity,
  PieChart,
  BarChart3,
  Eye,
  Settings,
  Download
} from "lucide-react";

const AdminDashboard = () => {
  const revenueData = [
    { month: "Jan", amount: 45000, target: 50000 },
    { month: "Feb", amount: 52000, target: 50000 },
    { month: "Mar", amount: 48000, target: 50000 },
    { month: "Apr", amount: 61000, target: 55000 },
    { month: "May", amount: 58000, target: 55000 },
    { month: "Jun", amount: 67000, target: 60000 }
  ];

  const departmentStats = [
    { name: "Cardiology", patients: 145, revenue: 28500, utilization: 87 },
    { name: "Orthopedics", patients: 98, revenue: 19600, utilization: 76 },
    { name: "Pediatrics", patients: 167, revenue: 12500, utilization: 92 },
    { name: "Emergency", patients: 234, revenue: 35000, utilization: 95 },
    { name: "Surgery", patients: 56, revenue: 45000, utilization: 68 }
  ];

  const staffAttendance = [
    { name: "Dr. Williams", department: "Cardiology", status: "present", shiftStart: "8:00 AM" },
    { name: "Dr. Brown", department: "Dermatology", status: "present", shiftStart: "9:00 AM" },
    { name: "Dr. Smith", department: "General", status: "absent", shiftStart: "8:00 AM" },
    { name: "Nurse Johnson", department: "Emergency", status: "present", shiftStart: "7:00 AM" },
    { name: "Tech Martinez", department: "Laboratory", status: "late", shiftStart: "8:30 AM" }
  ];

  const systemAlerts = [
    { id: "1", type: "warning", message: "Equipment maintenance due in Lab-B", time: "10 min ago" },
    { id: "2", type: "info", message: "New patient registration system update", time: "1 hour ago" },
    { id: "3", type: "critical", message: "Emergency room capacity at 95%", time: "5 min ago" },
    { id: "4", type: "success", message: "Monthly revenue target achieved", time: "2 hours ago" }
  ];

  const getStatusBadge = (status: string) => {
    const variants = {
      present: "secondary",
      absent: "destructive", 
      late: "outline"
    } as const;

    const colors = {
      present: "text-success",
      absent: "text-destructive",
      late: "text-warning"
    } as const;

    return (
      <Badge variant={variants[status as keyof typeof variants]}>
        <div className={`w-2 h-2 rounded-full mr-2 ${
          status === 'present' ? 'bg-success' : 
          status === 'absent' ? 'bg-destructive' : 
          'bg-warning'
        }`} />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "critical": return <AlertCircle className="h-4 w-4 text-destructive" />;
      case "warning": return <AlertCircle className="h-4 w-4 text-warning" />;
      case "success": return <UserCheck className="h-4 w-4 text-success" />;
      default: return <Activity className="h-4 w-4 text-primary" />;
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="gradient-hero rounded-xl p-8 text-white">
          <div className="max-w-4xl">
            <h1 className="text-3xl font-bold mb-3">
              Hospital Administration Dashboard
            </h1>
            <p className="text-lg opacity-90 mb-6">
              Comprehensive overview of hospital operations, revenue, and staff management.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                <span className="text-sm font-medium">Today's Revenue: $12,450</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                <span className="text-sm font-medium">Staff Present: 89/95</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                <span className="text-sm font-medium">Bed Occupancy: 76%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Monthly Revenue"
            value="$67,000"
            icon={DollarSign}
            subtitle="Target: $60,000"
            change="+12% vs last month"
            changeType="positive"
          />
          <StatsCard
            title="Active Patients"
            value="1,247"
            icon={Users}
            subtitle="452 new this month"
            change="+8% patient growth"
            changeType="positive"
          />
          <StatsCard
            title="Staff Attendance"
            value="94%"
            icon={UserCheck}
            subtitle="89 of 95 present"
            change="6 staff members absent"
            changeType="negative"
          />
          <StatsCard
            title="Bed Occupancy"
            value="76%"
            icon={Building}
            subtitle="152 of 200 beds"
            change="Optimal occupancy level"
            changeType="positive"
          />
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Revenue Analytics */}
          <div className="lg:col-span-2">
            <Card className="gradient-card border-border/50 shadow-medical">
              <CardHeader className="border-b border-border/50">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    Revenue Analytics
                  </CardTitle>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-1" />
                      Export
                    </Button>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-1" />
                      View Details
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  {revenueData.map((data, index) => (
                    <div key={data.month} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">{data.month} 2024</span>
                        <span className="text-muted-foreground">
                          ${data.amount.toLocaleString()} / ${data.target.toLocaleString()}
                        </span>
                      </div>
                      <Progress 
                        value={(data.amount / data.target) * 100} 
                        className="h-2"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Target Achievement: {Math.round((data.amount / data.target) * 100)}%</span>
                        <span className={data.amount >= data.target ? "text-success" : "text-warning"}>
                          {data.amount >= data.target ? "Target Met" : "Below Target"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* System Alerts */}
          <Card className="gradient-card border-border/50 shadow-medical">
            <CardHeader className="border-b border-border/50">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-primary" />
                System Alerts
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border/50">
                {systemAlerts.map((alert) => (
                  <div 
                    key={alert.id} 
                    className="p-4 hover:bg-accent/50 transition-smooth"
                  >
                    <div className="flex items-start space-x-3">
                      {getAlertIcon(alert.type)}
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium text-foreground">
                          {alert.message}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {alert.time}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Department Performance & Staff Attendance */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Department Performance */}
          <Card className="gradient-card border-border/50 shadow-medical">
            <CardHeader className="border-b border-border/50">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <PieChart className="h-5 w-5 text-primary" />
                Department Performance
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border/50">
                {departmentStats.map((dept) => (
                  <div 
                    key={dept.name} 
                    className="p-4 hover:bg-accent/50 transition-smooth"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-foreground">{dept.name}</h4>
                        <span className="text-sm font-medium text-success">
                          ${dept.revenue.toLocaleString()}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Patients: </span>
                          <span className="font-medium">{dept.patients}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Utilization: </span>
                          <span className="font-medium">{dept.utilization}%</span>
                        </div>
                      </div>
                      
                      <Progress value={dept.utilization} className="h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Staff Attendance */}
          <Card className="gradient-card border-border/50 shadow-medical">
            <CardHeader className="border-b border-border/50">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <UserCheck className="h-5 w-5 text-primary" />
                  Staff Attendance
                </CardTitle>
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4 mr-1" />
                  Manage
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border/50">
                {staffAttendance.map((staff, index) => (
                  <div 
                    key={index} 
                    className="p-4 hover:bg-accent/50 transition-smooth"
                  >
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <h4 className="font-medium text-foreground">{staff.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {staff.department} • Shift: {staff.shiftStart}
                        </p>
                      </div>
                      {getStatusBadge(staff.status)}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Admin Quick Actions */}
        <Card className="gradient-card border-border/50 shadow-medical">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Administrative Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              <Button variant="outline" className="h-auto p-4 flex-col space-y-2">
                <Users className="h-6 w-6 mb-1" />
                <span className="text-sm">User Management</span>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex-col space-y-2">
                <BarChart3 className="h-6 w-6 mb-1" />
                <span className="text-sm">Reports</span>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex-col space-y-2">
                <Building className="h-6 w-6 mb-1" />
                <span className="text-sm">Facilities</span>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex-col space-y-2">
                <Calendar className="h-6 w-6 mb-1" />
                <span className="text-sm">Scheduling</span>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex-col space-y-2">
                <DollarSign className="h-6 w-6 mb-1" />
                <span className="text-sm">Billing</span>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex-col space-y-2">
                <Settings className="h-6 w-6 mb-1" />
                <span className="text-sm">Settings</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default AdminDashboard;