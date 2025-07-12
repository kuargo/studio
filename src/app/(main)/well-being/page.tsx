
"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { BrainCircuit, CalendarPlus, Ear, HeartPulse, Users, Scale, ShieldCheck, LifeBuoy, Baby, FileCheck, Phone, Handshake, UserCheck, Send, Bot, Wand2 } from "lucide-react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { ProviderRegistrationForm } from "@/components/app/provider-registration-form";
import { BookSessionForm } from "@/components/app/book-session-form";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";

const resources = [
  {
    icon: Ear,
    title: "Guided Prayer & Meditation",
    description: "Audio-led sessions to help you find peace. Let our AI guide you through a reflective session.",
    cta: "Start a Session",
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    icon: BrainCircuit,
    title: "Stress & Anxiety",
    description: "Find biblical wisdom and practical steps for navigating anxiety. Ask our AI for initial guidance.",
    cta: "Get Guidance",
    color: "text-green-500",
    bg: "bg-green-500/10",
  },
  {
    icon: ShieldCheck,
    title: "Addiction & Recovery",
    description: "Find support and resources for overcoming addictions. Our AI can provide confidential first steps.",
    cta: "Find Help",
    color: "text-teal-500",
    bg: "bg-teal-500/10",
  },
   {
    icon: Scale,
    title: "Conflict Resolution",
    description: "Request help resolving conflicts, with AI assistance to articulate your thoughts.",
    cta: "Get Assistance",
    color: "text-orange-500",
    bg: "bg-orange-500/10",
  },
   {
    icon: Baby,
    title: "Marriage & Family",
    description: "Resources for Christ-centered families. Get AI-powered conversation starters.",
    cta: "Strengthen Family",
    color: "text-rose-500",
    bg: "bg-rose-500/10",
  },
    {
    icon: FileCheck,
    title: "Legal & Financial",
    description: "Connect with Christian professionals. Use our AI to help formulate your questions.",
    cta: "Seek Counsel",
    color: "text-indigo-500",
    bg: "bg-indigo-500/10",
  },
  {
    icon: Users,
    title: "Support Groups",
    description: "Join others who understand. Find the right group for you.",
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

function AiAssistantDialog({ title, description, trigger }: { title: string, description: string, trigger: React.ReactNode }) {
  const [messages, setMessages] = React.useState<{ role: 'user' | 'bot', text: string }[]>([]);
  const [input, setInput] = React.useState('');

  const handleSend = () => {
    if (!input) return;
    const newMessages = [...messages, { role: 'user' as const, text: input }];
    setMessages(newMessages);
    setInput('');
    setTimeout(() => {
      setMessages([...newMessages, { role: 'bot' as const, text: `This is a placeholder response about ${title}. In a real app, Genkit would provide a thoughtful answer here.` }]);
    }, 1000);
  };
  
  return (
      <Dialog>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>AI Assistant: {title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          <div className="h-[50vh] flex flex-col">
            <ScrollArea className="flex-1 p-4 border rounded-md bg-muted/50">
              <div className="space-y-4">
                 <div className="flex items-start gap-3">
                    <Avatar className="h-8 w-8 border">
                        <AvatarFallback><Bot/></AvatarFallback>
                    </Avatar>
                    <div className="bg-background p-3 rounded-lg text-sm">
                        <p>Hello! How can I help you with {title} today? Feel free to ask any questions you have.</p>
                    </div>
                </div>
                {messages.map((msg, i) => (
                  <div key={i} className={`flex items-start gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
                    {msg.role === 'bot' && (
                        <Avatar className="h-8 w-8 border">
                            <AvatarFallback><Bot/></AvatarFallback>
                        </Avatar>
                    )}
                     <div className={`p-3 rounded-lg text-sm max-w-[80%] ${msg.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-background'}`}>
                        <p>{msg.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <div className="mt-4 flex gap-2">
              <Textarea 
                placeholder="Ask a question..." 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSend();
                    }
                }}
              />
              <Button onClick={handleSend}><Send/></Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
  );
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
                                    <p className="text-sm text-muted-foreground mt-2">{res.description}</p>
                                </div>
                            </CardHeader>
                            <CardFooter>
                                <AiAssistantDialog 
                                  title={res.title} 
                                  description={res.description}
                                  trigger={<Button className="w-full" variant="secondary"><Wand2 className="mr-2"/>Ask AI</Button>}
                                />
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
