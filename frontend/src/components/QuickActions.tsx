import { Plus, UserPlus, Calendar, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom"; // Import useNavigate

export const QuickActions = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const quickActions = [
    {
      title: "New Patient",
      description: "Register a new patient",
      icon: UserPlus,
      action: () => navigate("/patients"), // Navigate to patients page
      color: "bg-gradient-primary"
    },
    {
      title: "Schedule Appointment", 
      description: "Book new appointment",
      icon: Calendar,
      action: () => navigate("/appointments"), // Navigate to appointments page
      color: "bg-gradient-secondary"
    },
    {
      title: "Add Record",
      description: "Create medical record",
      icon: FileText,
      action: () => navigate("/records"), // Navigate to medical records page
      color: "bg-primary"
    },
    {
      title: "Emergency",
      description: "Handle emergency case",
      icon: Plus,
      action: () => navigate("/admin"), // Navigate to admin dashboard (or specific emergency page if it exists)
      color: "bg-destructive"
    }
  ];

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