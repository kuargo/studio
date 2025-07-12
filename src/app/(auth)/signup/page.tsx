
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
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
import { createUserProfile } from "@/lib/firestore";
import { Separator } from "@/components/ui/separator";
import { Eye, EyeOff, CheckCircle, XCircle } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

const passwordValidation = new RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/
);

const formSchema = z.object({
    email: z.string().email({ message: "Please enter a valid email address." }),
    password: z.string().min(8, { message: "Password must be at least 8 characters." })
        .regex(passwordValidation, {
            message: "Password must contain an uppercase letter, a lowercase letter, a number, and a special character.",
        }),
    confirmPassword: z.string(),
    agreedToTerms: z.boolean().refine(val => val === true, {
        message: "You must agree to the terms and conditions.",
    }),
}).refine(data => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
});


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

const PasswordRequirement = ({ isValid, children }: { isValid: boolean; children: React.ReactNode }) => (
    <div className={`flex items-center text-xs ${isValid ? 'text-green-600' : 'text-muted-foreground'}`}>
        {isValid ? <CheckCircle className="h-3 w-3 mr-1.5" /> : <XCircle className="h-3 w-3 mr-1.5" />}
        {children}
    </div>
);


export default function SignupPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [socialLoading, setSocialLoading] = useState<null | 'google' | 'facebook'>(null);
  const [showPassword, setShowPassword] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      agreedToTerms: false,
    },
  });

  const password = form.watch("password");

  const passwordValidation = {
    hasUpperCase: /[A-Z]/.test(password),
    hasLowerCase: /[a-z]/.test(password),
    hasNumber: /[0-9]/.test(password),
    hasSpecialChar: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
    hasValidLength: password.length >= 8,
  };

  const handleAuthSuccess = () => {
    router.push('/dashboard');
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
      
      const displayName = userCredential.user.displayName || values.email.split('@')[0];
      await updateProfile(userCredential.user, { displayName });

      await createUserProfile(userCredential.user, {
        displayName,
        termsAccepted: values.agreedToTerms
      });

      handleAuthSuccess();
    } catch (error: any) {
      handleAuthError(error, "Signup Failed");
    }
  }

  const handleSocialLogin = async (providerName: 'google' | 'facebook') => {
    setSocialLoading(providerName);
    const provider = providerName === 'google' 
      ? new GoogleAuthProvider() 
      : new FacebookAuthProvider();
    
    try {
      const result = await signInWithPopup(auth, provider);
      await createUserProfile(result.user, { termsAccepted: false });
      handleAuthSuccess();
    } catch (error: any)      {
        if (error.code !== 'auth/popup-closed-by-user') {
            handleAuthError(error, "Social Signup Failed");
        }
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
            <Button variant="outline" onClick={() => handleSocialLogin('google')} disabled={!!socialLoading || form.formState.isSubmitting}>
              {socialLoading === 'google' ? "Signing up..." : <><GoogleIcon className="mr-2 h-5 w-5"/> Google</>}
            </Button>
            <Button variant="outline" className="text-[#1877F2] hover:text-[#1877F2]" onClick={() => handleSocialLogin('facebook')} disabled={!!socialLoading || form.formState.isSubmitting}>
              {socialLoading === 'facebook' ? "Signing up..." : <><FacebookIcon className="mr-2 h-4 w-4"/> Facebook</>}
            </Button>
          </div>
          <div className="flex items-center gap-4">
              <Separator className="flex-1" />
              <span className="text-xs text-muted-foreground">OR</span>
              <Separator className="flex-1"/>
          </div>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                            <Input type="email" placeholder="name@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                            <div className="relative">
                                <Input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Create a strong password"
                                    {...field}
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
                        </FormControl>
                         <div className="grid grid-cols-2 gap-x-4 gap-y-1 pt-2">
                            <PasswordRequirement isValid={passwordValidation.hasValidLength}>8+ characters</PasswordRequirement>
                            <PasswordRequirement isValid={passwordValidation.hasUpperCase}>1 uppercase</PasswordRequirement>
                            <PasswordRequirement isValid={passwordValidation.hasLowerCase}>1 lowercase</PasswordRequirement>
                            <PasswordRequirement isValid={passwordValidation.hasNumber}>1 number</PasswordRequirement>
                            <PasswordRequirement isValid={passwordValidation.hasSpecialChar}>1 special char</PasswordRequirement>
                        </div>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                             <div className="relative">
                                <Input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Re-enter your password"
                                    {...field}
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
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="agreedToTerms"
                    render={({ field }) => (
                        <FormItem className="flex items-start space-x-2 pt-2">
                        <FormControl>
                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                            <FormLabel htmlFor="terms" className="text-sm font-normal text-muted-foreground">
                                I agree to the{" "}
                                <Link href="/legal/terms" target="_blank" className="underline text-primary hover:text-primary/80">
                                    Terms of Service
                                </Link>{" "}
                                and{" "}
                                <Link href="/legal/privacy" target="_blank" className="underline text-primary hover:text-primary/80">
                                    Privacy Policy
                                </Link>.
                            </FormLabel>
                             <FormMessage />
                        </div>
                        </FormItem>
                    )}
                />
                <Button type="submit" className="w-full" disabled={form.formState.isSubmitting || !!socialLoading}>
                    {form.formState.isSubmitting ? "Creating Account..." : "Sign Up with Email"}
                </Button>
            </form>
        </Form>
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

    