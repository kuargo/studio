import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Newspaper } from "lucide-react";

export default function SocialFeedPage() {
  return (
    <div className="flex justify-center items-start pt-16 h-full">
      <Card className="w-full max-w-md text-center">
        <CardHeader className="items-center">
          <div className="p-3 rounded-full bg-primary/10 mb-2">
            <Newspaper className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="font-headline">Personalized Social Feed</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">This feature is coming soon! An aggregation of posts, testimonies, and updates.</p>
        </CardContent>
      </Card>
    </div>
  );
}
