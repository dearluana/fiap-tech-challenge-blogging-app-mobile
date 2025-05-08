import React, { useState } from 'react';
import { AuthProvider } from './app/hooks/useAuth'; // Importe o AuthProvider
import AppNavigator from './app/navigation/AppNavigator';

export default function App() {
  const [token, setToken] = useState<string | null>(null);

  return (
    <AuthProvider value={{ token, setToken }}> {/* Envolva seu AppNavigator com o AuthProvider */}
      <AppNavigator />
    </AuthProvider>
  );
}