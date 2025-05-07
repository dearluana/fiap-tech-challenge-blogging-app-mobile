import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useAuth } from '@/hooks/useAuth';
import styles from './styles';

export default function PostDetailsScreen() {
  const route = useRoute<any>();
  const navigation = useNavigation();
  const { token } = useAuth();
  const { id } = route.params;

  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchPost = async () => {
    try {
      const response = await fetch(`https://fiap-tech-challenge-blogging-api.onrender.com/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setPost(data);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar o post.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    Alert.alert('Confirmação', 'Tem certeza que deseja excluir este post?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: async () => {
          try {
            const response = await fetch(`https://fiap-tech-challenge-blogging-api.onrender.com/posts/${id}`, {
              method: 'DELETE',
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });

            if (!response.ok) throw new Error('Erro ao excluir post');

            Alert.alert('Sucesso', 'Post excluído com sucesso!');
            navigation.navigate('dashboard' as never);
          } catch (error) {
            Alert.alert('Erro', 'Não foi possível excluir o post.');
          }
        },
      },
    ]);
  };

  const handleEdit = () => {
    navigation.navigate('edit-post' as never, { id } as never);
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

  if (!post) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Post não encontrado.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{post.title}</Text>
      <Text style={styles.content}>{post.content}</Text>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
          <Text style={styles.actionText}>Editar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <Text style={styles.actionText}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
