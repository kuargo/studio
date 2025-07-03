// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp, FirebaseOptions } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// =================================================================
// IMPORTANT: FIREBASE CONFIGURATION
// =================================================================
// The following configuration requires you to set up environment variables.
//
// 1. Create a Firebase project in the Firebase Console (https://console.firebase.google.com/).
// 2. Add a "Web" app to your project to get your configuration credentials.
// 3. Create a file named `.env.local` in the root of your project directory.
// 4. Copy the variables from `.env.example` into `.env.local`.
// 5. Replace the placeholder values in `.env.local` with your actual Firebase credentials.
//
// The app will not run correctly until these steps are completed.
// =================================================================

// Your web app's Firebase configuration
const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// This function checks for missing Firebase environment variables
// and provides a more detailed error message.
function checkFirebaseConfig(config: FirebaseOptions) {
    const keyToEnvMap: { [key in keyof Required<FirebaseOptions>]: string } = {
        apiKey: "NEXT_PUBLIC_FIREBASE_API_KEY",
        authDomain: "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN",
        projectId: "NEXT_PUBLIC_FIREBASE_PROJECT_ID",
        storageBucket: "NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET",
        messagingSenderId: "NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID",
        appId: "NEXT_PUBLIC_FIREBASE_APP_ID",
        measurementId: "NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID",
    };

    const requiredKeys: (keyof FirebaseOptions)[] = ['apiKey', 'authDomain', 'projectId'];
    const missingKeys: string[] = [];

    requiredKeys.forEach(key => {
        if (!config[key]) {
             const envVar = keyToEnvMap[key as keyof typeof keyToEnvMap]
             if (envVar) missingKeys.push(envVar);
        }
    });

    if (missingKeys.length > 0) {
        throw new Error(
            `Firebase configuration is incomplete. Please create a .env.local file and add the following missing variables: ${missingKeys.join(', ')}. Refer to .env.example for a template.`
        );
    }
}

// This check provides a clear error message if the Firebase API key is missing.
checkFirebaseConfig(firebaseConfig);


// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
