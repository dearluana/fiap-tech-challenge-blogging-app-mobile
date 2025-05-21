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
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);

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

  const handleDeletePost = (id: string) => {
    setSelectedPostId(id);
    setShowDeleteModal(true);
  };

  const onConfirmDelete = async () => {
    if (selectedPostId) {
      await deletePost(selectedPostId);
      await loadPosts();
      setSelectedPostId(null);
    }
    setShowDeleteModal(false);
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
    <Layout userName={username ?? 'usuário'} onLogout={logout}>
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

      {showDeleteModal && (
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Confirmar exclusão</Text>
            <Text style={styles.modalMessage}>Deseja realmente excluir este post?</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalCancelButton]}
                onPress={() => setShowDeleteModal(false)}
              >
                <Text style={styles.modalButtonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalConfirmButton]}
                onPress={onConfirmDelete}
              >
                <Text style={styles.modalButtonText}>Sim, excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
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
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  modalContainer: {
    backgroundColor: theme.colors.secondary,
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius,
    width: '80%',
    elevation: 5,
  },
  modalTitle: {
    fontSize: theme.typography.subheading.fontSize,
    fontWeight: theme.typography.subheading.fontWeight as any,
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  modalMessage: {
    fontSize: theme.typography.body.fontSize,
    color: theme.colors.gray,
    marginBottom: theme.spacing.md,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  modalButton: {
    paddingVertical: theme.spacing.xs,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.borderRadius,
    marginLeft: theme.spacing.sm,
  },
  modalCancelButton: {
    backgroundColor: theme.colors.gray,
  },
  modalConfirmButton: {
    backgroundColor: theme.colors.danger,
  },
  modalButtonText: {
    color: theme.colors.white,
    fontWeight: 'bold',
    fontSize: theme.typography.body.fontSize,
  },
});
