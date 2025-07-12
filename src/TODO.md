
# Future Feature & Enhancement Log

This document tracks major feature requests and enhancements to be implemented after the initial stabilization process is complete.

## High Priority / Blocking Tasks

- **Create Firestore Indexes:**
  - **What:** Create two single-field indexes in the Firebase Console.
    - 1. **Collection:** `posts`, **Field:** `timestamp`, **Order:** Descending
    - 2. **Collection:** `prayerRequests`, **Field:** `timestamp`, **Order:** Descending
  - **Why:** This is a **critical backend task** required to fix data loading errors on the Social Feed and Prayer Wall. The app will not function correctly without these.

- **Set Up Google AI API Key:**
  - **What:** Follow the instructions in `AI_SETUP.md` to generate a free API key and add it to your `.env.local` file.
  - **Why:** This is required to enable all AI-powered features, such as the Journal Assistant, Prayer Assistant, and Bible Chat AI.

- **Set Up Google Maps API Key:**
  - **What:** Create a Google Cloud project, enable the "Maps JavaScript API" and "Places API", and get an API key. Add it to `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` in your `.env.local` file.
  - **Why:** Required for the location search/autocomplete and for displaying maps on the Events and Volunteering pages.

## High Priority Enhancements

- **Implement Data Flow Map:**
  - **What:** I will provide a detailed, text-based flow diagram explaining how content like posts, prayers, and reels moves through the app from creation to display.
  - **Why:** To serve as an architectural blueprint, ensuring the app behaves exactly as we envision it. We will use it to verify all data pathways are logical and correct.

- **Full End-to-End (E2E) Testing:**
  - **What:** Set up the Playwright testing framework and write comprehensive tests for all critical user journeys (authentication, posting, profile updates, etc.).
  - **Why:** To ensure long-term stability and catch regressions before they affect users.

- **Implement Pagination for Feeds:**
  - **What:** As outlined in `DATA_FLOW.md`, implement pagination or infinite scroll for the Social Feed and Prayer Wall.
  - **Why:** To improve initial load time and reduce Firestore query costs.

- **Security Hardening:**
  - **What:** Implement the layered security model outlined in `DATA_FLOW.md`. This includes adding rate limiting and more robust server-side validation.
  - **Why:** To protect the application and user data from abuse and malicious actors.

## Future Social Ecosystem Features

- **Full Friends/Following & Groups System:**
  - **What:** Implement the backend logic and UI for a complete social graph.
  - **Features:**
    - Users can follow/unfollow each other.
    - A dedicated "Following" feed showing content only from followed users.
    - User profiles show follower/following counts.
    - Users can create and join public or private "Groups" based on topics or interests.
    - Groups have their own dedicated feed and member list.
  - **Considerations:** This is a major feature requiring new Firestore collections (`following`, `groups`, etc.), complex security rules, and significant UI work.

## Additional Integrations & Enhancements

- **Admin Panel & Functionality:**
  - **What:** Build a dedicated, secure admin dashboard.
  - **Features:** User management (view, disable, make admin), content moderation (review/approve events, posts), view app statistics.

- **Profile Picture Uploads:**
  - **What:** Integrate Firebase Storage for user avatar uploads.
  - **Features:** A secure upload mechanism on the Settings page, with image resizing/compression for performance.

- **Map-Based Location & Church Finders:**
  - **What:** Integrate a mapping service (e.g., Google Maps Places API).
  - **Features:** Replace text inputs for "Location" and "Home Church" with an interactive map/autocomplete search. Use this data to power map views on the Events and Volunteering pages.

- **Expanded Social Logins:**
  - **What:** Add support for other authentication providers like TikTok, X (formerly Twitter), etc.
  - **Why:** To increase user accessibility and sign-up conversion. Requires configuration in Firebase and UI updates.
