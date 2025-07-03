import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clapperboard } from "lucide-react";

export default function FaithReelsPage() {
  return (
    <div className="flex justify-center items-start pt-16 h-full">
      <Card className="w-full max-w-md text-center">
        <CardHeader className="items-center">
          <div className="p-3 rounded-full bg-primary/10 mb-2">
            <Clapperboard className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="font-headline">Faith Reels</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">This feature is coming soon! A vertical video feed for short, faith-based content.</p>
        </CardContent>
      </Card>
    </div>
  );
}
