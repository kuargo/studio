
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
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useAuth } from "@/hooks/use-auth";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name is required." }),
  email: z.string().email(),
  phone: z.string().optional(),
  contactMethod: z.enum(["email", "phone"], {
    required_error: "Please select a preferred contact method.",
  }),
  availability: z.string().min(5, { message: "Please describe your availability." }),
  need: z.string().min(10, { message: "Please briefly describe your need." }),
  urgency: z.enum(["low", "medium", "high"], {
    required_error: "Please select the urgency.",
  }),
  providerPreference: z.string().optional(),
});

const mockProviders = [
    "Dr. Evans (Certified Counselor)",
    "Pastor John (Pastoral Care)",
    "The Jacksons (Marriage Counseling)",
    "Any available",
];

export function BookSessionForm() {
  const { toast } = useToast();
  const { user } = useAuth();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user?.displayName || "",
      email: user?.email || "",
      phone: "",
      availability: "",
      need: "",
      providerPreference: "Any available",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Session Request:", values);
    toast({
      title: "Request Sent!",
      description: "Your confidential request has been sent to the admin team. They will be in touch shortly to coordinate.",
    });
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle>Request a Confidential Session</DialogTitle>
        <DialogDescription>
          Your privacy is important. This request will be sent securely to our care administrators who will coordinate with a provider.
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-h-[70vh] overflow-y-auto pr-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                    <Input {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
             <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                    <Input type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
          </div>
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
            <FormItem>
                <FormLabel>Phone (Optional)</FormLabel>
                <FormControl>
                <Input type="tel" {...field} />
                </FormControl>
                <FormMessage />
            </FormItem>
            )}
            />
            <FormField
              control={form.control}
              name="contactMethod"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Preferred Contact Method</FormLabel>
                  <FormControl>
                    <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex gap-4">
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl><RadioGroupItem value="email" /></FormControl>
                        <FormLabel className="font-normal">Email</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl><RadioGroupItem value="phone" /></FormControl>
                        <FormLabel className="font-normal">Phone</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
                control={form.control}
                name="need"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Briefly Describe Your Need</FormLabel>
                    <FormControl>
                    <Textarea placeholder="What would you like to talk about?" {...field} />
                    </FormControl>
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
                    <Input placeholder="e.g., Weekday evenings after 6 PM" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
              <FormField
              control={form.control}
              name="urgency"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Urgency</FormLabel>
                  <FormControl>
                    <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex gap-4">
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl><RadioGroupItem value="low" /></FormControl>
                        <FormLabel className="font-normal">Low</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl><RadioGroupItem value="medium" /></FormControl>
                        <FormLabel className="font-normal">Medium</FormLabel>
                      </FormItem>
                       <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl><RadioGroupItem value="high" /></FormControl>
                        <FormLabel className="font-normal">High</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="providerPreference"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Provider Preference (Optional)</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a provider" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {mockProviders.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

          <DialogFooter className="pt-4">
             <DialogClose asChild>
                <Button type="button" variant="outline">Cancel</Button>
            </DialogClose>
            <DialogClose asChild>
                <Button type="submit" onClick={form.handleSubmit(onSubmit)}>Send Confidential Request</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </Form>
    </>
  );
}
