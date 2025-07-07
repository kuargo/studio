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
    { label: "Read the Bible", icon: BookOpen, href: "https://www.biblegateway.com/", color: "text-amber-500", target: "_blank" },
    { label: "Find a Mentor", icon: Users, href: "/mentorship", color: "text-green-500" },
];

const prayerRequests = [
    { id: "dashboard-jessica-l", name: "Jessica L.", request: "Praying for strength and wisdom for my upcoming exams.", avatar: "https://placehold.co/100x100/f9a8d4/4c1d95.png", aiHint: "woman portrait", initialPrayers: 12 },
    { id: "dashboard-david-r", name: "David R.", request: "Please pray for my family's health and protection.", avatar: "https://placehold.co/100x100/a5b4fc/1e3a8a.png", aiHint: "man portrait", initialPrayers: 28 },
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
                <CardFooter className="bg-card p-4 grid grid-cols-3 gap-2 text-center">
                    <div>
                        <p className="font-bold text-lg">125</p>
                        <p className="text-xs text-muted-foreground">Friends</p>
                    </div>
                    <div>
                        <p className="font-bold text-lg">72</p>
                        <p className="text-xs text-muted-foreground">Following</p>
                    </div>
                    <div>
                        <p className="font-bold text-lg">48</p>
                        <p className="text-xs text-muted-foreground">Prayers Offered</p>
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
                            <CardTitle className="flex items-center gap-2">
                                <Flame className="text-amber-500" />
                                Quiet Time Streak
                            </CardTitle>
                            <CardDescription>Keep the fire burning!</CardDescription>
                        </CardHeader>
                        <CardContent className="text-center">
                            <div className="text-7xl font-bold">12</div>
                            <p className="text-muted-foreground">Days in a row!</p>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full" asChild>
                               <Link href="/journal">Start Today's Devotion</Link>
                            </Button>
                        </CardFooter>
                    </Card>

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
                             <Link href="/prayer-wall" passHref legacyBehavior>
                                <Button variant="outline" className="w-full">
                                    View Prayer Wall <ArrowRight className="ml-2 h-4 w-4"/>
                                </Button>
                            </Link>
                         </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    );
}
