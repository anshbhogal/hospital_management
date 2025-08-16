import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, User, FileText, Calendar, CreditCard } from "lucide-react";

interface Activity {
  id: string;
  type: "patient" | "appointment" | "record" | "billing";
  title: string;
  description: string;
  time: string;
  user: string;
}

const mockActivities: Activity[] = [
  {
    id: "1",
    type: "patient",
    title: "New Patient Registered",
    description: "Sarah Johnson added to system",
    time: "2 minutes ago",
    user: "Dr. Smith"
  },
  {
    id: "2", 
    type: "appointment",
    title: "Appointment Completed",
    description: "Michael Chen - Cardiology consultation",
    time: "15 minutes ago",
    user: "Dr. Williams"
  },
  {
    id: "3",
    type: "record", 
    title: "Medical Record Updated",
    description: "Lab results added for Emma Davis",
    time: "1 hour ago",
    user: "Dr. Brown"
  },
  {
    id: "4",
    type: "billing",
    title: "Payment Processed", 
    description: "Invoice #1234 - $250.00",
    time: "2 hours ago",
    user: "Billing Dept"
  }
];

const getActivityIcon = (type: Activity["type"]) => {
  const icons = {
    patient: User,
    appointment: Calendar,
    record: FileText,
    billing: CreditCard
  };
  return icons[type];
};

const getActivityColor = (type: Activity["type"]) => {
  const colors = {
    patient: "bg-primary",
    appointment: "bg-secondary", 
    record: "bg-warning",
    billing: "bg-success"
  };
  return colors[type];
};

export const RecentActivity = () => {
  return (
    <Card className="gradient-card border-border/50 shadow-medical">
      <CardHeader className="border-b border-border/50">
        <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-border/50">
          {mockActivities.map((activity) => {
            const Icon = getActivityIcon(activity.type);
            const colorClass = getActivityColor(activity.type);
            
            return (
              <div 
                key={activity.id} 
                className="p-4 hover:bg-accent/50 transition-smooth"
              >
                <div className="flex items-start space-x-3">
                  <div className={`p-2 rounded-lg ${colorClass} flex-shrink-0`}>
                    <Icon className="h-4 w-4 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-medium text-foreground">
                          {activity.title}
                        </h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          {activity.description}
                        </p>
                        <div className="flex items-center space-x-2 mt-2">
                          <Badge variant="outline" className="text-xs">
                            {activity.user}
                          </Badge>
                          <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            <span>{activity.time}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};