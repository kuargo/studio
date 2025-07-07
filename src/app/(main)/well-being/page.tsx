"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { BrainCircuit, CalendarPlus, Ear, HeartPulse, Users, Scale, ShieldCheck, LifeBuoy, Baby, FileCheck, Phone, Handshake } from "lucide-react";
import Link from "next/link";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { ProviderRegistrationForm } from "@/components/app/provider-registration-form";
import { useToast } from "@/hooks/use-toast";

const resources = [
  {
    icon: Ear,
    title: "Guided Prayer & Meditation",
    description: "Audio-led sessions to help you focus on God and find peace.",
    cta: "Listen Now",
    color: "text-blue-500",
    bg: "bg-blue-500/10"
  },
  {
    icon: BrainCircuit,
    title: "Stress Management Hub",
    description: "Practical exercises and biblical wisdom for navigating anxiety and stress.",
    cta: "Find Techniques",
    color: "text-green-500",
    bg: "bg-green-500/10"
  },
  {
    icon: CalendarPlus,
    title: "Book a Confidential Session",
    description: "Connect with a trained lay counselor or pastor for support.",
    cta: "Request Appointment",
    color: "text-amber-500",
    bg: "bg-amber-500/10"
  },
  {
    icon: ShieldCheck,
    title: "Addiction & Recovery",
    description: "Find resources and support for overcoming addictions in a faith-based context.",
    cta: "Find Help",
    color: "text-teal-500",
    bg: "bg-teal-500/10"
  },
   {
    icon: Scale,
    title: "Mediation & Conflict Resolution",
    description: "Request help resolving church, group, or personal conflicts with certified mediators.",
    cta: "Get Assistance",
    color: "text-orange-500",
    bg: "bg-orange-500/10"
  },
   {
    icon: Baby,
    title: "Marriage & Family Counseling",
    description: "Resources for building strong, Christ-centered families and relationships.",
    cta: "Strengthen Family",
    color: "text-rose-500",
    bg: "bg-rose-500/10"
  },
    {
    icon: FileCheck,
    title: "Legal & Financial Guidance",
    description: "Connect with Christian professionals for assistance with legal or financial matters.",
    cta: "Seek Counsel",
    color: "text-indigo-500",
    bg: "bg-indigo-500/10"
  },
  {
    icon: Users,
    title: "Find a Support Group",
    description: "Join a community of people who understand what you're going through.",
    cta: "Browse Groups",
    color: "text-violet-500",
    bg: "bg-violet-500/10"
  },
]

export default function WellBeingPage() {
  const { toast } = useToast();
  
  const showComingSoonToast = (title: string) => {
    toast({
      title: "Feature Coming Soon",
      description: `The "${title}" section is under construction.`,
    });
  };

  return (
    <div className="space-y-8">
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-block p-3 bg-primary/10 rounded-full mb-4">
            <HeartPulse className="h-10 w-10 text-primary" />
        </div>
        <h1 className="text-4xl font-bold">Mental & Spiritual Well-being Hub</h1>
        <p className="text-muted-foreground mt-2 text-lg">
          Caring for your soul and mind is vital. Here are some resources to support your journey towards wholeness in Christ.
        </p>
      </div>

       <Card>
        <CardHeader className="flex-row items-center justify-between">
            <div>
              <CardTitle>Are you a professional?</CardTitle>
              <CardDescription>Register as a well-being provider to offer your services to the community.</CardDescription>
            </div>
             <Dialog>
                <DialogTrigger asChild>
                    <Button><Handshake className="mr-2"/> Register as a Provider</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[625px]">
                    <ProviderRegistrationForm/>
                </DialogContent>
            </Dialog>
        </CardHeader>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {resources.map(res => (
          <Card key={res.title} className="flex flex-col">
            <CardHeader className="flex-grow">
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-lg ${res.bg}`}>
                  <res.icon className={`w-6 h-6 ${res.color}`} />
                </div>
                <div>
                  <CardTitle>{res.title}</CardTitle>
                  <CardDescription className="mt-1">{res.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardFooter>
              <Button className="w-full" onClick={() => showComingSoonToast(res.title)}>
                {res.cta}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
       <Card className="border-destructive/50 bg-destructive/5">
        <CardHeader>
          <CardTitle className="text-destructive flex items-center gap-2"><LifeBuoy/>Emergency Support</CardTitle>
          <CardDescription className="text-destructive/80">
            If you are in crisis or need immediate help, please use the resources below. This app is not a substitute for professional emergency services.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div>
                <h4 className="font-semibold">Connect Hub Care Team (Placeholders)</h4>
                <p className="text-sm text-muted-foreground">Email: <a href="mailto:care@connecthub.app" className="text-primary hover:underline">care@connecthub.app</a></p>
                <p className="text-sm text-muted-foreground">Phone / WhatsApp: <a href="tel:+15551234567" className="text-primary hover:underline">+1 (555) 123-4567</a></p>
            </div>
             <div>
                <h4 className="font-semibold">Global Crisis Hotlines</h4>
                <p className="text-sm text-muted-foreground">National Suicide & Crisis Lifeline: <span className="font-bold">Call or text 988</span> (US)</p>
                <p className="text-sm text-muted-foreground">Crisis Text Line: <span className="font-bold">Text HOME to 741741</span> (US, Canada, UK, Ireland)</p>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
