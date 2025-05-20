import React, { createContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import api from 'api/api';
import { Person } from '@/types/person';
import jwt_decode from 'jwt-decode';

interface AuthContextType {
  userToken: string | null;
  userRole: 'aluno' | 'professor' | null;
  username: string | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

interface DecodedToken {
  sub: number;
  exp: number;
  iat: number;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userToken, setUserToken] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<'aluno' | 'professor' | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  interface AuthResponse {
    access_token: string;
  }


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
      const response = await api.post<AuthResponse>('/auth', { username, password });
      const { access_token } = response.data;

      await AsyncStorage.setItem('@blogApp:token', access_token);
      console.log(access_token)

      const decodedToken = jwt_decode<DecodedToken>(access_token);
      const userId = decodedToken.sub;


      const userResponse = await api.get<Person>(`/person/${userId}`, {
        headers: { Authorization: `Bearer ${access_token}` },
      });

      const { name, surname, email, professor } = userResponse.data;

      await AsyncStorage.setItem(
        '@blogApp:userData',
        JSON.stringify({ name, surname, email, professor, id: userId })
      );

      const role = professor ? 'professor' : 'aluno';

      setUserToken(access_token);
      setUserRole(role);

      await AsyncStorage.setItem('@blogApp:role', role);
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
