import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAppointment } from "../api/appointments";
import { useToast } from "@/components/ui/use-toast";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { AppointmentForm } from "./forms/AppointmentForm";

interface AppointmentData {
  appointment_id: number;
  patient_id: number;
  doctor_id: number;
  appointment_date: string;
  status: string;
  notes: string | null;
  patient?: { name: string; email: string };
  doctor?: { name: string; email: string; specialization?: string };
}

interface AppointmentsTableProps {
  appointments: AppointmentData[];
}

const getStatusBadge = (status: string) => {
  let variant: "secondary" | "default" | "outline" | "destructive" = "secondary";
  let label = status;

  switch (status.toLowerCase()) {
    case "scheduled":
      variant = "secondary";
      break;
    case "in-progress":
      variant = "default";
      label = "In Progress";
      break;
    case "completed":
      variant = "outline";
      break;
    case "cancelled":
      variant = "destructive";
      break;
    default:
      variant = "secondary";
  }

  return (
    <Badge variant={variant} className="font-medium">
      {label}
    </Badge>
  );
};

export const AppointmentsTable = ({ appointments }: AppointmentsTableProps) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const deleteAppointmentMutation = useMutation({
    mutationFn: deleteAppointment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
      toast({
        title: "Appointment deleted successfully!",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Failed to delete appointment.",
        description: error.response?.data?.message || "An unknown error occurred.",
        variant: "destructive",
      });
    },
  });

  const handleDelete = (appointmentId: number) => {
    deleteAppointmentMutation.mutate(appointmentId);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Appointments List</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Patient</TableHead>
              <TableHead>Doctor</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Notes</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {appointments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center">No appointments found.</TableCell>
              </TableRow>
            ) : (
              appointments.map((appointment) => (
                <TableRow key={appointment.appointment_id}>
                  <TableCell>{appointment.patient?.name || `ID: ${appointment.patient_id}`}</TableCell>
                  <TableCell>{appointment.doctor?.name || `ID: ${appointment.doctor_id}`}</TableCell>
                  <TableCell>{new Date(appointment.appointment_date).toLocaleDateString()}</TableCell>
                  <TableCell>{new Date(appointment.appointment_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</TableCell>
                  <TableCell>{getStatusBadge(appointment.status)}</TableCell>
                  <TableCell>{appointment.notes || 'N/A'}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <AppointmentForm initialData={appointment} />
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive" size="sm"><Trash2 className="h-4 w-4" /></Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will permanently delete the appointment record.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete(appointment.appointment_id)}>
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
