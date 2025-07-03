import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Heart, MessageCircle, Share2, Image as ImageIcon, Video } from "lucide-react";
import Image from "next/image";
import { PrayButton } from "@/components/app/pray-button";

const posts = [
  {
    type: 'testimony',
    user: { name: "Sarah K.", avatar: "https://placehold.co/100x100/fed7aa/9a3412.png", aiHint: "woman laughing" },
    timestamp: "3h ago",
    content: "Praise report! I was healed from chronic back pain after the prayer service on Sunday. God is so good! Thank you all for your prayers!",
    likes: 128,
    comments: 17,
  },
  {
    type: 'image',
    user: { name: "Youth Group", avatar: "https://placehold.co/100x100/fecaca/991b1b.png", aiHint: "group people" },
    timestamp: "1d ago",
    content: "Had an amazing time at our youth camp retreat this weekend! Lives were changed!",
    imageUrl: "https://placehold.co/600x400.png",
    aiHint: "youth group bonfire",
    likes: 256,
    comments: 32,
  },
   {
    type: 'prayer_request',
    user: { name: "David R.", avatar: "https://placehold.co/100x100/a5b4fc/1e3a8a.png", aiHint: "man portrait" },
    timestamp: "2d ago",
    content: "Please pray for my family's health and protection. We're going through a tough season.",
    initialPrayers: 89,
  },
];

export default function SocialFeedPage() {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
        <Card>
            <CardHeader className="p-4">
                 <div className="flex gap-4">
                    <Avatar>
                        <AvatarImage src="https://placehold.co/100x100.png" data-ai-hint="person portrait" />
                        <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    <Textarea placeholder="Share a testimony or encouraging word..." className="h-20"/>
                 </div>
            </CardHeader>
            <CardFooter className="p-4 flex justify-between">
                <div className="flex gap-2">
                    <Button variant="ghost" size="icon"><ImageIcon className="text-green-500"/></Button>
                    <Button variant="ghost" size="icon"><Video className="text-rose-500"/></Button>
                </div>
                <Button>Post</Button>
            </CardFooter>
        </Card>
      
        <div className="space-y-6">
            {posts.map((post, i) => <PostCard key={i} post={post} />)}
        </div>
    </div>
  );
}


function PostCard({ post }: { post: typeof posts[0] }) {
    return (
        <Card>
            <CardHeader className="p-4">
                 <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                        <Avatar>
                            <AvatarImage src={post.user.avatar} data-ai-hint={post.user.aiHint} />
                            <AvatarFallback>{post.user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-semibold">{post.user.name}</p>
                            <p className="text-xs text-muted-foreground">{post.timestamp}</p>
                        </div>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="px-4 pb-2 space-y-4">
                <p className="text-sm">{post.content}</p>
                {post.type === 'image' && post.imageUrl && (
                    <div className="rounded-lg overflow-hidden border">
                         <Image src={post.imageUrl} width={600} height={400} alt="Post image" data-ai-hint={post.aiHint || ''} />
                    </div>
                )}
            </CardContent>
            <CardFooter className="p-4 border-t flex justify-between">
                {post.type === 'prayer_request' ? (
                    <div className="flex-1">
                        <PrayButton count={post.initialPrayers!} />
                    </div>
                ) : (
                     <div className="flex gap-4 text-muted-foreground">
                        <Button variant="ghost" className="flex items-center gap-2">
                            <Heart className="w-5 h-5" /> {post.likes}
                        </Button>
                        <Button variant="ghost" className="flex items-center gap-2">
                            <MessageCircle className="w-5 h-5" /> {post.comments}
                        </Button>
                        <Button variant="ghost" className="flex items-center gap-2">
                            <Share2 className="w-5 h-5" /> Share
                        </Button>
                    </div>
                )}
            </CardFooter>
        </Card>
    )
}