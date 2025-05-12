// src/services/mock-posts.ts

export type Post = {
  id: string;
  title: string;
  content: string;
};

let mockPosts: Post[] = [
  {
    id: '1',
    title: 'Post de Exemplo',
    content: 'Este é um conteúdo de exemplo para teste.',
  },
];

export const getPosts = () => Promise.resolve(mockPosts);

export const getPostById = (id: string) =>
  Promise.resolve(mockPosts.find((post) => post.id === id) || null);

export const addPost = (post: Omit<Post, 'id'>) => {
  const newPost = { id: Date.now().toString(), ...post };
  mockPosts.push(newPost);
  return Promise.resolve(newPost);
};

export const updatePost = (id: string, updated: Partial<Post>) => {
  const index = mockPosts.findIndex((post) => post.id === id);
  if (index !== -1) {
    mockPosts[index] = { ...mockPosts[index], ...updated };
    return Promise.resolve(mockPosts[index]);
  }
  return Promise.resolve(null);
};

export const deletePost = async (id: string) => {
  mockPosts = mockPosts.filter(post => post.id !== id);
};
