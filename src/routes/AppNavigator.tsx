import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { useAuth } from '@/hooks/useAuth';
import LoginScreen from '@/screens/login';
import CadastroScreen from '@/screens/register';
import DashboardScreen from '@/screens/dashboard';
import AddPostScreen from '@/screens/create-post';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();
const navigation = useNavigation<NavigationProp<RootStackParamList>>();

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
          </>
        ) : (
          <>
            <Stack.Screen name="dashboard" component={DashboardScreen} />
            <Stack.Screen name="add-post" component={AddPostScreen} />
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