
import type { Metadata } from "next";
import { DashboardContent } from "@/components/app/dashboard-content";

export const metadata: Metadata = {
  title: "Dashboard | Connect Hub",
  description: "Your personalized spiritual hub, buzzing with activity.",
};

export default function DashboardPage() {
    return <DashboardContent />;
}
