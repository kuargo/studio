
import type { Metadata } from "next";
import { SettingsContent } from "@/components/app/settings-content";

export const metadata: Metadata = {
    title: "Settings | Connect Hub",
    description: "Manage your profile, notification settings, and privacy options.",
};

export default function SettingsPage() {
    return <SettingsContent />;
}
