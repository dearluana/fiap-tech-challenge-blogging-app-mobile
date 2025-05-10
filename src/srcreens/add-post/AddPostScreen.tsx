import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '@/hooks/useAuth';
import AppLayout from '@/components/AppLayout';
import styles from './styles';

export default function AddPostScreen() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const { token } = useAuth();

  const handleSubmit = async () => {
    if (!title || !content) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('https://fiap-tech-challenge-blogging-api.onrender.com/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, content }),
      });

      if (!response.ok) throw new Error('Erro ao criar post');

      Alert.alert('Sucesso', 'Post criado com sucesso!');
      navigation.navigate('dashboard' as never);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível criar o post.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppLayout>
      <View style={styles.container}>
        <Text style={styles.label}>Título</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={setTitle}
          placeholder="Digite o título"
        />

        <Text style={styles.label}>Conteúdo</Text>
        <TextInput
          style={[styles.input, styles.textarea]}
          value={content}
          onChangeText={setContent}
          placeholder="Digite o conteúdo"
          multiline
          numberOfLines={4}
        />

        <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={loading}>
          {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Criar post</Text>}
        </TouchableOpacity>
      </View>
    </AppLayout>
  );
}
