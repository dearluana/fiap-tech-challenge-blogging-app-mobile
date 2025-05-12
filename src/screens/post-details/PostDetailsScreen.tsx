import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '@/routes/types';
import { getPostById } from '@/services/mock-post';

type RouteProps = RouteProp<RootStackParamList, 'post-details'>;

export default function PostDetailsScreen() {
  const route = useRoute<RouteProps>();
  const { id } = route.params;

  const [post, setPost] = useState<{ title: string; content: string } | null>(null);

  useEffect(() => {
    getPostById(id).then((result) => setPost(result));
  }, [id]);

  if (!post) return <Text style={styles.loading}>Carregando...</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{post.title}</Text>
      <Text style={styles.content}>{post.content}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 24 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  content: { fontSize: 16, color: '#334155' },
  loading: { textAlign: 'center', marginTop: 100, fontSize: 18 },
});
// src/srcreens/post-details/PostDetailsScreen.tsx