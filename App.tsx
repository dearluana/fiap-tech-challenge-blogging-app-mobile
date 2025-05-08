import React, { useState } from 'react';
import { AuthContext } from '@/hooks/useAuth';
import AppNavigator from './app/navigation/AppNavigator';

export default function App() {
  const [token, setToken] = useState<string | null>(null);

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      <AppNavigator />
    </AuthContext.Provider>
  );
}