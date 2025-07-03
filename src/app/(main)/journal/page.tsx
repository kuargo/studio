import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle, Lock, Unlock } from "lucide-react";
import Link from "next/link";

const journalEntries = [
    { id: 1, title: "Dream about a flowing river", date: "August 12, 2024", isPublic: false, snippet: "I was standing by a river that was flowing so fast..." },
    { id: 2, title: "Vision during worship", date: "August 10, 2024", isPublic: true, snippet: "Saw an image of a lion and a lamb together, felt a sense of peace..." },
    { id: 3, title: "Thoughts on Isaiah 40", date: "August 9, 2024", isPublic: false, snippet: "'They who wait for the Lord shall renew their strength...' this really spoke to me today..." },
    { id: 4, title: "Prophetic impression for a friend", date: "August 7, 2024", isPublic: false, snippet: "Felt a strong sense that I needed to pray for Sarah's new job." },
];

export default function JournalPage() {
  return (
    <div className="grid lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl flex items-center gap-2">
                        <PlusCircle className="text-primary"/> New Journal Entry
                    </CardTitle>
                    <CardDescription>Log your dreams, visions, and prophetic impressions. Your entries are private by default.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Input placeholder="Entry Title (e.g., 'Dream about...')"/>
                    <Textarea placeholder="Start writing here..." className="min-h-[250px]"/>
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                        <Switch id="share-entry" />
                        <Label htmlFor="share-entry">Share publicly with community</Label>
                    </div>
                    <Button>Save Entry</Button>
                </CardFooter>
            </Card>
        </div>
        <div className="space-y-4">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-lg">Past Entries</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    {journalEntries.map(entry => (
                        <Link href="#" key={entry.id} className="block p-3 rounded-md hover:bg-accent">
                            <div className="flex justify-between items-start">
                                <h3 className="font-semibold">{entry.title}</h3>
                                {entry.isPublic ? <Unlock className="w-4 h-4 text-muted-foreground" /> : <Lock className="w-4 h-4 text-muted-foreground" />}
                            </div>
                            <p className="text-sm text-muted-foreground">{entry.date}</p>
                            <p className="text-sm text-foreground/80 mt-1 truncate">{entry.snippet}</p>
                        </Link>
                    ))}
                </CardContent>
            </Card>
        </div>
    </div>
  );
}