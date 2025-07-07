
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Wand2, BookOpen, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const booksOfBible = [
  "Genesis", "Exodus", "Leviticus", "Numbers", "Deuteronomy", "Joshua", "Judges", "Ruth", "1 Samuel", "2 Samuel", "1 Kings", "2 Kings", "1 Chronicles", "2 Chronicles", "Ezra", "Nehemiah", "Esther", "Job", "Psalms", "Proverbs", "Ecclesiastes", "Song of Solomon", "Isaiah", "Jeremiah", "Lamentations", "Ezekiel", "Daniel", "Hosea", "Joel", "Amos", "Obadiah", "Jonah", "Micah", "Nahum", "Habakkuk", "Zephaniah", "Haggai", "Zechariah", "Malachi", "Matthew", "Mark", "Luke", "John", "Acts", "Romans", "1 Corinthians", "2 Corinthians", "Galatians", "Ephesians", "Philippians", "Colossians", "1 Thessalonians", "2 Thessalonians", "1 Timothy", "2 Timothy", "Titus", "Philemon", "Hebrews", "James", "1 Peter", "2 Peter", "1 John", "2 John", "3 John", "Jude", "Revelation"
];

// Placeholder for KJV Genesis Chapter 1
const genesisChapter1 = `
1 In the beginning God created the heaven and the earth.
2 And the earth was without form, and void; and darkness was upon the face of the deep. And the Spirit of God moved upon the face of the waters.
3 And God said, Let there be light: and there was light.
4 And God saw the light, that it was good: and God divided the light from the darkness.
5 And God called the light Day, and the darkness he called Night. And the evening and the morning were the first day.
6 And God said, Let there be a firmament in the midst of the waters, and let it divide the waters from the waters.
7 And God made the firmament, and divided the waters which were under the firmament from the waters which were above the firmament: and it was so.
8 And God called the firmament Heaven. And the evening and the morning were the second day.
9 And God said, Let the waters under the heaven be gathered together unto one place, and let the dry land appear: and it was so.
10 And God called the dry land Earth; and the gathering together of the waters called he Seas: and God saw that it was good.
11 And God said, Let the earth bring forth grass, the herb yielding seed, and the fruit tree yielding fruit after his kind, whose seed is in itself, upon the earth: and it was so.
12 And the earth brought forth grass, and herb yielding seed after his kind, and the tree yielding fruit, whose seed was in itself, after his kind: and God saw that it was good.
13 And the evening and the morning were the third day.
`

export default function BiblePage() {
    const { toast } = useToast();

    const showComingSoon = () => {
        toast({
            title: "Feature Coming Soon",
            description: "Full Bible integration and AI chat are on the way!"
        })
    }

  return (
    <div className="grid lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-6">
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <BookOpen className="h-6 w-6 text-primary"/>
                        <CardTitle>Bible Reader</CardTitle>
                    </div>
                    <CardDescription>Select a book and chapter to start reading. Full API integration for multiple versions is coming soon.</CardDescription>
                </CardHeader>
                <CardContent>
                     <div className="flex gap-4 mb-4">
                        <Select defaultValue="Genesis">
                            <SelectTrigger className="w-2/3">
                                <SelectValue placeholder="Select a book" />
                            </SelectTrigger>
                            <SelectContent>
                                {booksOfBible.map(book => (
                                    <SelectItem key={book} value={book}>{book}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Select defaultValue="1">
                            <SelectTrigger className="w-1/3">
                                <SelectValue placeholder="Chapter" />
                            </SelectTrigger>
                            <SelectContent>
                                {[...Array(50)].map((_, i) => (
                                    <SelectItem key={i + 1} value={String(i + 1)}>Chapter {i + 1}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="p-4 border rounded-md bg-secondary/50 max-h-[60vh] overflow-y-auto">
                        <h2 className="text-2xl font-bold mb-4">Genesis, Chapter 1 (KJV)</h2>
                        <div className="whitespace-pre-wrap font-serif text-base leading-loose">
                            {genesisChapter1}
                             <p className="text-center text-muted-foreground py-4">...</p>
                        </div>
                    </div>
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
                    <div className="p-4 border rounded-md bg-secondary/50 h-64 text-sm text-muted-foreground flex items-center justify-center">
                        <p>AI response will appear here.</p>
                    </div>
                    <div className="relative">
                        <Textarea placeholder="e.g., What is the meaning of 'the armor of God'?" className="pr-12"/>
                        <Button size="icon" className="absolute right-2 bottom-2 h-8 w-8" onClick={showComingSoon}>
                            <Send className="h-4 w-4"/>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
