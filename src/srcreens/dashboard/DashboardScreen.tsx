import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '@/hooks/useAuth';
import PostItem from './PostItem';
import styles from './styles';
import AppLayout from '@/components/AppLayout';

export default function DashboardScreen() {
  const { token, user } = useAuth();
  const navigation = useNavigation();
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMyPosts = async () => {
    try {
      const response = await fetch('https://fiap-tech-challenge-blogging-api.onrender.com/posts/my', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error('Erro ao carregar posts');
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar seus posts.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyPosts();
  }, []);

  const handleNewPost = () => {
    navigation.navigate('add-post' as never);
  };

  return (
    <AppLayout>
      <Text style={styles.title}>Bem-vindo(a), {user?.name || 'Usuário'} 👋</Text>

      <TouchableOpacity style={styles.button} onPress={handleNewPost}>
        <Text style={styles.buttonText}>Novo post</Text>
      </TouchableOpacity>

      {loading ? (
        <ActivityIndicator style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={posts}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <PostItem post={item} />}
          contentContainerStyle={{ paddingVertical: 10 }}
        />
      )}
    </AppLayout>
  );
}
