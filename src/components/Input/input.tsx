// src/components/Input.tsx
import React from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import theme from '../../styles/theme';

export default function Input({ label, ...rest }: any) {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput style={styles.input} placeholderTextColor={theme.colors.gray} {...rest} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.md,
  },
  label: {
    marginBottom: 4,
    color: theme.colors.text,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.white,
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius,
    color: theme.colors.text,
  },
});
// src/components/Input.tsx