import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '@/hooks/useAuth';
import { RootStackParamList } from '@/routes/types';

type LoginNavProp = StackNavigationProp<RootStackParamList, 'login'>;

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const { login } = useAuth();
  const navigation = useNavigation<LoginNavProp>();

  const handleLogin = async () => {
    try {
      await login(email, senha);
      // redirecionamento feito automaticamente no AppNavigator
    } catch (error: any) {
      Alert.alert('Erro', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Digite seu email"
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Text style={styles.label}>Senha</Text>
      <TextInput
        style={styles.input}
        value={senha}
        onChangeText={setSenha}
        placeholder="Digite sua senha"
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('cadastro')}>
        <Text style={styles.link}>Criar conta</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#fff', justifyContent: 'center' },
  title: { fontSize: 32, fontWeight: 'bold', marginBottom: 24, textAlign: 'center' },
  label: { fontSize: 16, marginBottom: 8 },
  input: { backgroundColor: '#f3f4f6', padding: 12, borderRadius: 8, marginBottom: 16 },
  button: { backgroundColor: '#0f172a', padding: 16, borderRadius: 8, alignItems: 'center', marginBottom: 12 },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  link: { color: '#1d4ed8', textAlign: 'center' },
});
// This code defines a login screen for a React Native application using TypeScript.
// It uses functional components and hooks to manage state and handle user input.
// The screen includes input fields for the user's email and password, and a button to submit the login form.   