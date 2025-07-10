
import type { Metadata } from "next";
import { SocialFeedContent } from "@/components/app/social-feed-content";

export const metadata: Metadata = {
  title: "Social Feed | Connect Hub",
  description: "Share and discover testimonies, prayer requests, and encouraging updates from the community.",
};

export default function SocialFeedPage() {
    return <SocialFeedContent />;
}
