"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { createUserProfile } from "@/lib/firestore";


const GoogleIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.85 3.18-1.73 4.1-1.02 1.02-2.6 1.98-4.66 1.98-3.56 0-6.49-2.93-6.49-6.5s2.93-6.5 6.49-6.5c1.98 0 3.23.79 4.1 1.69l2.5-2.5C18.16 3.69 15.83 2.5 12.48 2.5c-5.48 0-9.98 4.5-9.98 9.98s4.5 9.98 9.98 9.98c2.82 0 5.15-1.05 6.9-2.82 1.83-1.83 2.62-4.47 2.62-7.27 0-.54-.04-.99-.09-1.42h-9.33z"/>
    </svg>
);

const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M23.998 12c0-6.627-5.373-12-12-12S0 5.373 0 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.61 22.954 23.998 17.99 23.998 12z" fill="currentColor"/>
    </svg>
);

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<null | 'google' | 'facebook'>(null);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await setPersistence(auth, rememberMe ? browserLocalPersistence : browserSessionPersistence);
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/dashboard");
    } catch (error: any) {
      handleAuthError(error, "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (providerName: 'google' | 'facebook') => {
    setSocialLoading(providerName);
    const provider = providerName === 'google' 
      ? new GoogleAuthProvider() 
      : new FacebookAuthProvider();
    
    try {
      const result = await signInWithPopup(auth, provider);
      // This will create a profile if one doesn't exist.
      await createUserProfile(result.user, {});
      router.push("/dashboard");
    } catch (error: any) {
      handleAuthError(error, "Social Login Failed");
    } finally {
      setSocialLoading(null);
    }
  };

  const handleAuthError = (error: any, title: string) => {
    let description = "An unexpected error occurred. Please try again.";
    switch (error.code) {
      case 'auth/user-not-found':
      case 'auth/wrong-password':
      case 'auth/invalid-credential':
        description = "Invalid email or password. Please check your credentials and try again.";
        break;
      case 'auth/invalid-email':
        description = "The email address is not valid. Please check and try again.";
        break;
      case 'auth/user-disabled':
        description = "This user account has been disabled.";
        break;
      case 'auth/account-exists-with-different-credential':
        description = "An account already exists with the same email address but different sign-in credentials. Sign in using a provider associated with this email address.";
        break;
      case 'auth/popup-closed-by-user':
        description = "The sign-in popup was closed before completing. Please try again.";
        return; // Don't show a toast for this
      default:
        description = error.message;
    }
    toast({
      variant: "destructive",
      title: title,
      description: description,
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Welcome Back</CardTitle>
        <CardDescription>
          Sign in to continue to your spiritual hub.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Button variant="outline" onClick={() => handleSocialLogin('google')} disabled={!!socialLoading}>
            {socialLoading === 'google' ? "Signing in..." : <><GoogleIcon className="mr-2 h-4 w-4"/> Google</>}
          </Button>
          <Button variant="outline" className="text-[#1877F2] hover:text-[#1877F2]" onClick={() => handleSocialLogin('facebook')} disabled={!!socialLoading}>
             {socialLoading === 'facebook' ? "Signing in..." : <><FacebookIcon className="mr-2 h-4 w-4"/> Facebook</>}
          </Button>
        </div>
        <div className="flex items-center gap-4">
            <Separator className="flex-1" />
            <span className="text-xs text-muted-foreground">OR</span>
            <Separator className="flex-1"/>
        </div>
        <form onSubmit={handleEmailLogin} className="space-y-4">
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
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox id="remember-me" checked={rememberMe} onCheckedChange={(checked) => setRememberMe(!!checked)} />
              <Label htmlFor="remember-me" className="text-sm font-normal">Remember me</Label>
            </div>
            <Link href="#" className="text-sm text-primary underline">
              Forgot password?
            </Link>
          </div>
           <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Signing In..." : "Sign In with Email"}
          </Button>
        </form>
      </CardContent>
      <CardFooter>
        <p className="text-sm text-center text-muted-foreground w-full">
            Don't have an account?{" "}
            <Link href="/signup" className="underline text-primary">
              Sign up
            </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
