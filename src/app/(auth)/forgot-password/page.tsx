
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
        toast({
            variant: "destructive",
            title: "Email Required",
            description: "Please enter your email address.",
        });
        return;
    }
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      toast({
        title: "Reset Link Sent",
        description: "Please check your email for a link to reset your password.",
      });
      router.push("/login");
    } catch (error: any) {
      let description = "An unexpected error occurred. Please try again.";
       switch (error.code) {
        case 'auth/user-not-found':
        case 'auth/invalid-email':
          description = "No user found with this email address. Please check the email and try again.";
          break;
        default:
          description = error.message;
      }
      toast({
        variant: "destructive",
        title: "Reset Failed",
        description: description,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Forgot Password</CardTitle>
        <CardDescription>
          Enter your email and we'll send you a link to reset your password.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handlePasswordReset}>
        <CardContent>
            <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
            </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
            <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Sending Link..." : "Send Reset Link"}
            </Button>
            <p className="text-sm text-center text-muted-foreground w-full">
                Remember your password?{" "}
                <Link href="/login" className="underline text-primary">
                Sign in
                </Link>
            </p>
        </CardFooter>
      </form>
    </Card>
  );
}
