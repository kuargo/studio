# How to Enable AI Features in Your App

The AI-powered features in this application (Journal Assistant, Prayer Assistant, Bible Chat AI) require a Google AI API key to function. This key is free for development and low-volume use.

Follow these simple steps to get your key and enable these features.

## Step 1: Get Your API Key

1.  Go to the Google AI Studio website: **[https://makersuite.google.com/app/apikey](https://makersuite.google.com/app/apikey)**
2.  Sign in with your Google account if you are not already logged in.
3.  Click the "**Create API key in new project**" button.
4.  A new API key will be generated for you. Click the copy icon next to the key to copy it to your clipboard.



## Step 2: Add the Key to Your Project

1.  In the root directory of this project, find the file named `.env.local`. If it doesn't exist, create it by copying `.env.example`.
2.  Open `.env.local`.
3.  Find the line that says `GOOGLE_AI_API_KEY=`.
4.  Paste your copied API key directly after the equals sign. It should look like this:

    ```
    GOOGLE_AI_API_KEY="your-super-long-api-key-here"
    ```

5.  Save the `.env.local` file.

## Step 3: Restart the App

The application should automatically detect the change and restart. If it doesn't, you can manually stop and start the development server.

Once the app restarts, the AI features will be fully enabled! You will see the AI Assistant buttons become active on the Journal, Prayer Wall, and Bible pages.
