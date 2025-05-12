import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '@/routes/types';
import { addPost } from '@/services/mock-post';

type NavProp = StackNavigationProp<RootStackParamList, 'add-post'>;

export default function AddPostScreen() {
  const navigation = useNavigation<NavProp>();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleCreate = async () => {
    if (!title || !content) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    await addPost({ title, content });
    Alert.alert('Sucesso', 'Post criado!');
    navigation.navigate('dashboard');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Título</Text>
      <TextInput style={styles.input} value={title} onChangeText={setTitle} placeholder="Título" />

      <Text style={styles.label}>Conteúdo</Text>
      <TextInput
        style={[styles.input, styles.textarea]}
        value={content}
        onChangeText={setContent}
        placeholder="Conteúdo"
        multiline
        numberOfLines={4}
      />

      <TouchableOpacity style={styles.button} onPress={handleCreate}>
        <Text style={styles.buttonText}>Criar Post</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 24 },
  label: { fontSize: 16, marginBottom: 8 },
  input: { backgroundColor: '#f3f4f6', padding: 12, borderRadius: 8, marginBottom: 16 },
  textarea: { height: 120, textAlignVertical: 'top' },
  button: { backgroundColor: '#0f172a', padding: 16, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});
// // src/srcreens/add-post/AddPostScreen.tsx