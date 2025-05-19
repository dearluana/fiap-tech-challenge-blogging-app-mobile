import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import theme from '@/styles/theme';

export default function Footer() {
  const version = Constants.expoConfig?.version || '1.0.0';

  return (
    <View style={styles.container}>
      <Text style={styles.text}>© 2025 FIAP Blog. Todos os direitos reservados.</Text>
      <Text style={styles.version}>Versão {version}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.secondary,
    paddingVertical: theme.spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  text: {
    color: theme.colors.white,
    fontSize: theme.typography.caption.fontSize,
    fontWeight: theme.typography.caption.fontWeight as any,
  },
  version: {
    color: theme.colors.white,
    fontSize: 12,
    marginTop: 4,
  },
});
// Compare this snippet from src/screens/login/LoginScreen.tsx: