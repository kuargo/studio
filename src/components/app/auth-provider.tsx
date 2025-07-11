
"use client";

import React, { useState, useEffect } from "react";
import type { User } from "firebase/auth";
import { auth, firebaseConfigured } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { Sparkles, AlertTriangle } from "lucide-react";
import { AuthContext } from "@/hooks/use-auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const FirebaseNotConfigured = () => {
    return (
        <div className="flex h-screen w-full flex-col items-center justify-center bg-secondary/50 p-4">
             <Card className="w-full max-w-lg border-destructive bg-destructive/5">
                <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-destructive">
                        <AlertTriangle className="h-6 w-6" /> Action Required: Configure Firebase
                    </CardTitle>
                    <CardDescription className="text-destructive/90">
                        This application cannot run until you connect it to your Firebase project.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                    <p className="font-semibold">Please follow these steps:</p>
                    <ol className="list-decimal space-y-2 pl-6 text-foreground/90">
                        <li>Go to the <a href="https://console.firebase.google.com/" target="_blank" rel="noopener noreferrer" className="font-bold underline text-primary">Firebase Console</a> and create a new project.</li>
                        <li>In your project, go to Project Settings and add a <strong>Web</strong> application.</li>
                        <li>Firebase will provide a `firebaseConfig` object. You will need these keys.</li>
                        <li>In this code editor, create a new file in the root directory named <strong><code>.env.local</code></strong>.</li>
                        <li>Find the <strong><code>.env.example</code></strong> file and copy its contents into your new <strong><code>.env.local</code></strong> file.</li>
                        <li>Replace the placeholder values in `.env.local` with your actual credentials from Firebase.</li>
                    </ol>
                    <p className="pt-2 font-semibold">After saving the <code>.env.local</code> file, the app will automatically restart and work correctly.</p>
                </CardContent>
             </Card>
        </div>
    );
};


export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [authReady, setAuthReady] = useState(false); // New state
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (!firebaseConfigured) {
      setLoading(false);
      setAuthReady(true);
      return;
    }
    
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        const tokenResult = await user.getIdTokenResult();
        setIsAdmin(!!tokenResult.claims.admin);
      } else {
        setUser(null);
        setIsAdmin(false);
      }
      setLoading(false);
      setAuthReady(true); // Signal that initial auth check is complete
    });

    return () => unsubscribe();
  }, []);

  if (!firebaseConfigured) {
    return <FirebaseNotConfigured />;
  }

  return (
    <AuthContext.Provider value={{ user, loading, authReady, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const AuthLoader = ({ children }: { children?: React.ReactNode }) => {
    return (
        <div className="flex h-screen w-full flex-col items-center justify-center bg-background gap-4">
             <div className="flex items-center gap-2">
                <div className="bg-primary p-3 rounded-xl">
                    <Sparkles className="w-8 h-8 text-primary-foreground animate-pulse" />
                </div>
            </div>
            <p className="text-muted-foreground">Loading Connect Hub...</p>
        </div>
    )
}
