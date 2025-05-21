import React, { useEffect, useState } from 'react';
import {
  Alert,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/routes/types';
import { Person } from '@/types/person';
import { useAuth } from '@/hooks/useAuth';
import api from '@/api/api';
import theme from '@/styles/theme';
import Layout from '@/components/Layout';
import jwtDecode from 'jwt-decode';

type ViewPostsScreenProp = StackNavigationProp<RootStackParamList, 'view-posts'>;

export default function ViewPostsScreen() {
  const navigation = useNavigation<ViewPostsScreenProp>();
  const { logout, username } = useAuth();
  const [person, setPerson] = useState<Person | null>(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem('@blogApp:token');
        if (!token) {
          Alert.alert('Sessão expirada', 'Por favor, faça login novamente.');
          navigation.replace('login');
          return;
        }

        const decoded = jwtDecode<{ sub: number }>(token);
        const userId = decoded.sub;

        const [personResponse, postsResponse] = await Promise.all([
          api.get<Person>(`/person/${userId}`),
          api.get<Post[]>('/post?limit=200&page=1'),
        ]);

        setPerson(personResponse.data);
        setPosts(postsResponse.data.reverse());
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
        Alert.alert('Erro', 'Não foi possível carregar os dados. Faça login novamente.');
        navigation.replace('login');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigation]);

  const handlePostClick = (id: string) => {
    navigation.navigate('post-details', { id });
  };

  const renderPost = ({ item }: { item: Post }) => (
    <TouchableOpacity
      onPress={() => handlePostClick(item.id)}
      style={styles.postCard}
    >
      <Text style={styles.postTitle}>{item.title}</Text>
      <Text style={styles.postContent} numberOfLines={2}>
        {item.content}
      </Text>
    </TouchableOpacity>
  );

  return (
    <Layout
      title={`Olá, ${username ?? 'usuário'}`}
      onLogout={logout}
    >
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={renderPost}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <Text style={styles.empty}>Nenhum post encontrado.</Text>
        }
      />
    </Layout>
  );
}

const styles = StyleSheet.create({
  list: {
    paddingBottom: theme.spacing.lg,
  },
  postCard: {
    backgroundColor: theme.colors.secondary,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius,
    marginBottom: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  postTitle: {
    fontSize: theme.typography.subheading.fontSize,
    fontWeight: theme.typography.subheading.fontWeight as any,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  postContent: {
    fontSize: theme.typography.body.fontSize,
    color: theme.colors.gray,
  },
  empty: {
    textAlign: 'center',
    marginTop: theme.spacing.xl,
    color: theme.colors.gray,
    fontSize: theme.typography.body.fontSize,
  },
});