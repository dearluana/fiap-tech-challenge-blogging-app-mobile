import { StyleSheet } from 'react-native';
import colors from './theme';

const globalStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 20,
  },
});

export default globalStyle;
