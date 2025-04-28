import React from 'react';
import { ScrollView } from 'react-native';
import styled from 'styled-components/native';

export default function PostScreen({ route }) {
  const { post } = route.params;

  return (
    <Container>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <PostTitle>{post.title}</PostTitle>
        <PostContent>{post.content}</PostContent>
      </ScrollView>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: #ffffff;
`;

const PostTitle = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 16px;
`;

const PostContent = styled.Text`
  font-size: 16px;
  line-height: 24px;
  color: #333333;
`;
