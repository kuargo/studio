"use client";

import React, { useState, useEffect } from "react";
import type { User } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { Sparkles } from "lucide-react";
import { AuthContext } from "@/hooks/use-auth";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
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
