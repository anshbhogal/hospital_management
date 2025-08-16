import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { PatientForm } from "./forms/PatientForm";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePatient } from "../api/patients";
import { useToast } from "@/components/ui/use-toast";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

interface PatientData {
  patient_id: number;
  user_id: number;
  name: string;
  email: string;
  phone: string;
  date_of_birth: string;
  address: string;
}

interface PatientsTableProps {
  patients: PatientData[];
}

export const PatientsTable = ({ patients }: PatientsTableProps) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const deletePatientMutation = useMutation({
    mutationFn: deletePatient,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['patients'] });
      toast({
        title: "Patient deleted successfully!",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Failed to delete patient.",
        description: error.response?.data?.message || "An unknown error occurred.",
        variant: "destructive",
      });
    },
  });

  const handleDelete = (patientId: number) => {
    deletePatientMutation.mutate(patientId);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Patients List</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>DOB</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {patients.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center">No patients found.</TableCell>
              </TableRow>
            ) : (
              patients.map((patient) => (
                <TableRow key={patient.patient_id}>
                  <TableCell>{patient.name}</TableCell>
                  <TableCell>{patient.email}</TableCell>
                  <TableCell>{patient.phone}</TableCell>
                  <TableCell>{new Date(patient.date_of_birth).toLocaleDateString()}</TableCell>
                  <TableCell>{patient.address}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <PatientForm initialData={patient} />
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive" size="sm"><Trash2 className="h-4 w-4" /></Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will permanently delete the patient record.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete(patient.patient_id)}>
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
