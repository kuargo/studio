import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield } from "lucide-react";

export default function AdminPage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="text-primary"/> Admin Dashboard
          </CardTitle>
          <CardDescription>
            Welcome to the control center. Here you can manage users, content, and other aspects of the application.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Admin-specific content and tools will be built out here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
