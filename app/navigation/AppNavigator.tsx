import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '@/app/login/LoginScreen';
import CadastroScreen from '@/app/cadastro/CadastroScreen';
import HomeScreen from '@/app/home/HomeScreen';
import DashboardScreen from '@/app/dashboard/DashboardScreen';
import AddPostScreen from '@/app/add-post/AddPostScreen';
import PostDetailsScreen from '@/app/post-details/PostDetailsScreen';
import EditPostScreen from '@/app/edit-post/EditPostScreen';

import { useAuth } from '@/hooks/useAuth';
import { ActivityIndicator, View } from 'react-native';

export type RootStackParamList = {
  login: undefined;
  cadastro: undefined;
  home: undefined;
  dashboard: undefined;
  'add-post': undefined;
  'post-details': { id: string };
  'edit-post': { id: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  const { token, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0f172a" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!token ? (
          <>
            <Stack.Screen name="home" component={HomeScreen} />
            <Stack.Screen name="login" component={LoginScreen} />
            <Stack.Screen name="cadastro" component={CadastroScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="dashboard" component={DashboardScreen} />
            <Stack.Screen name="add-post" component={AddPostScreen} />
            <Stack.Screen name="post-details" component={PostDetailsScreen} />
            <Stack.Screen name="edit-post" component={EditPostScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
//     try {    