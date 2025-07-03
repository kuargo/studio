"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
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
} from "lucide-react";

import { cn } from "@/lib/utils";
import {
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Button } from "../ui/button";
import { LogOut, Settings } from "lucide-react";

const menuItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard, tooltip: "Dashboard" },
  { href: "/social-feed", label: "Social Feed", icon: Newspaper, tooltip: "Social Feed" },
  { href: "/faith-reels", label: "Faith Reels", icon: Clapperboard, tooltip: "Faith Reels" },
  { href: "/prayer-wall", label: "Prayer Wall", icon: Wallpaper, tooltip: "Prayer Wall" },
  { href: "/sermon-remix", label: "Sermon Remix", icon: Scissors, tooltip: "Sermon Remix" },
];

const secondaryMenuItems = [
  { href: "/events", label: "Events Hub", icon: Calendar, tooltip: "Events" },
  { href: "/giving", label: "Giving", icon: Gift, tooltip: "Giving" },
  { href: "/journal", label: "Journal", icon: BookOpen, tooltip: "Journal" },
  { href: "/mentorship", label: "Mentorship", icon: Users, tooltip: "Mentorship" },
  { href: "/volunteering", label: "Volunteering", icon: HeartHandshake, tooltip: "Volunteering" },
  { href: "/well-being", label: "Well-being", icon: HeartPulse, tooltip: "Well-being" },
];

export function SidebarNav() {
  const pathname = usePathname();

  const renderMenuItems = (items: typeof menuItems) => (
    <SidebarMenu>
      {items.map((item) => (
        <SidebarMenuItem key={item.href}>
            <SidebarMenuButton asChild isActive={pathname.startsWith(item.href)} tooltip={item.tooltip}>
              <Link href={item.href}>
                <item.icon />
                <span>{item.label}</span>
              </Link>
            </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
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
        <Separator className="my-4" />
        {renderMenuItems(secondaryMenuItems)}
      </SidebarContent>
      <SidebarFooter>
        <Separator className="mb-4" />
        <SidebarMenu>
          <SidebarMenuItem>
              <SidebarMenuButton tooltip="Settings">
                  <Settings />
                  <span>Settings</span>
              </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
              <SidebarMenuButton tooltip="Log Out">
                  <LogOut />
                  <span>Log Out</span>
              </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </>
  );
}
