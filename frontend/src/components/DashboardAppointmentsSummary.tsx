import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, User, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

interface Appointment {
  id: string;
  patientName: string;
  doctorName: string;
  time: string;
  type: string;
  status: "scheduled" | "in-progress" | "completed" | "cancelled";
}

const mockAppointments: Appointment[] = [
  {
    id: "1",
    patientName: "Sarah Johnson",
    doctorName: "Dr. Smith",
    time: "09:00 AM",
    type: "General Checkup",
    status: "scheduled"
  },
  {
    id: "2", 
    patientName: "Michael Chen",
    doctorName: "Dr. Williams",
    time: "10:30 AM",
    type: "Cardiology",
    status: "in-progress"
  },
  {
    id: "3",
    patientName: "Emma Davis",
    doctorName: "Dr. Brown", 
    time: "02:00 PM",
    type: "Dermatology",
    status: "scheduled"
  },
  {
    id: "4",
    patientName: "James Wilson",
    doctorName: "Dr. Jones",
    time: "03:30 PM", 
    type: "Orthopedics",
    status: "completed"
  }
];

const getStatusBadge = (status: Appointment["status"]) => {
  const variants = {
    scheduled: "secondary",
    "in-progress": "default", 
    completed: "outline",
    cancelled: "destructive"
  } as const;

  const labels = {
    scheduled: "Scheduled",
    "in-progress": "In Progress",
    completed: "Completed", 
    cancelled: "Cancelled"
  };

  return (
    <Badge variant={variants[status]} className="font-medium">
      {labels[status]}
    </Badge>
  );
};

export const AppointmentsTable = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleViewAll = () => {
    navigate("/appointments");
  };

  return (
    <Card className="gradient-card border-border/50 shadow-medical">
      <CardHeader className="border-b border-border/50">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            Today's Appointments
          </CardTitle>
          <Button variant="outline" size="sm" onClick={handleViewAll}> {/* Add onClick handler */}
            View All
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-border/50">
          {mockAppointments.map((appointment) => (
            <div 
              key={appointment.id} 
              className="p-4 hover:bg-accent/50 transition-smooth"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-10 h-10 bg-primary-light rounded-full">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">
                      {appointment.patientName}
                    </h4>
                    <div className="flex items-center space-x-4 mt-1">
                      <p className="text-sm text-muted-foreground">
                        with {appointment.doctorName}
                      </p>
                      <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>{appointment.time}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <p className="text-sm font-medium text-foreground">
                      {appointment.type}
                    </p>
                    <div className="mt-1">
                      {getStatusBadge(appointment.status)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};