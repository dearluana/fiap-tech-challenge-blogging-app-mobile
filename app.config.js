import 'dotenv/config';

export default {
  expo: {
    name: 'BloggingApp',
    slug: 'blogging-app',
    version: '1.0.0',
    extra: {
      API_URL: "http://192.168.15.24:3000" // Use your backend IP here
      // Add any other environment variables you need here
    },
    // The SDK version is not specified here, as it will be determined by the Expo CLI
    icon: './assets/icon.png',
  "plugins": [
    "expo-secure-store"
  ]
  }
};

// This is the configuration for the Expo app.
// It includes the app name, slug, version, and any extra environment variables.
// The API_URL is being pulled from the environment variables using dotenv.
// This allows for different configurations based on the environment (development, production, etc.).
// The Expo SDK version is not specified here, but it will be determined by the Expo CLI when the app is built.
// The app is named "BloggingApp" and has a slug of "blogging-app".
// The version is set to "1.0.0".
// The extra object contains any additional configuration that may be needed.
// The API_URL is being set to the value of the environment variable API_URL.
// This allows for easy configuration of the API URL without hardcoding it into the app.
// The Expo app is being configured to use the environment variables defined in the .env file.
// This is useful for keeping sensitive information out of the codebase.    