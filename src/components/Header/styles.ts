import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#0f172a',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  brand: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  navLinks: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  navLink: {
    marginLeft: 20,
  },
  navLinkText: {
    fontSize: 16,
    color: '#ffffff',
  },
});

export default styles;
