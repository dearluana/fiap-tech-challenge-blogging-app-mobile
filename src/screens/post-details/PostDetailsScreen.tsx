import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '@/routes/types';
import { getPostById, Post } from '@/services/mock-post';
import theme from '@/styles/theme';

type PostDetailsRouteProp = RouteProp<RootStackParamList, 'post-details'>;

export default function PostDetailsScreen() {
  const navigation = useNavigation();
  const route = useRoute<PostDetailsRouteProp>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  const loadPost = async () => {
    try {
      const data = await getPostById(route.params.id);
      setPost(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPost();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  if (!post) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>Post não encontrado.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color={theme.colors.primary} />
      </TouchableOpacity>
      <Text style={styles.title}>{post.title}</Text>
      <Text style={styles.content}>{post.content}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.lg,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
  },
  backButton: {
    marginBottom: theme.spacing.md,
  },
  title: {
    fontSize: theme.typography.heading.fontSize,
    fontWeight: theme.typography.heading.fontWeight as any,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  content: {
    fontSize: theme.typography.body.fontSize,
    color: theme.colors.gray,
    lineHeight: 22,
  },
  error: {
    fontSize: theme.typography.body.fontSize,
    color: theme.colors.primary,
    textAlign: 'center',
  },
});
//     marginTop: theme.spacing.sm,
//     fontSize: theme.typography.body.fontSize,
//     fontWeight: theme.typography.body.fontWeight as any, 
//   }, 