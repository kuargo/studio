import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import type { User } from "firebase/auth";
import { db } from "./firebase";

export const createUserProfile = async (user: User, additionalData: Record<string, any> = {}) => {
  if (!user || !db) return;

  const userRef = doc(db, `users/${user.uid}`);
  
  const userData = {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName || additionalData.displayName || user.email?.split('@')[0],
    photoURL: user.photoURL || `https://placehold.co/100x100.png`,
    createdAt: serverTimestamp(),
    ...additionalData,
  };

  try {
    await setDoc(userRef, userData, { merge: true });
  } catch (error) {
    console.error("Error creating user profile:", error);
    // Optionally, re-throw the error or handle it as needed
    throw new Error("Could not create user profile.");
  }
};
