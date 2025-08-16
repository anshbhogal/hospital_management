import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, MapPin, Calendar, Phone } from "lucide-react";

interface PatientAppointment {
  id: string;
  doctorName: string;
  specialty: string;
  date: string;
  time: string;
  location: string;
  type: string;
  status: "upcoming" | "completed" | "cancelled";
}

const mockAppointments: PatientAppointment[] = [
  {
    id: "1",
    doctorName: "Dr. Williams",
    specialty: "Cardiology",
    date: "Tomorrow",
    time: "2:00 PM",
    location: "Room 301, Cardiology Wing",
    type: "Follow-up Consultation",
    status: "upcoming"
  },
  {
    id: "2", 
    doctorName: "Dr. Brown",
    specialty: "Dermatology",
    date: "Jan 25, 2025",
    time: "10:30 AM",
    location: "Room 205, Dermatology Dept",
    type: "Routine Checkup",
    status: "upcoming"
  },
  {
    id: "3",
    doctorName: "Dr. Smith",
    specialty: "General Medicine",
    date: "Dec 20, 2024",
    time: "11:00 AM",
    location: "Room 101, General Wing",
    type: "Annual Physical",
    status: "completed"
  }
];

const getStatusBadge = (status: PatientAppointment["status"]) => {
  const variants = {
    upcoming: "default",
    completed: "secondary", 
    cancelled: "destructive"
  } as const;

  const labels = {
    upcoming: "Upcoming",
    completed: "Completed",
    cancelled: "Cancelled"
  };

  return (
    <Badge variant={variants[status]} className="font-medium">
      {labels[status]}
    </Badge>
  );
};

export const PatientAppointments = () => {
  return (
    <Card className="gradient-card border-border/50 shadow-medical">
      <CardHeader className="border-b border-border/50">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            My Appointments
          </CardTitle>
          <Button variant="outline" size="sm">
            Schedule New
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
              <div className="flex items-start justify-between">
                <div className="space-y-3 flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-foreground">
                        {appointment.doctorName}
                      </h4>
                      <p className="text-sm text-primary font-medium">
                        {appointment.specialty}
                      </p>
                    </div>
                    {getStatusBadge(appointment.status)}
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4" />
                      <span>{appointment.date}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4" />
                      <span>{appointment.time}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4" />
                      <span>{appointment.location}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4" />
                      <span>{appointment.type}</span>
                    </div>
                  </div>

                  {appointment.status === "upcoming" && (
                    <div className="flex space-x-2 pt-2">
                      <Button variant="outline" size="sm">
                        Reschedule
                      </Button>
                      <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                        Cancel
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};