import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { useAuth } from '@/hooks/useAuth';

import LoginScreen from '@/srcreens/login/LoginScreen';
import CadastroScreen from '@/srcreens/cadastro/CadastroScreen';
import HomeScreen from '@/srcreens/home/HomeScreen';
import DashboardScreen from '@/srcreens/dashboard/DashboardScreen';
import AddPostScreen from '@/srcreens/add-post/AddPostScreen';
import PostDetailsScreen from '@/srcreens/post-details/PostDetailsScreen';
import EditPostScreen from '@/srcreens/edit-post/EditPostScreen';
import { RootStackParamList } from '@/routes/types';


// Removed local declaration of RootStackParamList as it is already imported

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  const { userToken, loading } = useAuth();

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
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="login" component={LoginScreen} />
            <Stack.Screen name="cadastro" component={CadastroScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Dashboard" component={DashboardScreen} />
            <Stack.Screen name="AddPost" component={AddPostScreen} />
            <Stack.Screen name="PostDetails" component={PostDetailsScreen} />
            <Stack.Screen name="EditPost" component={EditPostScreen} />
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
