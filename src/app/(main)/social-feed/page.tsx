import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Heart, MessageCircle, Share2, Image as ImageIcon, Video, Filter, MoreHorizontal } from "lucide-react";
import Image from "next/image";
import { PrayButton } from "@/components/app/pray-button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

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
      
        <Tabs defaultValue="foryou" className="w-full">
            <div className="flex justify-between items-center mb-4">
                <TabsList>
                    <TabsTrigger value="foryou">For You</TabsTrigger>
                    <TabsTrigger value="following">Following</TabsTrigger>
                    <TabsTrigger value="live">Live</TabsTrigger>
                </TabsList>
                <Button variant="outline" size="sm"><Filter className="mr-2 h-4 w-4" /> Filter</Button>
            </div>
            <TabsContent value="foryou">
                <p className="text-sm text-center text-muted-foreground mb-4">Your personalized feed, powered by AI.</p>
                <div className="space-y-6">
                    {posts.map((post, i) => <PostCard key={i} post={post} />)}
                </div>
            </TabsContent>
            <TabsContent value="following">
                 <div className="space-y-6">
                    {posts.slice().reverse().map((post, i) => <PostCard key={i} post={post} />)}
                </div>
            </TabsContent>
             <TabsContent value="live">
                <div className="text-center py-12 text-muted-foreground">
                    <Video className="mx-auto h-12 w-12" />
                    <h3 className="mt-2 text-lg font-medium">No Live Feeds</h3>
                    <p className="text-sm">There are no live videos at the moment. Check back later!</p>
                </div>
            </TabsContent>
        </Tabs>
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
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8"><MoreHorizontal /></Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem>Follow {post.user.name}</DropdownMenuItem>
                            <DropdownMenuItem>Hide this post</DropdownMenuItem>
                            <DropdownMenuItem>Report post</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </CardHeader>
            <CardContent className="px-4 pb-2 space-y-4">
                <p className="text-sm whitespace-pre-wrap">{post.content}</p>
                {post.type === 'image' && post.imageUrl && (
                    <div className="rounded-lg overflow-hidden border">
                         <Image src={post.imageUrl} width={600} height={400} alt="Post image" data-ai-hint={post.aiHint || ''} />
                    </div>
                )}
            </CardContent>
            <CardFooter className="p-2 border-t">
                {post.type === 'prayer_request' ? (
                    <div className="flex-1 px-2">
                        <PrayButton count={post.initialPrayers!} />
                    </div>
                ) : (
                     <div className="flex justify-around text-muted-foreground w-full">
                        <Button variant="ghost" className="flex items-center gap-2">
                            <Heart className="w-5 h-5" /> {post.likes}
                        </Button>
                        <Button variant="ghost" className="flex items-center gap-2">
                            <MessageCircle className="w-5 h-5" /> {post.comments}
                        </Button>
                         <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                 <Button variant="ghost" className="flex items-center gap-2">
                                    <Share2 className="w-5 h-5" /> Share
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem>Share to WhatsApp</DropdownMenuItem>
                                <DropdownMenuItem>Share to Facebook</DropdownMenuItem>
                                <DropdownMenuItem>Share to TikTok</DropdownMenuItem>
                                <DropdownMenuItem>Copy Link</DropdownMenuItem>
                            </DropdownMenuContent>
                         </DropdownMenu>
                    </div>
                )}
            </CardFooter>
        </Card>
    )
}
