"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  fullName: z.string().min(3, { message: "Full name is required." }),
  profession: z.string().min(3, { message: "Profession is required." }),
  practiceNumber: z.string().optional(),
  qualifications: z.string().min(10, { message: "Please list your qualifications." }),
  services: z.string().min(10, { message: "Please list the services you offer." }),
  availability: z.string().min(5, { message: "Please describe your availability." }),
  contact: z.string().min(5, { message: "A contact method is required." }),
});

export function ProviderRegistrationForm() {
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      profession: "",
      practiceNumber: "",
      qualifications: "",
      services: "",
      availability: "",
      contact: "",
    },
  });

  // AI could be used here to parse the "qualifications" and "services" text
  // and convert them into structured tags for better filtering and display.
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: "Registration Submitted",
      description: "Thank you! An admin will review your registration and be in touch.",
    });
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle>Register as a Well-being Provider</DialogTitle>
        <DialogDescription>
          Partner with us to provide care and support to the community. All registrations are subject to verification.
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-h-[70vh] overflow-y-auto pr-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Dr. Jane Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="profession"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Profession</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Certified Counselor" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="practiceNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Practice / License Number (if applicable)</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="qualifications"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Qualifications & Certifications</FormLabel>
                <FormControl>
                  <Textarea placeholder="List your degrees, certifications, and relevant training." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
           <FormField
            control={form.control}
            name="services"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Services Offered</FormLabel>
                <FormControl>
                  <Textarea placeholder="e.g., Individual Counseling, Marriage Counseling, Financial Coaching..." {...field} />
                </FormControl>
                <FormDescription>AI can help categorize these into searchable tags later.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
           <FormField
            control={form.control}
            name="availability"
            render={({ field }) => (
              <FormItem>
                <FormLabel>General Availability</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Weekday evenings, by appointment" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="contact"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confidential Contact Info for Admin</FormLabel>
                <FormControl>
                  <Input placeholder="Email or Phone for verification purposes" {...field} />
                </FormControl>
                <FormDescription>This will not be shown publicly.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <DialogFooter className="pt-4">
             <DialogClose asChild>
                <Button type="button" variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Submit Registration</Button>
          </DialogFooter>
        </form>
      </Form>
    </>
  );
}
