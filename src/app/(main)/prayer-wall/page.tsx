
import type { Metadata } from "next";
import { PrayerWallContent } from "@/components/app/prayer-wall-content";

export const metadata: Metadata = {
  title: "Prayer Wall | Connect Hub",
  description: "Share prayer requests and testimonies with the community. Lift each other up in prayer.",
};

export default function PrayerWallPage() {
    return <PrayerWallContent />;
}
