import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { theme } from '../styles/theme';

export default function Loader() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color={theme.colors.primary} />
    </View>
  );
}
// This component is a simple loader that can be used to indicate loading states in the app.
