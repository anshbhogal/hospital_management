import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Download, Eye } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteMedicalRecord } from "../api/medical_records";
import { useToast } from "@/components/ui/use-toast";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

interface MedicalRecordData {
  record_id: number;
  patient_id: number;
  doctor_id: number;
  record_date: string;
  diagnosis: string;
  prescription: string;
  lab_results: string;
  patient?: { name: string; email: string };
  doctor?: { name: string; specialization: string; };
}

interface MedicalRecordsTableProps {
  medicalRecords: MedicalRecordData[];
}

export const MedicalRecordsTable = ({ medicalRecords }: MedicalRecordsTableProps) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const deleteMedicalRecordMutation = useMutation({
    mutationFn: deleteMedicalRecord,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['medicalRecords'] });
      toast({
        title: "Medical record deleted successfully!",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Failed to delete medical record.",
        description: error.response?.data?.message || "An unknown error occurred.",
        variant: "destructive",
      });
    },
  });

  const handleDelete = (recordId: number) => {
    deleteMedicalRecordMutation.mutate(recordId);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Medical Records List</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Patient</TableHead>
              <TableHead>Doctor</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Diagnosis</TableHead>
              <TableHead>Prescription</TableHead>
              <TableHead>Lab Results</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {medicalRecords.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center">No medical records found.</TableCell>
              </TableRow>
            ) : (
              medicalRecords.map((record) => (
                <TableRow key={record.record_id}>
                  <TableCell>{record.patient?.name || `ID: ${record.patient_id}`}</TableCell>
                  <TableCell>{record.doctor?.name || `ID: ${record.doctor_id}`}</TableCell>
                  <TableCell>{new Date(record.record_date).toLocaleDateString()}</TableCell>
                  <TableCell>{record.diagnosis}</TableCell>
                  <TableCell>{record.prescription || 'N/A'}</TableCell>
                  <TableCell>{record.lab_results || 'N/A'}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm"><Pencil className="h-4 w-4" /></Button>
                      <Button variant="outline" size="sm"><Eye className="h-4 w-4" /></Button>
                      <Button variant="outline" size="sm"><Download className="h-4 w-4" /></Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive" size="sm"><Trash2 className="h-4 w-4" /></Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will permanently delete the medical record.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete(record.record_id)}>
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
