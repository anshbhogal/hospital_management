import { Layout } from "@/components/Layout";
import { StatsCard } from "@/components/StatsCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Calendar, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  UserCheck,
  FileText,
  Phone,
  MapPin
} from "lucide-react";

const StaffDashboard = () => {
  const tasks = [
    {
      id: "1",
      title: "Schedule Dr. Smith's appointments",
      priority: "high",
      status: "pending",
      dueTime: "10:00 AM",
      department: "Cardiology"
    },
    {
      id: "2", 
      title: "Update patient discharge papers",
      priority: "medium",
      status: "in-progress",
      dueTime: "2:00 PM",
      department: "General Ward"
    },
    {
      id: "3",
      title: "Coordinate lab results delivery",
      priority: "high",
      status: "pending",
      dueTime: "11:30 AM",
      department: "Laboratory"
    },
    {
      id: "4",
      title: "Room cleaning checklist",
      priority: "low",
      status: "completed",
      dueTime: "9:00 AM",
      department: "Housekeeping"
    }
  ];

  const appointments = [
    {
      id: "1",
      patientName: "Sarah Johnson",
      doctorName: "Dr. Williams",
      time: "10:00 AM",
      type: "Consultation",
      room: "Room 301",
      status: "confirmed"
    },
    {
      id: "2",
      patientName: "Mike Chen",
      doctorName: "Dr. Brown", 
      time: "10:30 AM",
      type: "Follow-up",
      room: "Room 205",
      status: "waiting"
    },
    {
      id: "3",
      patientName: "Emma Davis",
      doctorName: "Dr. Smith",
      time: "11:00 AM", 
      type: "Check-up",
      room: "Room 101",
      status: "in-progress"
    }
  ];

  const getPriorityBadge = (priority: string) => {
    const variants = {
      high: "destructive",
      medium: "default",
      low: "secondary"
    } as const;
    
    return (
      <Badge variant={variants[priority as keyof typeof variants]}>
        {priority.charAt(0).toUpperCase() + priority.slice(1)}
      </Badge>
    );
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: "outline",
      "in-progress": "default",
      completed: "secondary",
      confirmed: "secondary",
      waiting: "outline"
    } as const;

    return (
      <Badge variant={variants[status as keyof typeof variants]}>
        {status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
      </Badge>
    );
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="gradient-secondary rounded-xl p-8 text-white">
          <div className="max-w-3xl">
            <h1 className="text-3xl font-bold mb-3">
              Good morning, Jennifer Martinez
            </h1>
            <p className="text-lg opacity-90 mb-6">
              You have 8 tasks pending today and 12 appointments to coordinate.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                <span className="text-sm font-medium">Next Task: 10:00 AM</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                <span className="text-sm font-medium">Department: Reception</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Today's Tasks"
            value="8"
            icon={FileText}
            subtitle="3 high priority"
            change="2 completed this morning"
            changeType="positive"
          />
          <StatsCard
            title="Appointments"
            value="12"
            icon={Calendar}
            subtitle="Next: 10:00 AM"
            change="3 confirmed today"
            changeType="positive"
          />
          <StatsCard
            title="Patient Check-ins"
            value="6"
            icon={UserCheck}
            subtitle="2 waiting"
            change="Average wait: 15 min"
            changeType="neutral"
          />
          <StatsCard
            title="Active Doctors"
            value="5"
            icon={Users}
            subtitle="On duty today"
            change="Dr. Smith available at 2 PM"
            changeType="positive"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Task Management */}
          <Card className="gradient-card border-border/50 shadow-medical">
            <CardHeader className="border-b border-border/50">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  Today's Tasks
                </CardTitle>
                <Button variant="outline" size="sm">
                  Add Task
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border/50">
                {tasks.map((task) => (
                  <div 
                    key={task.id} 
                    className="p-4 hover:bg-accent/50 transition-smooth"
                  >
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <h4 className="font-medium text-foreground">
                            {task.title}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {task.department} • Due: {task.dueTime}
                          </p>
                        </div>
                        <div className="flex space-x-2">
                          {getPriorityBadge(task.priority)}
                          {getStatusBadge(task.status)}
                        </div>
                      </div>
                      
                      {task.status === "pending" && (
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            Start Task
                          </Button>
                          <Button variant="ghost" size="sm">
                            Reschedule
                          </Button>
                        </div>
                      )}
                      
                      {task.status === "in-progress" && (
                        <div className="flex space-x-2">
                          <Button variant="default" size="sm">
                            Mark Complete
                          </Button>
                          <Button variant="ghost" size="sm">
                            Add Note
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Appointment Coordination */}
          <Card className="gradient-card border-border/50 shadow-medical">
            <CardHeader className="border-b border-border/50">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  Appointment Coordination
                </CardTitle>
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border/50">
                {appointments.map((appointment) => (
                  <div 
                    key={appointment.id} 
                    className="p-4 hover:bg-accent/50 transition-smooth"
                  >
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <h4 className="font-medium text-foreground">
                            {appointment.patientName}
                          </h4>
                          <p className="text-sm text-primary font-medium">
                            {appointment.doctorName}
                          </p>
                        </div>
                        {getStatusBadge(appointment.status)}
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4" />
                          <span>{appointment.time}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4" />
                          <span>{appointment.room}</span>
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        {appointment.status === "waiting" && (
                          <>
                            <Button variant="outline" size="sm">
                              Call Patient
                            </Button>
                            <Button variant="ghost" size="sm">
                              Notify Doctor
                            </Button>
                          </>
                        )}
                        {appointment.status === "confirmed" && (
                          <>
                            <Button variant="outline" size="sm">
                              Check In
                            </Button>
                            <Button variant="ghost" size="sm">
                              Reschedule
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="gradient-card border-border/50 shadow-medical">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button variant="outline" className="h-auto p-4 flex-col space-y-2">
                <Phone className="h-6 w-6 mb-1" />
                <span className="text-sm">Call Patient</span>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex-col space-y-2">
                <Calendar className="h-6 w-6 mb-1" />
                <span className="text-sm">Schedule</span>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex-col space-y-2">
                <AlertTriangle className="h-6 w-6 mb-1" />
                <span className="text-sm">Emergency</span>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex-col space-y-2">
                <FileText className="h-6 w-6 mb-1" />
                <span className="text-sm">Reports</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default StaffDashboard;