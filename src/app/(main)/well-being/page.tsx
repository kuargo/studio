import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HeartPulse } from "lucide-react";

export default function WellBeingPage() {
  return (
    <div className="flex justify-center items-start pt-16 h-full">
      <Card className="w-full max-w-md text-center">
        <CardHeader className="items-center">
          <div className="p-3 rounded-full bg-primary/10 mb-2">
            <HeartPulse className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="font-headline">Stress Management Hub</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">This feature is coming soon! Self-guided exercises, meditation playlists, and guided prayer.</p>
        </CardContent>
      </Card>
    </div>
  );
}
