import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Scissors, Music, Type, Clapperboard, Download, Share2 } from "lucide-react";
import Image from "next/image";

const recentSermons = [
  { title: "The Good Shepherd", pastor: "Pastor John", date: "Aug 11, 2024", thumbnail: "https://placehold.co/150x84.png", aiHint: "pastor preaching"},
  { title: "Love Your Neighbor", pastor: "Pastor Dave", date: "Aug 4, 2024", thumbnail: "https://placehold.co/150x84.png", aiHint: "church stage" },
  { title: "Faith That Moves Mountains", pastor: "Pastor John", date: "Jul 28, 2024", thumbnail: "https://placehold.co/150x84.png", aiHint: "open bible" },
];

export default function SermonRemixPage() {
  return (
    <div className="grid lg:grid-cols-3 gap-8 items-start">
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Sermon Remix Studio</CardTitle>
            <CardDescription>Select a sermon, clip your favorite moment, and create a shareable reel for the community.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="aspect-video bg-zinc-800 rounded-lg flex items-center justify-center text-zinc-500 mb-4">
              <Clapperboard className="w-16 h-16"/>
            </div>
            
            <div className="space-y-4">
                <div className="flex items-center gap-4">
                    <span className="text-sm font-mono">00:15</span>
                    <Slider defaultValue={[15]} max={60} step={1} />
                    <span className="text-sm font-mono">01:00</span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    <Button variant="outline"><Scissors className="mr-2"/> Trim</Button>
                    <Button variant="outline"><Music className="mr-2"/> Add Music</Button>
                    <Button variant="outline"><Type className="mr-2"/> Add Text</Button>
                    <Button variant="outline"><Clapperboard className="mr-2"/> Effects</Button>
                </div>
            </div>
          </CardContent>
        </Card>
         <div className="flex justify-end gap-4">
            <Button variant="outline" size="lg"><Download className="mr-2" /> Save Draft</Button>
            <Button size="lg"><Share2 className="mr-2" /> Export & Share</Button>
        </div>
      </div>
      
      <div className="space-y-4">
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">Recent Sermons</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
                {recentSermons.map(sermon => (
                    <div key={sermon.title} className="flex gap-4 items-center p-2 rounded-md hover:bg-accent cursor-pointer">
                        <Image src={sermon.thumbnail} width={150} height={84} alt={sermon.title} className="rounded-md aspect-video object-cover" data-ai-hint={sermon.aiHint} />
                        <div>
                            <p className="font-semibold">{sermon.title}</p>
                            <p className="text-sm text-muted-foreground">{sermon.pastor}</p>
                            <p className="text-xs text-muted-foreground">{sermon.date}</p>
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
      </div>
    </div>
  );
}