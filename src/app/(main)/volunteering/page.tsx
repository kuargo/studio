import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wrench } from "lucide-react";

export default function VolunteeringPage() {
  return (
    <div className="flex justify-center items-start pt-16 h-full">
      <Card className="w-full max-w-md text-center">
        <CardHeader className="items-center">
          <div className="p-3 rounded-full bg-primary/10 mb-2">
            <Wrench className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="font-headline">Volunteer Board</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">This feature is coming soon! Browse, sign up for, or post volunteer needs.</p>
        </CardContent>
      </Card>
    </div>
  );
}
