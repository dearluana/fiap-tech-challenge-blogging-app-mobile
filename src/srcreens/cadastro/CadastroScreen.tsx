import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import AppLayout from '@/components/AppLayout';
import { userService } from '@/services/user';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/routes/types';

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
    <AppLayout>
      <Text style={styles.title}>Cadastro</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('login')}>
        <Text style={styles.link}>Já tem conta? Faça login</Text>
      </TouchableOpacity>
    </AppLayout>
  );
}
// This code defines a registration screen for a React Native application using functional components and hooks.        