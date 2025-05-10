// src/context/AuthContext.tsx

import React, { createContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

interface AuthContextType {
  userToken: string | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userToken, setUserToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadToken = async () => {
      try {
        const token = await AsyncStorage.getItem('@blogApp:token');
        if (token) setUserToken(token);
      } catch (error) {
        console.error('Erro ao carregar o token:', error);
      } finally {
        setLoading(false);
      }
    };

    loadToken();
  }, []);

  const login = async (username: string, password: string) => {
    try {
      // SIMULA login e token
      if (username === 'admin' && password === '123') {
        const fakeToken = 'fake-jwt-token';
        await AsyncStorage.setItem('@blogApp:token', fakeToken);
        setUserToken(fakeToken);
      } else {
        throw new Error('Credenciais inválidas');
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      Alert.alert('Erro de login', 'Usuário ou senha inválidos');
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('@blogApp:token');
      setUserToken(null);
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ userToken, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
// export default AuthProvider;
// import { AuthProvider } from './AuthContext';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import LoginScreen from '../screens/LoginScreen';
// import HomeScreen from '../screens/HomeScreen';
//
// const Stack = createStackNavigator();
//
// export default function App() {
//   return (
//     <AuthProvider>
//       <NavigationContainer>
//         <Stack.Navigator initialRouteName="Login">     