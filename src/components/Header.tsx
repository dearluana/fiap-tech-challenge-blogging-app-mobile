import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import theme from '@/styles/theme';

interface HeaderProps {
  userName?: string;
  onLogout?: () => void;
}

export default function Header({ userName = 'usuário', onLogout }: HeaderProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>Olá, {userName}!</Text>
      <TouchableOpacity onPress={onLogout} style={styles.logoutButton} activeOpacity={0.7}>
        <Text style={styles.logoutText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.primary,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    color: theme.colors.white,
    fontSize: theme.typography.heading.fontSize,
    fontWeight: theme.typography.heading.fontWeight as any,
  },
  logoutButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: theme.colors.secondary,
    borderRadius: 4,
  },
  logoutText: {
    color: theme.colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
});