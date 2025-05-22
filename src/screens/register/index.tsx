import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Switch,
  TouchableOpacity,
  Alert,
} from 'react-native';
import theme from '@/styles/theme';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/routes/types';
import api from '@/api/api';
import { Person } from '@/types/person';
import { styles } from './styles';
import { sanitizeName, sanitizeUsername, sanitizeEmail } from '@/helpers/mask';

type RegisterScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'cadastro'
>;

export default function RegisterScreen() {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [professor, setProfessor] = useState(false);
  const [error, setError] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const navigation = useNavigation<RegisterScreenNavigationProp>();

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!name.trim()) {
      newErrors.name = 'Nome é obrigatório.';
    } else if (name.length < 3) {
      newErrors.name = 'Nome deve ter ao menos 3 caracteres.';
    } else if (name.length > 20) {
      newErrors.name = 'Nome deve ter no máximo 20 caracteres.';
    }

    if (!surname.trim()) {
      newErrors.surname = 'Sobrenome é obrigatório.';
    } else if (surname.length < 3) {
      newErrors.surname = 'Sobrenome deve ter ao menos 3 caracteres.';
    } else if (surname.length > 20) {
      newErrors.surname = 'Sobrenome deve ter no máximo 20 caracteres.';
    }

    if (!email.trim()) {
      newErrors.email = 'E-mail é obrigatório.';
    } else if (email.length < 5) {
      newErrors.email = 'E-mail deve ter ao menos 5 caracteres.';
    } else if (email.length > 70) {
      newErrors.email = 'E-mail deve ter no máximo 70 caracteres.';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        newErrors.email = 'Digite um e-mail válido.';
      }
    }

    if (!username.trim()) {
      newErrors.username = 'Usuário é obrigatório.';
    } else if (username.length < 3) {
      newErrors.username = 'Usuário deve ter ao menos 3 caracteres.';
    } else if (username.length > 20) {
      newErrors.username = 'Usuário deve ter no máximo 20 caracteres.';
    }

    if (!password.trim()) {
      newErrors.password = 'Senha é obrigatória.';
    } else if (password.length < 5) {
      newErrors.password = 'Senha deve ter ao menos 5 caracteres.';
    } else if (password.length > 20) {
      newErrors.password = 'Senha deve ter no máximo 20 caracteres.';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return false;
    }

    return true;
  };

  const handleRegister = async () => {
    setError('');
    setErrors({});

    if (!validateForm()) return;

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
      setError('Erro ao criar conta. Verifique os dados e tente novamente.');
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
        autoCorrect={false}
        autoCapitalize="words"
        maxLength={20}
        onChangeText={(text) => setName(sanitizeName(text))}
      />
      {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

      <Text style={styles.label}>Sobrenome</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite seu sobrenome"
        placeholderTextColor={theme.colors.gray}
        value={surname}
        autoCorrect={false}
        autoCapitalize="words"
        maxLength={20}
        onChangeText={(text) => setSurname(sanitizeName(text))}
      />
      {errors.surname && <Text style={styles.errorText}>{errors.surname}</Text>}

      <Text style={styles.label}>E-mail</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite seu email"
        placeholderTextColor={theme.colors.gray}
        keyboardType="email-address"
        value={email}
        autoCorrect={false}
        autoCapitalize="none"
        maxLength={70}
        onChangeText={(text) => setEmail(sanitizeEmail(text))}
      />
      {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

      <Text style={styles.label}>Usuário</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite seu usuário"
        placeholderTextColor={theme.colors.gray}
        value={username}
        autoCorrect={false}
        autoCapitalize="none"
        maxLength={20}
        onChangeText={(text) => setUsername(sanitizeUsername(text))}
      />
      {errors.username && <Text style={styles.errorText}>{errors.username}</Text>}

      <Text style={styles.label}>Senha</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite sua senha"
        placeholderTextColor={theme.colors.gray}
        secureTextEntry
        value={password}
        autoCorrect={false}
        autoCapitalize="none"
        maxLength={20}
        onChangeText={setPassword}
      />
      {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

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
