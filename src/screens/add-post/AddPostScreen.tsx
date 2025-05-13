import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '@/routes/types';
import { addPost } from '@/services/mock-post';
import theme from '@/styles/theme';
import { Ionicons } from '@expo/vector-icons';

type NavProp = StackNavigationProp<RootStackParamList, 'add-post'>;

export default function AddPostScreen() {
  const navigation = useNavigation<NavProp>();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const canGoBack = navigation.canGoBack();

  const handleCreate = async () => {
    if (!title || !content) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    await addPost({ title, content });
    Alert.alert('Sucesso', 'Post criado!');
    navigation.navigate('dashboard');
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.topButtons}>
        {canGoBack && (
          <TouchableOpacity onPress={handleBack} style={styles.iconButton}>
            <Ionicons name="arrow-back" size={24} color={theme.colors.white} />
          </TouchableOpacity>
        )}
      </View>

      <Text style={styles.label}>Título</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Título"
        placeholderTextColor={theme.colors.gray}
      />

      <Text style={styles.label}>Conteúdo</Text>
      <TextInput
        style={[styles.input, styles.textarea]}
        value={content}
        onChangeText={setContent}
        placeholder="Conteúdo"
        placeholderTextColor={theme.colors.gray}
        multiline
        numberOfLines={6}
      />

      <TouchableOpacity style={styles.button} onPress={handleCreate}>
        <Text style={styles.buttonText}>Criar Post</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.lg,
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  topButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: theme.spacing.md,
  },
  iconButton: {
    backgroundColor: theme.colors.secondary,
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: theme.typography.body.fontSize,
    fontWeight: theme.typography.body.fontWeight as any,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  input: {
    backgroundColor: theme.colors.white,
    borderColor: theme.colors.border,
    borderWidth: 1,
    borderRadius: theme.borderRadius,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    fontSize: theme.typography.body.fontSize,
    color: theme.colors.text,
  },
  textarea: {
    height: 120,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius,
    alignItems: 'center',
    marginTop: theme.spacing.sm,
  },
  buttonText: {
    color: theme.colors.white,
    fontSize: theme.typography.body.fontSize,
    fontWeight: theme.typography.body.fontWeight as any,
  },
});
// src/screens/add-post/AddPostScreen.tsx
// Compare this snippet from src/services/mock-post.ts:
// // src/services/mock-post.ts
// import { Post } from '@/types';
//
// let posts: Post[] = [
//   {
//     id: '1',
//     title: 'Post 1',
//     content: 'Conteúdo do post 1',
//     createdAt: new Date(),
//   },
//   {
//     id: '2',
//     title: 'Post 2',
//     content: 'Conteúdo do post 2',
//     createdAt: new Date(),
//   },
// ];
//