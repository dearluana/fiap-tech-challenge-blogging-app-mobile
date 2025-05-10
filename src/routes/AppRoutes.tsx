// src/routes/AppRoutes.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Dashboard from '@/srcreens/dashboard/DashboardScreen'; // ajuste o caminho conforme sua estrutura
import AddPost from '@/srcreens/add-post/AddPostScreen';
// ... outras telas privadas

const Stack = createNativeStackNavigator();

export default function AppRoutes() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name="AddPost" component={AddPost} />
      {/* Adicione outras telas logadas aqui */}
    </Stack.Navigator>
  );
}
// // This code defines a stack navigator for the app's private routes using React Navigation.