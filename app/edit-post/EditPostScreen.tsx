import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useAuth } from '@/hooks/useAuth';
import AppLayout from '../components/AppLayout';
import styles from './styles';

export default function EditPostScreen() {
  const route = useRoute<any>();
  const navigation = useNavigation();
  const { id } = route.params;
  const { token } = useAuth();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchPost = async () => {
    try {
      const response = await fetch(`https://fiap-tech-challenge-blogging-api.onrender.com/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setTitle(data.title);
      setContent(data.content);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar o post.');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    if (!title || !content) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    setSaving(true);

    try {
      const response = await fetch(`https://fiap-tech-challenge-blogging-api.onrender.com/posts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, content }),
      });

      if (!response.ok) throw new Error('Erro ao atualizar post');

      Alert.alert('Sucesso', 'Post atualizado com sucesso!');
      navigation.navigate('dashboard' as never);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível atualizar o post.');
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);

  if (loading) {
    return (
      <AppLayout>
        <ActivityIndicator />
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <View style={styles.container}>
        <Text style={styles.label}>Título</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={setTitle}
        />

        <Text style={styles.label}>Conteúdo</Text>
        <TextInput
          style={[styles.input, styles.textarea]}
          value={content}
          onChangeText={setContent}
          multiline
          numberOfLines={4}
        />

        <TouchableOpacity style={styles.button} onPress={handleUpdate} disabled={saving}>
          {saving ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Salvar alterações</Text>}
        </TouchableOpacity>
      </View>
    </AppLayout>
  );
}
