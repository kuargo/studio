
"use client";

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { SidebarProvider, Sidebar, SidebarInset } from "@/components/ui/sidebar";
import { Header } from "@/components/app/header";
import { SidebarNav } from "@/components/app/sidebar-nav";
import { useAuth } from "@/hooks/use-auth";
import { AuthLoader } from "@/components/app/auth-provider";
import { useToast } from '@/hooks/use-toast';
import { getUserProfile } from '@/lib/firestore';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const { user, loading, authReady, isAdmin } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();

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
      // For any page that isn't the legal acceptance page, check if terms have been accepted.
      if (pathname !== '/legal/accept') {
        getUserProfile(user.uid).then(profile => {
          // If a profile exists and terms are not accepted, redirect them.
          if (profile && !profile.termsAccepted) {
            toast({
              title: "Welcome! One last step...",
              description: "Please review and accept the terms to continue.",
            });
            router.push('/legal/accept');
          }
        }).catch(error => {
            console.error("Failed to check user profile for terms acceptance:", error);
        });
      }

      // Explicitly protect the /admin route. If the user is not an admin,
      // show a toast and redirect them immediately.
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
  if (!authReady || (!user && pathname !== '/login')) {
    return <AuthLoader />;
  }
  
  // If the user is not an admin and tries to access the admin page,
  // we render null to prevent a flash of the admin content before the redirect effect runs.
  if (pathname.startsWith('/admin') && !isAdmin) {
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
