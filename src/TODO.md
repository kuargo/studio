# Future Feature & Enhancement Log

This document tracks major feature requests and enhancements. We have completed the initial stabilization phase and now have a clear roadmap for future development.

---

### ✅ **Foundation & Pre-Testing Setup (Completed)**

-   **Set Up Firestore Rules**: Deployed robust security rules to protect user data.
-   **Added Test Identifiers**: Implemented `data-testid` attributes on key interactive elements for reliable E2E testing.
-   **Implemented Error Boundary**: Wrapped the main application layout to prevent UI crashes.
-   **Standardized Loading/Success States**: Ensured key forms provide clear feedback to the user.
-   **Created Testing Documentation**: Established `TESTING.md` and test helper utilities.
-   **Set Up Google AI API Key**: Followed instructions in `AI_SETUP.md` to enable AI features.
-   **Set Up Google Maps API Key**: Configured Maps API for location features.

---

## 🚀 **High Priority Enhancements (Next Steps)**

-   **Full End-to-End (E2E) Testing:**
    -   **What:** Write comprehensive tests for all critical user journeys using the Playwright framework and the test helpers we've set up.
    -   **Why:** To ensure long-term stability and catch regressions before they affect users.
    -   **Tests to write:**
        -   User signup and login flows.
        -   Profile update functionality.
        -   Posting to the social feed.
        -   Posting to the prayer wall.

-   **Implement Pagination for Feeds:**
    -   **What:** Implement pagination or infinite scroll for all relevant feeds (Social Feed, Prayer Wall, etc.) as outlined in `DATA_FLOW.md`.
    -   **Why:** To improve initial load time and reduce Firestore query costs.

-   **Security Hardening:**
    -   **What:** Implement the remaining layers of the security model from `DATA_FLOW.md`. This includes adding rate limiting (e.g., with Cloud Functions) and hardening Firestore security rules for all collections.
    -   **Why:** To protect the application and user data from abuse and malicious actors.

## 🏗️ Future Social Ecosystem Features

-   **Full Friends/Following & Groups System:**
    -   **What:** Implement the backend logic and UI for a complete social graph.
    -   **Features:**
        -   Users can follow/unfollow each other.
        -   A dedicated "Following" feed showing content only from followed users.
        -   User profiles show follower/following counts.
        -   Users can create and join public or private "Groups" based on topics or interests.
        -   Groups have their own dedicated feed and member list.
    -   **Considerations:** This is a major feature requiring new Firestore collections (`following`, `groups`, etc.), complex security rules, and significant UI work.

## ✨ Additional Integrations & Enhancements

-   **Admin Panel & Functionality:**
    -   **What:** Build out the admin dashboard with more features.
    -   **Features:** User management (view, disable, make admin), content moderation (review/approve events, posts), view app statistics.

-   **Profile Picture Uploads:**
    -   **What:** Integrate Firebase Storage for user avatar uploads. (Backend is ready, needs frontend implementation).
    -   **Features:** A secure upload mechanism on the Settings page, with image resizing/compression for performance.

-   **Expanded Social Logins:**
    -   **What:** Add support for other authentication providers like TikTok, X (formerly Twitter), etc.
    -   **Why:** To increase user accessibility and sign-up conversion. Requires configuration in Firebase and UI updates.
