
# Connect Hub 2.0: Data Flow & Architecture

This document outlines the logical flow of data and user interactions throughout the Connect Hub application. It serves as an architectural blueprint to verify that the app's components work together as intended.

---

## 1. Core Concepts

- **Firebase Auth**: The single source of truth for user identity. All user-generated content is linked via `userId`.
- **Firestore**: The primary database for all application data. Collections are designed to be queried efficiently.
- **Client-Side Components**: React components (`.tsx` files) are responsible for rendering the UI, capturing user input, and calling server actions/functions.
- **Server Actions / Genkit Flows**: Functions that live on the server (`'use server';`) and are responsible for all backend logic, including database writes and AI interactions. This keeps sensitive logic off the client.

---

## 2. User Authentication & Profile Flow

This is the foundational flow for the entire application.

```mermaid
graph TD
    A[User visits /login or /signup] --> B{Enters credentials};
    B --> C[Firebase Auth validates/creates user];
    C --> D{Auth State Changes};
    D --> E[/app/(main)/layout.tsx listens];
    E --> F{User Profile Check};
    F -->|No Profile or Terms Not Accepted| G[/legal/accept];
    G --> H[User accepts terms];
    H --> I[updateUserProfile() in Firestore];
    I --> J[/dashboard];
    F -->|Profile & Terms OK| J;

    subgraph "Settings Page"
        K[/settings] --> L[User updates profile info];
        L --> M[updateUserProfile() saves to Firestore];
    end
```

**Explanation:**
1.  A new or returning user authenticates via Firebase Auth.
2.  The main app layout (`/app/(main)/layout.tsx`) acts as a guard. It listens for the authentication state.
3.  Once a user is logged in, it checks their Firestore profile for `termsAccepted`.
4.  If terms are not accepted, the user is redirected to the `/legal/accept` page. Accepting the terms updates their Firestore profile.
5.  Once terms are accepted, the user is allowed to proceed to the `/dashboard` and the rest of the app.
6.  The user can update their profile information on the `/settings` page, which directly modifies their document in the `users` collection in Firestore.

---

## 3. Social Feed & Prayer Wall Flow (Content Creation & Display)

This flow is nearly identical for the Social Feed and Prayer Wall and demonstrates the core content loop.

```mermaid
graph TD
    subgraph "User Action (Client)"
        A[User types post/prayer in Textarea] --> B[Clicks "Post"];
        B --> C{Call Server Action};
    end
    
    subgraph "Backend Logic (Server)"
        C --> D[createSocialPost() / createPrayerRequest()];
        D --> E{Prepare Data Object};
        E --> |{userId, name, avatar, content, timestamp}| F[Add document to 'posts' or 'prayerRequests' collection in Firestore];
    end

    subgraph "Display (Real-time)"
        G[/social-feed or /prayer-wall page] -- Listens to --> H[Firestore Collection];
        H -- New data pushed --> G;
        G --> I[UI updates automatically];
    end

    subgraph "Dashboard Integration"
        J[/dashboard page] -- Fetches latest 2-3 items --> H;
        J --> K[Displays snippets with links];
    end
```

**Explanation:**
1.  **Creation**: A user on the `/social-feed` or `/prayer-wall` page writes content and clicks "Post".
2.  **Server Action**: This triggers a server function (`createSocialPost` or `createPrayerRequest`). This function gathers all necessary data (user ID, name, photo, content, current time) and creates a new document in the corresponding Firestore collection.
3.  **Real-time Display**: The feed/wall components use a real-time Firestore listener (`onSnapshot`). When a new document is added to the collection, Firestore automatically pushes the update to all listening clients.
4.  **UI Update**: The React components receive the new data and automatically re-render to display the new post at the top of the list (ordered by timestamp).
5.  **Dashboard Display**: The `/dashboard` page performs a simple, one-time query to fetch the most recent items from these collections to display as previews, linking back to the full pages.

---

## 4. Faith Reels & Sermon Remix Flow (UGC & Creative Tools)

This flow outlines how user-generated video content would be handled.

```mermaid
graph TD
    subgraph "Creation: Sermon Remix"
        A[/sermon-remix page] --> B{User selects sermon / pastes URL};
        B --> C[Video is loaded into editor];
        C --> D{User trims clip & adds effects};
        D --> E[Clicks "Export & Share"];
    end
    
    subgraph "Creation: Faith Reels Upload"
        F[/faith-reels page] --> G{User clicks '+' icon};
        G --> H[Uploads video from device];
    end

    subgraph "Backend Processing (Future TODO)"
        E --> I{Cloud Function Trigger};
        H --> I;
        I --> J[Process Video: transcode, add watermark];
        J --> K[Save processed video to Firebase Storage];
        K --> L[Create document in 'reels' Firestore collection];
        L --> |{reelId, userId, videoUrl, caption, etc.}| M[Data is ready];
    end

    subgraph "Display"
        N[/faith-reels page] -- Fetches data from --> O['reels' collection];
        O --> N;
        N --> P[Displays reels in vertical, scrollable feed];
    end
    
    subgraph "Dashboard Integration"
        Q[/dashboard page] -- Fetches latest reel --> O;
        Q --> R[Displays a thumbnail linking to Faith Reels page];
    end
```

**Explanation:**
1.  **Two Creation Paths**: A user can either create a new reel by remixing an existing sermon or by uploading a video directly.
2.  **Backend Processing (The "Hard Part")**: Both paths would trigger a **Cloud Function** (a future `TODO`). This backend process is crucial: it would take the raw video, process it into a standard format (e.g., MP4, 9:16 aspect ratio), store it in Firebase Storage, and then create a corresponding document in a `reels` Firestore collection with the URL and metadata.
3.  **Display**: The `/faith-reels` page queries the `reels` collection and displays the videos in the TikTok-style scrolling interface.
4.  **Dashboard Integration**: The dashboard would feature a link or a thumbnail of a recent or popular reel to drive engagement back to the Reels page.

---

This map provides a clear overview of how the app's features are interconnected. We can use this as our guide for future development and to ensure the final product is logical, efficient, and aligns with your vision.
