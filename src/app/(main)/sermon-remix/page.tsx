import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Scissors, Music, Type, Clapperboard, Download, Share2, Eye, MessageCircle, Heart } from "lucide-react";
import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";

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
                <Textarea placeholder="Add a caption, #hashtags, and @mentions..." />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-4">
             <Button variant="outline" size="lg"><Download className="mr-2" /> Save Draft</Button>
            <Button size="lg"><Share2 className="mr-2" /> Export & Share</Button>
          </CardFooter>
        </Card>
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
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">Shared Remix</CardTitle>
                <CardDescription>This is how your remixed sermon will appear to others.</CardDescription>
            </CardHeader>
            <CardContent>
                 <div className="border rounded-lg p-4 space-y-3">
                     <div className="aspect-video bg-zinc-800 rounded-md flex items-center justify-center text-zinc-500">
                         <Clapperboard className="w-12 h-12"/>
                     </div>
                     <p className="text-sm">Here's the most powerful 60 seconds from Sunday's message! So good. <span className="text-primary">#faith</span> <span className="text-primary">#hope</span> <span className="text-primary">@PastorJohn</span></p>
                     <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1.5"><Heart className="w-4 h-4"/> 1.2k</div>
                        <div className="flex items-center gap-1.5"><MessageCircle className="w-4 h-4"/> 88</div>
                        <div className="flex items-center gap-1.5"><Eye className="w-4 h-4"/> 15.7k</div>
                     </div>
                     <div className="flex gap-2 pt-2 border-t">
                        <Button variant="secondary" size="sm" className="flex-1">Like</Button>
                        <Button variant="secondary" size="sm" className="flex-1">Comment</Button>
                        <Button variant="secondary" size="sm" className="flex-1">Share</Button>
                     </div>
                 </div>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
