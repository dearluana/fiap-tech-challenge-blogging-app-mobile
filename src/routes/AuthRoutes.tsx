// src/routes/AuthRoutes.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '@/srcreens/login/LoginScreen';
import Cadastro from '@/srcreens/cadastro/CadastroScreen';

const Stack = createNativeStackNavigator();

export default function AuthRoutes() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Cadastro" component={Cadastro} />
    </Stack.Navigator>
  );
}
// // src/routes/AuthRoutes.tsx