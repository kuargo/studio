import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen } from "lucide-react";

export default function JournalPage() {
  return (
    <div className="flex justify-center items-start pt-16 h-full">
      <Card className="w-full max-w-md text-center">
        <CardHeader className="items-center">
          <div className="p-3 rounded-full bg-primary/10 mb-2">
            <BookOpen className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="font-headline">Dreams & Visions Journal</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">This feature is coming soon! Log your dreams, visions, and prophetic impressions.</p>
        </CardContent>
      </Card>
    </div>
  );
}
