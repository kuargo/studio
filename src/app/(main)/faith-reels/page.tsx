import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Send, Music, Search, Plus, Upload, Link2, Download, Coins, Wand2, Palette } from "lucide-react";
import Image from "next/image";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";


const reels = [
  {
    id: 1,
    user: { name: "Grace Notes", avatar: "https://placehold.co/100x100/f9a8d4/4c1d95.png", aiHint: "woman singing" },
    videoUrl: "https://placehold.co/540x960/ff00ff/ffffff.png",
    aiHint: "worship concert",
    caption: "Feeling the spirit during worship practice tonight! 🙌 #blessed",
    audio: "Original Audio by Grace Notes",
    likes: "1.2K",
    comments: 48,
  },
  {
    id: 2,
    user: { name: "Prophetic Painter", avatar: "https://placehold.co/100x100/a5b4fc/1e3a8a.png", aiHint: "man painting" },
    videoUrl: "https://placehold.co/540x960/7DF9FF/000000.png",
    aiHint: "abstract art",
    caption: "A time-lapse of my latest piece, 'Heaven's Gates'. What do you see?",
    audio: "Hillsong - Oceans",
    likes: "5.8K",
    comments: 329,
  },
  {
    id: 3,
    user: { name: "Daily Devotion", avatar: "https://placehold.co/100x100/a7f3d0/065f46.png", aiHint: "open book" },
    videoUrl: "https://placehold.co/540x960/FFFFFF/000000.png",
    aiHint: "bible verse",
    caption: "Your daily reminder: You are loved. You are chosen. (1 Peter 2:9)",
    audio: "Soothing Piano Music",
    likes: "12K",
    comments: 712,
  },
];

export default function FaithReelsPage() {
  return (
    <div className="bg-black h-full w-full flex justify-center items-center">
      <div className="relative h-[calc(100vh-10rem)] w-full max-w-sm bg-zinc-900 rounded-2xl overflow-hidden shadow-2xl">
        <div className="absolute top-0 left-0 right-0 h-full snap-y snap-mandatory overflow-y-scroll no-scrollbar">
          {reels.map((reel) => <Reel key={reel.id} {...reel} />)}
        </div>
        
        <div className="absolute top-0 left-0 right-0 p-4 text-white font-bold text-lg flex justify-between items-center z-10 bg-gradient-to-b from-black/50 to-transparent">
          <h1 className="font-headline">Faith Reels</h1>
          <div className="flex gap-4">
            <Search className="cursor-pointer"/>
            <Dialog>
              <DialogTrigger asChild>
                <Plus className="cursor-pointer"/>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create a New Reel</DialogTitle>
                  <DialogDescription>Upload a video or import one from your favorite platforms.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <Button variant="outline" size="lg"><Upload className="mr-2"/> Upload from Device</Button>
                  <Button variant="outline" size="lg"><Link2 className="mr-2"/> Import from YouTube</Button>
                  <Button variant="outline" size="lg"><svg className="mr-2 h-4 w-4" viewBox="0 0 24 24"><path fill="currentColor" d="M16.6 5.82s.08.03.1.05l.07.03.02.01.09.04.08.03.06.02.08.03.07.02.09.03.06.01.09.02.07.01.1.02h.02c.08.01.12.02.12.02s.09.01.14.02a1.88 1.88 0 0 1 1.52.82c.22.42.27.9.27 1.95v4.32c0 1.05-.05 1.53-.27 1.95a1.88 1.88 0 0 1-1.52.82c-.05.01-.09.01-.14.02s-.04.01-.12.02h-.02a.85.85 0 0 1-.1-.02l-.07-.01-.09-.02-.06-.01a1.2 1.2 0 0 1-.09-.03l-.07-.02-.08-.03-.06-.02-.08-.03-.09-.04-.02-.01-.07-.03a.3.3 0 0 1-.1-.05s-.08-.03-.1-.05l-4.12-2.38-4.12-2.38a2.17 2.17 0 0 1-1.08-1.9c0-1.19.97-2.16 2.16-2.16H15.5c.03 0 .07 0 .1.01s.09.01.14.02l4.12 2.38V7.77c0-1.05-.05-1.53-.27-1.95z"/></svg> Import from TikTok</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
}


function Reel({ user, videoUrl, aiHint, caption, audio, likes, comments }: typeof reels[0]) {
  return (
    <div className="relative h-full w-full snap-start flex-shrink-0">
      <Image src={videoUrl} fill style={{ objectFit: 'cover' }} alt="Faith Reel" data-ai-hint={aiHint} />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white flex justify-between items-end">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Avatar className="h-10 w-10 border-2 border-white">
              <AvatarImage src={user.avatar} data-ai-hint={user.aiHint} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <p className="font-semibold">{user.name}</p>
            <Button variant="outline" size="sm" className="bg-white/20 border-white text-white h-7">Follow</Button>
          </div>
          <p className="text-sm">{caption}</p>
          <div className="flex items-center gap-2 text-sm">
            <Music className="w-4 h-4" />
            <p>{audio}</p>
          </div>
        </div>

        <div className="flex flex-col items-center space-y-4">
          <button className="flex flex-col items-center gap-1">
            <div className="bg-white/20 p-3 rounded-full">
              <Heart className="w-6 h-6" />
            </div>
            <span className="text-xs font-semibold">{likes}</span>
          </button>
          <button className="flex flex-col items-center gap-1">
            <div className="bg-white/20 p-3 rounded-full">
              <MessageCircle className="w-6 h-6" />
            </div>
            <span className="text-xs font-semibold">{comments}</span>
          </button>
           <button className="flex flex-col items-center gap-1">
            <div className="bg-white/20 p-3 rounded-full">
              <Send className="w-6 h-6" />
            </div>
          </button>
          <button className="flex flex-col items-center gap-1">
            <div className="bg-white/20 p-3 rounded-full">
              <Palette className="w-6 h-6" />
            </div>
             <span className="text-xs font-semibold">Filters</span>
          </button>
          <button className="flex flex-col items-center gap-1">
            <div className="bg-white/20 p-3 rounded-full">
              <Wand2 className="w-6 h-6" />
            </div>
             <span className="text-xs font-semibold">Edit</span>
          </button>
          <button className="flex flex-col items-center gap-1">
            <div className="bg-white/20 p-3 rounded-full">
              <Coins className="w-6 h-6" />
            </div>
             <span className="text-xs font-semibold">Gift</span>
          </button>
          <button className="flex flex-col items-center gap-1">
            <div className="bg-white/20 p-3 rounded-full">
              <Download className="w-6 h-6" />
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}
