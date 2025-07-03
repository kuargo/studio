import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Send, ThumbsUp, MessageCircle, Smile } from "lucide-react";
import { PrayButton } from "@/components/app/pray-button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";

const prayerRequests = [
    { id: 1, name: "Maria S.", avatar: "https://placehold.co/100x100/c4b5fd/4338ca.png", aiHint: "woman smiling", request: "Pray for my job interview this Wednesday. That I may have favor and clarity.", category: "Personal", initialPrayers: 42, timestamp: "2h ago", comments: [] },
    { id: 2, name: "John F.", avatar: "https://placehold.co/100x100/a7f3d0/065f46.png", aiHint: "man outdoors", request: "Urgent prayer for my father who is undergoing surgery right now.", category: "Family", initialPrayers: 112, timestamp: "5h ago", comments: [{name: "Pastor Rob", text: "Standing with you in prayer, John. Believing for a successful surgery and quick recovery."}] },
    { id: 3, name: "Youth Group", avatar: "https://placehold.co/100x100/fecaca/991b1b.png", aiHint: "group people", request: "For our upcoming youth camp, that the teens would have a powerful encounter with God.", category: "Church", initialPrayers: 78, timestamp: "1d ago", comments: [] },
    { id: 4, name: "Anonymous", avatar: "", aiHint: "", request: "Struggling with depression and loneliness. Please pray for a breakthrough and for divine friendships.", category: "Personal", initialPrayers: 95, timestamp: "2d ago", comments: [] },
    { id: 5, name: "Sarah K.", avatar: "https://placehold.co/100x100/fed7aa/9a3412.png", aiHint: "woman laughing", request: "Praise report! I was healed from chronic back pain. Thank you all for your prayers!", category: "Praise", initialPrayers: 201, timestamp: "3d ago", comments: [{name: "Anonymous", text: "Amen! So happy for you!"}, {name: "Jessica L.", text: "This is amazing! Our God is a healer."}] },
];

export default function PrayerWallPage() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2 space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline">Share a Prayer Request</CardTitle>
                        <CardDescription>Let your community stand with you in prayer. Your request will be posted publicly.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Textarea placeholder="What do you need prayer for?" className="min-h-[100px]" />
                    </CardContent>
                    <CardFooter className="flex justify-between items-center">
                        <p className="text-xs text-muted-foreground">You can post anonymously.</p>
                        <Button className="bg-primary hover:bg-primary/90">
                            <Send className="mr-2 h-4 w-4" />
                            Post Request
                        </Button>
                    </CardFooter>
                </Card>

                <Tabs defaultValue="all" className="w-full">
                    <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="all">All</TabsTrigger>
                        <TabsTrigger value="personal">Personal</TabsTrigger>
                        <TabsTrigger value="family">Family</TabsTrigger>
                        <TabsTrigger value="church">Church</TabsTrigger>
                    </TabsList>
                    <TabsContent value="all" className="mt-4">
                        <div className="space-y-4">
                            {prayerRequests.map(p => <PrayerCard key={p.id} {...p} />)}
                        </div>
                    </TabsContent>
                    <TabsContent value="personal" className="mt-4">
                        <div className="space-y-4">
                            {prayerRequests.filter(p => p.category === 'Personal').map(p => <PrayerCard key={p.id} {...p} />)}
                        </div>
                    </TabsContent>
                    <TabsContent value="family" className="mt-4">
                        <div className="space-y-4">
                            {prayerRequests.filter(p => p.category === 'Family').map(p => <PrayerCard key={p.id} {...p} />)}
                        </div>
                    </TabsContent>
                    <TabsContent value="church" className="mt-4">
                         <div className="space-y-4">
                            {prayerRequests.filter(p => p.category === 'Church').map(p => <PrayerCard key={p.id} {...p} />)}
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
            <div className="lg:col-span-1 space-y-6 lg:sticky top-8">
                <Card className="bg-gradient-to-br from-primary to-fuchsia-600 text-primary-foreground">
                    <CardHeader>
                        <CardTitle className="font-headline">Verse of the Day</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-lg italic">&quot;For where two or three gather in my name, there am I with them.&quot;</p>
                        <p className="text-right font-semibold mt-2">- Matthew 18:20</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle className="font-headline">Praise Reports</CardTitle>
                        <CardDescription>See how God is moving!</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                       {prayerRequests.filter(p => p.category === 'Praise').map(p => (
                            <div key={p.id} className="text-sm border-l-2 border-green-500 pl-3">
                                <p className="text-muted-foreground">{p.request}</p>
                                <p className="font-semibold">- {p.name}</p>
                            </div>
                       ))}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

function PrayerCard({ name, avatar, aiHint, request, initialPrayers, timestamp, comments }: typeof prayerRequests[0]) {
    return (
        <Card>
            <CardContent className="p-4 flex gap-4">
                <Avatar className="h-12 w-12">
                    <AvatarImage src={avatar} data-ai-hint={aiHint} />
                    <AvatarFallback>{name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-grow">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="font-semibold">{name}</p>
                            <p className="text-xs text-muted-foreground">{timestamp}</p>
                        </div>
                        <div className="flex items-center gap-1">
                            <PrayButton count={initialPrayers} />
                        </div>
                    </div>
                    <p className="mt-2 text-sm text-foreground/80">{request}</p>
                </div>
            </CardContent>
            <CardFooter className="p-0">
                <Collapsible className="w-full">
                     <Separator />
                    <div className="p-4">
                        <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm" className="flex items-center gap-1.5"><ThumbsUp className="w-4 h-4" /> Agree</Button>
                            <Button variant="ghost" size="sm" className="flex items-center gap-1.5"><Smile className="w-4 h-4" /> Encourage</Button>
                            <CollapsibleTrigger asChild>
                                <Button variant="ghost" size="sm" className="flex items-center gap-1.5 ml-auto"><MessageCircle className="w-4 h-4" /> {comments.length} Comment(s)</Button>
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
