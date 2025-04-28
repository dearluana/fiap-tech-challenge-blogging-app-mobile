import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from '../contexts/AuthContext';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import PostScreen from '../screens/PostScreen'; 
import CreatePostScreen from '../screens/CreatePostScreen'; 

const Stack = createStackNavigator();

export default function AppNavigator() {
  const { user } = useAuth();

  return (
    <Stack.Navigator>
      {!user ? (
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
      ) : (
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Posts' }}
        />
      )}
  <>
  <Stack.Screen
    name="Home"
    component={HomeScreen}
    options={{ title: 'Posts' }}
  />
  <Stack.Screen
    name="Post"
    component={PostScreen}
    options={{ title: 'Detalhes do Post' }}
  />
  <Stack.Screen
    name="CreatePost"
    component={CreatePostScreen}
    options={{ title: 'Criar Post' }}
  />
</>
</Stack.Navigator>
);
}
