import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import theme from '@/styles/theme';

interface HeaderProps {
  title?: string;
}

export default function Header({ title }: HeaderProps) {
  return (
    <View style={styles.container}>
      {title && <Text style={styles.title}>{title}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.primary,
  },
  title: {
    color: theme.colors.white,
    fontSize: theme.typography.heading.fontSize,
    fontWeight: theme.typography.heading.fontWeight as any,
  },
});
// Compare this snippet from src/screens/login/LoginScreen.tsx: