import { Plus, UserPlus, Calendar, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const quickActions = [
  {
    title: "New Patient",
    description: "Register a new patient",
    icon: UserPlus,
    action: () => console.log("New Patient"),
    color: "bg-gradient-primary"
  },
  {
    title: "Schedule Appointment", 
    description: "Book new appointment",
    icon: Calendar,
    action: () => console.log("Schedule Appointment"),
    color: "bg-gradient-secondary"
  },
  {
    title: "Add Record",
    description: "Create medical record",
    icon: FileText,
    action: () => console.log("Add Record"),
    color: "bg-primary"
  },
  {
    title: "Emergency",
    description: "Handle emergency case",
    icon: Plus,
    action: () => console.log("Emergency"),
    color: "bg-destructive"
  }
];

export const QuickActions = () => {
  return (
    <Card className="gradient-card border-border/50 shadow-medical">
      <CardHeader className="border-b border-border/50">
        <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-2 gap-4">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Button
                key={action.title}
                variant="outline"
                onClick={action.action}
                className="h-auto p-4 flex flex-col items-center space-y-2 hover:shadow-medical transition-smooth border-border/50"
              >
                <div className={`p-3 rounded-lg ${action.color}`}>
                  <Icon className="h-5 w-5 text-white" />
                </div>
                <div className="text-center">
                  <p className="font-medium text-foreground">{action.title}</p>
                  <p className="text-xs text-muted-foreground">{action.description}</p>
                </div>
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};