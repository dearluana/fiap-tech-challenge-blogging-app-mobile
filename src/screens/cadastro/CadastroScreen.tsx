import React, { useState } from 'react';
import { View, Text, TextInput, Switch, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import theme from '@/styles/theme';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/routes/types';
import api from '@/api/api';
import { Person } from '@/types/person';

type RegisterScreenNavigationProp = StackNavigationProp<RootStackParamList, 'cadastro'>;

export default function RegisterScreen() {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [professor, setProfessor] = useState(false);
  const [error, setError] = useState('');

  const navigation = useNavigation<RegisterScreenNavigationProp>();

  const handleRegister = async () => {
    setError('');

    try {
      const personResponse = await api.post<Person>('/person', {
        name,
        surname,
        email,
        professor,
      });

      const personId = personResponse.data.id;

      const userResponse = await api.post('/user', {
        username,
        password,
        person: {
          id: personId,
          name,
          surname,
          email,
          professor,
        },
      });

      if (userResponse.status === 201) {
        Alert.alert('Sucesso', 'Usuário cadastrado com sucesso');
        navigation.navigate('login');
      } else {
        setError('Erro ao criar o usuário.');
      }
    } catch (err) {
      console.error('Erro ao registrar:', err);
      setError('Erro ao criar conta.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro</Text>

      {error ? (
        <Text style={[styles.label, { color: theme.colors.danger, marginBottom: 12 }]}>
          {error}
        </Text>
      ) : null}

      <Text style={styles.label}>Nome</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite seu nome"
        placeholderTextColor={theme.colors.gray}
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Sobrenome</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite seu sobrenome"
        placeholderTextColor={theme.colors.gray}
        value={surname}
        onChangeText={setSurname}
      />

      <Text style={styles.label}>E-mail</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite seu email"
        placeholderTextColor={theme.colors.gray}
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <Text style={styles.label}>Usuário</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite seu usuário"
        placeholderTextColor={theme.colors.gray}
        value={username}
        onChangeText={setUsername}
      />

      <Text style={styles.label}>Senha</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite sua senha"
        placeholderTextColor={theme.colors.gray}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <View style={styles.switchContainer}>
        <Text style={styles.label}>Sou professor</Text>
        <Switch
          value={professor}
          onValueChange={setProfessor}
          thumbColor={professor ? theme.colors.primary : theme.colors.gray}
          trackColor={{ true: theme.colors.accent, false: theme.colors.border }}
        />
      </View>

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
    marginBottom: theme.spacing.xs,
    textAlign: 'center',
  },
  label: {
    fontSize: theme.typography.body.fontSize,
    color: theme.colors.text,
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    backgroundColor: theme.colors.accent,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius,
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginBottom: theme.spacing.sm,
    color: theme.colors.text,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius,
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
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