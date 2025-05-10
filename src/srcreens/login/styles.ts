import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f8fafc',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    width: 160,
    height: 160,
    marginBottom: 20,
  },
  formContainer: {
    width: '100%',
    backgroundColor: '#ffffff',
    padding: 24,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 16,
    textAlign: 'center',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 4,
  },
  input: {
    backgroundColor: '#f1f5f9',
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 14,
    fontSize: 16,
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#0f172a',
    paddingVertical: 14,
    borderRadius: 6,
    marginTop: 8,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  primaryLink: {
    color: '#3b82f6',
    fontSize: 14,
    marginTop: 10,
    textDecorationLine: 'underline',
  },
  errorText: {
    color: '#ef4444',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 20,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  secondaryButton: {
    backgroundColor: '#3b82f6',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 6,
    width: '100%',
  },
    secondaryLink: {
      color: '#007BFF',
      fontSize: 14,
      marginTop: 10,
      textDecorationLine: 'underline',
    },
}); 

export default styles;
// This file contains the styles for the login screen of a React Native application.
// It uses StyleSheet from 'react-native' to create a consistent and reusable set of styles.
// The styles include properties for the container, logo, form, title, labels, inputs, buttons, and button text.
// The styles are designed to create a clean and modern look, with a focus on usability and accessibility.
// The container has a light background color and centers its content.
// The logo is sized appropriately and has a margin for spacing.
// The form container has a white background, padding, rounded corners, and shadow effects for depth.
// The title is styled with a larger font size and bold weight for emphasis.    