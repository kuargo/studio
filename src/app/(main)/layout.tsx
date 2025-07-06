"use client";

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { SidebarProvider, Sidebar, SidebarInset } from "@/components/ui/sidebar";
import { Header } from "@/components/app/header";
import { SidebarNav } from "@/components/app/sidebar-nav";
import { useAuth } from "@/hooks/use-auth";
import { AuthLoader } from "@/components/app/auth-provider";
import { useToast } from '@/hooks/use-toast';

function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const { user, loading, isAdmin } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);
  
  useEffect(() => {
    if (!loading && user && pathname.startsWith('/admin') && !isAdmin) {
        toast({
            variant: "destructive",
            title: "Access Denied",
            description: "You do not have permission to view this page.",
        });
        router.push('/dashboard');
    }
  }, [user, loading, isAdmin, pathname, router, toast]);

  if (loading || !user) {
    return <AuthLoader />;
  }
  
  if (pathname.startsWith('/admin') && !isAdmin) {
    return <AuthLoader />;
  }

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon" variant="sidebar">
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


export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <ProtectedLayout>{children}</ProtectedLayout>
  );
}
