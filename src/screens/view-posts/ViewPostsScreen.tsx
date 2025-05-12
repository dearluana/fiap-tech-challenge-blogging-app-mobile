import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/routes/types';
import { getPosts, Post } from '@/services/mock-post';
import { useAuth } from '@/hooks/useAuth';

type ViewPostsScreenProp = StackNavigationProp<RootStackParamList, 'view-posts'>;

export default function ViewPostsScreen() {
  const navigation = useNavigation<ViewPostsScreenProp>();
  const { logout } = useAuth(); // Função de logout
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
    <TouchableOpacity onPress={() => handlePostClick(item.id)} style={styles.postCard}>
      <Text style={styles.title}>{item.title}</Text>
      <Text numberOfLines={2}>{item.content}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Botão de logout no topo */}
      <TouchableOpacity onPress={logout} style={styles.logoutButton}>
        <Text style={styles.logoutButtonText}>Sair</Text>
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
  postCard: {
    backgroundColor: '#f1f5f9',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
  empty: { textAlign: 'center', marginTop: 50, color: '#94a3b8' },
});
