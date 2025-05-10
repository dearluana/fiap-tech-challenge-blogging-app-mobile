// App.tsx
import React from 'react';
import { AuthProvider } from './src/context/AuthContext';
import Routes from './src/routes';

export default function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}
// // This code sets up the main application component, wrapping the routes with the AuthProvider to manage authentication state.