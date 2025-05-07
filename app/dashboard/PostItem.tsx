import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

type PostProps = {
  post: {
    _id: string;
    title: string;
    content: string;
  };
};

export default function PostItem({ post }: PostProps) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('post-details' as never, { id: post._id } as never)}
    >
      <Text style={styles.cardTitle}>{post.title}</Text>
      <Text numberOfLines={2} style={styles.cardContent}>{post.content}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 6,
  },
  cardContent: {
    fontSize: 14,
    color: '#334155',
  },
});
// import styles from './styles';
//
// import { useNavigation } from '@react-navigation/native';
// import { Post } from '@/types/Post';     