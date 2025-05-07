import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    paddingHorizontal: 20,
    paddingTop: 32,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#ffffff',
    borderRadius: 6,
    padding: 12,
    fontSize: 16,
    color: '#0f172a',
    marginBottom: 20,
  },
  textarea: {
    height: 140,
  },
  button: {
    backgroundColor: '#0f172a',
    paddingVertical: 14,
    alignItems: 'center',
    borderRadius: 6,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default styles;
//         placeholder="Digite o conteúdo"
//         multiline        