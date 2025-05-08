// app/context/AuthContext.tsx

import React, { createContext, useEffect, useState, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type AuthContextType = {
  user: any;
  token: string | null;
  loading: boolean;
  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  loading: true,
  login: async () => {},
  logout: async () => {},
});

type Props = {
  children: ReactNode;
};

export function AuthProvider({ children }: Props) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStoredToken = async () => {
      try {
        const savedToken = await AsyncStorage.getItem('authToken');
        if (savedToken) {
          setToken(savedToken);
          await fetchUser(savedToken);
        }
      } catch (error) {
        console.error('Erro ao carregar token do AsyncStorage:', error);
      } finally {
        setLoading(false);
      }
    };
    loadStoredToken();
  }, []);

  const fetchUser = async (token: string) => {
    try {
      const response = await fetch('https://fiap-tech-challenge-blogging-api.onrender.com/users/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data);
      } else {
        console.warn('Não foi possível obter os dados do usuário');
      }
    } catch (error) {
      console.error('Erro ao buscar dados do usuário:', error);
    }
  };

  const login = async (newToken: string) => {
    try {
      await AsyncStorage.setItem('authToken', newToken);
      setToken(newToken);
      await fetchUser(newToken);
    } catch (error) {
      console.error('Erro ao fazer login:', error);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('authToken');
      setToken(null);
      setUser(null);
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
