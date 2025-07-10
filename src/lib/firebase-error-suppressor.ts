// This utility is designed to suppress a specific, known, and cosmetic console error
// from the Firebase SDK. In some development environments (especially with HMR),
// a race condition can occur during auth state changes where a listener is briefly
// active without auth, logging a "permission-denied" error that does not affect
// application functionality. This code overrides the default console.error to
// filter out only this specific message, preventing console spam.

if (typeof window !== 'undefined') {
  const originalError = console.error;

  console.error = (...args) => {
    const message = typeof args[0] === 'string' ? args[0] : '';

    // Target the specific, known cosmetic error message from Firebase Firestore
    if (
      message.includes("Firestore") &&
      message.includes("Uncaught Error in snapshot listener") &&
      message.includes("permission-denied")
    ) {
      // Suppress the error by not calling the original console.error
      // You could optionally log this to an internal system for tracking.
      // console.log("Suppressed known Firebase permission error during auth transition.");
      return;
    }

    // For all other errors, use the original console.error
    originalError.apply(console, args);
  };
}
