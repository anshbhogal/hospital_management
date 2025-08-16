import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBill } from "../api/billing";
import { useToast } from "@/components/ui/use-toast";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { BillingForm } from "./forms/BillingForm";

interface BillingData {
  bill_id: number;
  appointment_id: number;
  patient_id: number;
  total_amount: string;
  payment_status: string;
  insurance_claim: boolean;
  appointment?: { appointment_date: string; };
}

interface BillingTableProps {
  billing: BillingData[];
}

const getStatusBadge = (status: string) => {
  let variant: "secondary" | "default" | "destructive" = "default";
  let label = status;

  switch (status.toLowerCase()) {
    case "paid":
      variant = "secondary";
      break;
    case "pending":
      variant = "default";
      break;
    case "overdue":
      variant = "destructive";
      break;
    default:
      variant = "default";
  }

  return (
    <Badge variant={variant} className="font-medium">
      {label}
    </Badge>
  );
};

export const BillingTable = ({ billing }: BillingTableProps) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const deleteBillMutation = useMutation({
    mutationFn: deleteBill,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['billing'] });
      toast({
        title: "Bill deleted successfully!",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Failed to delete bill.",
        description: error.response?.data?.message || "An unknown error occurred.",
        variant: "destructive",
      });
    },
  });

  const handleDelete = (billId: number) => {
    deleteBillMutation.mutate(billId);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Billing Records</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Bill ID</TableHead>
              <TableHead>Appointment ID</TableHead>
              <TableHead>Patient ID</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Insurance Claim</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {billing.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center">No billing records found.</TableCell>
              </TableRow>
            ) : (
              billing.map((bill) => (
                <TableRow key={bill.bill_id}>
                  <TableCell>{bill.bill_id}</TableCell>
                  <TableCell>{bill.appointment_id}</TableCell>
                  <TableCell>{bill.patient_id}</TableCell>
                  <TableCell>${parseFloat(bill.total_amount).toFixed(2)}</TableCell>
                  <TableCell>{getStatusBadge(bill.payment_status)}</TableCell>
                  <TableCell>{bill.insurance_claim ? 'Yes' : 'No'}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <BillingForm initialData={bill} />
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive" size="sm"><Trash2 className="h-4 w-4" /></Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will permanently delete the billing record.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete(bill.bill_id)}>
                              Continue
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
