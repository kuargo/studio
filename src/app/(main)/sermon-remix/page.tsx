
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Scissors, Music, Type, Clapperboard, Download, Share2, PlusCircle, Link as LinkIcon, Podcast } from "lucide-react";
import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const recentSermons = [
  { title: "The Good Shepherd", pastor: "Pastor John", date: "Aug 11, 2024", thumbnail: "https://placehold.co/150x84.png", aiHint: "pastor preaching"},
  { title: "Love Your Neighbor", pastor: "Pastor Dave", date: "Aug 4, 2024", thumbnail: "https://placehold.co/150x84.png", aiHint: "church stage" },
  { title: "Faith That Moves Mountains", pastor: "Pastor John", date: "Jul 28, 2024", thumbnail: "https://placehold.co/150x84.png", aiHint: "open bible" },
];

const featuredPreachers = [
    { name: "TD Jakes", avatar: "https://placehold.co/100x100.png", aiHint: "TD Jakes", link: "https://www.youtube.com/@TDJakesOfficial" },
    { name: "Joyce Meyer", avatar: "https://placehold.co/100x100.png", aiHint: "Joyce Meyer", link: "https://www.youtube.com/@JoyceMeyerMinistries" },
    { name: "Steven Furtick", avatar: "https://placehold.co/100x100.png", aiHint: "Steven Furtick", link: "https://www.youtube.com/@StevenFurtick" },
    { name: "Sarah Jakes Roberts", avatar: "https://placehold.co/100x100.png", aiHint: "Sarah Jakes Roberts", link: "https://www.youtube.com/@SarahJakesRoberts" },
    { name: "Michael Todd", avatar: "https://placehold.co/100x100.png", aiHint: "Michael Todd", link: "https://www.youtube.com/@TransformationChurch" },
    { name: "Tim Keller", avatar: "https://placehold.co/100x100.png", aiHint: "Tim Keller", link: "https://www.youtube.com/@GospelinLife" },
    { name: "VOUS Church", avatar: "https://placehold.co/100x100.png", aiHint: "church logo", link: "https://www.youtube.com/@VOUSChurch" },
    { name: "Priscilla Shirer", avatar: "https://placehold.co/100x100.png", aiHint: "Priscilla Shirer", link: "https://www.youtube.com/@PriscillaShirer" },
    { name: "Francis Chan", avatar: "https://placehold.co/100x100.png", aiHint: "Francis Chan", link: "https://www.youtube.com/@CrazyLove" },
    { name: "Beth Moore", avatar: "https://placehold.co/100x100.png", aiHint: "Beth Moore", link: "https://www.youtube.com/@LivingProofMinistries" },
]

const featuredPodcasts = [
    { name: "The Bible Project", link: "https://open.spotify.com/show/7vP5z4iS3va2jI3tN6e9w7" },
    { name: "Ask NT Wright Anything", link: "https://open.spotify.com/show/3U2iGGts3bSA26Z6iH24v9" },
    { name: "Cooper Stuff", link: "https://open.spotify.com/show/6a62w331k2SRTwn4GkXzYJ" },
    { name: "The Alisa Childers Podcast", link: "https://open.spotify.com/show/4H3j4D02kXle2e3l2R2c5v" },
    { name: "Unbelievable?", link: "https://open.spotify.com/show/0fchdD6Db3Tz7ePO2t8a4e" },
]

export default function SermonRemixPage() {
  const { toast } = useToast();
  
  const showComingSoonToast = () => {
    toast({
      title: "Feature Coming Soon",
      description: "This functionality is under development.",
    });
  };

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
                    <Button variant="outline" onClick={showComingSoonToast}><Scissors className="mr-2"/> Trim</Button>
                    <Button variant="outline" onClick={showComingSoonToast}><Music className="mr-2"/> Add Music</Button>
                    <Button variant="outline" onClick={showComingSoonToast}><Type className="mr-2"/> Add Text</Button>
                    <Button variant="outline" onClick={showComingSoonToast}><Clapperboard className="mr-2"/> Effects</Button>
                </div>
                <Textarea placeholder="Add a caption, #hashtags, and @mentions..." />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
             <Button variant="outline" size="lg" onClick={showComingSoonToast}><Download className="mr-2" /> Download</Button>
            <Button size="lg" onClick={showComingSoonToast}><Share2 className="mr-2" /> Export & Share</Button>
          </CardFooter>
        </Card>
      </div>
      
      <div className="space-y-4 lg:sticky top-8">
        <Card>
            <CardHeader>
                <CardTitle>Select a Sermon</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
                <div className="space-y-2">
                    <label className="text-sm font-medium">Import from URL</label>
                    <div className="flex gap-2">
                        <Input placeholder="Paste YouTube or podcast link..."/>
                        <Button variant="outline" size="icon" onClick={showComingSoonToast}><LinkIcon/></Button>
                    </div>
                </div>
                {recentSermons.map(sermon => (
                    <div key={sermon.title} className="flex gap-4 items-center p-2 rounded-md hover:bg-accent cursor-pointer" onClick={showComingSoonToast}>
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
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={showComingSoonToast}><PlusCircle/></Button>
                </CardTitle>
                <CardDescription>Easily access content from popular ministries.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
                {featuredPreachers.map(preacher => (
                    <Link href={preacher.link} target="_blank" rel="noopener noreferrer" key={preacher.name} className="flex flex-col items-center text-center gap-2 cursor-pointer group">
                        <Avatar className="h-16 w-16">
                            <AvatarImage src={preacher.avatar} data-ai-hint={preacher.aiHint} />
                            <AvatarFallback>{preacher.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <p className="text-sm font-semibold group-hover:text-primary">{preacher.name}</p>
                    </Link>
                ))}
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>Top Podcasts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
                {featuredPodcasts.map(podcast => (
                    <Button asChild variant="ghost" className="w-full justify-start" key={podcast.name}>
                        <Link href={podcast.link} target="_blank" rel="noopener noreferrer">
                           <Podcast className="mr-2"/> {podcast.name}
                        </Link>
                    </Button>
                ))}
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
