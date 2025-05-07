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
import styles from './styles';

export default function EditPostScreen() {
  const { token } = useAuth();
  const route = useRoute<any>();
  const navigation = useNavigation();
  const { id } = route.params;

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

  const handleSave = async () => {
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

      if (!response.ok) throw new Error('Erro ao salvar alterações');

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
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar post</Text>

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
        multiline
        numberOfLines={6}
        textAlignVertical="top"
        placeholder="Escreva o conteúdo"
      />

      <TouchableOpacity style={styles.button} onPress={handleSave} disabled={saving}>
        {saving ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Salvar alterações</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}
// styles.ts