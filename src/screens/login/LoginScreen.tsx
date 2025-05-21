import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '@/hooks/useAuth';
import { RootStackParamList } from '@/routes/types';
import theme from '@/styles/theme';

type LoginNavProp = StackNavigationProp<RootStackParamList, 'login'>;

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigation = useNavigation<LoginNavProp>();

  const handleLogin = async () => {
    try {
      await login(username, password);
    } catch (error: any) {
      Alert.alert('Erro', error.message || 'Erro ao fazer login');
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../../assets/fiap-logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.title}>Bem-vindo de volta</Text>

      <View style={styles.form}>
        <Text style={styles.label}>Usuário</Text>
        <TextInput
          style={styles.input}
          value={username}
          onChangeText={setUsername}
          placeholder="Digite seu usuário"
          placeholderTextColor={theme.colors.gray}
          autoCapitalize="none"
        />

        <Text style={styles.label}>Senha</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingHorizontal: theme.spacing.lg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 160,
    height: 80,
    marginBottom: theme.spacing.xl,
  },
  title: {
    fontSize: theme.typography.heading.fontSize + 2,
    fontWeight: theme.typography.heading.fontWeight as any,
    color: theme.colors.text,
    marginBottom: theme.spacing.lg,
    textAlign: 'center',
  },
  form: {
    width: '100%',
  },
  label: {
    color: theme.colors.text,
    fontSize: theme.typography.body.fontSize,
    marginBottom: 4,
  },
  input: {
    backgroundColor: theme.colors.secondary,
    color: theme.colors.text,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius,
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginBottom: theme.spacing.lg,
  },
  button: {
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius,
    alignItems: 'center',
    marginTop: theme.spacing.md,
  },
  buttonText: {
    color: theme.colors.white,
    fontWeight: 'bold',
    fontSize: theme.typography.subheading.fontSize,
  },
  link: {
    color: theme.colors.primary,
    marginTop: theme.spacing.lg,
    textAlign: 'center',
    textDecorationLine: 'underline',
    fontSize: theme.typography.body.fontSize,
  },
});
