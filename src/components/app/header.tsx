
"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { UserNav } from "@/components/app/user-nav";
import { usePathname } from "next/navigation";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import Link from "next/link";

const titles: { [key: string]: string } = {
  "/dashboard": "Dashboard",
  "/social-feed": "Social Feed",
  "/faith-reels": "Faith Reels",
  "/prayer-wall": "Prayer Wall",
  "/sermon-remix": "Sermon Remix",
  "/events": "Events Hub",
  "/giving": "Giving",
  "/journal": "Journal",
  "/mentorship": "Mentorship",
  "/volunteering": "Volunteering",
  "/well-being": "Well-being",
  "/admin": "Admin Dashboard",
};

export function Header() {
  const pathname = usePathname();
  const title = titles[pathname] || "Connect Hub 2.0";

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 shrink-0">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="flex md:hidden h-8 w-8" />
        <h1 className="hidden md:block text-lg font-semibold">{title}</h1>
      </div>
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <form className="ml-auto flex-1 sm:flex-initial">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
            />
          </div>
        </form>
        <UserNav />
      </div>
    </header>
  );
}
