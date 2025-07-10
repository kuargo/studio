# Future Feature & Enhancement Log

This document tracks major feature requests and enhancements to be implemented after the initial 8-step stabilization process is complete.

## High Priority Enhancements

- **Admin Panel & Functionality:**
  - Build a dedicated, secure admin dashboard.
  - Features: User management (view, disable, make admin), content moderation (review/approve events, posts), view app statistics.

- **Profile Picture Uploads:**
  - Integrate Firebase Storage.
  - Create a secure upload mechanism for user avatars on the Settings page.
  - Implement image resizing/compression for performance.

- **Map-Based Location & Church Finders:**
  - Integrate a mapping service (e.g., Google Maps Places API).
  - Replace text input for "Location" and "Home Church" on the Settings page with an interactive map/autocomplete search.
  - Use this data to power map views on the Events and Volunteering pages.

- **Full End-to-End (E2E) Testing:**
  - Integrate a testing framework like Playwright or Cypress into the CI/CD workflow.
  - Write comprehensive E2E tests for all critical user journeys (authentication, posting, profile updates, etc.).
  - Configure the GitHub Actions workflow to run these tests automatically on every push to the main branches.

## Additional Integrations

- **Expanded Social Logins:**
  - Add support for other authentication providers like TikTok, X (formerly Twitter), etc.
  - Requires configuration in Firebase and updates to the UI.
