"use client";

import { useAuth } from "@/hooks/use-auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PrayButton } from "@/components/app/pray-button";
import {
    ArrowRight,
    CalendarCheck,
    Clapperboard,
    Flame,
    HandHelping,
    HeartHandshake,
    Newspaper,
    Sparkles,
    Users,
    Video,
    BookOpen
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const featuredItems = [
    { title: "Youth Worship Night", description: "Join us this Friday for a powerful night of worship.", image: "https://placehold.co/600x400.png", aiHint: "youth group concert", link: "/events", type: "Event" },
    { title: "How to Read the Bible", description: "New sermon series by Pastor John is now available.", image: "https://placehold.co/600x400.png", aiHint: "pastor preaching", link: "/sermon-remix", type: "Sermon" },
    { title: "Serve the City", description: "Volunteer for our community food drive this Saturday.", image: "https://placehold.co/600x400.png", aiHint: "volunteers packing food", link: "/volunteering", type: "Volunteer" },
];

const quickLinks = [
    { label: "Share a Testimony", icon: Newspaper, href: "/social-feed", color: "text-blue-500" },
    { label: "Create a Reel", icon: Clapperboard, href: "/faith-reels", color: "text-rose-500" },
    { label: "Log a Dream", icon: BookOpen, href: "/journal", color: "text-purple-500" },
    { label: "Find a Mentor", icon: Users, href: "/mentorship", color: "text-green-500" },
];

const prayerRequests = [
    { name: "Jessica L.", request: "Praying for strength and wisdom for my upcoming exams.", avatar: "https://placehold.co/100x100/f9a8d4/4c1d95.png", aiHint: "woman portrait", initialPrayers: 12 },
    { name: "David R.", request: "Please pray for my family's health and protection.", avatar: "https://placehold.co/100x100/a5b4fc/1e3a8a.png", aiHint: "man portrait", initialPrayers: 28 },
];

export default function DashboardPage() {
    const { user } = useAuth();
    
    return (
        <div className="space-y-8">
             <Card className="bg-gradient-to-br from-primary via-fuchsia-500 to-rose-500 text-primary-foreground border-0 shadow-lg">
                <CardHeader>
                    <h1 className="text-3xl font-headline font-bold">Welcome Back, {user?.email?.split('@')[0] || "Believer"}!</h1>
                    <p className="opacity-80">The community is active! Here’s your personalized look at what’s happening.</p>
                </CardHeader>
             </Card>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                <div className="lg:col-span-2 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="font-headline text-xl">Community Spotlight</CardTitle>
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
                            <CardTitle className="font-headline text-xl">Quick Links</CardTitle>
                             <CardDescription>Provoking your engagement. What will you do next?</CardDescription>
                        </CardHeader>
                        <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
                             {quickLinks.map(link => (
                                <Link href={link.href} key={link.label} className="group">
                                    <div className="flex flex-col items-center justify-center p-4 h-full rounded-lg border bg-card hover:bg-accent hover:shadow-md transition-all">
                                        <div className={`p-3 rounded-full bg-muted group-hover:bg-background mb-2`}>
                                            <link.icon className={`h-6 w-6 ${link.color}`} />
                                        </div>
                                        <p className="text-sm font-semibold text-center">{link.label}</p>
                                    </div>
                                </Link>
                            ))}
                        </CardContent>
                    </Card>
                </div>
                
                <div className="space-y-6">
                    <Card className="flex flex-col justify-between">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 font-headline">
                                <Flame className="text-amber-500" />
                                Quiet Time Streak
                            </CardTitle>
                            <CardDescription>Keep the fire burning!</CardDescription>
                        </CardHeader>
                        <CardContent className="text-center">
                            <div className="text-7xl font-bold font-headline text-primary">12</div>
                            <p className="text-muted-foreground">Days in a row!</p>
                        </CardContent>
                        <CardContent>
                            <Button className="w-full">Start Today's Devotion</Button>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="font-headline text-xl">Prayer Wall</CardTitle>
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
                                    <PrayButton count={prayer.initialPrayers} />
                                </div>
                            ))}
                        </CardContent>
                         <CardContent>
                             <Link href="/prayer-wall" passHref>
                                <Button variant="outline" className="w-full">
                                    View Prayer Wall <ArrowRight className="ml-2 h-4 w-4"/>
                                </Button>
                            </Link>
                         </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
