import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { PrayButton } from "@/components/app/pray-button";
import {
    CalendarCheck,
    Clapperboard,
    Flame,
    HandHelping,
    PlusCircle,
    Search,
    Users,
    Video,
    Globe,
    School,
    Church
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const quickActions = [
    { label: "New Reel", icon: Clapperboard, color: "bg-rose-500" },
    { label: "Add Prayer", icon: HandHelping, color: "bg-blue-500" },
    { label: "Find Event", icon: CalendarCheck, color: "bg-amber-500" },
    { label: "Start Group", icon: Users, color: "bg-green-500" },
];

const upcomingEvents = [
    { title: "Youth Worship Night", time: "Fri, 7:00 PM", location: "Main Sanctuary" },
    { title: "Community Outreach", time: "Sat, 9:00 AM", location: "City Park" },
    { title: "Prophetic Workshop", time: "Sat, 2:00 PM", location: "Fellowship Hall" },
];

const prayerRequests = [
    { name: "Jessica L.", request: "Praying for strength and wisdom for my upcoming exams.", avatar: "https://placehold.co/100x100/f9a8d4/4c1d95.png", aiHint: "woman portrait", initialPrayers: 12 },
    { name: "David R.", request: "Please pray for my family's health and protection.", avatar: "https://placehold.co/100x100/a5b4fc/1e3a8a.png", aiHint: "man portrait", initialPrayers: 28 },
];

export default function DashboardPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-headline font-bold">Welcome Back, Believer!</h1>
                <p className="text-muted-foreground">Here&apos;s what&apos;s happening in your community today.</p>
            </div>
            
            <section>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {quickActions.map(action => (
                         <Card key={action.label} className="flex flex-col items-center justify-center p-4 hover:shadow-lg transition-shadow cursor-pointer">
                            <div className={`p-3 rounded-full ${action.color} mb-2`}>
                                <action.icon className="h-6 w-6 text-white" />
                            </div>
                            <p className="text-sm font-semibold">{action.label}</p>
                         </Card>
                    ))}
                </div>
            </section>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card className="flex flex-col lg:col-span-2">
                    <CardHeader>
                        <CardTitle className="font-headline">Find Your Community</CardTitle>
                        <CardDescription>Search for churches, groups, and events globally, or add your own listing.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex gap-2">
                            <div className="relative flex-grow">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                <Input placeholder="Search globally..." className="pl-10 h-11" />
                            </div>
                            <Button size="lg">Search</Button>
                        </div>
                        <div className="mt-4 flex flex-wrap gap-2">
                            <Button variant="outline"><Church className="mr-2"/>Churches</Button>
                            <Button variant="outline"><Users className="mr-2"/>Youth Groups</Button>
                            <Button variant="outline"><CalendarCheck className="mr-2"/>Events</Button>
                            <Button variant="outline"><School className="mr-2"/>Campus Groups</Button>
                            <Button variant="outline"><PlusCircle className="mr-2"/>Add Listing</Button>
                        </div>
                    </CardContent>
                </Card>

                <Card className="flex flex-col justify-between">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 font-headline">
                            <Flame className="text-amber-500" />
                            Quiet Time Streak
                        </CardTitle>
                        <CardDescription>Consistency is key to spiritual growth.</CardDescription>
                    </CardHeader>
                    <CardContent className="text-center">
                        <div className="text-6xl font-bold font-headline text-primary">12</div>
                        <p className="text-muted-foreground">Days in a row!</p>
                    </CardContent>
                </Card>

                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle className="font-headline">Upcoming Events</CardTitle>
                        <CardDescription>Get involved and connect with others.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-4">
                            {upcomingEvents.map(event => (
                                <li key={event.title} className="flex items-center gap-4">
                                    <div className="p-3 bg-accent rounded-lg">
                                        <CalendarCheck className="w-5 h-5 text-accent-foreground" />
                                    </div>
                                    <div className="flex-grow">
                                        <p className="font-semibold">{event.title}</p>
                                        <p className="text-sm text-muted-foreground">{event.time} &bull; {event.location}</p>
                                    </div>
                                    <Button variant="ghost" size="sm">Details</Button>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>

                <Card className="lg:col-span-2">
                    <CardHeader>
                         <CardTitle className="font-headline">Prayer Wall</CardTitle>
                         <CardDescription>Lift up your community in prayer.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {prayerRequests.map((prayer, index) => (
                                <div key={index} className="flex items-start gap-4">
                                    <Avatar>
                                        <AvatarImage src={prayer.avatar} data-ai-hint={prayer.aiHint}/>
                                        <AvatarFallback>{prayer.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex-grow">
                                        <p className="font-semibold text-sm">{prayer.name}</p>
                                        <p className="text-sm text-muted-foreground">{prayer.request}</p>
                                    </div>
                                    <PrayButton count={prayer.initialPrayers} />
                                </div>
                            ))}
                        </div>
                        <Button variant="outline" className="w-full mt-4">View More Prayers</Button>
                    </CardContent>
                </Card>
                
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline">Faith Reels</CardTitle>
                        <CardDescription>Trending short videos from the community.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            <Link href="/faith-reels" className="block relative rounded-lg overflow-hidden aspect-[9/16] group">
                                <Image src="https://placehold.co/300x533/ff00ff/ffffff.png" alt="Faith Reel thumbnail" fill style={{ objectFit: 'cover' }} data-ai-hint="worship concert" />
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Video className="w-12 h-12 text-white" />
                                </div>
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
