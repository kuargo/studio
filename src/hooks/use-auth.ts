"use client";

import { useContext, createContext } from "react";
import type { User } from "firebase/auth";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  isAdmin: boolean;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  isAdmin: false,
});

export const useAuth = () => useContext(AuthContext);
