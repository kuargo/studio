import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Gift } from "lucide-react";

export default function GivingPage() {
  return (
    <div className="flex justify-center items-start pt-16 h-full">
      <Card className="w-full max-w-md text-center">
        <CardHeader className="items-center">
          <div className="p-3 rounded-full bg-primary/10 mb-2">
            <Gift className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="font-headline">Online Giving</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">This feature is coming soon! A secure donation system for tithes and offerings.</p>
        </CardContent>
      </Card>
    </div>
  );
}
