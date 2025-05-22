import 'dotenv/config';

export default {
  expo: {
    name: 'BloggingApp',
    slug: 'blogging-app',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './src/assets/icon.png',
    splash: {
      image: './src/assets/icon.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff'
    },
    assetBundlePatterns: ['**/*'],
    android: {
      package: 'com.fiap.bloggingapp'
    },
    plugins: ['expo-secure-store'],
    extra: {
      API_URL: process.env.EXPO_PUBLIC_API_URL
    }
  }
};
