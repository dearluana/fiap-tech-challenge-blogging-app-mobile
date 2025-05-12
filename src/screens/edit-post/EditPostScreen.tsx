// src/screens/edit-post/EditPostScreen.tsx

import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '@/routes/types';
import { getPostById, updatePost } from '@/services/mock-post'; // deletePost removido

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

  return (
    <View style={styles.container}>
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
    </View> // <- Este fechamento estava faltando
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
});
// src/screens/edit-post/EditPostScreen.tsx