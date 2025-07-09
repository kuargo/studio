import { doc, setDoc, serverTimestamp, collection, addDoc, getDoc, updateDoc, runTransaction, arrayUnion, arrayRemove, increment, Timestamp } from "firebase/firestore";
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

// Shape of the Journal Entry data
export type JournalEntryData = {
    userId: string;
    title: string;
    content: string;
    type: string;
    isPublic: boolean;
    tags: string[];
    timestamp: any; // serverTimestamp()
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
        await updateDoc(userRef, data);
    } catch (error) {
        console.error("Error updating user profile:", error);
        throw new Error("Could not update user profile.");
    }
};

/**
 * Creates a new journal entry in Firestore.
 * @param user The authenticated user object.
 * @param entryData The data for the journal entry.
 */
export const createJournalEntry = async (user: User, entryData: Omit<JournalEntryData, 'userId' | 'timestamp'>) => {
    if (!db || !user) {
        throw new Error("User must be logged in to create a journal entry.");
    }
    
    try {
        await addDoc(collection(db, "journalEntries"), {
            ...entryData,
            userId: user.uid,
            timestamp: serverTimestamp(),
        });
    } catch (error) {
        console.error("Error creating journal entry:", error);
        throw new Error("Could not create journal entry.");
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

/**
 * Creates a new post in the Social Feed.
 * @param user The authenticated user object.
 * @param content The text content of the post.
 */
export const createSocialPost = async (user: User, content: string) => {
    if (!db || !user) {
        throw new Error("User must be logged in to create a post.");
    }

    try {
        await addDoc(collection(db, "posts"), {
            userId: user.uid,
            user: {
                name: user.displayName || "Anonymous",
                avatar: user.photoURL || "https://placehold.co/100x100.png",
                aiHint: "person portrait",
            },
            content: content,
            timestamp: serverTimestamp(),
            type: "text", // Defaulting to text posts for now
            likes: 0,
            likedBy: [],
            comments: 0,
        });
    } catch (error) {
        console.error("Error creating social post:", error);
        throw new Error("Could not create post.");
    }
};

/**
 * Toggles a like on a post.
 * Uses a transaction to ensure atomic updates.
 * @param postId The ID of the post to like/unlike.
 * @param userId The ID of the user performing the action.
 */
export const toggleLikePost = async (postId: string, userId: string) => {
    if (!db) throw new Error("Firestore is not initialized.");
    
    const postRef = doc(db, "posts", postId);

    try {
        await runTransaction(db, async (transaction) => {
            const postDoc = await transaction.get(postRef);
            if (!postDoc.exists()) {
                throw "Document does not exist!";
            }

            const postData = postDoc.data();
            const hasLiked = postData.likedBy.includes(userId);

            if (hasLiked) {
                // Unlike the post
                transaction.update(postRef, {
                    likes: increment(-1),
                    likedBy: arrayRemove(userId)
                });
            } else {
                // Like the post
                transaction.update(postRef, {
                    likes: increment(1),
                    likedBy: arrayUnion(userId)
                });
            }
        });
    } catch (e) {
        console.error("Transaction failed: ", e);
        throw new Error("Could not update like status.");
    }
};
