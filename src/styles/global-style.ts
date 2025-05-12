import { StyleSheet } from 'react-native';
import { theme } from './theme';

const globalStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: 20,
  },
});

export default globalStyle;
