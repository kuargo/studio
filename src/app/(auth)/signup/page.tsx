
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider
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
import { createUserProfile, getUserProfile } from "@/lib/firestore";
import { Separator } from "@/components/ui/separator";
import { Eye, EyeOff } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

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

export default function SignupPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<null | 'google' | 'facebook'>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleSuccessfulSignup = async (user: any) => {
    // For email signup, we know they agreed. For social, we still check.
    const profile = await getUserProfile(user.uid);
    if (!profile) {
      // It's a brand new user via social, create profile and go to terms.
       await createUserProfile(user, { termsAccepted: false });
       router.push("/legal/accept");
    } else if (!profile.termsAccepted) {
      // Existing user via social who hasn't accepted terms
      router.push("/legal/accept");
    } else {
      // User has already accepted terms in the past
      router.push("/dashboard");
    }
  };

  const validatePassword = (password: string) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
    const hasValidLength = password.length >= 8;
    
    if (!hasValidLength) return "Password must be at least 8 characters long.";
    if (!hasUpperCase) return "Password must contain at least one uppercase letter.";
    if (!hasLowerCase) return "Password must contain at least one lowercase letter.";
    if (!hasNumber) return "Password must contain at least one number.";
    if (!hasSpecialChar) return "Password must contain at least one special character.";

    return null;
  }

  const handleEmailSignup = async (e: React.FormEvent) => {
    e.preventDefault();
     if (!agreedToTerms) {
        toast({
            variant: "destructive",
            title: "Terms & Conditions",
            description: "You must agree to the terms and conditions to sign up.",
        });
        return;
    }
    if (password !== confirmPassword) {
      toast({
        variant: "destructive",
        title: "Passwords Do Not Match",
        description: "Please check your passwords and try again.",
      });
      return;
    }

    const passwordError = validatePassword(password);
    if (passwordError) {
        toast({
            variant: "destructive",
            title: "Weak Password",
            description: passwordError,
        });
        return;
    }

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const displayName = userCredential.user.displayName || email.split('@')[0];
      const photoURL = userCredential.user.photoURL || `https://placehold.co/100x100.png`;

      await updateProfile(userCredential.user, {
        displayName,
        photoURL,
      });

      await createUserProfile(userCredential.user, {
        displayName,
        photoURL,
        termsAccepted: true
      });

      toast({
        title: "Account Created!",
        description: "Welcome to Connect Hub. You are now being redirected.",
      });
      router.push("/dashboard");
    } catch (error: any) {
      handleAuthError(error, "Signup Failed");
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
      await handleSuccessfulSignup(result.user);
    } catch (error: any) {
      handleAuthError(error, "Social Signup Failed");
    } finally {
      setSocialLoading(null);
    }
  };
  
  const handleAuthError = (error: any, title: string) => {
    let description = "An unexpected error occurred. Please try again.";
      switch (error.code) {
        case 'auth/email-already-in-use':
          description = "This email address is already in use by another account.";
          break;
        case 'auth/invalid-email':
          description = "The email address is not valid. Please check and try again.";
          break;
        case 'auth/operation-not-allowed':
          description = "Email/password sign up is not enabled. Please contact support.";
          break;
        case 'auth/weak-password':
          description = "The password is too weak. Please use a stronger password.";
          break;
         case 'auth/account-exists-with-different-credential':
          description = "An account already exists with the same email address but different sign-in credentials. Sign in using a provider associated with this email address.";
          break;
        case 'auth/popup-closed-by-user':
          description = "The sign-in popup was closed before completing. Please try again.";
          return; // Don't show toast for this
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
        <CardTitle>Create an Account</CardTitle>
        <CardDescription>
          Join the community in just a few clicks.
        </CardDescription>
      </CardHeader>
       <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" onClick={() => handleSocialLogin('google')} disabled={!!socialLoading}>
              {socialLoading === 'google' ? "Signing up..." : <><GoogleIcon className="mr-2 h-4 w-4"/> Google</>}
            </Button>
            <Button variant="outline" className="text-[#1877F2] hover:text-[#1877F2]" onClick={() => handleSocialLogin('facebook')} disabled={!!socialLoading}>
              {socialLoading === 'facebook' ? "Signing up..." : <><FacebookIcon className="mr-2 h-4 w-4"/> Facebook</>}
            </Button>
          </div>
          <div className="flex items-center gap-4">
              <Separator className="flex-1" />
              <span className="text-xs text-muted-foreground">OR</span>
              <Separator className="flex-1"/>
          </div>
        <form onSubmit={handleEmailSignup} className="space-y-4">
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
              <div className="relative">
                <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="Create a strong password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button 
                    type="button" 
                    variant="ghost" 
                    size="icon" 
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
                    onClick={() => setShowPassword(prev => !prev)}
                >
                    {showPassword ? <EyeOff className="h-4 w-4"/> : <Eye className="h-4 w-4"/>}
                </Button>
              </div>
               <p className="text-xs text-muted-foreground">
                Must be 8+ characters and include uppercase, lowercase, a number, and a special character.
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <div className="relative">
                <Input
                    id="confirm-password"
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="Re-enter your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <Button 
                    type="button" 
                    variant="ghost" 
                    size="icon" 
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
                    onClick={() => setShowPassword(prev => !prev)}
                >
                     {showPassword ? <EyeOff className="h-4 w-4"/> : <Eye className="h-4 w-4"/>}
                </Button>
              </div>
            </div>
            <div className="flex items-start space-x-2">
                <Checkbox id="terms" checked={agreedToTerms} onCheckedChange={(checked) => setAgreedToTerms(!!checked)} className="mt-1"/>
                <Label htmlFor="terms" className="text-sm font-normal text-muted-foreground">
                    I agree to the{" "}
                    <Link href="/legal/terms" target="_blank" className="underline text-primary hover:text-primary/80">
                        Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/legal/privacy" target="_blank" className="underline text-primary hover:text-primary/80">
                        Privacy Policy
                    </Link>.
                </Label>
            </div>
             <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Creating Account..." : "Sign Up with Email"}
            </Button>
        </form>
      </CardContent>
      <CardFooter>
          <p className="text-sm text-center text-muted-foreground w-full">
            Already have an account?{" "}
            <Link href="/login" className="underline text-primary">
              Sign in
            </Link>
          </p>
      </CardFooter>
    </Card>
  );
}
