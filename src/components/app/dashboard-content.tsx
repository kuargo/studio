
"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { getUserStats } from "@/lib/firestore";
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
    Film,
    MessagesSquare,
    Award,
    GraduationCap,
    Music2,
    HeartHandshake,
    Wand2,
    PenSquare,
    Sparkles,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Skeleton } from "../ui/skeleton";

const theVibeAndCoreItems = [
    { 
        pillar: "DayInTheLife", 
        title: "Faith in the Fast Lane",
        description: "A day in the life of a student, gamer, and believer.",
        icon: Film,
        image: "https://placehold.co/600x400.png",
        aiHint: "student studying laptop"
    },
    { 
        pillar: "HonestTalks",
        title: "Q&A: Doubt & Faith",
        description: "Clips from our latest live stream on navigating tough questions.",
        icon: MessagesSquare,
        image: "https://placehold.co/600x400.png",
        aiHint: "podcast interview"
    },
    { 
        pillar: "UGCShowcase",
        title: "Sunday Showcase: #FaithInAction",
        description: "Featuring a powerful testimony from @user.name this week.",
        icon: Award,
        image: "https://placehold.co/600x400.png",
        aiHint: "person helping another"
    },
    { 
        pillar: "BiteSizedTheology",
        title: "Theology Thursday: What is Grace?",
        description: "A 60-second deep dive into one of the biggest concepts in the Bible.",
        icon: GraduationCap,
        image: "https://placehold.co/600x400.png",
        aiHint: "abstract shapes"
    },
    { 
        pillar: "WorshipMoment",
        title: "Acoustic Worship Session",
        description: "A moment of peace with scrolling lyrics to guide your prayer.",
        icon: Music2,
        image: "https://placehold.co/600x400.png",
        aiHint: "acoustic guitar"
    },
    { 
        pillar: "SocialImpact",
        title: "Serving the City",
        description: "Highlighting a story of young Christians making a difference locally.",
        icon: HeartHandshake,
        image: "https://placehold.co/600x400.png",
        aiHint: "volunteers community"
    },
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

type UserStats = {
    journalEntries: number;
    prayerRequests: number;
    posts: number;
};

const StatCardSkeleton = () => (
    <div className="grid grid-cols-3 md:grid-cols-6 gap-2 text-center w-full">
        {[...Array(6)].map((_, i) => (
            <div key={i} className="rounded-lg p-2">
                <Skeleton className="h-9 w-9 rounded-full mx-auto mb-2" />
                <Skeleton className="h-4 w-10 mx-auto" />
                <Skeleton className="h-3 w-12 mx-auto mt-1" />
            </div>
        ))}
    </div>
);


export function DashboardContent() {
    const { user, authReady } = useAuth();
    const [stats, setStats] = useState<UserStats | null>(null);
    const [loadingStats, setLoadingStats] = useState(true);

    useEffect(() => {
        if (authReady && user) {
            const fetchStats = async () => {
                setLoadingStats(true);
                try {
                    const userStats = await getUserStats(user.uid);
                    setStats(userStats);
                } catch (error) {
                    console.error("Failed to fetch user stats:", error);
                    // Set stats to 0 on failure so UI doesn't break
                    setStats({ journalEntries: 0, prayerRequests: 0, posts: 0 });
                } finally {
                    setLoadingStats(false);
                }
            };
            fetchStats();
        } else if (!authReady) {
            setLoadingStats(true);
        } else {
            setLoadingStats(false);
            setStats({ journalEntries: 0, prayerRequests: 0, posts: 0 });
        }
    }, [user, authReady]);
    
    const userStats = [
      { label: 'Posts', value: stats?.posts, icon: Newspaper, href: '/social-feed', color: 'text-blue-500', bgColor: 'bg-blue-500/10' },
      { label: 'Following', value: 72, icon: UserCheck, href: '#', color: 'text-teal-500', bgColor: 'bg-teal-500/10' },
      { label: 'Prayers', value: stats?.prayerRequests, icon: Heart, href: '/prayer-wall', color: 'text-rose-500', bgColor: 'bg-rose-500/10' },
      { label: 'Streak', value: stats?.journalEntries, icon: Flame, href: '/journal', unit: 'days', color: 'text-orange-500', bgColor: 'bg-orange-500/10' },
      { label: 'Groups', value: 5, icon: Users, href: '#', color: 'text-indigo-500', bgColor: 'bg-indigo-500/10' },
      { label: 'Events', value: 3, icon: Calendar, href: '/events', color: 'text-purple-500', bgColor: 'bg-purple-500/10' },
    ];

    return (
        <div className="space-y-8">
            <Card className="overflow-hidden border-0 shadow-lg">
                <div className="bg-gradient-to-br from-primary via-fuchsia-500 to-rose-500 text-primary-foreground p-6">
                    <div className="flex items-center gap-4">
                        <Avatar className="h-16 w-16 border-2 border-primary-foreground/50">
                            <Image src={user?.photoURL || 'https://placehold.co/100x100.png'} alt={user?.displayName || ''} data-ai-hint="person portrait" priority width={64} height={64} />
                            <AvatarFallback>{user?.displayName?.charAt(0).toUpperCase() || 'U'}</AvatarFallback>
                        </Avatar>
                        <div>
                            <h1 className="text-3xl font-bold">Welcome, {user?.displayName || "Believer"}!</h1>
                            <p className="opacity-80">Your personalized hub is buzzing with activity.</p>
                        </div>
                    </div>
                </div>
                <CardFooter className="bg-card p-4">
                    {loadingStats ? <StatCardSkeleton /> : (
                        <div className="grid grid-cols-3 md:grid-cols-6 gap-2 text-center w-full">
                            {userStats.map(stat => (
                                <Link href={stat.href} key={stat.label} className="group rounded-lg p-2 hover:bg-accent/50 transition-colors duration-200">
                                    <div className={cn(
                                        "p-2 rounded-full w-fit mx-auto mb-2 transition-all duration-200 group-hover:scale-110", 
                                        stat.bgColor
                                    )}>
                                        <stat.icon className={cn("h-5 w-5", stat.color)}/>
                                    </div>
                                    <p className="font-semibold text-base">{stat.value ?? 0}</p>
                                    <p className="text-xs text-muted-foreground">{stat.label} {stat.value ? stat.unit : ''}</p>
                                </Link>
                            ))}
                        </div>
                    )}
                </CardFooter>
            </Card>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                <div className="lg:col-span-2 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>The Vibe & Core</CardTitle>
                            <CardDescription>Vibes & content curated for you. Here's what's resonating in the community right now.</CardDescription>
                        </CardHeader>
                        <CardContent>
                           <Carousel opts={{ align: "start" }} className="w-full">
                                <CarouselContent>
                                    {theVibeAndCoreItems.map((item, index) => (
                                    <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                                        <div className="p-1">
                                            <Link href="/social-feed" className="group block">
                                                <Card className="overflow-hidden">
                                                    <CardContent className="p-0">
                                                        <div className="aspect-video relative">
                                                            <Image src={item.image} alt={item.title} fill className="object-cover group-hover:scale-105 transition-transform" data-ai-hint={item.aiHint} />
                                                        </div>
                                                        <div className="p-3">
                                                            <div className="flex items-center gap-1.5 text-xs text-primary font-semibold mb-1">
                                                                <item.icon className="w-3.5 h-3.5" />
                                                                {item.pillar}
                                                            </div>
                                                            <h3 className="font-semibold text-sm leading-tight group-hover:underline">{item.title}</h3>
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            </Link>
                                        </div>
                                    </CarouselItem>
                                    ))}
                                </CarouselContent>
                                <CarouselPrevious className="hidden sm:flex" />
                                <CarouselNext className="hidden sm:flex" />
                            </Carousel>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Quick Links</CardTitle>
                             <CardDescription>Provoking your engagement. What will you do next?</CardDescription>
                        </CardHeader>
                        <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
                             {quickLinks.map(link => (
                                <Link href={link.href} key={link.label} className="group">
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
                            <CardTitle className="flex items-center gap-2"><Wand2 /> AI-Powered Tools</CardTitle>
                            <CardDescription>Enhance your spiritual journey with our new AI assistants.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <Button variant="outline" className="w-full justify-start" asChild>
                                <Link href="/journal"><PenSquare className="mr-2"/> AI Journal Assistant</Link>
                            </Button>
                            <Button variant="outline" className="w-full justify-start" asChild>
                                <Link href="/prayer-wall"><Sparkles className="mr-2"/> AI Prayer Assistant</Link>
                            </Button>
                        </CardContent>
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
