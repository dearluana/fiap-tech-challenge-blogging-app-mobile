import React, { useState } from 'react';
import { Alert } from 'react-native';
import styled from 'styled-components/native';
import api from '../services/api';

export default function CreatePostScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleCreatePost = async () => {
    if (!title || !content) {
      Alert.alert('Erro', 'Preencha todos os campos!');
      return;
    }

    try {
      await api.post('/posts', { title, content });
      Alert.alert('Sucesso', 'Post criado com sucesso!');
      navigation.goBack();
    } catch (error) {
      console.log('Erro ao criar post:', error);
      Alert.alert('Erro', 'Não foi possível criar o post.');
    }
  };

  return (
    <Container>
      <Input
        placeholder="Título"
        value={title}
        onChangeText={setTitle}
      />
      <TextArea
        placeholder="Conteúdo"
        value={content}
        onChangeText={setContent}
        multiline
        numberOfLines={8}
      />
      <Button onPress={handleCreatePost}>
        <ButtonText>Criar Post</ButtonText>
      </Button>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: #fff;
  padding: 20px;
`;

const Input = styled.TextInput`
  border-width: 1px;
  border-color: #ccc;
  padding: 10px;
  margin-bottom: 15px;
  border-radius: 8px;
`;

const TextArea = styled.TextInput`
  border-width: 1px;
  border-color: #ccc;
  padding: 10px;
  height: 150px;
  margin-bottom: 15px;
  border-radius: 8px;
  text-align-vertical: top;
`;

const Button = styled.TouchableOpacity`
  background-color: #4f46e5;
  padding: 15px;
  border-radius: 8px;
  align-items: center;
`;

const ButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
`;
