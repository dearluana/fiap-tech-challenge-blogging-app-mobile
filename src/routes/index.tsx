// src/routes/index.tsx
import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppRoutes from './AppRoutes';
import AuthRoutes from './AuthRoutes';
import { AuthContext } from '../context/AuthContext';
import { ActivityIndicator, View } from 'react-native';

export default function Routes() {
  const { userToken, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {userToken ? <AppRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  );
}
// // This code sets up the main navigation container for the app, conditionally rendering either the authenticated or unauthenticated routes based on the user's token.