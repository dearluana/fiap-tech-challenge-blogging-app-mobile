// src/routes/index.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '@/srcreens/login/LoginScreen';
import CadastroScreen from '@/srcreens/cadastro/CadastroScreen';
import HomeScreen from '@/srcreens/home/HomeScreen';
// ... outras importações ...

const Stack = createNativeStackNavigator();

export default function Routes() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" component={LoginScreen} />
      <Stack.Screen name="cadastro" component={CadastroScreen} />
      <Stack.Screen name="home" component={HomeScreen} />
      {/* ... outras telas ... */}
    </Stack.Navigator>
  );
}
// This code defines the main navigation structure of a React Native application using React Navigation.
// It creates a stack navigator with different screens for login, registration, and home.
// The Stack.Navigator component is used to define the navigation stack, and each Stack.Screen component represents a screen in the stack.
// The screenOptions prop is set to hide the header for all screens, providing a cleaner look.
// The Routes component can be used in the main application file to set up the navigation structure.
// This allows for easy navigation between different screens in the app, such as the login screen, registration screen, and home screen.
// The Stack.Navigator component is used to define the navigation stack, and each Stack.Screen component represents a screen in the stack.
// The screenOptions prop is set to hide the header for all screens, providing a cleaner look.        