import React, { useEffect, useState } from 'react';
import { FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import api from '../services/api';

export default function HomeScreen({ navigation }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const response = await api.get('/posts');
      setPosts(response.data);
    } catch (error) {
      console.log('Erro ao buscar posts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (loading) {
    return (
      <LoadingContainer>
        <ActivityIndicator size="large" color="#4f46e5" />
      </LoadingContainer>
    );
  }

  const renderItem = ({ item }) => (
    <PostContainer>
      <TouchableOpacity onPress={() => navigation.navigate('Post', { post: item })}>
        <PostTitle>{item.title}</PostTitle>
        <PostExcerpt numberOfLines={2}>{item.content}</PostExcerpt>
      </TouchableOpacity>
    </PostContainer>
  );

  return (
    <Container>
      <FlatList
        data={posts}
        key extractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<EmptyMessage>Nenhum post encontrado.</EmptyMessage>}
        ListFooterComponent={<Footer />}
        ListFooterComponentStyle={{ paddingBottom: 16 }}
      />
    </Container>
  );
}
const Container = styled.View`
  flex: 1;
  background-color: #ffffff;
`;
const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
`;
const PostContainer = styled.View`
  background-color: #f8f8f8;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
`;                      
