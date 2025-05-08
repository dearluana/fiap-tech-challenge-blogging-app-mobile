// app/hooks/useAuth.ts

import { useContext } from 'react';
import { AuthContext } from '@/app/context/AuthContext';

export const useAuth = () => useContext(AuthContext);
//     } catch (error) {
//       console.error('Erro ao buscar usuário:', error);
//     }
//   };
//
//   const login = async (token: string) => {
//     try {
//       await AsyncStorage.setItem('authToken', token);
//       setToken(token);