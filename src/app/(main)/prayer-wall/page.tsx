
"use client";

import { useState, useEffect } from "react";
import { collection, addDoc, serverTimestamp, query, orderBy, onSnapshot, where, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/hooks/use-auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Send, ThumbsUp, MessageCircle, Smile, CheckCheck, Sparkles, Trophy, BookOpen, Wand2 } from "lucide-react";
import { PrayButton } from "@/components/app/pray-button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { askPrayerAssistant, PrayerAssistantInput } from "@/ai/flows/prayer-assistant-flow";

type PrayerRequest = {
    id: string;
    userId: string;
    name: string;
    avatar: string;
    aiHint: string;
    request: string;
    category: 'Personal' | 'Family' | 'Church' | 'Praise' | 'Answered' | 'Testimony' | 'Verdict';
    timestamp: Timestamp;
    prayCount: number;
    comments: { name: string; text: string; }[];
    type: 'request' | 'testimony' | 'verdict' | 'answered';
};

const PrayerWallSkeleton = () => (
    <div className="space-y-4 mt-4">
        {[...Array(3)].map((_, i) => (
            <Card key={i}>
                <CardContent className="p-4 flex gap-4">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="flex-grow space-y-2">
                        <Skeleton className="h-4 w-1/4" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                    </div>
                </CardContent>
                <CardFooter className="p-4 border-t">
                     <Skeleton className="h-8 w-24" />
                </CardFooter>
            </Card>
        ))}
    </div>
);


export default function PrayerWallPage() {
    const { user, loading: authLoading } = useAuth();
    const { toast } = useToast();
    const [newRequest, setNewRequest] = useState("");
    const [loading, setLoading] = useState(false);
    const [prayerRequests, setPrayerRequests] = useState<PrayerRequest[]>([]);
    const [initialLoading, setInitialLoading] = useState(true);

    // AI Prayer Assistant State
    const [prayerTopic, setPrayerTopic] = useState("");
    const [prayerResponse, setPrayerResponse] = useState("");
    const [loadingPrayer, setLoadingPrayer] = useState(false);

    useEffect(() => {
        // This listener is for public data, so we don't need to wait for auth.
        const q = query(collection(db, "prayerRequests"), orderBy("timestamp", "desc"));
        const unsubscribe = onSnapshot(q, 
            (querySnapshot) => {
                const requests = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                } as PrayerRequest));
                setPrayerRequests(requests);
                setInitialLoading(false);
            }, 
            (error) => {
                console.error("Error fetching prayer requests: ", error);
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: "Could not fetch prayer requests. Check security rules."
                });
                setInitialLoading(false);
            }
        );

        return () => unsubscribe();
    }, [toast]);


    const handlePostRequest = async () => {
        if (!user || !newRequest.trim()) return;
        setLoading(true);
        try {
            await addDoc(collection(db, "prayerRequests"), {
                userId: user.uid,
                name: user.displayName || "Anonymous",
                avatar: user.photoURL || "",
                aiHint: "person portrait",
                request: newRequest,
                timestamp: serverTimestamp(),
                prayCount: 0,
                comments: [],
                type: 'request',
                category: 'Personal' // Default category
            });
            setNewRequest("");
            toast({
                title: "Success!",
                description: "Your prayer request has been posted.",
            });
        } catch (error) {
            console.error("Error posting request: ", error);
            toast({
                variant: "destructive",
                title: "Error",
                description: "Could not post your request. Please try again."
            });
        } finally {
            setLoading(false);
        }
    };
    
    const handleGetPrayer = async () => {
        if (!prayerTopic.trim()) return;
        setLoadingPrayer(true);
        setPrayerResponse("");
        try {
            const input: PrayerAssistantInput = { topic: prayerTopic };
            const result = await askPrayerAssistant(input);
            setPrayerResponse(result.prayer);
        } catch (error) {
             console.error("AI Prayer Error: ", error);
            toast({
                variant: "destructive",
                title: "AI Error",
                description: "Could not generate a prayer. Please try again."
            });
        } finally {
            setLoadingPrayer(false);
        }
    };

    const filterPosts = (type: PrayerRequest['type']) => {
        return prayerRequests.filter(p => p.type === type);
    }
    
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2 space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Share a Request or Testimony</CardTitle>
                        <CardDescription>Let your community stand with you or celebrate with you. Your post will be public.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Textarea 
                            placeholder="What's on your heart?" 
                            className="min-h-[100px]"
                            value={newRequest}
                            onChange={(e) => setNewRequest(e.target.value)}
                            disabled={!user} 
                        />
                    </CardContent>
                    <CardFooter className="flex justify-between items-center">
                        <p className="text-xs text-muted-foreground">You can post anonymously in settings.</p>
                        <Button onClick={handlePostRequest} disabled={loading || !newRequest.trim() || !user}>
                            {loading ? "Posting..." : <><Send className="mr-2 h-4 w-4" /> Post to Wall</>}
                        </Button>
                    </CardFooter>
                </Card>

                <Tabs defaultValue="all" className="w-full">
                    <TabsList className="grid w-full grid-cols-5">
                        <TabsTrigger value="all">All</TabsTrigger>
                        <TabsTrigger value="requests">Requests</TabsTrigger>
                        <TabsTrigger value="answered"><CheckCheck className="mr-2"/>Answered</TabsTrigger>
                        <TabsTrigger value="testimonies"><Sparkles className="mr-2"/>Testimonies</TabsTrigger>
                        <TabsTrigger value="verdicts"><Trophy className="mr-2"/>Verdicts</TabsTrigger>
                    </TabsList>
                     {initialLoading ? <PrayerWallSkeleton /> : (
                        <>
                            <TabsContent value="all" className="mt-4">
                                <div className="space-y-4">
                                    {prayerRequests.map(p => <PrayerCard key={p.id} {...p} />)}
                                </div>
                            </TabsContent>
                            <TabsContent value="requests" className="mt-4">
                                <div className="space-y-4">
                                    {filterPosts('request').map(p => <PrayerCard key={p.id} {...p} />)}
                                </div>
                            </TabsContent>
                            <TabsContent value="answered" className="mt-4">
                                <div className="space-y-4">
                                    {filterPosts('answered').map(p => <PrayerCard key={p.id} {...p} />)}
                                </div>
                            </TabsContent>
                            <TabsContent value="testimonies" className="mt-4">
                                 <div className="space-y-4">
                                    {filterPosts('testimony').map(p => <PrayerCard key={p.id} {...p} />)}
                                </div>
                            </TabsContent>
                            <TabsContent value="verdicts" className="mt-4">
                                 <div className="space-y-4">
                                    {filterPosts('verdict').map(p => <PrayerCard key={p.id} {...p} />)}
                                </div>
                            </TabsContent>
                        </>
                     )}
                </Tabs>
            </div>
            <div className="lg:col-span-1 space-y-6 lg:sticky top-8">
                <Card className="bg-gradient-to-br from-primary to-fuchsia-600 text-primary-foreground">
                    <CardHeader>
                        <CardTitle>Verse of the Day</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-lg italic">&quot;For where two or three gather in my name, there am I with them.&quot;</p>
                        <p className="text-right font-semibold mt-2">- Matthew 18:20</p>
                    </CardContent>
                    <CardFooter>
                        <Button asChild variant="secondary" className="w-full">
                            <Link href="/bible">
                                <BookOpen className="mr-2 h-4 w-4" /> Read the Bible
                            </Link>
                        </Button>
                    </CardFooter>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                           <Wand2 className="text-primary"/> AI Prayer Assistant
                        </CardTitle>
                        <CardDescription>Need help finding the words? Let our AI assist you in crafting a prayer.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Textarea 
                            placeholder="e.g., For strength during a difficult time"
                            value={prayerTopic}
                            onChange={(e) => setPrayerTopic(e.target.value)}
                        />
                        {loadingPrayer && <Skeleton className="h-24 w-full" />}
                        {prayerResponse && (
                            <div className="p-4 bg-muted rounded-md text-sm">
                                <p className="whitespace-pre-wrap">{prayerResponse}</p>
                            </div>
                        )}
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full" onClick={handleGetPrayer} disabled={loadingPrayer || !prayerTopic.trim()}>
                            {loadingPrayer ? "Generating..." : "Ask for a Prayer"}
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}

function PrayerCard({ id, name, avatar, aiHint, request, prayCount, timestamp, comments, type }: PrayerRequest) {
    const typeMeta = {
        'answered': { color: 'border-green-500', icon: <CheckCheck className="h-4 w-4 text-green-500"/>, label: 'Answered' },
        'testimony': { color: 'border-yellow-500', icon: <Sparkles className="h-4 w-4 text-yellow-500"/>, label: 'Testimony' },
        'verdict': { color: 'border-blue-500', icon: <Trophy className="h-4 w-4 text-blue-500"/>, label: 'God\'s Verdict' },
        'request': { color: 'border-transparent', icon: null, label: '' },
    }[type];

    const timeAgo = (date: any) => {
        if (!date) return 'Just now';
        const seconds = Math.floor((new Date().getTime() - date.toDate().getTime()) / 1000);
        let interval = seconds / 31536000;
        if (interval > 1) return Math.floor(interval) + " years ago";
        interval = seconds / 2592000;
        if (interval > 1) return Math.floor(interval) + " months ago";
        interval = seconds / 86400;
        if (interval > 1) return Math.floor(interval) + " days ago";
        interval = seconds / 3600;
        if (interval > 1) return Math.floor(interval) + " hours ago";
        interval = seconds / 60;
        if (interval > 1) return Math.floor(interval) + " minutes ago";
        return Math.floor(seconds) + " seconds ago";
    };

    return (
        <Card className={`border-l-4 ${typeMeta.color}`}>
            <CardContent className="p-4 flex gap-4">
                <Avatar className="h-12 w-12">
                    <AvatarImage src={avatar} data-ai-hint={aiHint} />
                    <AvatarFallback>{name?.charAt(0) || 'A'}</AvatarFallback>
                </Avatar>
                <div className="flex-grow">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="font-semibold">{name}</p>
                            <p className="text-xs text-muted-foreground">{timeAgo(timestamp)}</p>
                        </div>
                        {typeMeta.icon && <Badge variant="outline" className="flex items-center gap-1.5">{typeMeta.icon}{typeMeta.label}</Badge>}
                    </div>
                    <p className="mt-2 text-sm text-foreground/80">{request}</p>
                </div>
            </CardContent>
            <CardFooter className="p-0">
                <Collapsible className="w-full">
                     <Separator />
                    <div className="p-4 flex items-center gap-2">
                        <PrayButton prayerId={id} count={prayCount} />
                        <div className="flex items-center gap-1 ml-auto">
                            <Button variant="ghost" size="sm" className="flex items-center gap-1.5"><ThumbsUp className="w-4 h-4" /> Agree</Button>
                            <Button variant="ghost" size="sm" className="flex items-center gap-1.5"><Smile className="w-4 h-4" /> Encourage</Button>
                            <CollapsibleTrigger asChild>
                                <Button variant="ghost" size="sm" className="flex items-center gap-1.5"><MessageCircle className="w-4 h-4" /> {comments.length > 0 ? comments.length : ''} Comment</Button>
                            </CollapsibleTrigger>
                        </div>
                    </div>
                    <CollapsibleContent>
                        <Separator />
                        <div className="bg-secondary/50 p-4 space-y-4">
                            {comments.map((comment, index) => (
                                <div key={index} className="flex gap-2 text-sm">
                                    <Avatar className="h-8 w-8">
                                        <AvatarFallback>{comment.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div className="bg-background rounded-lg p-2 flex-1">
                                        <p className="font-semibold text-xs">{comment.name}</p>
                                        <p>{comment.text}</p>
                                    </div>
                                </div>
                            ))}
                             <div className="flex gap-2 pt-2">
                                <Avatar className="h-8 w-8">
                                    <AvatarFallback>U</AvatarFallback>
                                </Avatar>
                                <Input placeholder="Write a comment..." className="h-8"/>
                                <Button size="sm">Send</Button>
                            </div>
                        </div>
                    </CollapsibleContent>
                </Collapsible>
            </CardFooter>
        </Card>
    )
}
