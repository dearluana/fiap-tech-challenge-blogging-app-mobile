import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  TextInput,
  Modal,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useAuth } from '@/hooks/useAuth';
import { RootStackParamList } from '@/routes/types';
import { Post } from '@/types/post';
import { Person } from '@/types/person';
import { postService } from '@/services/post';
import api from '@/api/api';
import theme from '@/styles/theme';
import Layout from '@/components/Layout';

type DashboardScreenProp = StackNavigationProp<RootStackParamList, 'dashboard'>;

export default function DashboardScreen() {
  const { logout, username } = useAuth();
  const navigation = useNavigation<DashboardScreenProp>();
  const [posts, setPosts] = useState<Post[]>([]);
  const [person, setPerson] = useState<Person | null>(null);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 3;

  const [viewPostModalOpen, setViewPostModalOpen] = useState(false);
  const [viewedPost, setViewedPost] = useState<Post | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

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

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const handleDeletePost = async (postId: number) => {
    Alert.alert('Confirmar', 'Tem certeza que deseja excluir este post?', [
      {
        text: 'Cancelar',
        style: 'cancel',
      },
      {
        text: 'Excluir',
        style: 'destructive',

        onPress: async () => {
          try {
            const token = await AsyncStorage.getItem('@blogApp:token');
            if (!token) {
              Alert.alert('Sessão expirada', 'Por favor, faça login novamente.');
              navigation.replace('login');
              return;
            }

            await postService.deletePost(postId);
            setPosts((prev) => prev.filter((post) => post.id !== postId));
            Alert.alert('Sucesso!', 'Post excluído com sucesso.');
          } catch (error) {
            console.error('Erro ao excluir post:', error);
            Alert.alert('Erro', 'Não foi possível excluir o post.');
          }
        },
      },

    ]);
  };

  const handleEditPost = (post: Post) => {
    setSelectedPost(post);
    setEditModalOpen(true);
  };

  const handleUpdatePost = async () => {
    if (!selectedPost) return;

    try {
      const token = await AsyncStorage.getItem('@blogApp:token');
      if (!token) {
        Alert.alert('Sessão expirada', 'Por favor, faça login novamente.');
        navigation.replace('login');
        return;
      }

      const { id, title, content, author } = selectedPost;

      await postService.update({ id, title, content, author });

      setPosts((prev) =>
        prev.map((post) =>
          post.id === id ? { ...post, title, content } : post
        )
      );

      setEditModalOpen(false);
      setSelectedPost(null);
      Alert.alert('Sucesso', 'Post atualizado com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar post:', error);
      Alert.alert('Erro', 'Não foi possível atualizar o post.');
    }
  };

  const handleViewPost = (post: Post) => {
    setViewedPost(post);
    setViewPostModalOpen(true);
  };

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const postsPaginated = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <Layout userName={person?.name ?? 'usuário'} onLogout={logout}>
      <View style={styles.container}>

        {person?.professor && (
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => navigation.navigate('add-post')}
          >
            <Text style={styles.addButtonText}>+ Novo Post</Text>
          </TouchableOpacity>
        )}

        <TextInput
          placeholder="Buscar post por palavra-chave..."
          placeholderTextColor="#9ca3af"
          style={styles.searchInput}
          value={searchTerm}
          onChangeText={setSearchTerm}
        />

        {postsPaginated.length === 0 ? (
          <Text style={styles.emptyText}>Nenhum post encontrado.</Text>
        ) : (
          <FlatList
            data={postsPaginated}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.postCard}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.content} numberOfLines={3}>{item.content}</Text>

                <View style={styles.buttons}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => handleViewPost(item)}
                  >
                    <Text style={styles.buttonText}>Ver</Text>
                  </TouchableOpacity>

                  {person?.professor && (
                    <>
                      <TouchableOpacity
                        style={[styles.button, styles.editButton]}
                        onPress={() => handleEditPost(item)}
                      >
                        <Text style={styles.buttonText}>Editar</Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={[styles.button, styles.deleteButton]}
                        onPress={() => handleDeletePost(item.id)}
                      >
                        <Text style={styles.buttonText}>Excluir</Text>
                      </TouchableOpacity>
                    </>
                  )}
                </View>
              </View>
            )}
          />
        )}

        {totalPages > 1 && (
          <View style={styles.pagination}>
            <TouchableOpacity
              onPress={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              style={[styles.pageButton, currentPage === 1 && styles.pageButtonDisabled]}
            >
              <Text style={styles.pageTextPrev}>Anterior</Text>
            </TouchableOpacity>

            <Text style={styles.pageInfo}>
              Página {currentPage} de {totalPages}
            </Text>

            <TouchableOpacity
              onPress={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              style={[styles.pageButton, currentPage === totalPages && styles.pageButtonDisabled]}
            >
              <Text style={styles.pageTextNext}>Próxima</Text>
            </TouchableOpacity>
          </View>
        )}

        <Modal visible={viewPostModalOpen} animationType="slide" transparent>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <ScrollView>
                <Text style={styles.modalTitle}>{viewedPost?.title}</Text>
                <Text style={styles.modalAuthor}>
                  Autor: {viewedPost?.author ? `${viewedPost.author.name} ${viewedPost.author.surname}` : 'desconhecido'}
                </Text>
                <Text style={styles.modalDate}>
                  Última atualização: {viewedPost ? new Date(viewedPost.updatedAt).toLocaleString() : ''}
                </Text>
                <Text style={styles.modalBody}>{viewedPost?.content}</Text>
              </ScrollView>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setViewPostModalOpen(false)}
              >
                <Text style={styles.closeButtonText}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <Modal visible={editModalOpen} animationType="slide" transparent>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <ScrollView>
                <Text style={styles.modalTitle}>Editar Post</Text>
                <TextInput
                  placeholder="Título"
                  placeholderTextColor="#9ca3af"
                  style={styles.input}
                  value={selectedPost?.title}
                  onChangeText={(text) =>
                    setSelectedPost((prev) => (prev ? { ...prev, title: text } : null))
                  }
                />
                <TextInput
                  placeholder="Conteúdo"
                  placeholderTextColor="#9ca3af"
                  style={[styles.textarea]}
                  multiline
                  value={selectedPost?.content}
                  onChangeText={(text) =>
                    setSelectedPost((prev) => (prev ? { ...prev, content: text } : null))
                  }
                />
              </ScrollView>

              <View style={styles.modalActions}>
                <TouchableOpacity
                  style={[styles.actionButton, { backgroundColor: theme.colors.danger }]}
                  onPress={() => {
                    setEditModalOpen(false);
                    setSelectedPost(null);
                  }}
                >
                  <Text style={styles.actionButtonText}>Cancelar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.actionButton, { backgroundColor: theme.colors.primary }]}
                  onPress={handleUpdatePost}
                >
                  <Text style={styles.actionButtonText}>Salvar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  postCard: {
    backgroundColor: theme.colors.background,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius,
    marginBottom: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.gray,
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
    backgroundColor: theme.colors.accent,
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
    minWidth: 50,
    textAlign: 'center',
    backgroundColor: theme.colors.accent,
  },
  container: {
    flex: 1,
  },
  addButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 12,
    alignSelf: 'flex-start',
  },
  addButtonText: {
    color: theme.colors.white,
    fontWeight: 'bold',
  },
  searchInput: {
    borderWidth: 1,
    borderColor: theme.colors.gray,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 12,
    color: theme.colors.white,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 40,
    color: '#666',
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 6,
  },
  iconButton: {
    marginLeft: 12,
  },
  iconText: {
    fontSize: 20,
  },
  postTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  postAuthor: {
    fontSize: 12,
    fontStyle: 'italic',
    marginBottom: 6,
    color: '#555',
  },
  postContent: {
    fontSize: 12,
    color: '#333',
  },
  viewButton: {
    marginTop: 4,
    alignSelf: 'flex-start',
    backgroundColor: theme.colors.primary,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  viewButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  pageButton: {
    padding: 8,
  },
  pageButtonDisabled: {
    opacity: 0.4,
  },
  pageInfo: {
    fontWeight: 'bold',
    color: theme.colors.gray,
  },
  pageTextPrev: {
    color: theme.colors.gray,
  },
  pageTextNext: {
    color: theme.colors.gray,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    padding: 16,
  },
  modalContent: {
    backgroundColor: theme.colors.background,
    borderRadius: 12,
    padding: 16,
    maxHeight: '80%',
    color: theme.colors.white,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    color: theme.colors.text,
  },
  modalAuthor: {
    fontStyle: 'italic',
    marginBottom: 6,
    color: theme.colors.text,
  },
  modalDate: {
    fontSize: 12,
    color: '#999',
    marginBottom: 16,
  },
  modalBody: {
    fontSize: 16,
    color: theme.colors.gray,
  },
  closeButton: {
    marginTop: 16,
    backgroundColor: theme.colors.primary,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.white,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 12,
    fontSize: 16,
    color: theme.colors.text,
  },
  textarea: {
    borderWidth: 1,
    borderColor: theme.colors.white,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    minHeight: 120,
    fontSize: 16,
    textAlignVertical: 'top',
    color: theme.colors.text,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    marginHorizontal: 6,
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
