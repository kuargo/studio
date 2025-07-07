import { doc, setDoc, serverTimestamp, collection, addDoc } from "firebase/firestore";
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

/**
 * Triggers the "Distributed Counter" extension to increment/decrement a prayer count.
 * Assumes the extension is configured to watch the "prayerRequests/{prayerId}/counter_shards" collection.
 * @param prayerId The ID of the prayer request document.
 * @param incrementValue Either 1 to increment or -1 to decrement.
 */
export const updatePrayerCount = async (prayerId: string, incrementValue: 1 | -1) => {
    if (!db) {
        console.error("Firestore is not initialized.");
        return;
    }
    
    // The "Distributed Counter" extension works by creating documents in a subcollection.
    // The subcollection name is defined when you install the extension. We'll assume 'counter_shards'.
    const shardsRef = collection(db, `prayerRequests/${prayerId}/counter_shards`);

    try {
        // The extension is configured to look for a specific field to know how much to increment by.
        // We'll assume it's configured to use a field named `_increment`.
        await addDoc(shardsRef, { _increment: incrementValue });
    } catch (error) {
        console.error("Error updating prayer count:", error);
    }
};
