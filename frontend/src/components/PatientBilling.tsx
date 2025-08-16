import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Calendar, DollarSign, AlertCircle } from "lucide-react";

interface BillingItem {
  id: string;
  description: string;
  amount: number;
  date: string;
  status: "paid" | "pending" | "overdue";
  dueDate?: string;
}

const mockBilling: BillingItem[] = [
  {
    id: "1",
    description: "Annual Physical Exam",
    amount: 125.00,
    date: "Dec 20, 2024",
    status: "pending",
    dueDate: "Jan 15, 2025"
  },
  {
    id: "2",
    description: "Lab Work - Blood Panel",
    amount: 85.00,
    date: "Dec 18, 2024", 
    status: "paid"
  },
  {
    id: "3",
    description: "Cardiology Consultation",
    amount: 220.00,
    date: "Nov 28, 2024",
    status: "paid"
  },
  {
    id: "4",
    description: "Prescription Copay",
    amount: 15.00,
    date: "Nov 15, 2024",
    status: "paid"
  }
];

const getStatusBadge = (status: BillingItem["status"]) => {
  const variants = {
    paid: "secondary",
    pending: "default",
    overdue: "destructive"
  } as const;

  const labels = {
    paid: "Paid",
    pending: "Pending",
    overdue: "Overdue"
  };

  return (
    <Badge variant={variants[status]} className="font-medium">
      {labels[status]}
    </Badge>
  );
};

export const PatientBilling = () => {
  const totalPending = mockBilling
    .filter(item => item.status === "pending")
    .reduce((sum, item) => sum + item.amount, 0);

  return (
    <Card className="gradient-card border-border/50 shadow-medical">
      <CardHeader className="border-b border-border/50">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-primary" />
            Billing & Payments
          </CardTitle>
          <Button variant="outline" size="sm">
            Pay Now
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        {/* Outstanding Balance */}
        {totalPending > 0 && (
          <div className="bg-warning/10 border border-warning/20 rounded-lg p-4 mb-6">
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 text-warning" />
              <div>
                <p className="font-medium text-foreground">Outstanding Balance</p>
                <p className="text-sm text-muted-foreground">
                  ${totalPending.toFixed(2)} due by Jan 15, 2025
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Recent Billing */}
        <div className="space-y-4">
          {mockBilling.slice(0, 4).map((item) => (
            <div 
              key={item.id} 
              className="flex items-center justify-between p-3 rounded-lg border border-border/50 hover:bg-accent/50 transition-smooth"
            >
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <DollarSign className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground text-sm">
                    {item.description}
                  </p>
                  <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    <span>{item.date}</span>
                    {item.dueDate && item.status === "pending" && (
                      <>
                        <span>•</span>
                        <span>Due: {item.dueDate}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="text-right space-y-1">
                <p className="font-medium text-foreground">
                  ${item.amount.toFixed(2)}
                </p>
                {getStatusBadge(item.status)}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};