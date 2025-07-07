
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
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
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Input } from "../ui/input";

const formSchema = z.object({
  suggestionTitle: z.string().min(5, { message: "Please provide a short title for your idea." }),
  suggestion: z.string().min(20, { message: "Please describe your idea in at least 20 characters." }),
});

export function SuggestOpportunityForm() {
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      suggestionTitle: "",
      suggestion: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: "Suggestion Sent!",
      description: "Thank you for your feedback. Our team will review your idea.",
    });
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle>Suggest a New Opportunity</DialogTitle>
        <DialogDescription>
          Have an idea for how our community can serve? Let us know! Your suggestion will be sent to the admin team for consideration.
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
            <FormField
                control={form.control}
                name="suggestionTitle"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Suggestion Title</FormLabel>
                    <FormControl>
                    <Input placeholder="e.g., Park Cleanup Day" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="suggestion"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Describe Your Idea</FormLabel>
                    <FormControl>
                    <Textarea placeholder="What is the opportunity and why is it important?" className="min-h-[120px]" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
            <DialogFooter className="pt-4">
                <DialogClose asChild>
                    <Button type="button" variant="outline">Cancel</Button>
                </DialogClose>
                <Button type="submit">Send Suggestion</Button>
            </DialogFooter>
        </form>
      </Form>
    </>
  );
}
