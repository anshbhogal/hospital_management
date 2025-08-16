import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { addMedicalRecord, updateMedicalRecord } from "../../api/medical_records";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";

const medicalRecordFormSchema = z.object({
  patient_id: z.coerce.number().int().positive({ message: "Patient ID must be a positive integer." }),
  doctor_id: z.coerce.number().int().positive({ message: "Doctor ID must be a positive integer." }),
  record_date: z.string().refine((val) => !isNaN(new Date(val).getTime()), { message: "Invalid date format." }),
  diagnosis: z.string().min(1, { message: "Diagnosis is required." }),
  prescription: z.string().optional(),
  lab_results: z.string().optional(),
});

interface MedicalRecordFormProps {
  initialData?: any; // For editing existing record
  onSuccess?: () => void;
}

export const MedicalRecordForm = ({ initialData, onSuccess }: MedicalRecordFormProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof medicalRecordFormSchema>>({
    resolver: zodResolver(medicalRecordFormSchema),
    defaultValues: initialData ? {
      ...initialData,
      record_date: new Date(initialData.record_date).toISOString().split('T')[0],
    } : {
      patient_id: undefined,
      doctor_id: undefined,
      record_date: "",
      diagnosis: "",
      prescription: "",
      lab_results: "",
    },
  });

  const addMedicalRecordMutation = useMutation({
    mutationFn: addMedicalRecord,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['medicalRecords'] });
      toast({
        title: "Medical record added successfully!",
      });
      form.reset();
      setIsOpen(false);
      onSuccess?.();
    },
    onError: (error: any) => {
      toast({
        title: "Failed to add medical record.",
        description: error.response?.data?.message || "An unknown error occurred.",
        variant: "destructive",
      });
    },
  });

  const updateMedicalRecordMutation = useMutation({
    mutationFn: ({ recordId, data }: { recordId: number; data: any }) => updateMedicalRecord(recordId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['medicalRecords'] });
      toast({
        title: "Medical record updated successfully!",
      });
      setIsOpen(false);
      onSuccess?.();
    },
    onError: (error: any) => {
      toast({
        title: "Failed to update medical record.",
        description: error.response?.data?.message || "An unknown error occurred.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (values: z.infer<typeof medicalRecordFormSchema>) => {
    if (initialData) {
      updateMedicalRecordMutation.mutate({ recordId: initialData.record_id, data: values });
    } else {
      addMedicalRecordMutation.mutate(values);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>{initialData ? "Edit Medical Record" : "Add New Medical Record"}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{initialData ? "Edit Medical Record" : "Add New Medical Record"}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4">
            <FormField
              control={form.control}
              name="patient_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Patient ID</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="1" {...field} onChange={e => field.onChange(parseInt(e.target.value))}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="doctor_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Doctor ID</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="1" {...field} onChange={e => field.onChange(parseInt(e.target.value))}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="record_date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Record Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="diagnosis"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Diagnosis</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter diagnosis" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="prescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Prescription</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter prescription (optional)" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lab_results"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lab Results</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter lab results (optional)" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={addMedicalRecordMutation.isPending || updateMedicalRecordMutation.isPending}>
              {initialData ? "Save Changes" : "Add Medical Record"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
