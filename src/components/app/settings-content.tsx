
"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { auth } from "@/lib/firebase";
import { updateProfile } from "firebase/auth";
import { updateUserProfile, getUserProfile, UserProfileData } from "@/lib/firestore";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Camera } from "lucide-react";
import { Skeleton } from "../ui/skeleton";

export function SettingsContent() {
    const { user } = useAuth();
    const { toast } = useToast();
    const [profile, setProfile] = useState<Partial<UserProfileData>>({});
    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);

    useEffect(() => {
        async function loadProfile() {
            if (user) {
                setInitialLoading(true);
                const firestoreProfile = await getUserProfile(user.uid);
                const combinedProfile = {
                    displayName: user.displayName || "",
                    photoURL: user.photoURL || "",
                    ...firestoreProfile,
                };
                setProfile(combinedProfile);
                setInitialLoading(false);
            }
        }
        loadProfile();
    }, [user]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProfile(prev => ({ ...prev, [name]: value }));
    };
    
    // Placeholder for file upload logic
    const handleAvatarChange = () => {
        toast({
            title: "Feature Coming Soon",
            description: "Avatar uploading will be implemented soon.",
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user || !auth.currentUser) {
            toast({ variant: "destructive", title: "Error", description: "You must be logged in to save."});
            return
        };

        setLoading(true);
        try {
            // Update Firebase Auth profile if displayName or photoURL has changed
            if (auth.currentUser.displayName !== profile.displayName || auth.currentUser.photoURL !== profile.photoURL) {
                await updateProfile(auth.currentUser, {
                    displayName: profile.displayName,
                    photoURL: profile.photoURL,
                });
            }

            // Update Firestore profile with all fields
            await updateUserProfile(user.uid, profile);

            toast({
                title: "Profile Updated",
                description: "Your profile has been successfully updated.",
            });
        } catch (error) {
            console.error(error);
            toast({
                variant: "destructive",
                title: "Update Failed",
                description: "Could not update your profile. Please try again.",
            });
        } finally {
            setLoading(false);
        }
    };

    if (initialLoading) {
        return (
             <div className="max-w-4xl mx-auto space-y-6">
                <Skeleton className="h-8 w-1/3" />
                <Card>
                    <CardHeader>
                        <Skeleton className="h-6 w-1/4" />
                        <Skeleton className="h-4 w-3/4" />
                    </CardHeader>
                    <CardContent className="space-y-6">
                         <div className="flex items-center gap-6">
                            <Skeleton className="h-24 w-24 rounded-full" />
                            <div className="flex-grow space-y-2">
                                <Skeleton className="h-4 w-1/4" />
                                <Skeleton className="h-10 w-full" />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Skeleton className="h-10 w-full" />
                            <Skeleton className="h-10 w-full" />
                            <Skeleton className="h-10 w-full" />
                            <Skeleton className="h-10 w-full" />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Skeleton className="h-10 w-24" />
                    </CardFooter>
                </Card>
            </div>
        )
    }

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <h1 className="text-3xl font-bold">Profile & Settings</h1>
            <Card>
                <form onSubmit={handleSubmit}>
                    <CardHeader>
                        <CardTitle>Personal Information</CardTitle>
                        <CardDescription>
                            Update your public profile and personal details here. Birthday reminders are shared with friends, but the year is always kept private.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex items-center gap-6">
                            <div className="relative">
                                <Avatar className="h-24 w-24">
                                    <AvatarImage src={profile.photoURL} data-ai-hint="person portrait" />
                                    <AvatarFallback>{profile.displayName?.charAt(0).toUpperCase() || 'U'}</AvatarFallback>
                                </Avatar>
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="icon"
                                    className="absolute bottom-0 right-0 rounded-full h-8 w-8"
                                    onClick={handleAvatarChange}
                                >
                                    <Camera className="h-4 w-4" />
                                    <span className="sr-only">Change photo</span>
                                </Button>
                            </div>
                            <div className="flex-grow space-y-2">
                                 <Label htmlFor="displayName">Display Name</Label>
                                <Input
                                    id="displayName"
                                    name="displayName"
                                    value={profile.displayName || ''}
                                    onChange={handleInputChange}
                                    placeholder="Your Name"
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="birthday">Birthday</Label>
                                <Input id="birthday" name="birthday" type="date" value={profile.birthday || ''} onChange={handleInputChange} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="location">Location</Label>
                                <Input id="location" name="location" placeholder="City, Country" value={profile.location || ''} onChange={handleInputChange}/>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="church">Home Church</Label>
                                <Input id="church" name="church" placeholder="e.g., Connect Hub Central" value={profile.church || ''} onChange={handleInputChange} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="favoriteScripture">Favorite Scripture</Label>
                                <Input id="favoriteScripture" name="favoriteScripture" placeholder="e.g., John 3:16" value={profile.favoriteScripture || ''} onChange={handleInputChange} />
                            </div>
                            <div className="md:col-span-2 space-y-2">
                                <Label htmlFor="quote">Favorite Quote</Label>
                                <Textarea id="quote" name="quote" placeholder="A quote that inspires you..." value={profile.quote || ''} onChange={handleInputChange} />
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button type="submit" disabled={loading || initialLoading}>
                            {loading ? "Saving..." : "Save Changes"}
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
