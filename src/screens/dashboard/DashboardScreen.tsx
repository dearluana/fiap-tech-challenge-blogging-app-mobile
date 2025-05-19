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
import { getPosts, deletePost, Post } from '@/services/mock-post';
import { useAuth } from '@/hooks/useAuth';
import theme from '@/styles/theme';
import Layout from '@/components/Layout';

type DashboardScreenProp = StackNavigationProp<RootStackParamList, 'dashboard'>;

export default function DashboardScreen() {
  const navigation = useNavigation<DashboardScreenProp>();
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

  const handleDeletePost = async (id: string) => {
    await deletePost(id);
    loadPosts();
  };

  const renderPost = ({ item }: { item: Post }) => (
    <View style={styles.postCard}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.content}>{item.content}</Text>

      <View style={styles.buttons}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handlePostClick(item.id)}
        >
          <Text style={styles.buttonText}>Ver</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.editButton]}
          onPress={() => navigation.navigate('edit-post', { id: item.id })}
        >
          <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.deleteButton]}
          onPress={() => handleDeletePost(item.id)}
        >
          <Text style={styles.buttonText}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <Layout
      title={`Olá, ${username ?? 'usuário'}`}
      footer={
        <TouchableOpacity onPress={logout} style={styles.logoutButton}>
          <Text style={styles.logoutButtonText}>Sair</Text>
        </TouchableOpacity>
      }
    >
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('add-post')}
      >
        <Text style={styles.addButtonText}>+ Novo Post</Text>
      </TouchableOpacity>

      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={renderPost}
        ListEmptyComponent={<Text style={styles.empty}>Nenhum post encontrado.</Text>}
        contentContainerStyle={styles.list}
      />
    </Layout>
  );
}

const styles = StyleSheet.create({
  addButton: {
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius,
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  addButtonText: {
    color: theme.colors.white,
    fontWeight: 'bold',
    fontSize: theme.typography.subheading.fontSize,
  },
  postCard: {
    backgroundColor: theme.colors.background,
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
  title: {
    fontSize: theme.typography.subheading.fontSize,
    fontWeight: theme.typography.subheading.fontWeight as any,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  content: {
    fontSize: theme.typography.body.fontSize,
    color: theme.colors.gray,
    marginBottom: theme.spacing.sm,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: theme.colors.secondary,
    paddingVertical: theme.spacing.xs,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.borderRadius,
  },
  editButton: {
    backgroundColor: theme.colors.accent,
  },
  deleteButton: {
    backgroundColor: theme.colors.danger,
  },
  buttonText: {
    color: theme.colors.white,
    fontWeight: 'bold',
    fontSize: theme.typography.body.fontSize,
  },
  empty: {
    textAlign: 'center',
    marginTop: theme.spacing.xl,
    color: theme.colors.gray,
    fontSize: theme.typography.body.fontSize,
  },
  list: {
    paddingBottom: theme.spacing.lg,
  },
  logoutButton: {
    alignSelf: 'center',
    marginTop: theme.spacing.md,
    backgroundColor: theme.colors.danger,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.borderRadius,
  },
  logoutButtonText: {
    color: theme.colors.white,
    fontWeight: 'bold',
    fontSize: theme.typography.body.fontSize,
  },
});
// Compare this snippet from src/screens/post-details/PostDetailsScreen.tsx: