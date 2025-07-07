"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { BrainCircuit, CalendarPlus, Ear, HeartPulse, Users, Scale, ShieldCheck, LifeBuoy, Baby, FileCheck, Phone, Handshake, UserCheck } from "lucide-react";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { ProviderRegistrationForm } from "@/components/app/provider-registration-form";
import { useToast } from "@/hooks/use-toast";
import { BookSessionForm } from "@/components/app/book-session-form";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const resources = [
  {
    icon: Ear,
    title: "Guided Prayer & Meditation",
    description: "Audio-led sessions to help you focus on God and find peace.",
    cta: "Listen Now",
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    actionType: 'toast'
  },
  {
    icon: BrainCircuit,
    title: "Stress Management Hub",
    description: "Practical exercises and biblical wisdom for navigating anxiety and stress.",
    cta: "Find Techniques",
    color: "text-green-500",
    bg: "bg-green-500/10",
    actionType: 'toast'
  },
  {
    icon: ShieldCheck,
    title: "Addiction & Recovery",
    description: "Find resources and support for overcoming addictions in a faith-based context.",
    cta: "Find Help",
    color: "text-teal-500",
    bg: "bg-teal-500/10",
    actionType: 'toast'
  },
   {
    icon: Scale,
    title: "Mediation & Conflict Resolution",
    description: "Request help resolving church, group, or personal conflicts with certified mediators.",
    cta: "Get Assistance",
    color: "text-orange-500",
    bg: "bg-orange-500/10",
    actionType: 'toast'
  },
   {
    icon: Baby,
    title: "Marriage & Family Counseling",
    description: "Resources for building strong, Christ-centered families and relationships.",
    cta: "Strengthen Family",
    color: "text-rose-500",
    bg: "bg-rose-500/10",
    actionType: 'toast'
  },
    {
    icon: FileCheck,
    title: "Legal & Financial Guidance",
    description: "Connect with Christian professionals for assistance with legal or financial matters.",
    cta: "Seek Counsel",
    color: "text-indigo-500",
    bg: "bg-indigo-500/10",
    actionType: 'toast'
  },
  {
    icon: Users,
    title: "Find a Support Group",
    description: "Join a community of people who understand what you're going through.",
    cta: "Browse Groups",
    color: "text-violet-500",
    bg: "bg-violet-500/10",
    actionType: 'toast'
  },
];

const providers = [
    { name: "Dr. Evans", avatar: "https://placehold.co/100x100/a5f3fc/0e7490.png", aiHint: "professional man", specialties: ["Mental Health", "Pastoral Care", "Theology"], verified: true },
    { name: "The Jacksons", avatar: "https://placehold.co/100x100/d8b4fe/581c87.png", aiHint: "happy couple", specialties: ["Marriage Counseling", "Family", "Relationships"], verified: true },
    { name: "Sarah Kim", avatar: "https://placehold.co/100x100/fed7aa/9a3412.png", aiHint: "woman professional", specialties: ["Financial Guidance", "Career Coaching"], verified: true },
     { name: "David Chen", avatar: "https://placehold.co/100x100/a7f3d0/065f46.png", aiHint: "man outdoors", specialties: ["Conflict Resolution", "Mediation"], verified: true },
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

       <Card className="bg-gradient-to-r from-primary/80 to-amber-500 text-primary-foreground">
        <CardHeader className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1">
              <CardTitle className="text-2xl flex items-center gap-2"><CalendarPlus/> Book a Confidential Session</CardTitle>
              <CardDescription className="text-primary-foreground/80">Connect with a trained lay counselor or pastor for support. Your request is private and secure.</CardDescription>
            </div>
             <Dialog>
                <DialogTrigger asChild>
                    <Button variant="secondary" size="lg" className="shrink-0">Request an Appointment</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[625px]">
                    <BookSessionForm />
                </DialogContent>
            </Dialog>
        </CardHeader>
      </Card>
      
       <div className="grid lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Find a Provider</CardTitle>
                    <CardDescription>Browse our directory of verified well-being professionals and pastoral counselors.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4 sm:grid-cols-2">
                    {providers.map(provider => (
                        <Card key={provider.name}>
                            <CardHeader className="flex-row gap-4 items-center">
                                <Avatar>
                                    <AvatarImage src={provider.avatar} data-ai-hint={provider.aiHint}/>
                                    <AvatarFallback>{provider.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <h3 className="font-semibold flex items-center gap-1.5">{provider.name} {provider.verified && <UserCheck className="h-4 w-4 text-green-500"/>}</h3>
                                    <div className="flex flex-wrap gap-1 mt-1">
                                      {provider.specialties.slice(0,2).map(s => <Badge key={s} variant="secondary">{s}</Badge>)}
                                    </div>
                                </div>
                            </CardHeader>
                            <CardFooter>
                                <Button variant="outline" className="w-full">View Profile</Button>
                            </CardFooter>
                        </Card>
                    ))}
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Resource Library</CardTitle>
                    <CardDescription>Explore articles, guides, and tools for your well-being journey.</CardDescription>
                </CardHeader>
                 <CardContent className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {resources.map(res => (
                    <Card key={res.title} className="flex flex-col">
                        <CardHeader className="flex-grow">
                        <div className="flex flex-col items-center text-center">
                            <div className={`p-3 rounded-full mb-3 ${res.bg}`}>
                                <res.icon className={`w-6 h-6 ${res.color}`} />
                            </div>
                            <h3 className="font-semibold text-base">{res.title}</h3>
                        </div>
                        </CardHeader>
                        <CardFooter>
                            <Button className="w-full" variant="secondary" onClick={() => showComingSoonToast(res.title)}>
                                {res.cta}
                            </Button>
                        </CardFooter>
                    </Card>
                    ))}
                </CardContent>
            </Card>
        </div>

        <div className="lg:col-span-1 space-y-6 lg:sticky top-8">
            <Card>
                <CardHeader className="flex-row items-center justify-between">
                    <div>
                    <CardTitle>Are you a professional?</CardTitle>
                    <CardDescription>Register to offer your services.</CardDescription>
                    </div>
                </CardHeader>
                <CardContent>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className="w-full"><Handshake className="mr-2"/> Register as a Provider</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[625px]">
                            <ProviderRegistrationForm/>
                        </DialogContent>
                    </Dialog>
                </CardContent>
            </Card>

            <Card className="border-destructive/50 bg-destructive/5">
                <CardHeader>
                <CardTitle className="text-destructive flex items-center gap-2"><LifeBuoy/>Emergency Support</CardTitle>
                <CardDescription className="text-destructive/80">
                    If you are in crisis or need immediate help, please use these resources.
                </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                    <div>
                        <h4 className="font-semibold">National Crisis & Suicide Lifeline</h4>
                        <p className="text-muted-foreground">Call or text <span className="font-bold">988</span> (US)</p>
                    </div>
                    <div>
                        <h4 className="font-semibold">Crisis Text Line</h4>
                        <p className="text-muted-foreground">Text <span className="font-bold">HOME to 741741</span> (US, Canada, UK)</p>
                    </div>
                </CardContent>
            </Card>
        </div>
       </div>

    </div>
  );
}
