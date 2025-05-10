import Constants from 'expo-constants';
import { PostCreate, PostUpdate } from '@/types/post';

const { API_URL } = Constants.manifest?.extra || Constants.expoConfig?.extra || {};

if (!API_URL) {
  throw new Error('API_URL não está definido nas variáveis de ambiente do Expo.');
}

const handleResponse = async (response: Response) => {
  const contentType = response.headers.get('Content-Type');
  const isJson = contentType?.includes('application/json');
  const data = isJson ? await response.json() : null;

  if (!response.ok) {
    const errorMessage = data?.message || `Erro: ${response.status}`;
    throw new Error(errorMessage);
  }

  return data;
};

export const postService = {
  async getAll(token: string, page = 1, limit = 10) {
    const response = await fetch(`${API_URL}/post?page=${page}&limit=${limit}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    return handleResponse(response);
  },

  async getById(id: number, token: string) {
    const response = await fetch(`${API_URL}/post/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    return handleResponse(response);
  },

  async create(data: PostCreate, token: string) {
    const response = await fetch(`${API_URL}/post`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    return handleResponse(response);
  },

  async update(postData: PostUpdate, token: string) {
    const response = await fetch(`${API_URL}/post`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(postData),
    });

    return handleResponse(response);
  },

  async deletePost(id: number, token: string) {
    const response = await fetch(`${API_URL}/post/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    return handleResponse(response);
  },
};
  