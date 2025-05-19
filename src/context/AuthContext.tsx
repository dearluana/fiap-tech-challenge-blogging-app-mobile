// src/context/AuthContext.tsx

import React, { createContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

interface AuthContextType {
  userToken: string | null;
  userRole: 'aluno' | 'professor' | null;
  username: string | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userToken, setUserToken] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<'aluno' | 'professor' | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAuthData = async () => {
      try {
        const token = await AsyncStorage.getItem('@blogApp:token');
        const role = await AsyncStorage.getItem('@blogApp:role');
        const storedUsername = await AsyncStorage.getItem('@blogApp:username');
        if (token && role && storedUsername) {
          setUserToken(token);
          setUserRole(role as 'aluno' | 'professor');
          setUsername(storedUsername);
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
      await AsyncStorage.setItem('@blogApp:username', username);

      setUserToken(fakeToken);
      setUserRole(role);
      setUsername(username);
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      Alert.alert('Erro de login', 'Usuário ou senha inválidos');
    }
  };

  const logout = async () => {
    try {
      console.log('Deslogando...');
      await AsyncStorage.multiRemove(['@blogApp:token', '@blogApp:role', '@blogApp:username']);
      setUserToken(null);
      setUserRole(null);
      setUsername(null);
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ userToken, userRole, username, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
