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
import { createBill, updateBill } from "../../api/billing";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const billingFormSchema = z.object({
  appointment_id: z.coerce.number().int().positive({ message: "Appointment ID must be a positive integer." }),
  patient_id: z.coerce.number().int().positive({ message: "Patient ID must be a positive integer." }),
  total_amount: z.coerce.number().positive({ message: "Total amount must be a positive number." }),
  payment_status: z.enum(["Paid", "Pending", "Overdue"], { message: "Invalid payment status." }),
  insurance_claim: z.boolean(),
});

interface BillingFormProps {
  initialData?: any; // For editing existing bill
  onSuccess?: () => void;
}

export const BillingForm = ({ initialData, onSuccess }: BillingFormProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof billingFormSchema>>({
    resolver: zodResolver(billingFormSchema),
    defaultValues: initialData || {
      appointment_id: undefined,
      patient_id: undefined,
      total_amount: undefined,
      payment_status: "Pending",
      insurance_claim: false,
    },
  });

  const createBillMutation = useMutation({
    mutationFn: createBill,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['billing'] });
      toast({
        title: "Bill created successfully!",
      });
      form.reset();
      setIsOpen(false);
      onSuccess?.();
    },
    onError: (error: any) => {
      toast({
        title: "Failed to create bill.",
        description: error.response?.data?.message || "An unknown error occurred.",
        variant: "destructive",
      });
    },
  });

  const updateBillMutation = useMutation({
    mutationFn: ({ billId, data }: { billId: number; data: any }) => updateBill(billId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['billing'] });
      toast({
        title: "Bill updated successfully!",
      });
      setIsOpen(false);
      onSuccess?.();
    },
    onError: (error: any) => {
      toast({
        title: "Failed to update bill.",
        description: error.response?.data?.message || "An unknown error occurred.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (values: z.infer<typeof billingFormSchema>) => {
    if (initialData) {
      updateBillMutation.mutate({ billId: initialData.bill_id, data: values });
    } else {
      createBillMutation.mutate(values);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>{initialData ? "Edit Bill" : "Create New Bill"}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{initialData ? "Edit Bill" : "Create New Bill"}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4">
            <FormField
              control={form.control}
              name="appointment_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Appointment ID</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="1" {...field} onChange={e => field.onChange(parseInt(e.target.value))}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
              name="total_amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Total Amount</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.01" placeholder="100.00" {...field} onChange={e => field.onChange(parseFloat(e.target.value))}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="payment_status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Payment Status</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Paid">Paid</SelectItem>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="Overdue">Overdue</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="insurance_claim"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                  <FormControl>
                    <input type="checkbox" checked={field.value} onChange={field.onChange} />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Insurance Claim</FormLabel>
                    <FormDescription>Check if this bill is subject to an insurance claim.</FormDescription>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={createBillMutation.isPending || updateBillMutation.isPending}>
              {initialData ? "Save Changes" : "Create Bill"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
