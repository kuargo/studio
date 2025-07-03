import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BrainCircuit, CalendarPlus, Ear, HeartPulse, Users, Scale, ShieldCheck } from "lucide-react";
import Link from "next/link";

const resources = [
  {
    icon: Ear,
    title: "Guided Prayer & Meditation",
    description: "Audio-led sessions to help you focus on God and find peace.",
    link: "#",
    cta: "Listen Now",
    color: "text-blue-500",
    bg: "bg-blue-500/10"
  },
  {
    icon: BrainCircuit,
    title: "Stress Management Hub",
    description: "Practical exercises and biblical wisdom for navigating anxiety and stress.",
    link: "#",
    cta: "Find Techniques",
    color: "text-green-500",
    bg: "bg-green-500/10"
  },
  {
    icon: CalendarPlus,
    title: "Book a Confidential Session",
    description: "Connect with a trained lay counselor or pastor for support.",
    link: "#",
    cta: "Request Appointment",
    color: "text-amber-500",
    bg: "bg-amber-500/10"
  },
  {
    icon: Users,
    title: "Find a Support Group",
    description: "Join a community of people who understand what you're going through.",
    link: "#",
    cta: "Browse Groups",
    color: "text-violet-500",
    bg: "bg-violet-500/10"
  },
   {
    icon: Scale,
    title: "Mediation & Conflict Resolution",
    description: "Request help resolving church, group, or personal conflicts with certified mediators.",
    link: "#",
    cta: "Get Assistance",
    color: "text-orange-500",
    bg: "bg-orange-500/10"
  },
  {
    icon: ShieldCheck,
    title: "Addiction & Recovery",
    description: "Find resources and support for overcoming substance abuse and other addictions.",
    link: "#",
    cta: "Find Help",
    color: "text-teal-500",
    bg: "bg-teal-500/10"
  },
]

export default function WellBeingPage() {
  return (
    <div className="space-y-8">
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-block p-3 bg-primary/10 rounded-full mb-4">
            <HeartPulse className="h-10 w-10 text-primary" />
        </div>
        <h1 className="text-4xl font-headline font-bold">Mental & Spiritual Well-being Hub</h1>
        <p className="text-muted-foreground mt-2 text-lg">
          Caring for your soul and mind is vital. Here are some resources to support your journey towards wholeness in Christ.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {resources.map(res => (
          <Card key={res.title} className="flex flex-col">
            <CardHeader className="flex-row items-start gap-4">
              <div className={`p-3 rounded-lg ${res.bg}`}>
                <res.icon className={`w-6 h-6 ${res.color}`} />
              </div>
              <div>
                <CardTitle className="font-headline text-lg">{res.title}</CardTitle>
                <CardDescription className="mt-1">{res.description}</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="flex-grow"></CardContent>
            <CardContent>
              <Button asChild className="w-full">
                <Link href={res.link}>{res.cta}</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
       <Card className="border-destructive/50 bg-destructive/5">
        <CardHeader>
          <CardTitle className="font-headline text-destructive flex items-center gap-2">Emergency Support</CardTitle>
          <CardDescription className="text-destructive/80">
            If you are in crisis or need immediate help, please do not use this app. Contact a professional crisis line.
          </CardDescription>
        </CardHeader>
        <CardContent>
            <p className="font-semibold">National Suicide & Crisis Lifeline: Call or text 988</p>
        </CardContent>
      </Card>
    </div>
  );
}
