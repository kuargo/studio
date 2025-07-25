
"use client";

import { useState, useEffect, useTransition } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Heart, MessageCircle, Share2, Image as ImageIcon, Video, Filter, MoreHorizontal, Trophy, Sparkles, Loader2 } from "lucide-react";
import Image from "next/image";
import { PrayButton } from "@/components/app/pray-button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/use-auth";
import { createSocialPost, toggleLikePost, getSocialFeedPosts, Post } from "@/lib/firestore";
import { useToast } from "@/hooks/use-toast";
import { Timestamp } from "firebase/firestore";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import type { DocumentSnapshot } from "firebase/firestore";


const POSTS_PER_PAGE = 5;

const PostSkeleton = () => (
    <div className="space-y-6">
        {[...Array(3)].map((_, i) => (
             <Card key={i}>
                <CardHeader className="p-4">
                     <div className="flex items-center gap-3">
                        <Skeleton className="h-10 w-10 rounded-full" />
                        <div className="space-y-1.5">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-3 w-16" />
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="px-4 pb-2 space-y-4">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                </CardContent>
                <CardFooter className="p-2 border-t">
                    <div className="flex justify-around w-full">
                        <Skeleton className="h-8 w-20" />
                        <Skeleton className="h-8 w-20" />
                        <Skeleton className="h-8 w-20" />
                    </div>
                </CardFooter>
            </Card>
        ))}
    </div>
);

const EmptyFeed = () => (
    <div className="text-center py-12 text-muted-foreground">
        <Sparkles className="mx-auto h-12 w-12" />
        <h3 className="mt-2 text-lg font-medium">The feed is quiet... for now.</h3>
        <p className="text-sm">Be the first to share a testimony or encouraging word!</p>
    </div>
)


export function SocialFeedContent() {
    const { user } = useAuth();
    const { toast } = useToast();
    const [newPost, setNewPost] = useState("");
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [posting, setPosting] = useState(false);

    // Pagination state
    const [lastVisible, setLastVisible] = useState<DocumentSnapshot | null>(null);
    const [hasMore, setHasMore] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);

     useEffect(() => {
        loadPosts();
    }, []);

    const loadPosts = async () => {
        if (!hasMore || loadingMore) return;
        
        setLoadingMore(true);
        try {
            const { posts: newPosts, lastVisible: newLastVisible } = await getSocialFeedPosts(POSTS_PER_PAGE, lastVisible);
            setPosts(prevPosts => lastVisible ? [...prevPosts, ...newPosts] : newPosts);
            setLastVisible(newLastVisible);
            setHasMore(newPosts.length === POSTS_PER_PAGE);
        } catch (error) {
            console.error("Error fetching posts:", error);
            toast({ variant: "destructive", title: "Error", description: "Could not fetch posts." });
        } finally {
            setLoading(false);
            setLoadingMore(false);
        }
    };


    const handlePostSubmit = async () => {
        if (!user || !newPost.trim()) return;

        setPosting(true);
        try {
            await createSocialPost(user, newPost);
            setNewPost("");
            toast({
                title: "Posted!",
                description: "Your post is now live on the feed.",
            });
            // Reset and fetch from scratch to show the new post at the top
            setPosts([]);
            setLastVisible(null);
            setHasMore(true);
            loadPosts();

        } catch (error) {
            console.error("Error creating post:", error);
            toast({
                variant: "destructive",
                title: "Error",
                description: "Could not create your post. Please try again."
            });
        } finally {
            setPosting(false);
        }
    };
    
    const timeAgo = (date: Timestamp | null) => {
        if (!date) return 'Just now';
        const seconds = Math.floor((new Date().getTime() - date.toDate().getTime()) / 1000);
        let interval = seconds / 31536000;
        if (interval > 1) return Math.floor(interval) + "y ago";
        interval = seconds / 2592000;
        if (interval > 1) return Math.floor(interval) + "mo ago";
        interval = seconds / 86400;
        if (interval > 1) return Math.floor(interval) + "d ago";
        interval = seconds / 3600;
        if (interval > 1) return Math.floor(interval) + "h ago";
        interval = seconds / 60;
        if (interval > 1) return Math.floor(interval) + "m ago";
        return Math.floor(seconds) + "s ago";
    };

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <Card>
                <CardHeader className="p-4">
                    <div className="flex gap-4">
                        <Avatar>
                            <AvatarImage src={user?.photoURL || ""} data-ai-hint="person portrait" />
                            <AvatarFallback>{user?.displayName?.charAt(0).toUpperCase() || "U"}</AvatarFallback>
                        </Avatar>
                        <Textarea 
                            placeholder="Share a testimony or encouraging word..." 
                            className="h-20"
                            value={newPost}
                            onChange={(e) => setNewPost(e.target.value)}
                            disabled={!user || posting}
                            data-testid="new-post-textarea"
                        />
                    </div>
                </CardHeader>
                <CardFooter className="p-4 flex justify-between">
                    <div className="flex gap-2">
                        <Button variant="ghost" size="icon"><ImageIcon className="text-green-500"/></Button>
                        <Button variant="ghost" size="icon"><Video className="text-rose-500"/></Button>
                    </div>
                    <Button onClick={handlePostSubmit} disabled={!user || posting || !newPost.trim()} data-testid="submit-post-button">
                        {posting ? "Posting..." : "Post"}
                    </Button>
                </CardFooter>
            </Card>
            
            <Card className="bg-gradient-to-r from-amber-400 to-yellow-500 text-white">
                <CardHeader className="flex flex-row items-center gap-4">
                    <Trophy className="w-10 h-10"/>
                    <div>
                        <h3 className="font-bold text-lg">Weekly Spotlight Contest</h3>
                        <p className="text-sm opacity-90">The most liked & shared post of the week wins a special badge!</p>
                    </div>
                </CardHeader>
            </Card>
        
            <Tabs defaultValue="foryou" className="w-full">
                <div className="flex justify-between items-center mb-4">
                    <TabsList>
                        <TabsTrigger value="foryou"><Sparkles className="mr-2 h-4 w-4"/>For You</TabsTrigger>
                        <TabsTrigger value="following">Following</TabsTrigger>
                        <TabsTrigger value="live">Live</TabsTrigger>
                    </TabsList>
                    <Button variant="outline" size="sm"><Filter className="mr-2 h-4 w-4" /> Filter</Button>
                </div>
                
                <TabsContent value="foryou">
                    {loading ? <PostSkeleton /> : (
                        posts.length > 0 ? (
                            <div className="space-y-6">
                                {posts.map((post) => <PostCard key={post.id} post={post} timeAgo={timeAgo} />)}
                                {hasMore && (
                                    <div className="text-center">
                                        <Button onClick={loadPosts} disabled={loadingMore}>
                                            {loadingMore ? <><Loader2 className="mr-2 h-4 w-4 animate-spin"/> Loading...</> : "Load More"}
                                        </Button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <EmptyFeed />
                        )
                    )}
                </TabsContent>
                <TabsContent value="following">
                     {loading ? <PostSkeleton /> : <EmptyFeed />}
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


function PostCard({ post, timeAgo }: { post: Post, timeAgo: (date: Timestamp | null) => string }) {
    const { user } = useAuth();
    const { toast } = useToast();
    const [isPending, startTransition] = useTransition();

    const [isLiked, setIsLiked] = useState(user && post.likedBy?.includes(user.uid));
    const [likeCount, setLikeCount] = useState(post.likes || 0);

    useEffect(() => {
        setIsLiked(user && post.likedBy?.includes(user.uid));
        setLikeCount(post.likes || 0);
    }, [post, user]);

    const handleLikeClick = () => {
        if (!user || isPending) return;

        startTransition(async () => {
            // Optimistic UI update
            const newLikedState = !isLiked;
            const newLikeCount = likeCount + (newLikedState ? 1 : -1);
            setIsLiked(newLikedState);
            setLikeCount(newLikeCount);
            
            try {
                await toggleLikePost(post.id, user.uid);
            } catch (error) {
                // Revert UI on error
                setIsLiked(!newLikedState);
                setLikeCount(likeCount);
                toast({ variant: "destructive", title: "Error", description: "Could not update like." });
            }
        });
    };

    const handleShare = (platform: 'whatsapp' | 'facebook' | 'tiktok' | 'copy') => {
        const link = `${window.location.origin}/post/${post.id}`;
        if (platform === 'copy') {
            navigator.clipboard.writeText(link);
            toast({ title: "Link Copied!", description: "The link to the post has been copied to your clipboard." });
        } else {
            toast({ title: "Coming Soon!", description: `Sharing to ${platform} is not yet implemented.` });
        }
    };

    return (
        <Card>
            <CardHeader className="p-4">
                <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                        <Avatar>
                            <AvatarImage src={post.user?.avatar} data-ai-hint={post.user?.aiHint} />
                            <AvatarFallback>{post.user?.name?.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-semibold">{post.user?.name}</p>
                            <p className="text-xs text-muted-foreground">{timeAgo(post.timestamp)}</p>
                        </div>
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8"><MoreHorizontal /></Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem>Follow {post.user?.name}</DropdownMenuItem>
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
                        <PrayButton prayerId={post.id!} count={post.prayCount!} />
                    </div>
                ) : (
                    <div className="flex justify-around text-muted-foreground w-full">
                        <Button variant="ghost" className="flex items-center gap-2" onClick={handleLikeClick} disabled={!user || isPending} aria-label="Like this post">
                            <Heart className={cn("w-5 h-5", isLiked && "fill-destructive text-destructive")} /> {likeCount}
                        </Button>
                        <Button variant="ghost" className="flex items-center gap-2">
                            <MessageCircle className="w-5 h-5" /> {post.comments || 0}
                        </Button>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="flex items-center gap-2">
                                    <Share2 className="w-5 h-5" /> Share
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem onClick={() => handleShare('whatsapp')}>Share to WhatsApp</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleShare('facebook')}>Share to Facebook</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleShare('tiktok')}>Share to TikTok</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleShare('copy')}>Copy Link</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                )}
            </CardFooter>
        </Card>
    );
}
