import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Send, Music, Search, Plus } from "lucide-react";
import Image from "next/image";

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
            <Plus className="cursor-pointer"/>
          </div>
        </div>
      </div>
    </div>
  );
}


function Reel({ user, videoUrl, aiHint, caption, audio, likes, comments }: typeof reels[0]) {
  return (
    <div className="relative h-full w-full snap-start flex-shrink-0">
      <Image src={videoUrl} layout="fill" objectFit="cover" alt="Faith Reel" data-ai-hint={aiHint} />
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
        </div>
      </div>
    </div>
  )
}