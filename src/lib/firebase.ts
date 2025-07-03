// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp, FirebaseOptions } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";

// =================================================================
//
//          PLEASE READ: FIREBASE SETUP REQUIRED
//
// =================================================================
//
// This app requires a connection to a Firebase project to run.
//
// === Instructions ===
// 1. Create a Firebase project at https://console.firebase.google.com/
// 2. Add a "Web" application to your project.
// 3. Create a file named `.env.local` in the root of this project.
// 4. Copy the contents of `.env.example` into `.env.local`.
// 5. Paste your project's `firebaseConfig` values into `.env.local`.
//
// =================================================================

let app;
let auth: Auth | null = null;
let firebaseConfigured = false;

const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Check if all essential Firebase config keys are provided
if (
  firebaseConfig.apiKey &&
  firebaseConfig.authDomain &&
  firebaseConfig.projectId
) {
  try {
    app = getApps().length ? getApp() : initializeApp(firebaseConfig);
    auth = getAuth(app);
    firebaseConfigured = true;
  } catch (error) {
    console.error("Firebase initialization failed. Check your .env.local credentials.", error);
  }
}

export { app, auth, firebaseConfigured };
