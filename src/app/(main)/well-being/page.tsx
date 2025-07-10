
"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { BrainCircuit, CalendarPlus, Ear, HeartPulse, Users, Scale, ShieldCheck, LifeBuoy, Baby, FileCheck, Phone, Handshake, UserCheck } from "lucide-react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ProviderRegistrationForm } from "@/components/app/provider-registration-form";
import { BookSessionForm } from "@/components/app/book-session-form";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";


const resources = [
  {
    icon: Ear,
    title: "Guided Prayer & Meditation",
    description: "Audio-led sessions to help you focus on God and find peace.",
    cta: "Listen Now",
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    icon: BrainCircuit,
    title: "Stress Management Hub",
    description: "Practical exercises and biblical wisdom for navigating anxiety and stress.",
    cta: "Find Techniques",
    color: "text-green-500",
    bg: "bg-green-500/10",
  },
  {
    icon: ShieldCheck,
    title: "Addiction & Recovery",
    description: "Find resources and support for overcoming addictions in a faith-based context.",
    cta: "Find Help",
    color: "text-teal-500",
    bg: "bg-teal-500/10",
  },
   {
    icon: Scale,
    title: "Mediation & Conflict Resolution",
    description: "Request help resolving church, group, or personal conflicts with certified mediators.",
    cta: "Get Assistance",
    color: "text-orange-500",
    bg: "bg-orange-500/10",
  },
   {
    icon: Baby,
    title: "Marriage & Family Counseling",
    description: "Resources for building strong, Christ-centered families and relationships.",
    cta: "Strengthen Family",
    color: "text-rose-500",
    bg: "bg-rose-500/10",
  },
    {
    icon: FileCheck,
    title: "Legal & Financial Guidance",
    description: "Connect with Christian professionals for assistance with legal or financial matters.",
    cta: "Seek Counsel",
    color: "text-indigo-500",
    bg: "bg-indigo-500/10",
  },
  {
    icon: Users,
    title: "Find a Support Group",
    description: "Join a community of people who understand what you're going through.",
    cta: "Browse Groups",
    color: "text-violet-500",
    bg: "bg-violet-500/10",
  },
];

const providers = [
    { name: "Dr. Evans", avatar: "https://placehold.co/100x100/a5f3fc/0e7490.png", aiHint: "professional man", specialties: ["Mental Health", "Pastoral Care", "Theology"], verified: true },
    { name: "The Jacksons", avatar: "https://placehold.co/100x100/d8b4fe/581c87.png", aiHint: "happy couple", specialties: ["Marriage Counseling", "Family", "Relationships"], verified: true },
    { name: "Sarah Kim", avatar: "https://placehold.co/100x100/fed7aa/9a3412.png", aiHint: "woman professional", specialties: ["Financial Guidance", "Career Coaching"], verified: true },
     { name: "David Chen", avatar: "https://placehold.co/100x100/a7f3d0/065f46.png", aiHint: "man outdoors", specialties: ["Conflict Resolution", "Mediation"], verified: true },
]

function ResourceDialogContent({ title }: { title: string }) {
    const { toast } = useToast();
    const showComingSoon = () => toast({ title: "Feature Coming Soon" });
    const linkButtonClasses = "underline text-primary hover:text-primary/80 text-left w-full justify-start p-0 h-auto";

    switch (title) {
        case "Guided Prayer & Meditation":
            return (
                <div className="space-y-3">
                    <p>Here are some resources to guide you in prayer and meditation:</p>
                    <ul className="list-disc pl-5 space-y-2">
                        <li><Button variant="link" className={linkButtonClasses} onClick={showComingSoon}>10-Minute Guided Christian Meditation</Button></li>
                        <li><Button variant="link" className={linkButtonClasses} onClick={showComingSoon}>Lectio Divina: Hearing God through Scripture</Button></li>
                        <li><Button variant="link" className={linkButtonClasses} onClick={showComingSoon}>Soaking Worship & Instrumental Prayer Playlist</Button></li>
                    </ul>
                </div>
            );
        case "Stress Management Hub":
            return (
                 <div className="space-y-3">
                    <p className="font-semibold">Biblical Breathing Exercise:</p>
                    <p>Inhale for 4 seconds meditating on "The Lord is my Shepherd", hold for 4 seconds, and exhale for 6 seconds meditating on "I shall not want." This practice grounds you in scripture and calms your nervous system.</p>
                     <p className="font-semibold">The 5-4-3-2-1 Grounding Technique:</p>
                     <p>Acknowledge 5 things you can see, 4 things you can touch, 3 things you can hear, 2 things you can smell, and 1 thing you can taste. This helps you connect with the present moment.</p>
                     <Button variant="link" className={cn(linkButtonClasses, "mt-2")} onClick={showComingSoon}>Read More: A Christian Perspective on Managing Anxiety</Button>
                </div>
            );
        case "Addiction & Recovery":
             return (
                 <div className="space-y-3">
                    <p>You are not alone in this fight. God offers freedom and healing. Here are some starting points for help:</p>
                    <ul className="list-disc pl-5 space-y-2">
                        <li><Button variant="link" className={linkButtonClasses} onClick={showComingSoon}>Celebrate Recovery - Find a Local Group</Button></li>
                        <li><Button variant="link" className={linkButtonClasses} onClick={showComingSoon}>Focus on the Family: Help for Addiction</Button></li>
                        <li><Button variant="link" className={linkButtonClasses} onClick={showComingSoon}>Testimony: A Story of Freedom in Christ (Video)</Button></li>
                    </ul>
                </div>
            );
        case "Mediation & Conflict Resolution":
             return (
                 <div className="space-y-3">
                    <p className="font-semibold">The 4 G's of Peacemaking:</p>
                    <ul className="list-disc pl-5 space-y-2">
                        <li><strong>Glorify God:</strong> How can I honor God in this situation?</li>
                        <li><strong>Get the Log Out of Your Eye:</strong> How have I contributed to this conflict?</li>
                        <li><strong>Gently Restore:</strong> How can I help others own their part?</li>
                        <li><strong>Go and Be Reconciled:</strong> How can I show I'm committed to making things right?</li>
                    </ul>
                </div>
            );
        case "Marriage & Family Counseling":
             return (
                 <div className="space-y-3">
                    <p>Resources to build a stronger, Christ-centered family:</p>
                     <ul className="list-disc pl-5 space-y-2">
                        <li><Button variant="link" className={linkButtonClasses} onClick={showComingSoon}>Focus on the Family: Marriage Resources</Button></li>
                        <li><Button variant="link" className={linkButtonClasses} onClick={showComingSoon}>Article: The 5 Love Languages Explained</Button></li>
                        <li><Button variant="link" className={linkButtonClasses} onClick={showComingSoon}>Sermon: A Christ-Centered Home</Button></li>
                    </ul>
                    <p className="pt-2">For personalized guidance, please consider booking a session with one of our verified counselors.</p>
                </div>
            );
        case "Legal & Financial Guidance":
             return (
                 <div className="space-y-3">
                    <p className="font-semibold text-destructive">Disclaimer: The information provided here is for informational purposes only and not a substitute for professional legal or financial advice.</p>
                    <p>We encourage you to connect with Christian professionals who integrate faith and practice. Browse our provider directory for verified legal and financial experts in our community or check out these resources:</p>
                     <ul className="list-disc pl-5 space-y-2">
                        <li><Button variant="link" className={linkButtonClasses} onClick={showComingSoon}>Christian Legal Society</Button></li>
                        <li><Button variant="link" className={linkButtonClasses} onClick={showComingSoon}>Kingdom Advisors</Button></li>
                    </ul>
                </div>
            );
        case "Find a Support Group":
             return (
                <div className="space-y-4 text-center">
                   <p>Our Social Feed and Prayer Wall are great places to find and form support groups. Engage with posts, comment, and connect with others on similar journeys.</p>
                    <Button asChild>
                        <Link href="/social-feed">Visit the Social Feed</Link>
                    </Button>
                </div>
            );
        default:
            return <p>More information coming soon.</p>;
    }
}


export default function WellBeingPage() {
  const { toast } = useToast();

  const showComingSoon = () => {
    toast({
        title: "Feature Coming Soon",
        description: "This resource will be available shortly."
    })
  }

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
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button className="w-full" variant="secondary">
                                            {res.cta}
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>{res.title}</DialogTitle>
                                            <DialogDescription>{res.description}</DialogDescription>
                                        </DialogHeader>
                                        <div className="pt-4 space-y-4 text-sm text-muted-foreground">
                                           <ResourceDialogContent title={res.title} />
                                        </div>
                                    </DialogContent>
                                </Dialog>
                            </CardFooter>
                        </Card>
                    ))}
                </CardContent>
            </Card>
        </div>

        <div className="lg:col-span-1 space-y-6 lg:sticky top-8">
            <Card>
                <CardHeader>
                    <CardTitle>Are you a professional?</CardTitle>
                    <CardDescription>Register to offer your services.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className="w-full">Register to Provide Services</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[625px]">
                            <ProviderRegistrationForm />
                        </DialogContent>
                    </Dialog>
                </CardContent>
            </Card>
            <Card className="bg-destructive/10 border-destructive">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-destructive"><LifeBuoy/> Emergency Support</CardTitle>
                    <CardDescription className="text-destructive/90">If you are in immediate crisis, please contact a professional.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Button variant="destructive" className="w-full" onClick={showComingSoon}><Phone className="mr-2"/> Call a Helpline</Button>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
