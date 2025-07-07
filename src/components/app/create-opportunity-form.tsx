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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters." }),
  description: z.string().min(10, { message: "Description must be at least 10 characters." }),
  ministry: z.string({ required_error: "Please select a ministry." }),
  location: z.string({ required_error: "Please select a location type." }),
  commitment: z.string().min(3, { message: "Please specify the time commitment." }),
  skills: z.string().optional(),
});

export function CreateOpportunityForm() {
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      commitment: "",
      skills: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: "Opportunity Posted!",
      description: "Your volunteer opportunity has been submitted for review.",
    });
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle>Post a Volunteer Opportunity</DialogTitle>
        <DialogDescription>
          Fill out the form below to create a new opportunity for others to serve.
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-h-[70vh] overflow-y-auto pr-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Opportunity Title</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Sunday Welcome Team" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Detailed Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Describe the role, responsibilities, and impact..." {...field} />
                </FormControl>
                <FormDescription>
                    AI could help generate this based on the title in the future.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="ministry"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ministry / Department</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a ministry" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="hospitality">Hospitality</SelectItem>
                      <SelectItem value="worship">Worship</SelectItem>
                      <SelectItem value="outreach">Outreach</SelectItem>
                      <SelectItem value="media">Media</SelectItem>
                      <SelectItem value="tech">Tech</SelectItem>
                      <SelectItem value="kids">Kids Ministry</SelectItem>
                      <SelectItem value="facilities">Facilities</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a location type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="local">Local Church</SelectItem>
                      <SelectItem value="regional">Regional Event</SelectItem>
                      <SelectItem value="global">Global / Online</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="commitment"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Time Commitment</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., 2 hours/week, Flexible" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="skills"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Skills Required (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Friendly, Organized, Guitar" {...field} />
                </FormControl>
                 <FormDescription>
                    Separate skills with a comma.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <DialogFooter className="pt-4">
             <DialogClose asChild>
                <Button type="button" variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Submit for Review</Button>
          </DialogFooter>
        </form>
      </Form>
    </>
  );
}
