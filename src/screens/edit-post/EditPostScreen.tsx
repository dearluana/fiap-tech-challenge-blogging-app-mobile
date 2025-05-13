import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; // Importando o ícone de voltar
import { RootStackParamList } from '@/routes/types';
import { getPostById, updatePost } from '@/services/mock-post'; // deletePost removido
import theme from '@/styles/theme';

type RouteProps = RouteProp<RootStackParamList, 'edit-post'>;

export default function EditPostScreen() {
  const route = useRoute<RouteProps>();
  const navigation = useNavigation();
  const { id } = route.params;

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    getPostById(id).then((post) => {
      if (post) {
        setTitle(post.title);
        setContent(post.content);
      }
    });
  }, [id]);

  const handleUpdate = async () => {
    await updatePost(id, { title, content });
    Alert.alert('Sucesso', 'Post atualizado!');
    navigation.goBack();
  };

  const handleBack = () => {
    navigation.goBack(); // Função para voltar à tela anterior
  };

  return (
    <View style={styles.container}>
      {/* Botão de voltar */}
      <TouchableOpacity onPress={handleBack} style={styles.iconButton}>
        <Ionicons name="arrow-back" size={24} color={theme.colors.white} />
      </TouchableOpacity>

      <Text style={styles.label}>Título</Text>
      <TextInput style={styles.input} value={title} onChangeText={setTitle} />

      <Text style={styles.label}>Conteúdo</Text>
      <TextInput
        style={[styles.input, styles.textarea]}
        value={content}
        onChangeText={setContent}
        multiline
        numberOfLines={4}
      />

      <TouchableOpacity style={styles.button} onPress={handleUpdate}>
        <Text style={styles.buttonText}>Atualizar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 24 },
  label: { fontSize: 16, marginBottom: 8 },
  input: {
    backgroundColor: '#f3f4f6',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  textarea: { height: 120, textAlignVertical: 'top' },
  button: {
    backgroundColor: '#0f172a',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  iconButton: {
    position: 'absolute',
    top: 40,
    left: 16,
    backgroundColor: '#00000070',
    borderRadius: 50,
    padding: 8,
  },
});
// src/screens/edit-post/EditPostScreen.tsx
// Compare this snippet from src/services/mock-post.ts:
// import { Post } from '@/types/Post';
//
// const posts: Post[] = [
//   { id: '1', title: 'Post 1', content: 'Conteúdo do Post 1' },
//   { id: '2', title: 'Post 2', content: 'Conteúdo do Post 2' },
//   { id: '3', title: 'Post 3', content: 'Conteúdo do Post 3' },
// ];
//
// export const getPosts = async (): Promise<Post[]> => {
//   return posts;
// };
//
// export const getPostById = async (id: string): Promise<Post | undefined> => {
//   return posts.find((post) => post.id === id);
// };
//
// export const createPost = async (post: Post): Promise<void> => {
//   posts.push({ ...post, id: String(posts.length + 1) });
// };
// };
// export const updatePost = async (id: string, updatedPost: Partial<Post>): Promise<void> => {
//   const index = posts.findIndex((post) => post.id === id);
  //   if (index !== -1) {
  //     posts[index] = { ...posts[index], ...updatedPost };
  //   }
  // };
// };
// export const deletePost = async (id: string): Promise<void> => {
//   const index = posts.findIndex((post) => post.id === id);
  //   if (index !== -1) {
  //     posts.splice(index, 1);
  //   }
  // };
// };
// // src/services/mock-post.ts
// // src/types/Post.ts
// export interface Post {
//   id: string;
//   title: string;
//   content: string;
//   createdAt?: Date;
//   updatedAt?: Date;
// }
// // src/types/Post.ts
// // src/routes/types.ts
// export type RootStackParamList = {     // Definindo os tipos de navegação          