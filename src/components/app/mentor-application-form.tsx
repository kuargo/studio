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
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

const areasOfExpertise = [
    { id: "theology", label: "Theology & Doctrine" },
    { id: "leadership", label: "Leadership" },
    { id: "marriage", label: "Marriage & Family" },
    { id: "business", label: "Business & Career" },
    { id: "mental-health", label: "Mental Health & Pastoral Care" },
    { id: "youth", label: "Youth Ministry" },
    { id: "worship", label: "Worship & Arts" },
    { id: "prayer", label: "Prayer & Intercession" },
] as const;

const formSchema = z.object({
  fullName: z.string().min(3, { message: "Please enter your full name." }),
  reason: z.string().min(20, { message: "Please provide a more detailed reason (at least 20 characters)." }),
  experience: z.string().min(20, { message: "Please describe your experience (at least 20 characters)." }),
  areas: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one area of expertise.",
  }),
});

export function MentorApplicationForm() {
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      reason: "",
      experience: "",
      areas: [],
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: "Application Submitted!",
      description: "Thank you for your interest. An admin will review your application.",
    });
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle>Apply to be a Mentor</DialogTitle>
        <DialogDescription>
          Thank you for your interest in investing in our community. Please fill out the form below.
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-h-[70vh] overflow-y-auto pr-6">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your full name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="reason"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Why do you want to be a mentor?</FormLabel>
                <FormControl>
                  <Textarea placeholder="Share your heart and motivation..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="experience"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Relevant Experience & Background</FormLabel>
                <FormControl>
                  <Textarea placeholder="Describe your journey, leadership roles, or life experiences that qualify you to mentor others." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
           <FormField
                control={form.control}
                name="areas"
                render={() => (
                    <FormItem>
                        <div className="mb-4">
                            <FormLabel>Areas of Expertise</FormLabel>
                            <FormDescription>
                                Select all areas where you feel equipped to provide guidance.
                            </FormDescription>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                        {areasOfExpertise.map((item) => (
                            <FormField
                            key={item.id}
                            control={form.control}
                            name="areas"
                            render={({ field }) => {
                                return (
                                <FormItem
                                    key={item.id}
                                    className="flex flex-row items-start space-x-3 space-y-0"
                                >
                                    <FormControl>
                                    <Checkbox
                                        checked={field.value?.includes(item.id)}
                                        onCheckedChange={(checked) => {
                                        return checked
                                            ? field.onChange([...field.value, item.id])
                                            : field.onChange(
                                                field.value?.filter(
                                                (value) => value !== item.id
                                                )
                                            )
                                        }}
                                    />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                    {item.label}
                                    </FormLabel>
                                </FormItem>
                                )
                            }}
                            />
                        ))}
                        </div>
                        <FormMessage />
                    </FormItem>
                )}
            />

          <DialogFooter className="pt-4">
             <DialogClose asChild>
                <Button type="button" variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Submit Application</Button>
          </DialogFooter>
        </form>
      </Form>
    </>
  );
}
