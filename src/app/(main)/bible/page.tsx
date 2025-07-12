
"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Wand2, BookOpen, Send, User, Bot, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { askBibleAi, BibleChatInput } from "@/ai/flows/bible-chat-flow";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const booksOfBible = [
  "Genesis", "Exodus", "Leviticus", "Numbers", "Deuteronomy", "Joshua", "Judges", "Ruth", "1 Samuel", "2 Samuel", "1 Kings", "2 Kings", "1 Chronicles", "2 Chronicles", "Ezra", "Nehemiah", "Esther", "Job", "Psalms", "Proverbs", "Ecclesiastes", "Song of Solomon", "Isaiah", "Jeremiah", "Lamentations", "Ezekiel", "Daniel", "Hosea", "Joel", "Amos", "Obadiah", "Jonah", "Micah", "Nahum", "Habakkuk", "Zephaniah", "Haggai", "Zechariah", "Malachi", "Matthew", "Mark", "Luke", "John", "Acts", "Romans", "1 Corinthians", "2 Corinthians", "Galatians", "Ephesians", "Philippians", "Colossians", "1 Thessalonians", "2 Thessalonians", "1 Timothy", "2 Timothy", "Titus", "Philemon", "Hebrews", "James", "1 Peter", "2 Peter", "1 John", "2 John", "3 John", "Jude", "Revelation"
];

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
    const [book, setBook] = useState("Genesis");
    const [chapter, setChapter] = useState("1");
    const [chapterText, setChapterText] = useState("");
    const [isChapterLoading, setIsChapterLoading] = useState(true);
    const [chapterCount, setChapterCount] = useState(50); // Default for Genesis

    const fetchChapter = useCallback(async (currentBook: string, currentChapter: string) => {
        setIsChapterLoading(true);
        try {
            const response = await fetch(`https://bible-api.com/${currentBook}+${currentChapter}?translation=kjv`);
            if (!response.ok) {
                throw new Error("Failed to fetch scripture.");
            }
            const data = await response.json();
            
            // The API returns verses in an array, join them together.
            const formattedText = data.verses.map((v: any) => `[${v.verse}] ${v.text}`).join(' ').replace(/\n/g, ' ');
            setChapterText(formattedText);

        } catch (error) {
            console.error("Error fetching chapter:", error);
            toast({
                variant: "destructive",
                title: "Error",
                description: "Could not load the selected scripture. Please try again."
            });
            setChapterText("Failed to load scripture.");
        } finally {
            setIsChapterLoading(false);
        }
    }, [toast]);

    const fetchChapterCount = useCallback(async (currentBook: string) => {
        // This is a simplified way to get chapter counts. A real app might have a hardcoded map.
        // For now, we'll fetch a non-existent chapter to see how many there are, which is a common workaround.
        try {
            const response = await fetch(`https://bible-api.com/${currentBook}`);
            const data = await response.json();
            if (data.verses) {
                 // A more robust API would give this directly. We will hardcode some popular ones.
                const counts: {[key: string]: number} = { "Genesis": 50, "Exodus": 40, "Psalms": 150, "John": 21, "Romans": 16, "Revelation": 22 };
                setChapterCount(counts[currentBook] || 30);
            }
        } catch (error) {
            console.log("Could not dynamically fetch chapter count, using default.");
            setChapterCount(30);
        }
    }, []);

    useEffect(() => {
        fetchChapter(book, chapter);
    }, [book, chapter, fetchChapter]);

    const handleBookChange = (newBook: string) => {
        setBook(newBook);
        setChapter("1"); // Reset to chapter 1 when book changes
        fetchChapterCount(newBook);
    };

    const handleAskAi = async () => {
        if (!question.trim() || !isAiConfigured) return;

        setIsAiLoading(true);
        setAnswer("");
        setLastQuestion(question);
        
        const input: BibleChatInput = {
            question: question,
        };

        try {
            const result = await askBibleAi(input);
            setAnswer(result.answer);
        } catch (error) {
            console.error("Error asking Bible AI:", error);
            toast({
                variant: "destructive",
                title: "AI Error",
                description: "The AI failed to generate a response. Please try again."
            });
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
                    <CardDescription>Select a book and chapter to start reading the King James Version.</CardDescription>
                </CardHeader>
                <CardContent>
                     <div className="flex gap-4 mb-4">
                        <Select value={book} onValueChange={handleBookChange}>
                            <SelectTrigger className="w-2/3">
                                <SelectValue placeholder="Select a book" />
                            </SelectTrigger>
                            <SelectContent>
                                {booksOfBible.map(b => (
                                    <SelectItem key={b} value={b}>{b}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Select value={chapter} onValueChange={setChapter}>
                            <SelectTrigger className="w-1/3">
                                <SelectValue placeholder="Chapter" />
                            </SelectTrigger>
                            <SelectContent>
                                {[...Array(chapterCount)].map((_, i) => (
                                    <SelectItem key={i + 1} value={String(i + 1)}>Chapter {i + 1}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <ScrollArea className="p-4 border rounded-md bg-secondary/50 min-h-[60vh]">
                         {isChapterLoading ? (
                            <ScriptureSkeleton />
                         ) : (
                            <>
                                <h2 className="text-2xl font-bold mb-4">{book}, Chapter {chapter} (KJV)</h2>
                                <div className="whitespace-pre-wrap font-serif text-base leading-relaxed text-justify">
                                    {chapterText}
                                </div>
                            </>
                         )}
                    </ScrollArea>
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
