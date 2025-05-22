import { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '@/routes/types';
import { postService } from '@/services/post';
import { personService } from '@/services/person';
import { useAuth } from '@/hooks/useAuth';
import { Person } from '@/types/person';
import theme from '@/styles/theme';
import { styles } from './styles';
import { Ionicons } from '@expo/vector-icons';

type NavProp = StackNavigationProp<RootStackParamList, 'add-post'>;

export default function AddPostScreen() {
  const navigation = useNavigation<NavProp>();
  const { userRole, userId, userToken } = useAuth();
  const [person, setPerson] = useState<Person | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    const fetchPerson = async () => {
      if (userId && userToken) {
        try {
          const data = await personService.getPersonById(userId, userToken);
          setPerson(data);
        } catch (err) {
          console.error('Erro ao carregar a pessoa:', err);
        }
      }
    };
    fetchPerson();
  }, [userId, userToken]);

 const handleCreate = async () => {
  if (!title || !content) {
    Alert.alert('Ops!', 'Por favor, preencha todos os campos para continuar.');
    return;
  }

  if (!person) {
    Alert.alert('Ops!', 'Não conseguimos carregar suas informações. Tente novamente.');
    return;
  }

  try {
    await postService.create({
      title,
      content,
      author: person,
    });
    Alert.alert('Sucesso!', 'Sua postagem foi criada com sucesso!', [
      {
        text: 'Ok',
        onPress: () => navigation.navigate('dashboard'),
      },
    ]);
    setTitle('');
    setContent('');
  } catch (err) {
    console.error('Erro ao criar post:', err);
    Alert.alert('Ops!', 'Houve um problema ao criar a postagem. Tente novamente.');
  }
};

  const handleBack = () => {
    navigation.goBack();
  };

  if (userRole !== 'professor') {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Somente professores podem criar postagens.</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.keyboardAvoiding}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.topButtons}>
            <TouchableOpacity onPress={handleBack} style={styles.iconButton}>
              <Ionicons name="arrow-back" size={24} color={theme.colors.white} />
            </TouchableOpacity>
          </View>

          <Text style={styles.titlePage}>Adicionar Postagem</Text>

          <Text style={styles.label}>Título</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={setTitle}
            placeholder="Digite o título"
            placeholderTextColor={theme.colors.gray}
          />

          <Text style={styles.label}>Conteúdo</Text>
          <TextInput
            style={[styles.input, styles.textarea]}
            value={content}
            onChangeText={setContent}
            placeholder="Digite o conteúdo"
            placeholderTextColor={theme.colors.gray}
            multiline
            textAlignVertical="top"
          />

          <TouchableOpacity style={styles.button} onPress={handleCreate}>
            <Text style={styles.buttonText}>Criar Post</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}
