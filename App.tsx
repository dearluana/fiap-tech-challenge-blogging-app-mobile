import React from 'react';
import { AuthProvider } from './src/context/AuthContext';
import AppNavigator from './src/routes/AppNavigator';

export default function App() {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}
// App.tsx