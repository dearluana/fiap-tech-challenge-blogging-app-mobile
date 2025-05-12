import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ActivityIndicator, View, StyleSheet } from 'react-native';

import { useAuth } from '@/hooks/useAuth';

import LoginScreen from '@/screens/login/LoginScreen';
import CadastroScreen from '@/screens/cadastro/CadastroScreen';
import DashboardScreen from '@/screens/dashboard/DashboardScreen';
import AddPostScreen from '@/screens/add-post/AddPostScreen';
import PostDetailsScreen from '@/screens/post-details/PostDetailsScreen';
import EditPostScreen from '@/screens/edit-post/EditPostScreen';
import ViewPostsScreen from '@/screens/view-posts/ViewPostsScreen';

import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  const { userToken, userRole, loading } = useAuth();

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0f172a" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!userToken ? (
          <>
            <Stack.Screen name="login" component={LoginScreen} />
            <Stack.Screen name="cadastro" component={CadastroScreen} />
            <Stack.Screen name="view-posts" component={ViewPostsScreen} />
          </>
        ) : userRole === 'professor' ? (
          <>
            <Stack.Screen name="dashboard" component={DashboardScreen} />
            <Stack.Screen name="add-post" component={AddPostScreen} />
            <Stack.Screen name="post-details" component={PostDetailsScreen} />
            <Stack.Screen name="edit-post" component={EditPostScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="view-posts" component={ViewPostsScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AppNavigator;
// src/routes/AppNavigator.tsx
// Compare this snippet from src/screens/login/LoginScreen.tsx:
// import React, { useState } from 'react';
// import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { StackNavigationProp } from '@react-navigation/stack';
// import { RootStackParamList } from '@/routes/types';
// import { useAuth } from '@/hooks/useAuth';
//
// type LoginScreenProp = StackNavigationProp<RootStackParamList, 'login'>;
//
// export default function LoginScreen() {
//   const navigation = useNavigation<LoginScreenProp>();
//   const { login } = useAuth();
//
//   const [email, setEmail] = useState('');