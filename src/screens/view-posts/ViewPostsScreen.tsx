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
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '@/routes/types';
import { getPosts, Post } from '@/services/mock-post';
import { useAuth } from '@/hooks/useAuth';
import theme from '@/styles/theme';

type ViewPostsScreenProp = StackNavigationProp<RootStackParamList, 'view-posts'>;

export default function ViewPostsScreen() {
  const navigation = useNavigation<ViewPostsScreenProp>();
  const { logout } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const canGoBack = navigation.canGoBack();

  const loadPosts = async () => {
    const data = await getPosts();
    setPosts(data);
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const handleLogout = async () => {
    await logout();
  };

  const handleBack = () => {
    navigation.goBack();
  };

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
    <View style={styles.container}>
      <View style={styles.topButtons}>
        {canGoBack && (
          <TouchableOpacity onPress={handleBack} style={styles.iconButton}>
            <Ionicons name="arrow-back" size={24} color={theme.colors.white} />
          </TouchableOpacity>
        )}

        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutButtonText}>Sair</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={renderPost}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <Text style={styles.empty}>Nenhum post encontrado.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.background,
  },
  topButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.md,
  },
  iconButton: {
    backgroundColor: theme.colors.secondary,
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.borderRadius,
  },
  logoutButtonText: {
    color: theme.colors.white,
    fontWeight: 'bold',
    fontSize: theme.typography.body.fontSize,
  },
  list: {
    paddingBottom: theme.spacing.lg,
  },
  postCard: {
    backgroundColor: theme.colors.white,
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
// src/screens/view-posts/ViewPostsScreen.tsx
// Compare this snippet from src/screens/view-posts/ViewPostsScreen.tsx:
// // src/screens/view-posts/ViewPostsScreen.tsx
// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   FlatList,
//   TouchableOpacity,
//   StyleSheet,
// } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { StackNavigationProp } from '@react-navigation/stack';
// import { Ionicons } from '@expo/vector-icons'; 