import { doc, setDoc, serverTimestamp, collection, addDoc, getDoc, updateDoc } from "firebase/firestore";
import type { User } from "firebase/auth";
import { db } from "./firebase";

// This is the shape of the user profile data we'll store in Firestore
type UserProfileData = {
    uid: string;
    email: string | null;
    displayName: string;
    photoURL: string;
    createdAt: any; // serverTimestamp() is of type FieldValue
    birthday?: string;
    location?: string;
    church?: string;
    quote?: string;
    favoriteScripture?: string;
};

export const createUserProfile = async (user: User, additionalData: Record<string, any> = {}) => {
  if (!user || !db) return;

  const userRef = doc(db, `users/${user.uid}`);
  
  // Check if the document already exists to avoid overwriting it on every login
  const docSnap = await getDoc(userRef);

  if (!docSnap.exists()) {
      const userData: UserProfileData = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || additionalData.displayName || user.email?.split('@')[0] || "User",
        photoURL: user.photoURL || `https://placehold.co/100x100.png`,
        createdAt: serverTimestamp(),
        birthday: "",
        location: "",
        church: "",
        quote: "",
        favoriteScripture: "",
        ...additionalData,
      };

      try {
        await setDoc(userRef, userData);
      } catch (error) {
        console.error("Error creating user profile:", error);
        throw new Error("Could not create user profile.");
      }
  }
};

export const getUserProfile = async (uid: string) => {
    if (!db) return null;
    const userRef = doc(db, `users/${uid}`);
    const docSnap = await getDoc(userRef);
    return docSnap.exists() ? docSnap.data() : null;
};

export const updateUserProfile = async (uid: string, data: Partial<UserProfileData>) => {
    if (!db) return;
    const userRef = doc(db, `users/${uid}`);
    try {
        await updateDoc(userRef, {
          ...data,
          // We don't want to overwrite the creation timestamp
          createdAt: data.createdAt || serverTimestamp() 
        });
    } catch (error) {
        console.error("Error updating user profile:", error);
        throw new Error("Could not update user profile.");
    }
};


/**
 * Triggers the "Distributed Counter" extension to increment/decrement a prayer count.
 * Assumes the extension is configured to watch the "prayerRequests/{prayerId}/counter_shards" collection.
 * The extension then updates a `prayCount` field on the parent `prayerRequests/{prayerId}` document.
 * @param prayerId The ID of the prayer request document.
 * @param incrementValue Either 1 to increment or -1 to decrement.
 */
export const updatePrayerCount = async (prayerId: string, incrementValue: 1 | -1) => {
    if (!db) {
        console.error("Firestore is not initialized.");
        return;
    }
    
    // The "Distributed Counter" extension works by creating documents in a subcollection.
    // The subcollection name is defined when you install the extension. The default is `{collection}_shards`.
    const shardsRef = collection(db, `prayerRequests/${prayerId}/counter_shards`);

    try {
        // The extension is configured to look for a specific field to know how much to increment by.
        // We'll assume it's configured to use a field named `_increment`.
        await addDoc(shardsRef, { _increment: incrementValue });
    } catch (error) {
        console.error("Error updating prayer count:", error);
    }
};
