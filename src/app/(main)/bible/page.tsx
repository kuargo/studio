
"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Wand2, BookOpen, Send, User, Bot, AlertTriangle, Search, BookMarked, ChevronRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { askBibleAi, BibleChatInput } from "@/ai/flows/bible-chat-flow";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

const booksOfBible = [
  "Genesis", "Exodus", "Leviticus", "Numbers", "Deuteronomy", "Joshua", "Judges", "Ruth", "1 Samuel", "2 Samuel", "1 Kings", "2 Kings", "1 Chronicles", "2 Chronicles", "Ezra", "Nehemiah", "Esther", "Job", "Psalms", "Proverbs", "Ecclesiastes", "Song of Solomon", "Isaiah", "Jeremiah", "Lamentations", "Ezekiel", "Daniel", "Hosea", "Joel", "Amos", "Obadiah", "Jonah", "Micah", "Nahum", "Habakkuk", "Zephaniah", "Haggai", "Zechariah", "Malachi", "Matthew", "Mark", "Luke", "John", "Acts", "Romans", "1 Corinthians", "2 Corinthians", "Galatians", "Ephesians", "Philippians", "Colossians", "1 Thessalonians", "2 Thessalonians", "1 Timothy", "2 Timothy", "Titus", "Philemon", "Hebrews", "James", "1 Peter", "2 Peter", "1 John", "2 John", "3 John", "Jude", "Revelation"
];

const topicalVerses = {
    "Hope": ["Romans 15:13", "Jeremiah 29:11", "Hebrews 11:1"],
    "Joy": ["Nehemiah 8:10", "Psalm 16:11", "Philippians 4:4"],
    "Peace": ["John 14:27", "Philippians 4:6-7", "Isaiah 26:3"],
    "Strength": ["Isaiah 40:31", "Philippians 4:13", "Ephesians 6:10"],
    "Forgiveness": ["Ephesians 4:32", "1 John 1:9", "Colossians 3:13"],
    "Anxiety": ["1 Peter 5:7", "Matthew 6:34", "Psalm 94:19"],
    "Love": ["1 Corinthians 13:4-8", "John 15:13", "1 John 4:19"]
};

const ScriptureSkeleton = () => (
    <div className="space-y-4">
        <Skeleton className="h-8 w-1/2" />
        <div className="space-y-2">
            {[...Array(10)].map((_, i) => (
                <Skeleton key={i} className="h-4 w-full" />
            ))}
            <Skeleton className="h-4 w-3/4" />
        </div>
    </div>
);


export default function BiblePage() {
    const { toast } = useToast();
    const isAiConfigured = !!process.env.NEXT_PUBLIC_GOOGLE_AI_API_KEY;

    // AI Chat State
    const [question, setQuestion] = useState("");
    const [lastQuestion, setLastQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [isAiLoading, setIsAiLoading] = useState(false);

    // Bible Reader State
    const [book, setBook] = useState("John");
    const [chapter, setChapter] = useState("3");
    const [fromVerse, setFromVerse] = useState("16");
    const [toVerse, setToVerse] = useState("17");
    const [scriptureText, setScriptureText] = useState("");
    const [scriptureReference, setScriptureReference] = useState("");
    const [isScriptureLoading, setIsScriptureLoading] = useState(true);
    const [chapterCount, setChapterCount] = useState(21); // Default for John

    // Topical Search State
    const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
    const [topicResults, setTopicResults] = useState<{ reference: string, text: string }[]>([]);
    const [isTopicLoading, setIsTopicLoading] = useState(false);

    const fetchScripture = useCallback(async (passage: string) => {
        setIsScriptureLoading(true);
        try {
            const response = await fetch(`https://bible-api.com/${passage}?translation=kjv`);
            if (!response.ok) throw new Error("Failed to fetch scripture.");
            
            const data = await response.json();
            if (data.error) throw new Error(data.error);

            const formattedText = data.verses.map((v: any) => `[${v.verse}] ${v.text}`).join(' ').replace(/\n/g, ' ');
            setScriptureText(formattedText);
            setScriptureReference(data.reference);

        } catch (error: any) {
            console.error("Error fetching scripture:", error);
            toast({
                variant: "destructive",
                title: "Error Loading Scripture",
                description: error.message || "Could not load the selected scripture. Please try again."
            });
            setScriptureText("Failed to load scripture.");
            setScriptureReference("Error");
        } finally {
            setIsScriptureLoading(false);
        }
    }, [toast]);

    useEffect(() => {
        handleSearch();
    }, []); // Load initial scripture on mount

    const handleSearch = () => {
        let passage = `${book}+${chapter}`;
        if (fromVerse) {
            passage += `:${fromVerse}`;
            if (toVerse) {
                passage += `-${toVerse}`;
            }
        }
        fetchScripture(passage);
    };

    const fetchChapterCount = useCallback(async (currentBook: string) => {
        try {
            const response = await fetch(`https://bible-api.com/${currentBook}`);
            const data = await response.json();
            const counts: {[key: string]: number} = { "Genesis": 50, "Exodus": 40, "Psalms": 150, "John": 21, "Romans": 16, "Revelation": 22 };
            setChapterCount(counts[currentBook] || 30);
        } catch (error) {
            console.log("Could not dynamically fetch chapter count, using default.");
            setChapterCount(30);
        }
    }, []);

    const handleBookChange = (newBook: string) => {
        setBook(newBook);
        setChapter("1");
        setFromVerse("");
        setToVerse("");
        fetchChapterCount(newBook);
    };

    const handleTopicChange = async (topic: string) => {
        setSelectedTopic(topic);
        setIsTopicLoading(true);
        setTopicResults([]);
        const verses = topicalVerses[topic as keyof typeof topicalVerses];
        if (!verses) {
            setIsTopicLoading(false);
            return;
        }

        try {
            const results = await Promise.all(verses.map(async (verse) => {
                const response = await fetch(`https://bible-api.com/${verse}?translation=kjv`);
                if (!response.ok) return { reference: verse, text: "Could not load verse." };
                const data = await response.json();
                return { reference: data.reference, text: data.text };
            }));
            setTopicResults(results);
        } catch (error) {
             toast({ variant: "destructive", title: "Error", description: "Could not load topical verses." });
        } finally {
            setIsTopicLoading(false);
        }
    }

    const handleAskAi = async () => {
        if (!question.trim() || !isAiConfigured) return;
        setIsAiLoading(true);
        setAnswer("");
        setLastQuestion(question);
        
        try {
            const result = await askBibleAi({ question });
            setAnswer(result.answer);
        } catch (error) {
            console.error("Error asking Bible AI:", error);
            toast({ variant: "destructive", title: "AI Error", description: "The AI failed to generate a response." });
        } finally {
            setIsAiLoading(false);
            setQuestion("");
        }
    };


  return (
    <div className="grid lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-6">
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <BookOpen className="h-6 w-6 text-primary"/>
                        <CardTitle>Bible Reader</CardTitle>
                    </div>
                    <CardDescription>Select a book, chapter, and verse range to study the King James Version.</CardDescription>
                </CardHeader>
                <CardContent>
                     <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
                        <Select value={book} onValueChange={handleBookChange}>
                            <SelectTrigger className="col-span-2 md:col-span-2">
                                <SelectValue placeholder="Select a book" />
                            </SelectTrigger>
                            <SelectContent>
                                {booksOfBible.map(b => <SelectItem key={b} value={b}>{b}</SelectItem>)}
                            </SelectContent>
                        </Select>
                        <Select value={chapter} onValueChange={setChapter}>
                            <SelectTrigger>
                                <SelectValue placeholder="Ch." />
                            </SelectTrigger>
                            <SelectContent>
                                {[...Array(chapterCount)].map((_, i) => <SelectItem key={i + 1} value={String(i + 1)}>Ch. {i + 1}</SelectItem>)}
                            </SelectContent>
                        </Select>
                         <div className="flex gap-2 items-center">
                            <Input value={fromVerse} onChange={e => setFromVerse(e.target.value)} placeholder="From"/>
                            <span className="text-muted-foreground">-</span>
                            <Input value={toVerse} onChange={e => setToVerse(e.target.value)} placeholder="To"/>
                         </div>
                    </div>
                     <Button onClick={handleSearch} className="w-full mb-4">
                        <Search className="mr-2 h-4 w-4"/> Search Scripture
                     </Button>

                    <ScrollArea className="p-4 border rounded-md bg-secondary/50 min-h-[40vh]">
                         {isScriptureLoading ? <ScriptureSkeleton /> : (
                            <>
                                <h2 className="text-2xl font-bold mb-4">{scriptureReference} (KJV)</h2>
                                <div className="whitespace-pre-wrap font-serif text-base leading-relaxed text-justify">
                                    {scriptureText}
                                </div>
                            </>
                         )}
                    </ScrollArea>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <BookMarked className="h-6 w-6 text-primary"/>
                        <CardTitle>Topical Concordance</CardTitle>
                    </div>
                    <CardDescription>Find relevant scripture for common life topics and emotions.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Select onValueChange={handleTopicChange}>
                        <SelectTrigger className="w-full md:w-1/2">
                            <SelectValue placeholder="Select a topic..." />
                        </SelectTrigger>
                        <SelectContent>
                            {Object.keys(topicalVerses).map(topic => (
                                <SelectItem key={topic} value={topic}>{topic}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {isTopicLoading && <div className="mt-4"><ScriptureSkeleton /></div>}
                    {selectedTopic && !isTopicLoading && (
                        <div className="mt-4 space-y-4">
                            {topicResults.map(result => (
                                <div key={result.reference} className="p-4 border rounded-md">
                                    <h4 className="font-semibold">{result.reference}</h4>
                                    <p className="text-muted-foreground italic mt-1">&quot;{result.text}&quot;</p>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>

        <div className="lg:col-span-1 space-y-4 lg:sticky top-8">
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <Wand2 className="h-6 w-6 text-primary"/>
                        <CardTitle>Ask the Bible AI</CardTitle>
                    </div>
                    <CardDescription>Have a question about a passage or topic? Our AI is here to help you understand scripture.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                     {!isAiConfigured && (
                        <div className="flex items-center gap-3 rounded-lg border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive">
                           <AlertTriangle className="h-5 w-5"/> 
                           <p>AI features are disabled. Please configure your Google AI API key in <code>.env.local</code>.</p>
                        </div>
                    )}
                    <ScrollArea className="p-4 border rounded-md bg-secondary/50 h-80 text-sm">
                        {isAiLoading && (
                            <div className="space-y-4">
                                <div className="flex items-start gap-2">
                                    <User className="h-5 w-5 text-muted-foreground mt-1" />
                                    <div className="bg-background p-3 rounded-lg flex-1">
                                        <p>{lastQuestion}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-2">
                                    <Bot className="h-5 w-5 text-primary mt-1" />
                                    <div className="bg-background p-3 rounded-lg flex-1 space-y-2">
                                        <Skeleton className="h-4 w-5/6" />
                                        <Skeleton className="h-4 w-full" />
                                        <Skeleton className="h-4 w-3/4" />
                                    </div>
                                </div>
                            </div>
                        )}
                        {!isAiLoading && answer && (
                            <div className="space-y-4">
                                <div className="flex items-start gap-2">
                                    <User className="h-5 w-5 text-muted-foreground mt-1" />
                                    <div className="bg-background p-3 rounded-lg flex-1">
                                        <p>{lastQuestion}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-2">
                                    <Bot className="h-5 w-5 text-primary mt-1" />
                                    <div className="bg-background p-3 rounded-lg flex-1">
                                        <p className="whitespace-pre-wrap">{answer}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                         {!isAiLoading && !answer && (
                            <div className="h-full flex items-center justify-center text-muted-foreground">
                                <p>AI response will appear here.</p>
                            </div>
                         )}
                    </ScrollArea>
                    <div className="relative">
                        <Textarea 
                            placeholder="e.g., Who was Abraham?" 
                            className="pr-12"
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    handleAskAi();
                                }
                            }}
                            disabled={isAiLoading || !isAiConfigured}
                        />
                         <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button size="icon" className="absolute right-2 bottom-2 h-8 w-8" onClick={handleAskAi} disabled={isAiLoading || !question.trim() || !isAiConfigured}>
                                       {isAiLoading ? <span className="animate-spin h-4 w-4 rounded-full border-2 border-transparent border-t-primary-foreground"></span> : <Send className="h-4 w-4"/>}
                                    </Button>
                                </TooltipTrigger>
                                {!isAiConfigured && (
                                     <TooltipContent>
                                        <p>AI is not configured. See AI_SETUP.md</p>
                                    </TooltipContent>
                                )}
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
