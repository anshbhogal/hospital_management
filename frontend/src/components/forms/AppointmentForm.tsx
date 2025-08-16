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
import { createAppointment, updateAppointment } from "../../api/appointments";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

const appointmentFormSchema = z.object({
  patient_id: z.coerce.number().int().positive({ message: "Patient ID must be a positive integer." }),
  doctor_id: z.coerce.number().int().positive({ message: "Doctor ID must be a positive integer." }),
  appointment_date: z.string().refine((val) => !isNaN(new Date(val).getTime()), { message: "Invalid date format." }),
  status: z.string().optional(),
  notes: z.string().optional(),
});

interface AppointmentFormProps {
  initialData?: any; // For editing existing appointment
  onSuccess?: () => void;
}

export const AppointmentForm = ({ initialData, onSuccess }: AppointmentFormProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof appointmentFormSchema>>({
    resolver: zodResolver(appointmentFormSchema),
    defaultValues: initialData ? {
      ...initialData,
      appointment_date: new Date(initialData.appointment_date).toISOString().split('T')[0],
    } : {
      patient_id: undefined,
      doctor_id: undefined,
      appointment_date: "",
      status: "Scheduled",
      notes: "",
    },
  });

  const createAppointmentMutation = useMutation({
    mutationFn: createAppointment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
      toast({
        title: "Appointment created successfully!",
      });
      form.reset();
      setIsOpen(false);
      onSuccess?.();
    },
    onError: (error: any) => {
      toast({
        title: "Failed to create appointment.",
        description: error.response?.data?.message || "An unknown error occurred.",
        variant: "destructive",
      });
    },
  });

  const updateAppointmentMutation = useMutation({
    mutationFn: ({ appointmentId, data }: { appointmentId: number; data: any }) => updateAppointment(appointmentId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
      toast({
        title: "Appointment updated successfully!",
      });
      setIsOpen(false);
      onSuccess?.();
    },
    onError: (error: any) => {
      toast({
        title: "Failed to update appointment.",
        description: error.response?.data?.message || "An unknown error occurred.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (values: z.infer<typeof appointmentFormSchema>) => {
    if (initialData) {
      updateAppointmentMutation.mutate({ appointmentId: initialData.appointment_id, data: values });
    } else {
      createAppointmentMutation.mutate(values);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>{initialData ? "Edit Appointment" : "Schedule New Appointment"}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{initialData ? "Edit Appointment" : "Schedule New Appointment"}</DialogTitle>
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
              name="appointment_date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Appointment Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <Input placeholder="Scheduled" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Follow-up checkup" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={createAppointmentMutation.isPending || updateAppointmentMutation.isPending}>
              {initialData ? "Save Changes" : "Schedule Appointment"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
