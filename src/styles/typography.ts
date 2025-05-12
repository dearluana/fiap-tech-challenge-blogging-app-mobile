import { StyleSheet } from 'react-native';
import { theme } from './theme';

const typography = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: theme.colors.textPrimary,
  },
  subtitle: {
    fontSize: 16,
    color: theme.colors.textSecondary,
  },
  paragraph: {
    fontSize: 14,
    color: theme.colors.textPrimary,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.white,
  },
});

export default typography;
//   marginBottom: 8,
//   fontSize: 16,
//   fontWeight: 'bold',
//   color: '#111827',
//   },
//   empty: {
  //   textAlign: 'center',
//   marginTop: 50,
//   color: '#94a3b8',
//   },
//   },   