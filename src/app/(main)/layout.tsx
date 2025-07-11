
"use client";

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { SidebarProvider, Sidebar, SidebarInset } from "@/components/ui/sidebar";
import { Header } from "@/components/app/header";
import { SidebarNav } from "@/components/app/sidebar-nav";
import { useAuth } from "@/hooks/use-auth";
import { AuthLoader } from "@/components/app/auth-provider";
import { useToast } from '@/hooks/use-toast';
import { getUserProfile } from '@/lib/firestore';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const { user, loading, authReady, isAdmin: isFirebaseAdmin } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();
  
  // =========================================================================
  // TEMPORARY ADMIN OVERRIDE - This grants admin access for initial setup.
  // This MUST be removed after the first admin user is properly configured.
  const [isAdmin, setIsAdmin] = useState(isFirebaseAdmin);
  useEffect(() => {
    const isSuperAdmin = user?.email === 'mwaniki.dennis@gmail.com';
    setIsAdmin(isFirebaseAdmin || isSuperAdmin);
  }, [isFirebaseAdmin, user]);
  // =========================================================================


  useEffect(() => {
    // Wait until Firebase has confirmed the auth state
    if (!authReady) {
      return;
    }

    // If auth is ready and there's no user, redirect to login.
    if (!user) {
      router.push('/login');
      return;
    }

    // If a user is logged in, check for terms acceptance and admin routes.
    if (user) {
      if (pathname !== '/legal/accept') {
        getUserProfile(user.uid).then(profile => {
          if (profile && !profile.termsAccepted) {
            toast({
              title: "Welcome! One last step...",
              description: "Please review and accept the terms to continue.",
            });
            router.push('/legal/accept');
          }
        });
      }

      if (pathname.startsWith('/admin') && !isAdmin) {
        toast({
          variant: "destructive",
          title: "Access Denied",
          description: "You do not have permission to view this page.",
        });
        router.push('/dashboard');
      }
    }
  }, [user, authReady, isAdmin, pathname, router, toast]);

  // While auth state is resolving, show a full-page loader.
  // This prevents any child components from rendering and trying to access
  // Firestore before the auth state is ready.
  if (!authReady) {
    return <AuthLoader />;
  }
  
  // If auth is ready but there is no user, this component will trigger the
  // redirect effect above and return null for a moment.
  if (!user) {
    return null;
  }
  
  // Only when auth is ready AND a user exists, render the main app layout.
  return (
    <SidebarProvider>
      <Sidebar collapsible="icon" variant="floating">
        <SidebarNav />
      </Sidebar>
      <SidebarInset>
        <div className="flex flex-col h-screen">
          <Header />
          <main className="flex-1 overflow-y-auto bg-secondary/50 p-4 md:p-6 lg:p-8">
            {children}
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
