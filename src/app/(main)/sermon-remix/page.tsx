import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Scissors, Music, Type, Clapperboard, Download, Share2, Eye, MessageCircle, Heart, PlusCircle } from "lucide-react";
import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const recentSermons = [
  { title: "The Good Shepherd", pastor: "Pastor John", date: "Aug 11, 2024", thumbnail: "https://placehold.co/150x84.png", aiHint: "pastor preaching"},
  { title: "Love Your Neighbor", pastor: "Pastor Dave", date: "Aug 4, 2024", thumbnail: "https://placehold.co/150x84.png", aiHint: "church stage" },
  { title: "Faith That Moves Mountains", pastor: "Pastor John", date: "Jul 28, 2024", thumbnail: "https://placehold.co/150x84.png", aiHint: "open bible" },
];

const featuredPreachers = [
    { name: "TD Jakes", avatar: "https://placehold.co/100x100.png", aiHint: "TD Jakes" },
    { name: "Joyce Meyer", avatar: "https://placehold.co/100x100.png", aiHint: "Joyce Meyer" },
    { name: "Steven Furtick", avatar: "https://placehold.co/100x100.png", aiHint: "Steven Furtick" },
    { name: "VOUS Church", avatar: "https://placehold.co/100x100.png", aiHint: "church logo" },
]

export default function SermonRemixPage() {
  return (
    <div className="grid lg:grid-cols-3 gap-8 items-start">
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Sermon Remix Studio</CardTitle>
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
      
      <div className="space-y-4 lg:sticky top-8">
        <Card>
            <CardHeader>
                <CardTitle>Select a Sermon</CardTitle>
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
                <CardTitle className="flex items-center justify-between">
                    <span>Featured Channels</span>
                    <Button variant="ghost" size="icon" className="h-8 w-8"><PlusCircle/></Button>
                </CardTitle>
                <CardDescription>Easily access content from popular ministries.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
                {featuredPreachers.map(preacher => (
                    <div key={preacher.name} className="flex flex-col items-center text-center gap-2 cursor-pointer group">
                        <Avatar className="h-16 w-16">
                            <AvatarImage src={preacher.avatar} data-ai-hint={preacher.aiHint} />
                            <AvatarFallback>{preacher.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <p className="text-sm font-semibold group-hover:text-primary">{preacher.name}</p>
                    </div>
                ))}
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
