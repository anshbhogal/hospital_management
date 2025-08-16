import { Plus, Calendar, FileText, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const quickActions = [
  {
    title: "Book Appointment",
    description: "Schedule with your doctor",
    icon: Calendar,
    action: () => console.log("Book Appointment"),
    color: "bg-gradient-primary"
  },
  {
    title: "Request Prescription",
    description: "Refill medications",
    icon: Plus,
    action: () => console.log("Request Prescription"),
    color: "bg-gradient-secondary"
  },
  {
    title: "Message Doctor",
    description: "Send secure message",
    icon: FileText,
    action: () => console.log("Message Doctor"),
    color: "bg-primary"
  },
  {
    title: "Emergency Contact",
    description: "24/7 support line",
    icon: Phone,
    action: () => console.log("Emergency Contact"),
    color: "bg-destructive"
  }
];

export const PatientQuickActions = () => {
  return (
    <Card className="gradient-card border-border/50 shadow-medical">
      <CardHeader className="border-b border-border/50">
        <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 gap-4">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Button
                key={action.title}
                variant="outline"
                onClick={action.action}
                className="h-auto p-4 flex items-center space-x-3 hover:shadow-medical transition-smooth border-border/50 justify-start"
              >
                <div className={`p-2 rounded-lg ${action.color} flex-shrink-0`}>
                  <Icon className="h-4 w-4 text-white" />
                </div>
                <div className="text-left">
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