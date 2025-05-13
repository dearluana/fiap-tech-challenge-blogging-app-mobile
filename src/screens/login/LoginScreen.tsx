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
import theme from '@/styles/theme';

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
        placeholderTextColor={theme.colors.gray}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Text style={styles.label}>Senha</Text>
      <TextInput
        style={styles.input}
        value={senha}
        onChangeText={setSenha}
        placeholder="Digite sua senha"
        placeholderTextColor={theme.colors.gray}
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
  container: {
    flex: 1,
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.background,
    justifyContent: 'center',
  },
  title: {
    fontSize: theme.typography.heading.fontSize,
    fontWeight: theme.typography.heading.fontWeight as any,
    color: theme.colors.text,
    marginBottom: theme.spacing.xl,
    textAlign: 'center',
  },
  label: {
    fontSize: theme.typography.body.fontSize,
    color: theme.colors.text,
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    backgroundColor: theme.colors.white,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius,
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginBottom: theme.spacing.lg,
    color: theme.colors.text,
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius,
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  buttonText: {
    color: theme.colors.white,
    fontWeight: 'bold',
    fontSize: theme.typography.body.fontSize,
  },
  link: {
    color: theme.colors.primary,
    textAlign: 'center',
    fontWeight: '500',
  },
});
// src/screens/login/LoginScreen.tsx