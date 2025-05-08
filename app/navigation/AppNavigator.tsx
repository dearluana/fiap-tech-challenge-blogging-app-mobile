import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '@/app/login/LoginScreen';
import DashboardScreen from '@/app/dashboard/DashboardScreen';
import AddPostScreen from '@/app/add-post/AddPostScreen';
import PostDetailsScreen from '@/app/post-details/PostDetailsScreen';
import EditPostScreen from '@/app/edit-post/EditPostScreen';
import CadastroScreen from 'app/cadastro/CadastroScreen';
import HomeScreen from 'app/home/HomeScreen';
import { useAuth } from '@/hooks/useAuth';

export type RootStackParamList = {
  login: undefined;
  dashboard: undefined;
  'add-post': undefined;
  'post-details': { id: string };
  'edit-post': { id: string };
  cadastro: undefined;
  home: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  const { token } = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName={token ? 'dashboard' : 'login'}
      >
        {!token ? (
          <Stack.Screen name="login" component={LoginScreen} />
        ) : (
          <>
            <Stack.Screen name="dashboard" component={DashboardScreen} />
            <Stack.Screen name="add-post" component={AddPostScreen} />
            <Stack.Screen
              name="post-details"
              component={PostDetailsScreen}
            />
            <Stack.Screen
              name="edit-post"
              component={EditPostScreen}
            />
            <Stack.Screen name="cadastro" component={CadastroScreen} />
            <Stack.Screen name="home" component={HomeScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
