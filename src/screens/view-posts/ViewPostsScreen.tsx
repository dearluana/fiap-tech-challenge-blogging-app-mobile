import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/routes/types';
import { getPosts, Post } from '@/services/mock-post';
import { useAuth } from '@/hooks/useAuth';
import theme from '@/styles/theme';
import Layout from '@/components/Layout';

type ViewPostsScreenProp = StackNavigationProp<RootStackParamList, 'view-posts'>;

export default function ViewPostsScreen() {
  const navigation = useNavigation<ViewPostsScreenProp>();
  const { logout, username } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);

  const loadPosts = async () => {
    const data = await getPosts();
    setPosts(data);
  };

  useEffect(() => {
    loadPosts();
  }, []);

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
      onLogout={logout}  // Passa o logout para Layout controlar o botão Sair
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
