import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, Eye, Calendar } from "lucide-react";

interface MedicalRecord {
  id: string;
  type: string;
  title: string;
  doctor: string;
  date: string;
  status: "new" | "reviewed" | "normal" | "requires-attention";
  summary: string;
}

const mockRecords: MedicalRecord[] = [
  {
    id: "1",
    type: "Lab Results",
    title: "Complete Blood Count",
    doctor: "Dr. Williams",
    date: "Dec 18, 2024",
    status: "new",
    summary: "All values within normal range. Good overall health markers."
  },
  {
    id: "2",
    type: "Imaging",
    title: "Chest X-Ray",
    doctor: "Dr. Smith",
    date: "Dec 20, 2024", 
    status: "normal",
    summary: "Clear lungs, no abnormalities detected."
  },
  {
    id: "3",
    type: "Visit Notes",
    title: "Annual Physical Exam",
    doctor: "Dr. Smith",
    date: "Dec 20, 2024",
    status: "reviewed",
    summary: "Routine physical completed. Patient in excellent health."
  },
  {
    id: "4",
    type: "Lab Results", 
    title: "Cholesterol Panel",
    doctor: "Dr. Williams",
    date: "Nov 15, 2024",
    status: "requires-attention",
    summary: "LDL slightly elevated. Dietary changes recommended."
  }
];

const getStatusBadge = (status: MedicalRecord["status"]) => {
  const variants = {
    new: "default",
    reviewed: "secondary",
    normal: "outline",
    "requires-attention": "destructive"
  } as const;

  const labels = {
    new: "New",
    reviewed: "Reviewed", 
    normal: "Normal",
    "requires-attention": "Needs Attention"
  };

  return (
    <Badge variant={variants[status]} className="font-medium">
      {labels[status]}
    </Badge>
  );
};

const getTypeColor = (type: string) => {
  const colors = {
    "Lab Results": "bg-primary",
    "Imaging": "bg-secondary",
    "Visit Notes": "bg-warning",
    "Prescription": "bg-success"
  };
  return colors[type as keyof typeof colors] || "bg-muted";
};

export const PatientMedicalRecords = () => {
  return (
    <Card className="gradient-card border-border/50 shadow-medical">
      <CardHeader className="border-b border-border/50">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Medical Records
          </CardTitle>
          <Button variant="outline" size="sm">
            View All
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-border/50">
          {mockRecords.map((record) => (
            <div 
              key={record.id} 
              className="p-4 hover:bg-accent/50 transition-smooth"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1">
                  <div className={`p-2 rounded-lg ${getTypeColor(record.type)} flex-shrink-0`}>
                    <FileText className="h-4 w-4 text-white" />
                  </div>
                  <div className="space-y-2 flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-medium text-foreground">
                          {record.title}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {record.type} • {record.doctor}
                        </p>
                      </div>
                      {getStatusBadge(record.status)}
                    </div>
                    
                    <p className="text-sm text-muted-foreground">
                      {record.summary}
                    </p>
                    
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        <span>{record.date}</span>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </Button>
                      </div>
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