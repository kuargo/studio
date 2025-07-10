"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import { updateUserProfile } from "@/lib/firestore";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import Link from "next/link";
import { AuthLoader } from "@/components/app/auth-provider";
import { useToast } from "@/hooks/use-toast";
import { Sparkles } from "lucide-react";

export default function AcceptTermsPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleAccept = async () => {
    if (!user) {
        toast({ variant: "destructive", title: "Error", description: "You must be logged in to accept the terms."});
        router.push('/login');
        return;
    };
    setLoading(true);
    try {
      await updateUserProfile(user.uid, { termsAccepted: true });
      toast({
        title: "Welcome to Connect Hub!",
        description: "Thank you for accepting the terms.",
      });
      router.push("/dashboard");
    } catch (error) {
      console.error("Failed to update profile for terms acceptance:", error);
      toast({ variant: "destructive", title: "Error", description: "Could not save your acceptance. Please try again."});
      setLoading(false);
    }
  };

  if (authLoading) {
    return <AuthLoader />;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary/50 p-4">
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
                <div className="bg-primary p-3 rounded-xl w-fit">
                    <Sparkles className="w-8 h-8 text-primary-foreground" />
                </div>
            </div>
          <CardTitle>One Last Step</CardTitle>
          <CardDescription>
            Please review and accept our terms to continue to your spiritual hub.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="p-4 border rounded-md bg-background text-sm text-muted-foreground space-y-2">
                <p>By clicking "I Agree and Continue", you confirm that you have read, understood, and agree to be bound by our:</p>
                <ul className="list-disc pl-5 font-semibold">
                    <li>
                        <Link href="/legal/terms" target="_blank" className="text-primary underline hover:text-primary/80">
                            Terms of Service
                        </Link>
                    </li>
                    <li>
                         <Link href="/legal/privacy" target="_blank" className="text-primary underline hover:text-primary/80">
                            Privacy Policy
                        </Link>
                    </li>
                </ul>
                <p className="pt-2">These documents govern your use of the platform and explain how we collect, use, and protect your data.</p>
            </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={handleAccept} disabled={loading}>
            {loading ? "Saving..." : "I Agree and Continue"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
