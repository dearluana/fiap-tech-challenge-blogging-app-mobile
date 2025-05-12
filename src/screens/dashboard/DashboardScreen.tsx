// src/screens/dashboard/DashboardScreen.tsx

import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/routes/types';
import { getPosts, deletePost, Post } from '@/services/mock-post';
import { useAuth } from '@/hooks/useAuth'; // Importando o hook de autenticação

type DashboardScreenProp = StackNavigationProp<RootStackParamList, 'dashboard'>;

export default function DashboardScreen() {
  const navigation = useNavigation<DashboardScreenProp>();
  const { logout } = useAuth(); // Função de logout do contexto
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
      <Text>{item.content}</Text>

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
    <View style={styles.container}>
      {/* Botão de logout no topo */}
      <TouchableOpacity onPress={logout} style={styles.logoutButton}>
        <Text style={styles.logoutButtonText}>Sair</Text>
      </TouchableOpacity>

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
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 24, flex: 1, backgroundColor: '#fff' },
  logoutButton: {
    alignSelf: 'flex-end',
    marginBottom: 8,
    backgroundColor: '#dc2626',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  logoutButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#0f172a',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  addButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  postCard: {
    backgroundColor: '#f1f5f9',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
  buttons: { flexDirection: 'row', justifyContent: 'space-between' },
  button: {
    backgroundColor: '#334155',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  editButton: { backgroundColor: '#475569' },
  deleteButton: { backgroundColor: '#dc2626' },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  empty: { textAlign: 'center', marginTop: 50, color: '#94a3b8' },
});
// src/screens/dashboard/DashboardScreen.tsx