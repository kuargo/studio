import { test, expect } from '@playwright/test';
import { createTestUser } from './helpers';

test.describe('Authentication Flow', () => {

  test('should allow a new user to sign up and then log out', async ({ page }) => {
    const newUser = createTestUser();

    // 1. Navigate to the signup page
    await page.goto('/signup');
    await expect(page).toHaveTitle(/Connect Hub/);

    // 2. Fill out the signup form
    await page.getByTestId('email').fill(newUser.email);
    await page.getByTestId('password').fill(newUser.password);
    await page.getByLabel('Confirm Password').fill(newUser.password);
    
    // Check the terms and conditions box
    await page.getByLabel(/I agree to the/).check();
    
    // 3. Submit the form
    await page.getByTestId('signup-button').click();

    // 4. Assert that the user is on the dashboard
    // We wait for the URL to change to /dashboard, which indicates a successful signup and redirect.
    await page.waitForURL('/dashboard');
    await expect(page).toHaveURL('/dashboard');

    // 5. Assert that the user's name is in the user menu, confirming they are logged in
    await page.getByTestId('user-menu').click();
    const userDisplayName = page.getByTestId('user-display-name');
    await expect(userDisplayName).toBeVisible();
    await expect(userDisplayName).toHaveText(newUser.email.split('@')[0]);

    // 6. Log out
    await page.getByTestId('logout-button').click();

    // 7. Assert that the user is redirected to the login page
    await page.waitForURL('/login');
    await expect(page).toHaveURL('/login');
  });

  test('should show an error for an existing email during signup', async ({ page }) => {
    // This is a conceptual test outline. To run this, we would first need
    // to programmatically create a user in the database before the test runs.
    const existingUser = createTestUser();
    
    // Conceptual Step 1: Create the user via an API or Firebase Admin SDK helper
    // await createFirebaseUser(existingUser.email, existingUser.password);

    // Navigate to signup
    await page.goto('/signup');

    // Attempt to sign up with the same email
    await page.getByTestId('email').fill(existingUser.email);
    await page.getByTestId('password').fill('SomeOtherPassword123!');
    await page.getByLabel('Confirm Password').fill('SomeOtherPassword123!');
    await page.getByLabel(/I agree to the/).check();
    await page.getByTestId('signup-button').click();
    
    // Assert that an error message is shown
    const errorMessage = page.getByTestId('error-message');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText('This email address is already in use');
  });


});
