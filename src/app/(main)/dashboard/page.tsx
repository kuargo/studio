
"use client";

import { useAuth } from "@/hooks/use-auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { PrayButton } from "@/components/app/pray-button";
import {
    ArrowRight,
    Clapperboard,
    Flame,
    Newspaper,
    Users,
    BookOpen,
    UserCheck,
    Heart,
    Calendar,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

const featuredItems = [
    { title: "Youth Worship Night", description: "Join us this Friday for a powerful night of worship.", image: "https://placehold.co/600x400.png", aiHint: "youth group concert", link: "/events", type: "Event" },
    { title: "How to Read the Bible", description: "New sermon series by Pastor John is now available.", image: "https://placehold.co/600x400.png", aiHint: "pastor preaching", link: "/sermon-remix", type: "Sermon" },
    { title: "Serve the City", description: "Volunteer for our community food drive this Saturday.", image: "https://placehold.co/600x400.png", aiHint: "volunteers packing food", link: "/volunteering", type: "Volunteer" },
];

const quickLinks = [
    { label: "Share a Testimony", icon: Newspaper, href: "/social-feed", color: "text-blue-500", bgColor: "bg-blue-500/10" },
    { label: "Create a Reel", icon: Clapperboard, href: "/faith-reels", color: "text-rose-500", bgColor: "bg-rose-500/10" },
    { label: "Read the Bible", icon: BookOpen, href: "/bible", color: "text-amber-500", bgColor: "bg-amber-500/10" },
    { label: "Find a Mentor", icon: Users, href: "/mentorship", color: "text-green-500", bgColor: "bg-green-500/10" },
];

const prayerRequests = [
    { id: "dashboard-jessica-l", name: "Jessica L.", request: "Praying for strength and wisdom for my upcoming exams.", avatar: "https://placehold.co/100x100/f9a8d4/4c1d95.png", aiHint: "woman portrait", initialPrayers: 12 },
    { id: "dashboard-david-r", name: "David R.", request: "Please pray for my family's health and protection.", avatar: "https://placehold.co/100x100/a5b4fc/1e3a8a.png", aiHint: "man portrait", initialPrayers: 28 },
];

const userStats = [
  { label: 'Friends', value: 125, icon: Users, href: '#', color: 'text-blue-500', bgColor: 'bg-blue-500/10' },
  { label: 'Following', value: 72, icon: UserCheck, href: '#', color: 'text-teal-500', bgColor: 'bg-teal-500/10' },
  { label: 'Prayers', value: 48, icon: Heart, href: '/prayer-wall', color: 'text-rose-500', bgColor: 'bg-rose-500/10' },
  { label: 'Streak', value: 12, icon: Flame, href: '/journal', unit: 'days', color: 'text-orange-500', bgColor: 'bg-orange-500/10' },
  { label: 'Groups', value: 5, icon: Users, href: '#', color: 'text-indigo-500', bgColor: 'bg-indigo-500/10' },
  { label: 'Events', value: 3, icon: Calendar, href: '/events', color: 'text-purple-500', bgColor: 'bg-purple-500/10' },
];


export default function DashboardPage() {
    const { user } = useAuth();
    
    return (
        <div className="space-y-8">
            <Card className="overflow-hidden border-0 shadow-lg">
                <div className="bg-gradient-to-br from-primary via-fuchsia-500 to-rose-500 text-primary-foreground p-6">
                    <div className="flex items-center gap-4">
                        <Avatar className="h-16 w-16 border-2 border-primary-foreground/50">
                            <AvatarImage src={user?.photoURL || ''} alt={user?.displayName || ''} data-ai-hint="person portrait" />
                            <AvatarFallback>{user?.displayName?.charAt(0).toUpperCase() || 'U'}</AvatarFallback>
                        </Avatar>
                        <div>
                            <h1 className="text-3xl font-bold">Welcome, {user?.displayName || "Believer"}!</h1>
                            <p className="opacity-80">Your personalized hub is buzzing with activity.</p>
                        </div>
                    </div>
                </div>
                <CardFooter className="bg-card p-4">
                    <div className="grid grid-cols-3 md:grid-cols-6 gap-2 text-center w-full">
                        {userStats.map(stat => (
                             <Link href={stat.href} key={stat.label} className="group rounded-lg p-2 hover:bg-accent/50 transition-colors duration-200">
                                 <div className={cn(
                                     "p-2 rounded-full w-fit mx-auto mb-2 transition-all duration-200 group-hover:scale-110", 
                                     stat.bgColor
                                 )}>
                                    <stat.icon className={cn("h-5 w-5", stat.color)}/>
                                 </div>
                                <p className="font-semibold text-base">{stat.value}</p>
                                <p className="text-xs text-muted-foreground">{stat.label} {stat.unit}</p>
                            </Link>
                        ))}
                    </div>
                </CardFooter>
            </Card>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                <div className="lg:col-span-2 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Community Spotlight</CardTitle>
                            <CardDescription>Featured events, sermons, and opportunities.</CardDescription>
                        </CardHeader>
                        <CardContent className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {featuredItems.map(item => (
                                <Link href={item.link} key={item.title} className="group block">
                                    <div className="overflow-hidden rounded-lg">
                                        <Image src={item.image} alt={item.title} width={400} height={250} className="aspect-video object-cover group-hover:scale-105 transition-transform" data-ai-hint={item.aiHint} />
                                    </div>
                                    <p className="text-xs uppercase font-semibold text-primary mt-2">{item.type}</p>
                                    <h3 className="font-semibold">{item.title}</h3>
                                    <p className="text-sm text-muted-foreground">{item.description}</p>
                                </Link>
                            ))}
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Quick Links</CardTitle>
                             <CardDescription>Provoking your engagement. What will you do next?</CardDescription>
                        </CardHeader>
                        <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
                             {quickLinks.map(link => (
                                <Link href={link.href} key={link.label} className="group" target={link.target} rel={link.target === '_blank' ? 'noopener noreferrer' : undefined}>
                                    <div className="flex flex-col items-center justify-center p-4 h-full rounded-lg border bg-card hover:bg-accent hover:shadow-md transition-all">
                                        <div className={cn("p-3 rounded-full group-hover:bg-background mb-2 transition-colors", link.bgColor)}>
                                            <link.icon className={cn("h-6 w-6", link.color)} />
                                        </div>
                                        <p className="text-sm font-semibold text-center">{link.label}</p>
                                    </div>
                                </Link>
                            ))}
                        </CardContent>
                    </Card>
                </div>
                
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Prayer Wall</CardTitle>
                            <CardDescription>Lift up your community.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {prayerRequests.map((prayer, index) => (
                                <div key={index} className="flex items-start gap-4">
                                    <Avatar>
                                        <AvatarImage src={prayer.avatar} data-ai-hint={prayer.aiHint}/>
                                        <AvatarFallback>{prayer.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex-grow">
                                        <p className="font-semibold text-sm">{prayer.name}</p>
                                        <p className="text-sm text-muted-foreground line-clamp-2">{prayer.request}</p>
                                    </div>
                                    <PrayButton prayerId={prayer.id} count={prayer.initialPrayers} />
                                </div>
                            ))}
                        </CardContent>
                         <CardFooter>
                            <Button variant="outline" className="w-full" asChild>
                                <Link href="/prayer-wall">
                                    View Prayer Wall <ArrowRight className="ml-2 h-4 w-4"/>
                                </Link>
                            </Button>
                         </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    );
}
