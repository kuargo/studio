
"use client";

import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/hooks/use-auth";
import { auth, storage } from "@/lib/firebase";
import { updateProfile } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { updateUserProfile, getUserProfile, UserProfileData } from "@/lib/firestore";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Camera, Loader2 } from "lucide-react";
import { Skeleton } from "../ui/skeleton";
import { LocationInput } from "./location-input";

export function SettingsContent() {
    const { user } = useAuth();
    const { toast } = useToast();
    const [profile, setProfile] = useState<Partial<UserProfileData>>({});
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        async function loadProfile() {
            if (user) {
                try {
                    const firestoreProfile = await getUserProfile(user.uid);
                    const combinedProfile = {
                        displayName: user.displayName || "",
                        photoURL: user.photoURL || "",
                        ...firestoreProfile,
                    };
                    setProfile(combinedProfile);
                } catch (error) {
                    console.error("Failed to load user profile:", error);
                    toast({
                        variant: "destructive",
                        title: "Error",
                        description: "Could not load your profile data.",
                    });
                } finally {
                    setInitialLoading(false);
                }
            } else {
                setInitialLoading(false);
            }
        }
        loadProfile();
    }, [user, toast]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProfile(prev => ({ ...prev, [name]: value }));
    };

    const handleLocationSelect = (name: 'location' | 'church', value: string) => {
        setProfile(prev => ({ ...prev, [name]: value }));
    };

    const handleAvatarButtonClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || !user) return;

        if (!file.type.startsWith("image/")) {
            toast({ variant: "destructive", title: "Invalid File", description: "Please select an image file." });
            return;
        }

        setUploading(true);
        const storageRef = ref(storage, `profile-images/${user.uid}/${file.name}`);

        try {
            const snapshot = await uploadBytes(storageRef, file);
            const downloadURL = await getDownloadURL(snapshot.ref);

            if (auth.currentUser) {
                await updateProfile(auth.currentUser, { photoURL: downloadURL });
            }
            await updateUserProfile(user.uid, { photoURL: downloadURL });

            setProfile(prev => ({ ...prev, photoURL: downloadURL }));
            toast({ title: "Avatar Updated!", description: "Your new profile picture has been saved." });

        } catch (error: any) {
             let description = "Could not upload your avatar. Please try again.";
            if (error.code === 'storage/unauthorized') {
                description = "You do not have permission to upload. Check Storage Rules.";
            } else if (error.code === 'storage/object-not-found') {
                description = "File not found during upload. Please try again.";
            }
            toast({ variant: "destructive", title: "Upload Failed", description });
        } finally {
            setUploading(false);
        }
    };
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user || !auth.currentUser) {
            toast({ variant: "destructive", title: "Error", description: "You must be logged in to save."});
            return;
        }

        setLoading(true);
        try {
            if (auth.currentUser.displayName !== profile.displayName) {
                await updateProfile(auth.currentUser, {
                    displayName: profile.displayName,
                });
            }

            const firestoreData: Partial<UserProfileData> = {
                displayName: profile.displayName,
                birthday: profile.birthday,
                location: profile.location,
                church: profile.church,
                favoriteScripture: profile.favoriteScripture,
                quote: profile.quote,
            };

            await updateUserProfile(user.uid, firestoreData);

            toast({
                title: "Profile Updated",
                description: "Your profile has been successfully updated.",
            });
        } catch (error) {
            console.error(error);
            toast({
                variant: "destructive",
                title: "Update Failed",
                description: "Could not update your profile. Please check permissions and try again.",
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
                                     {uploading && (
                                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-full">
                                            <Loader2 className="h-8 w-8 text-white animate-spin" />
                                        </div>
                                    )}
                                </Avatar>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleFileSelect}
                                    className="hidden"
                                    accept="image/*"
                                    disabled={uploading}
                                />
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="icon"
                                    className="absolute bottom-0 right-0 rounded-full h-8 w-8"
                                    onClick={handleAvatarButtonClick}
                                    disabled={uploading}
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
                                <LocationInput
                                    id="location"
                                    value={profile.location || ''}
                                    onValueChange={(value) => handleLocationSelect('location', value)}
                                    placeholder="City, Country"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="church">Home Church</Label>
                                 <LocationInput
                                    id="church"
                                    value={profile.church || ''}
                                    onValueChange={(value) => handleLocationSelect('church', value)}
                                    placeholder="e.g., Connect Hub Central"
                                    types={['establishment']}
                                />
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
                        <Button type="submit" disabled={loading || initialLoading || uploading}>
                            {loading ? "Saving..." : "Save Changes"}
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
