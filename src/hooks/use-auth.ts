
"use client";

import { useContext, createContext } from "react";
import type { User } from "firebase/auth";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  authReady: boolean; // Add this flag
  isAdmin: boolean;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  authReady: false,
  isAdmin: false,
});

export const useAuth = () => useContext(AuthContext);
