
"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { db } from "@/lib/firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { createJournalEntry, JournalEntryData } from "@/lib/firestore";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle, Lock, Unlock, Smile, ThumbsUp, Lightbulb, Wand2 } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { getJournalSuggestion, JournalAssistantInput } from "@/ai/flows/journal-assistant-flow";
import { ScrollArea } from "@/components/ui/scroll-area";

type JournalEntry = JournalEntryData & { id: string };

const entryTypes = [
    "Reflection", "Dream", "Vision", "Prophetic Impression", "Prediction/Future Event", "Message from God"
];

const JournalSkeleton = () => (
    <div className="space-y-3">
        {[...Array(3)].map((_, i) => (
            <Card key={i} className="p-4 space-y-2">
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-3 w-1/4" />
                <Skeleton className="h-3 w-5/6" />
            </Card>
        ))}
    </div>
);

export default function JournalPage() {
    const { user, authReady } = useAuth();
    const { toast } = useToast();

    // Form state
    const [title, setTitle] = useState("");
    const [entryType, setEntryType] = useState("Reflection");
    const [content, setContent] = useState("");
    const [tags, setTags] = useState("");
    const [isPublic, setIsPublic] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    // AI Assistant state
    const [aiOpen, setAiOpen] = useState(false);
    const [aiTopic, setAiTopic] = useState("");
    const [aiLoading, setAiLoading] = useState(false);
    const [aiSuggestion, setAiSuggestion] = useState("");

    // Entries state
    const [entries, setEntries] = useState<JournalEntry[]>([]);
    const [loadingEntries, setLoadingEntries] = useState(true);

    useEffect(() => {
        if (!authReady || !user) {
            if (!user) {
                setLoadingEntries(false);
                setEntries([]);
            }
            return;
        }

        const q = query(
            collection(db, "journalEntries"),
            where("userId", "==", user.uid)
        );

        const unsubscribe = onSnapshot(q,
            (snapshot) => {
                const fetchedEntries = snapshot.docs.map(doc => ({ ...doc.data() as JournalEntryData, id: doc.id }));
                const sortedEntries = fetchedEntries.sort((a, b) => (b.timestamp?.toDate()?.getTime() ?? 0) - (a.timestamp?.toDate()?.getTime() ?? 0));
                setEntries(sortedEntries);
                setLoadingEntries(false);
            },
            (error: any) => {
                if (error.code === 'permission-denied') {
                     console.log("Permission denied on journal listener, likely during auth transition or due to incorrect security rules.");
                    setEntries([]);
                } else if (error.code === 'failed-precondition') {
                    console.error("Firestore Error: Missing Index.", "This query requires a composite index. Please create it in your Firebase console:", error.message);
                    toast({
                        variant: "destructive",
                        title: "Database Error",
                        description: "A required database index is missing. Please contact support.",
                        duration: 10000,
                    });
                } else {
                    console.error("Journal snapshot error:", error);
                    toast({ variant: "destructive", title: "Error", description: "Could not fetch your journal entries." });
                }
                setLoadingEntries(false);
            }
        );

        return () => unsubscribe();
    }, [user, authReady, toast]);


    const handleSaveEntry = async () => {
        if (!user || !title || !content) {
            toast({ variant: "destructive", title: "Missing fields", description: "Please provide a title and content for your entry." });
            return;
        }
        setIsSaving(true);
        const entryData: Omit<JournalEntryData, 'userId' | 'timestamp'> = {
            title,
            content,
            type: entryType,
            isPublic,
            tags: tags.split(',').map(tag => tag.trim()).filter(Boolean),
        };

        try {
            await createJournalEntry(user, entryData);
            toast({ title: "Entry Saved!", description: "Your journal entry has been saved." });
            // Reset form
            setTitle("");
            setContent("");
            setTags("");
            setIsPublic(false);
            setEntryType("Reflection");
        } catch (error) {
            console.error("Error saving entry:", error);
            toast({ variant: "destructive", title: "Save Failed", description: "Could not save your journal entry." });
        } finally {
            setIsSaving(false);
        }
    };

    const handleGetSuggestion = async () => {
        if (!aiTopic) return;
        setAiLoading(true);
        setAiSuggestion("");
        try {
            const input: JournalAssistantInput = { topic: aiTopic, entryType };
            const result = await getJournalSuggestion(input);
            setAiSuggestion(result.suggestion);
        } catch (error) {
            console.error("AI Error:", error);
            toast({ variant: "destructive", title: "AI Error", description: "Could not get a suggestion." });
        } finally {
            setAiLoading(false);
        }
    };

    const handleUseSuggestion = () => {
        setContent(prev => prev ? `${prev}\n\n${aiSuggestion}` : aiSuggestion);
        setAiOpen(false);
        setAiSuggestion("");
        setAiTopic("");
    };

  return (
    <div className="grid lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-6">
            <Card>
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <CardTitle className="flex items-center gap-2">
                            <PlusCircle className="text-primary"/> New Journal Entry
                        </CardTitle>
                        <Dialog open={aiOpen} onOpenChange={setAiOpen}>
                            <DialogTrigger asChild>
                                <Button variant="outline"><Wand2 className="mr-2 h-4 w-4"/> AI Assistant</Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>AI Journal Assistant</DialogTitle>
                                </DialogHeader>
                                <div className="space-y-4">
                                    <p className="text-sm text-muted-foreground">What's on your mind? The AI can help you get started with a reflection or some guiding questions.</p>
                                    <Textarea 
                                        placeholder="e.g., I had a stressful day at work"
                                        value={aiTopic}
                                        onChange={(e) => setAiTopic(e.target.value)}
                                    />
                                    <Button onClick={handleGetSuggestion} disabled={aiLoading || !aiTopic}>
                                        {aiLoading ? "Thinking..." : "Get Suggestion"}
                                    </Button>
                                    {aiLoading && <Skeleton className="h-20 w-full" />}
                                    {aiSuggestion && (
                                        <div className="p-4 bg-muted rounded-md text-sm">
                                            <p className="whitespace-pre-wrap">{aiSuggestion}</p>
                                        </div>
                                    )}
                                    {aiSuggestion && <Button onClick={handleUseSuggestion}>Use This Suggestion</Button>}
                                </div>
                            </DialogContent>
                        </Dialog>
                    </div>
                    <CardDescription>Log your dreams, visions, and prophetic impressions. Your entries are private by default.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                         <Input 
                            placeholder="Entry Title (e.g., 'Dream about...')"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                         />
                         <Select value={entryType} onValueChange={setEntryType}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select entry type..."/>
                            </SelectTrigger>
                            <SelectContent>
                                {entryTypes.map(type => (
                                    <SelectItem key={type} value={type}>{type}</SelectItem>
                                ))}
                            </SelectContent>
                         </Select>
                    </div>
                    <Textarea 
                        placeholder="Start writing here..." 
                        className="min-h-[250px]"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                    <Input 
                        placeholder="Add tags, separated by commas (e.g., hope, prayer, vision)"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                    />
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                        <Switch id="share-entry" checked={isPublic} onCheckedChange={setIsPublic} />
                        <Label htmlFor="share-entry">Share publicly with community</Label>
                    </div>
                    <Button onClick={handleSaveEntry} disabled={isSaving || !user}>
                        {isSaving ? "Saving..." : "Save Entry"}
                    </Button>
                </CardFooter>
            </Card>
        </div>
        <div className="space-y-4">
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Past Entries</CardTitle>
                </CardHeader>
                <CardContent>
                    <ScrollArea className="space-y-3 max-h-[70vh] overflow-y-auto pr-4">
                        {loadingEntries ? <JournalSkeleton /> : (
                            entries.length > 0 ? entries.map(entry => (
                                <Card key={entry.id} className="p-0 hover:bg-accent transition-colors mb-3">
                                    <Link href="#" className="block p-4">
                                        <div className="flex justify-between items-start">
                                            <div className="flex-1">
                                                <Badge variant={entry.isPublic ? "outline" : "secondary" } className="mb-2">{entry.type}</Badge>
                                                <h3 className="font-semibold">{entry.title}</h3>
                                            </div>
                                            {entry.isPublic ? <Unlock className="w-4 h-4 text-muted-foreground" /> : <Lock className="w-4 h-4 text-muted-foreground" />}
                                        </div>
                                        <p className="text-sm text-muted-foreground">
                                            {entry.timestamp?.toDate().toLocaleDateString() || 'Just now'}
                                        </p>
                                        <p className="text-sm text-foreground/80 mt-1 truncate">{entry.content}</p>
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
                            )) : <p className="text-sm text-muted-foreground text-center py-4">No journal entries yet.</p>
                        )}
                    </ScrollArea>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}

    