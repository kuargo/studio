
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


const GoogleIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24px" height="24px" {...props}>
        <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
        <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
        <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.222,0-9.657-3.356-11.303-8H6.306C9.656,39.663,16.318,44,24,44z" />
        <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.089,5.571l6.19,5.238C39.901,35.636,44,29.596,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
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

  const handleAuthSuccess = () => {
    // The main layout's AuthGuard will handle redirection
    // to either /dashboard or /legal/accept.
    // This component's only job is to get the user authenticated.
    router.push('/dashboard'); 
  };


  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await setPersistence(auth, rememberMe ? browserLocalPersistence : browserSessionPersistence);
      await signInWithEmailAndPassword(auth, email, password);
      handleAuthSuccess();
    } catch (error: any) {
      handleAuthError(error, "Login Failed");
      setLoading(false);
    }
  };

  const handleSocialLogin = async (providerName: 'google' | 'facebook') => {
    setSocialLoading(providerName);
    const provider = providerName === 'google' 
      ? new GoogleAuthProvider() 
      : new FacebookAuthProvider();
    
    try {
      await signInWithPopup(auth, provider);
      handleAuthSuccess();
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
      case 'auth/authorized-domain':
         description = "Login failed. This app's domain is not authorized for authentication. Please contact support.";
         break;
      case 'permission-denied':
         description = "Login failed due to a permissions issue. Please try again in a moment.";
         break;
      default:
        description = error.message || "An unknown error occurred.";
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
            {socialLoading === 'google' ? "Signing in..." : <><GoogleIcon className="mr-2 h-5 w-5"/> Google</>}
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
            <Link href="/forgot-password" className="text-sm text-primary underline">
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
