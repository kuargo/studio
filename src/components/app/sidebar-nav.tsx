
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import {
  BookOpen,
  BookText,
  Calendar,
  Clapperboard,
  Gift,
  HeartPulse,
  LayoutDashboard,
  Newspaper,
  Scissors,
  Users,
  Wallpaper,
  HeartHandshake,
  Sparkles,
  Shield,
} from "lucide-react";

import { cn } from "@/lib/utils";
import {
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarSeparator
} from "@/components/ui/sidebar";
import { Button } from "../ui/button";
import { LogOut, Settings } from "lucide-react";

type MenuItem = {
  href: string;
  label: string;
  icon: React.ElementType;
  tooltip: string;
  color?: string;
  adminOnly?: boolean;
};

const menuItems: MenuItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard, tooltip: "Dashboard", color: "text-sky-500" },
  { href: "/social-feed", label: "Social Feed", icon: Newspaper, tooltip: "Social Feed", color: "text-blue-500" },
  { href: "/faith-reels", label: "Faith Reels", icon: Clapperboard, tooltip: "Faith Reels", color: "text-rose-500" },
  { href: "/prayer-wall", label: "Prayer Wall", icon: Wallpaper, tooltip: "Prayer Wall", color: "text-fuchsia-500" },
  { href: "/sermon-remix", label: "Sermon Remix", icon: Scissors, tooltip: "Sermon Remix", color: "text-violet-500" },
];

const secondaryMenuItems: MenuItem[] = [
  { href: "/events", label: "Events Hub", icon: Calendar, tooltip: "Events", color: "text-purple-500" },
  { href: "/giving", label: "Giving", icon: Gift, tooltip: "Giving", color: "text-red-500" },
  { href: "/journal", label: "Journal", icon: BookOpen, tooltip: "Journal", color: "text-orange-500" },
  { href: "/bible", label: "Bible", icon: BookText, tooltip: "Bible", color: "text-amber-500" },
  { href: "/mentorship", label: "Mentorship", icon: Users, tooltip: "Mentorship", color: "text-green-500" },
  { href: "/volunteering", label: "Volunteering", icon: HeartHandshake, tooltip: "Volunteering", color: "text-teal-500" },
  { href: "/well-being", label: "Well-being", icon: HeartPulse, tooltip: "Well-being", color: "text-cyan-500" },
];

const adminMenuItems: MenuItem[] = [
    { href: "/admin", label: "Admin Panel", icon: Shield, tooltip: "Admin Panel", color: "text-destructive", adminOnly: true},
]

export function SidebarNav() {
  const pathname = usePathname();
  const router = useRouter();
  const { toast } = useToast();
  const { isAdmin } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/login");
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Logout Failed",
        description: "Something went wrong. Please try again.",
      });
    }
  };

  const renderMenuItems = (items: typeof menuItems) => (
    <SidebarMenu>
      {items.map((item) => {
        if (item.adminOnly && !isAdmin) {
            return null;
        }
        return (
            <SidebarMenuItem key={item.href}>
                <SidebarMenuButton asChild isActive={pathname.startsWith(item.href)} tooltip={item.tooltip}>
                <Link href={item.href}>
                    <div className={cn("p-1.5 rounded-md", 
                        pathname.startsWith(item.href) 
                        ? 'bg-primary/10' 
                        : 'bg-muted group-hover:bg-primary/10'
                    )}>
                        <item.icon className={cn("h-4 w-4 transition-colors", item.color, !pathname.startsWith(item.href) && "group-hover:text-primary")} />
                    </div>
                    <span>{item.label}</span>
                </Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
        )
      })}
    </SidebarMenu>
  );

  return (
    <>
      <SidebarHeader>
        <Link href="/dashboard" className="flex items-center gap-2">
            <div className="bg-primary p-2 rounded-lg">
                <Sparkles className="w-6 h-6 text-primary-foreground" />
            </div>
            <div className="font-headline text-lg font-semibold text-primary">Connect Hub</div>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        {renderMenuItems(menuItems)}
        <SidebarSeparator className="my-4" />
        {renderMenuItems(secondaryMenuItems)}
         {isAdmin && (
            <>
                <SidebarSeparator className="my-4" />
                {renderMenuItems(adminMenuItems)}
            </>
         )}
      </SidebarContent>
      <SidebarFooter>
        <SidebarSeparator className="mb-4" />
        <SidebarMenu>
          <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname.startsWith('/settings')} tooltip="Settings">
                <Link href="/settings">
                  <div className="p-1.5 bg-muted rounded-md"><Settings className="h-4 w-4 text-muted-foreground" /></div>
                  <span>Settings</span>
                </Link>
              </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
              <SidebarMenuButton tooltip="Log Out" onClick={handleLogout}>
                  <div className="p-1.5 bg-muted rounded-md"><LogOut className="h-4 w-4 text-muted-foreground" /></div>
                  <span>Log Out</span>
              </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </>
  );
}
