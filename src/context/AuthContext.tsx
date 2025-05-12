import React, { createContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

interface AuthContextType {
  userToken: string | null;
  userRole: 'aluno' | 'professor' | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userToken, setUserToken] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<'aluno' | 'professor' | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAuthData = async () => {
      try {
        const token = await AsyncStorage.getItem('@blogApp:token');
        const role = await AsyncStorage.getItem('@blogApp:role');
        if (token && role) {
          setUserToken(token);
          setUserRole(role as 'aluno' | 'professor');
        }
      } catch (error) {
        console.error('Erro ao carregar dados de autenticação:', error);
      } finally {
        setLoading(false);
      }
    };

    loadAuthData();
  }, []);

  const login = async (username: string, password: string) => {
    try {
      let role: 'aluno' | 'professor' | null = null;

      if (username === 'admin' && password === '123') {
        role = 'professor';
      } else if (username === 'aluno' && password === '123') {
        role = 'aluno';
      } else {
        throw new Error('Credenciais inválidas');
      }

      const fakeToken = 'fake-jwt-token';
      await AsyncStorage.setItem('@blogApp:token', fakeToken);
      await AsyncStorage.setItem('@blogApp:role', role);
      setUserToken(fakeToken);
      setUserRole(role);
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      Alert.alert('Erro de login', 'Usuário ou senha inválidos');
    }
  };

  const logout = async () => {
    try {
      console.log('Deslogando...');
      await AsyncStorage.multiRemove(['@blogApp:token', '@blogApp:role']);
      setUserToken(null);
      setUserRole(null);
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ userToken, userRole, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
// This code defines an authentication context for a React Native application using the Context API.
// The AuthContext provides authentication-related data and functions, including userToken, userRole, loading state, login, and logout functions.
// The AuthProvider component manages the authentication state and provides the context to its children.  