// src/components/Button.tsx
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import theme from '../../styles/theme';

export default function Button({ title, onPress }: { title: string; onPress: () => void }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.borderRadius,
    alignItems: 'center',
  },
  text: {
    color: theme.colors.white,
    fontSize: theme.typography.body.fontSize,
    fontWeight: '600',
  },
});
// src/components/Button.tsx