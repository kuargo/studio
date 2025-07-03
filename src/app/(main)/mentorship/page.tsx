import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";

export default function MentorshipPage() {
  return (
    <div className="flex justify-center items-start pt-16 h-full">
      <Card className="w-full max-w-md text-center">
        <CardHeader className="items-center">
          <div className="p-3 rounded-full bg-primary/10 mb-2">
            <Users className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="font-headline">Mentor/Mentee Matchmaking</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">This feature is coming soon! Connect with mentors or spiritual 'big siblings'.</p>
        </CardContent>
      </Card>
    </div>
  );
}
