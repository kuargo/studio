
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Globe, Building } from "lucide-react";

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

const formSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters." }),
  description: z.string().min(10, { message: "Description must be at least 10 characters." }),
  eventType: z.string({ required_error: "Please select an event type." }),
  eventDate: z.string({ required_error: "Please select a date." }),
  eventTime: z.string({ required_error: "Please select a time." }),
  venueType: z.enum(["physical", "online"], { required_error: "Please select a venue type." }),
  location: z.string().optional(),
  url: z.string().url({ message: "Please enter a valid URL." }).optional(),
  contactName: z.string().min(2, { message: "Contact name is required." }),
  contactInfo: z.string().min(5, { message: "Contact information is required." })
    .refine(value => z.string().email().safeParse(value).success || phoneRegex.test(value), {
        message: "Please provide a valid email or phone number."
    }),
}).refine(data => {
    if (data.venueType === 'physical') return !!data.location && data.location.length > 0;
    return true;
}, {
    message: "Location is required for physical events.",
    path: ["location"],
}).refine(data => {
    if (data.venueType === 'online') return !!data.url;
    return true;
}, {
    message: "URL is required for online events.",
    path: ["url"],
});

export function CreateEventForm() {
  const { toast } = useToast();
  const [venueType, setVenueType] = useState("physical");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      venueType: "physical",
      contactName: "",
      contactInfo: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: "Event Submitted!",
      description: "Your event has been submitted for review by an admin.",
    });
    // Here you would typically trigger a server action or API call
    // to save the event data to Firestore in a "pending_events" collection.
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle>Create a New Event</DialogTitle>
        <DialogDescription>
          Fill out the details below to create a new event. All events are subject to admin approval before being published.
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-h-[70vh] overflow-y-auto pr-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Event Title</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Youth Worship Night" {...field} />
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
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Tell us more about the event..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <FormField
                control={form.control}
                name="eventType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Event Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="worship">Worship</SelectItem>
                        <SelectItem value="outreach">Outreach</SelectItem>
                        <SelectItem value="service">Service</SelectItem>
                        <SelectItem value="conference">Conference</SelectItem>
                        <SelectItem value="workshop">Workshop</SelectItem>
                        <SelectItem value="social">Social Gathering</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            <FormField
              control={form.control}
              name="venueType"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Venue Type</FormLabel>
                   <FormControl>
                    <RadioGroup
                      onValueChange={(value) => {
                        field.onChange(value);
                        setVenueType(value);
                      }}
                      defaultValue={field.value}
                      className="flex space-x-2"
                    >
                      <FormItem className="flex-1">
                        <FormControl>
                           <RadioGroupItem value="physical" id="physical" className="sr-only"/>
                        </FormControl>
                        <FormLabel htmlFor="physical" className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 font-normal hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer">
                            <Building className="mb-3 h-6 w-6"/>
                            Physical
                        </FormLabel>
                      </FormItem>
                       <FormItem className="flex-1">
                        <FormControl>
                           <RadioGroupItem value="online" id="online" className="sr-only"/>
                        </FormControl>
                        <FormLabel htmlFor="online" className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 font-normal hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer">
                            <Globe className="mb-3 h-6 w-6"/>
                            Online / Virtual
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {venueType === 'physical' && (
             <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Location / Address</FormLabel>
                    <FormControl>
                    <Input placeholder="123 Main St, Anytown" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
          )}

           {venueType === 'online' && (
             <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Event URL</FormLabel>
                    <FormControl>
                    <Input placeholder="https://zoom.us/j/..." {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="eventDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="eventTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Time</FormLabel>
                  <FormControl>
                    <Input type="time" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="contactName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Person</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="contactInfo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Email / Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="contact@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

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

    