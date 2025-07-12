# Application Testing Guide

This document outlines the testing strategy, setup, and conventions for the Connect Hub application. Following these guidelines is crucial for maintaining a stable and reliable codebase.

---

## 1. Testing Philosophy

We employ a multi-layered testing strategy to ensure quality:

-   **Static Analysis (Linting & Type-Checking)**: The first line of defense. Catches syntax errors, enforces code style, and ensures type safety. Runs automatically on every commit in our CI pipeline.
-   **End-to-End (E2E) Tests**: Simulates real user journeys from start to finish. These are the most critical tests for ensuring features work as expected. They run on every Pull Request against the `main` and `develop` branches.
-   **Unit & Integration Tests (Future)**: Will be added to test individual components and services in isolation.

## 2. Environment Setup for E2E Testing

To prevent tests from interfering with production or development data, a separate test environment is **required**.

### Step 1: Create a Test Firebase Project

It is highly recommended to create a second, separate Firebase project dedicated solely to testing. This project should have the same services enabled (Auth, Firestore, Storage) as the production project.

### Step 2: Create `.env.test`

Create a file named `.env.test` in the root of the project. This file will hold the environment variables for the Playwright test environment. **This file should not be committed to version control.**

Copy the following structure into your `.env.test` file and populate it with credentials from your **test** Firebase project.

```bash
# .env.test

# Firebase credentials for the dedicated TEST project
NEXT_PUBLIC_FIREBASE_API_KEY=test_api_key_from_firebase
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=test-project-id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=test-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=test-project-id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=test_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=test_app_id

# Playwright configuration
PLAYWRIGHT_TEST_BASE_URL=http://localhost:9002

# Node environment
NODE_ENV=test
```

### Step 3: Firebase Emulators (Optional but Recommended)

For even faster and more isolated local testing, you can use the [Firebase Emulator Suite](https://firebase.google.com/docs/emulator-suite). This allows you to run a local version of Firebase services on your machine, eliminating the need for a separate cloud project for local test runs.

## 3. Writing Tests

All E2E tests are located in the `tests/e2e` directory. When writing tests, please adhere to the following:

-   **Use `data-testid` attributes**: Always use `data-testid` to select elements. This makes tests resilient to changes in styling or component structure.
-   **Isolate Tests**: Each test file should be independent and not rely on the state from another test file.
-   **Clean Up Data**: When possible, write helper functions to clean up any data created during a test run (e.g., delete test users).

## 4. Running Tests

To run the E2E tests locally, use the following command:

```bash
npx playwright test
```

Playwright will automatically use the `.env.test` configuration if it exists.
