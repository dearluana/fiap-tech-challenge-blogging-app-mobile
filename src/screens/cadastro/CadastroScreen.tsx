// src/screens/cadastro/CadastroScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/routes/types';
import { userService } from '@/services/user';
import theme from '@/styles/theme';

type CadastroNavProp = StackNavigationProp<RootStackParamList, 'cadastro'>;

export default function CadastroScreen() {
  const navigation = useNavigation<CadastroNavProp>();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleRegister = async () => {
    if (!nome || !email || !senha) {
      return Alert.alert('Erro', 'Preencha todos os campos.');
    }

    try {
      await userService.createUser({
        username: nome,
        email,
        password: senha,
      });

      Alert.alert('Sucesso', 'Conta criada com sucesso!');
      navigation.navigate('login');
    } catch (error: any) {
      Alert.alert('Erro', error.message || 'Não foi possível criar sua conta.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro</Text>

      <Text style={styles.label}>Nome</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite seu nome"
        placeholderTextColor={theme.colors.gray}
        value={nome}
        onChangeText={setNome}
      />

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite seu email"
        placeholderTextColor={theme.colors.gray}
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <Text style={styles.label}>Senha</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite sua senha"
        placeholderTextColor={theme.colors.gray}
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('login')}>
        <Text style={styles.link}>Já tem conta? Faça login</Text>
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
