import { createContext, useContext } from 'react';

type AuthContextType = {
  token: string | null;
  setToken: (token: string | null) => void;
};

export const AuthContext = createContext<AuthContextType>({
  token: null,
  setToken: () => {},
});

export const useAuth = () => useContext(AuthContext);
export const AuthProvider = AuthContext.Provider;
export const AuthConsumer = AuthContext.Consumer;
// This is a custom hook that provides the authentication context to components that need it.
// It uses the useContext hook to access the AuthContext and return the token and setToken function.
// The AuthProvider and AuthConsumer are also exported for use in other parts of the application.