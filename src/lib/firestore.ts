
import { doc, setDoc, serverTimestamp, collection, addDoc, getDoc, updateDoc, runTransaction, arrayUnion, arrayRemove, increment, Timestamp, query, where, getCountFromServer, orderBy, limit, startAfter, getDocs, DocumentSnapshot } from "firebase/firestore";
import type { User } from "firebase/auth";
import { db } from "./firebase";

// This is the shape of the user profile data we'll store in Firestore
export type UserProfileData = {
    uid: string;
    email: string | null;
    displayName: string;
    photoURL: string;
    createdAt: any; // serverTimestamp() is of type FieldValue
    updatedAt?: any;
    termsAccepted: boolean;
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

// Shape for Post data, aligning with social-feed-content
export type Post = {
    id: string;
    userId: string;
    content: string;
    user: { name: string; avatar: string; aiHint: string; };
    timestamp: Timestamp;
    likes: number;
    likedBy: string[];
    comments: number;
    type: 'testimony' | 'image' | 'prayer_request' | 'text';
    imageUrl?: string;
    aiHint?: string;
    prayCount?: number;
};

export type PrayerRequest = {
    id: string;
    userId: string;
    name: string;
    avatar: string;
    aiHint: string;
    request: string;
    category: 'Personal' | 'Family' | 'Church' | 'Praise' | 'Answered' | 'Testimony' | 'Verdict';
    timestamp: Timestamp;
    prayCount: number;
    comments: { name: string; text: string; }[];
    type: 'request' | 'testimony' | 'verdict' | 'answered';
};


export const createUserProfile = async (user: User, additionalData: Record<string, any> = {}) => {
  if (!user || !db) return;

  const userRef = doc(db, `users/${user.uid}`);
  
  const docSnap = await getDoc(userRef);

  if (!docSnap.exists()) {
      const userData: Partial<UserProfileData> = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || additionalData.displayName || user.email?.split('@')[0] || "User",
        photoURL: user.photoURL || `https://placehold.co/100x100.png`,
        termsAccepted: additionalData.termsAccepted || false,
        ...additionalData,
      };

      try {
        await setDoc(userRef, {
            ...userData,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
        });
      } catch (error) {
        console.error("Error creating user profile:", error);
        throw new Error("Could not create user profile.");
      }
  }
};

export const getUserProfile = async (uid: string): Promise<Partial<UserProfileData> | null> => {
    if (!db) return null;
    const userRef = doc(db, `users/${uid}`);
    const docSnap = await getDoc(userRef);
    return docSnap.exists() ? docSnap.data() as Partial<UserProfileData> : null;
};

/**
 * Updates a user's profile in Firestore.
 * This function rigorously sanitizes the data to ensure protected fields
 * are not sent, which would violate security rules.
 * @param uid The user's ID.
 * @param data The profile data to update.
 */
export const updateUserProfile = async (uid: string, data: Partial<UserProfileData>) => {
    if (!db || !uid) {
        throw new Error("User not authenticated or Firestore not available.");
    }
    const userRef = doc(db, `users/${uid}`);

    const cleanProfileData: { [key: string]: any } = { ...data };
    
    delete cleanProfileData.uid;
    delete cleanProfileData.createdAt;
    delete cleanProfileData.email;
    // We handle photoURL updates in a separate function to keep logic clean
    if (cleanProfileData.photoURL === undefined) {
        delete cleanProfileData.photoURL;
    }


    cleanProfileData.updatedAt = serverTimestamp();

    try {
        await setDoc(userRef, cleanProfileData, { merge: true });
    } catch (error) {
        console.error("Error updating user profile:", error);
        throw new Error("Could not update user profile.");
    }
};

/**
 * Specifically updates only the photoURL for a user profile.
 * @param uid The user's ID.
 * @param photoURL The new photo URL.
 */
export const updateUserProfilePhoto = async (uid: string, photoURL: string) => {
    if (!db || !uid) {
        throw new Error("User not authenticated or Firestore not available.");
    }
    const userRef = doc(db, `users/${uid}`);
    try {
        await updateDoc(userRef, {
            photoURL: photoURL,
            updatedAt: serverTimestamp(),
        });
    } catch (error) {
        console.error("Error updating user photo:", error);
        throw new Error("Could not update user photo.");
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
    
    const newEntry = {
      title: entryData.title,
      content: entryData.content,
      type: entryData.type,
      isPublic: entryData.isPublic,
      tags: entryData.tags,
      userId: user.uid,
      timestamp: serverTimestamp(),
    };

    try {
        await addDoc(collection(db, "journalEntries"), newEntry);
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
    
    const shardsRef = collection(db, `prayerRequests/${prayerId}/counter_shards`);

    try {
        await addDoc(shardsRef, { _increment: incrementValue });
    } catch (error) {
        console.error("Error updating prayer count:", error);
    }
};

/**
 * Creates a new prayer request in the Prayer Wall.
 * @param user The authenticated user object.
 * @param request The text content of the prayer request.
 */
export const createPrayerRequest = async (user: User, request: string) => {
    if (!db || !user) {
        throw new Error("User must be logged in to create a prayer request.");
    }

    try {
        await addDoc(collection(db, "prayerRequests"), {
            userId: user.uid,
            name: user.displayName || "Anonymous",
            avatar: user.photoURL || "https://placehold.co/100x100.png",
            aiHint: "person portrait",
            request: request,
            timestamp: serverTimestamp(),
            prayCount: 0,
            comments: [],
            type: 'request',
            category: 'Personal' // Default category
        });
    } catch (error) {
        console.error("Error creating prayer request:", error);
        throw new Error("Could not create prayer request.");
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

    let postType: 'testimony' | 'prayer_request' | 'text' = 'text';
    if (/(testimony|grateful|thankful)/i.test(content)) {
        postType = 'testimony';
    } else if (/(pray|prayer|praying)/i.test(content)) {
        postType = 'prayer_request';
    }

    const postData = {
        userId: user.uid,
        user: {
            name: user.displayName || "Anonymous",
            avatar: user.photoURL || "https://placehold.co/100x100.png",
            aiHint: "person portrait",
        },
        content: content,
        timestamp: serverTimestamp(),
        type: postType,
        likes: 0,
        likedBy: [] as string[],
        comments: 0,
        ...(postType === 'prayer_request' && { prayCount: 0 })
    };

    try {
        await addDoc(collection(db, "posts"), postData);
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
            const likedBy = postData.likedBy || [];
            const hasLiked = likedBy.includes(userId);

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

/**
 * Fetches aggregate stats for a given user.
 * @param uid The user's ID.
 * @returns An object with counts for journalEntries, prayerRequests, and posts.
 */
export const getUserStats = async (uid: string) => {
    if (!db || !uid) {
        throw new Error("User not authenticated or Firestore not available.");
    }

    const journalQuery = query(collection(db, "journalEntries"), where("userId", "==", uid));
    const prayerQuery = query(collection(db, "prayerRequests"), where("userId", "==", uid));
    const postQuery = query(collection(db, "posts"), where("userId", "==", uid));

    try {
        const [journalSnapshot, prayerSnapshot, postSnapshot] = await Promise.all([
            getCountFromServer(journalQuery),
            getCountFromServer(prayerQuery),
            getCountFromServer(postQuery)
        ]);

        return {
            journalEntries: journalSnapshot.data().count,
            prayerRequests: prayerSnapshot.data().count,
            posts: postSnapshot.data().count,
        };
    } catch (error) {
        console.error("Error getting user stats:", error);
        // In case of error (e.g., missing index), return zeroed stats
        return {
            journalEntries: 0,
            prayerRequests: 0,
            posts: 0,
        };
    }
};

/**
 * Fetches social feed posts with pagination.
 * @param postsLimit The number of posts to fetch per page.
 * @param lastVisible The last visible document snapshot from the previous fetch, or null for the first page.
 * @returns An object containing the posts and the last visible document snapshot.
 */
export const getSocialFeedPosts = async (postsLimit: number, lastVisible: DocumentSnapshot | null) => {
    if (!db) {
        throw new Error("Firestore not initialized.");
    }

    let q;
    const postsCollection = collection(db, "posts");

    if (lastVisible) {
        q = query(postsCollection, orderBy("timestamp", "desc"), startAfter(lastVisible), limit(postsLimit));
    } else {
        q = query(postsCollection, orderBy("timestamp", "desc"), limit(postsLimit));
    }

    const documentSnapshots = await getDocs(q);
    
    const posts = documentSnapshots.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    } as Post));
    
    const newLastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];

    return { posts, lastVisible: newLastVisible };
};


/**
 * Fetches prayer requests with pagination.
 * @param reqsLimit The number of requests to fetch per page.
 * @param lastVisible The last visible document snapshot from the previous fetch, or null for the first page.
 * @returns An object containing the prayer requests and the last visible document snapshot.
 */
export const getPrayerRequests = async (reqsLimit: number, lastVisible: DocumentSnapshot | null, typeFilter?: PrayerRequest['type']) => {
    if (!db) {
        throw new Error("Firestore not initialized.");
    }

    const reqsCollection = collection(db, "prayerRequests");
    let q;

    const constraints = [orderBy("timestamp", "desc"), limit(reqsLimit)];
    if (typeFilter) {
        constraints.unshift(where("type", "==", typeFilter));
    }
     if (lastVisible) {
        constraints.push(startAfter(lastVisible));
    }

    q = query(reqsCollection, ...constraints);
    
    const documentSnapshots = await getDocs(q);
    
    const requests = documentSnapshots.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    } as PrayerRequest));
    
    const newLastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];

    return { requests, lastVisible: newLastVisible };
};
