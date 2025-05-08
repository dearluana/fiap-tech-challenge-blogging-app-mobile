import { StyleSheet } from 'react-native';
import colors from './theme';

const typography = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  paragraph: {
    fontSize: 14,
    color: colors.text,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.white,
  },
});

export default typography;
