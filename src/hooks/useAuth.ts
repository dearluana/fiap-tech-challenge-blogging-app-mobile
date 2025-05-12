import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export const useAuth = () => useContext(AuthContext);
// This code defines a custom hook called useAuth that provides access to the authentication context in a React Native application.
// It uses the useContext hook to retrieve the AuthContext, allowing components to easily access authentication-related data and functions such as userToken, loading state, login, and logout.
// This hook simplifies the process of consuming the authentication context, making it easier to manage user authentication throughout the application.
// By using this hook, components can easily access the authentication context without needing to import and use the AuthContext directly.
// This promotes better code organization and reusability, as the useAuth hook can be used in multiple components without duplicating code.
// The useAuth hook is a convenaient way to access the authentication context in a React Native application.
// It simplifies the process of consuming the authentication context, making it easier to manage user authentication throughout the application.  