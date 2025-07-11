
"use client";

import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { User, Newspaper, Calendar, HandHelping } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type UserData = {
    uid: string;
    displayName: string;
    email: string;
    photoURL: string;
    createdAt: { toDate: () => Date };
    termsAccepted: boolean;
};

const UserTableSkeleton = () => (
    <div className="space-y-2">
        {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center space-x-4 p-2">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-1/4" />
                    <Skeleton className="h-3 w-2/4" />
                </div>
                <Skeleton className="h-4 w-1/6" />
                <Skeleton className="h-8 w-12" />
            </div>
        ))}
    </div>
);


export default function AdminPage() {
    const [users, setUsers] = useState<UserData[]>([]);
    const [loading, setLoading] = useState(true);
    const { toast } = useToast();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'users'));
                const usersData = querySnapshot.docs.map(doc => ({ ...doc.data(), uid: doc.id } as UserData));
                setUsers(usersData);
            } catch (error) {
                console.error("Error fetching users:", error);
                toast({
                    variant: "destructive",
                    title: "Error fetching users",
                    description: "Could not load user data from Firestore."
                });
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [toast]);

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                        <User className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{users.length}</div>
                        <p className="text-xs text-muted-foreground">Registered users in the system</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
                        <Newspaper className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">+1,234</div>
                         <p className="text-xs text-muted-foreground">Placeholder data</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Pending Events</CardTitle>
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">+5</div>
                         <p className="text-xs text-muted-foreground">Placeholder data</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Opportunities</CardTitle>
                        <HandHelping className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">+15</div>
                         <p className="text-xs text-muted-foreground">Placeholder data</p>
                    </CardContent>
                </Card>
            </div>
            
            <Tabs defaultValue="users">
                <TabsList>
                    <TabsTrigger value="users">User Management</TabsTrigger>
                    <TabsTrigger value="content" disabled>Content Moderation</TabsTrigger>
                    <TabsTrigger value="settings" disabled>App Settings</TabsTrigger>
                </TabsList>
                <TabsContent value="users" className="mt-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Users</CardTitle>
                            <CardDescription>A list of all users in the system.</CardDescription>
                        </CardHeader>
                        <CardContent>
                             {loading ? <UserTableSkeleton /> : (
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>User</TableHead>
                                            <TableHead>Joined Date</TableHead>
                                            <TableHead>Terms Accepted</TableHead>
                                            <TableHead>Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {users.map((user) => (
                                            <TableRow key={user.uid}>
                                                <TableCell>
                                                    <div className="flex items-center gap-3">
                                                        <Avatar>
                                                            <AvatarImage src={user.photoURL} />
                                                            <AvatarFallback>{user.displayName?.charAt(0) || user.email?.charAt(0)}</AvatarFallback>
                                                        </Avatar>
                                                        <div>
                                                            <p className="font-medium">{user.displayName}</p>
                                                            <p className="text-sm text-muted-foreground">{user.email}</p>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    {user.createdAt ? user.createdAt.toDate().toLocaleDateString() : 'N/A'}
                                                </TableCell>
                                                <TableCell>
                                                    {user.termsAccepted ? (
                                                        <Badge variant="default">Yes</Badge>
                                                    ) : (
                                                        <Badge variant="destructive">No</Badge>
                                                    )}
                                                </TableCell>
                                                <TableCell>
                                                     <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button variant="ghost" className="h-8 w-8 p-0">
                                                                <span className="sr-only">Open menu</span>
                                                                <MoreHorizontal className="h-4 w-4" />
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end">
                                                            <DropdownMenuItem>View Profile</DropdownMenuItem>
                                                            <DropdownMenuItem>Make Admin</DropdownMenuItem>
                                                            <DropdownMenuSeparator />
                                                            <DropdownMenuItem className="text-destructive">Disable User</DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                             )}
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
