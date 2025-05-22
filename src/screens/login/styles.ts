import { StyleSheet } from 'react-native';
import theme from '@/styles/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingHorizontal: theme.spacing.lg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 160,
    height: 80,
    marginBottom: theme.spacing.xl,
  },
  title: {
    fontSize: theme.typography.heading.fontSize + 2,
    fontWeight: theme.typography.heading.fontWeight as any,
    color: theme.colors.text,
    marginBottom: theme.spacing.lg,
    textAlign: 'center',
  },
  form: {
    width: '100%',
  },
  label: {
    color: theme.colors.text,
    fontSize: theme.typography.body.fontSize,
    marginBottom: 4,
  },
  input: {
    backgroundColor: theme.colors.accent,
    color: theme.colors.text,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius,
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginBottom: theme.spacing.lg,
  },
  button: {
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius,
    alignItems: 'center',
    marginTop: theme.spacing.md,
  },
  buttonText: {
    color: theme.colors.white,
    fontWeight: 'bold',
    fontSize: theme.typography.subheading.fontSize,
  },
  link: {
    color: theme.colors.primary,
    marginTop: theme.spacing.lg,
    textAlign: 'center',
    textDecorationLine: 'underline',
    fontSize: theme.typography.body.fontSize,
  },
});