import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle, Lock, Unlock, Tag, Smile, ThumbsUp, Lightbulb } from "lucide-react";
import Link from "next/link";

const journalEntries = [
    { id: 1, title: "Dream about a flowing river", date: "August 12, 2024", type: "Dream", isPublic: false, snippet: "I was standing by a river that was flowing so fast...", tags: ["guidance", "change"] },
    { id: 2, title: "Vision during worship", date: "August 10, 2024", type: "Vision", isPublic: true, snippet: "Saw an image of a lion and a lamb together, felt a sense of peace...", tags: ["peace", "Jesus", "prophetic"] },
    { id: 3, title: "Thoughts on Isaiah 40", date: "August 9, 2024", type: "Reflection", isPublic: false, snippet: "'They who wait for the Lord shall renew their strength...' this really spoke to me today...", tags: ["scripture", "hope"] },
    { id: 4, title: "Prophetic word for a friend", date: "August 7, 2024", type: "Prophetic Impression", isPublic: true, snippet: "Felt a strong sense that I needed to pray for Sarah's new job.", tags: ["prayer", "encouragement"] },
];

export default function JournalPage() {
  return (
    <div className="grid lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl flex items-center gap-2">
                        <PlusCircle className="text-primary"/> New Journal Entry
                    </CardTitle>
                    <CardDescription>Log your dreams, visions, and prophetic impressions. Your entries are private by default.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                         <Input placeholder="Entry Title (e.g., 'Dream about...')"/>
                         <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Select entry type..."/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="reflection">Reflection</SelectItem>
                                <SelectItem value="dream">Dream</SelectItem>
                                <SelectItem value="vision">Vision</SelectItem>
                                <SelectItem value="prophetic">Prophetic Impression</SelectItem>
                                <SelectItem value="prediction">Prediction/Future Event</SelectItem>
                                <SelectItem value="message">Message from God</SelectItem>
                            </SelectContent>
                         </Select>
                    </div>
                    <Textarea placeholder="Start writing here..." className="min-h-[250px]"/>
                    <Input placeholder="Add tags, separated by commas (e.g., hope, prayer, vision)"/>
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
                        <Card key={entry.id} className="p-0 hover:bg-accent transition-colors">
                            <Link href="#" className="block p-4">
                                <div className="flex justify-between items-start">
                                    <div className="flex-1">
                                        <Badge variant={entry.isPublic ? "outline" : "secondary" } className="mb-2">{entry.type}</Badge>
                                        <h3 className="font-semibold">{entry.title}</h3>
                                    </div>
                                    {entry.isPublic ? <Unlock className="w-4 h-4 text-muted-foreground" /> : <Lock className="w-4 h-4 text-muted-foreground" />}
                                </div>
                                <p className="text-sm text-muted-foreground">{entry.date}</p>
                                <p className="text-sm text-foreground/80 mt-1 truncate">{entry.snippet}</p>
                                {entry.isPublic && (
                                <div className="mt-3 pt-3 border-t">
                                     <div className="flex items-center gap-2">
                                        <Button variant="ghost" size="icon" className="h-7 w-7"><ThumbsUp className="w-4 h-4"/></Button>
                                        <Button variant="ghost" size="icon" className="h-7 w-7"><Smile className="w-4 h-4"/></Button>
                                        <Button variant="ghost" size="icon" className="h-7 w-7"><Lightbulb className="w-4 h-4"/></Button>
                                        <div className="flex-1" />
                                        {entry.tags.slice(0, 2).map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
                                    </div>
                                </div>
                                )}
                            </Link>
                        </Card>
                    ))}
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
