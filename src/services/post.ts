
import api from '@/api/api';
import { PostCreate, PostUpdate } from '@/types/post';

export const postService = {
  async getAll(page = 1, limit = 10) {
    try {
      const res = await api.get('/post', { params: { page, limit } });
      return res.data;
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || 'Erro ao buscar posts';
      throw new Error(message);
    }
  },

  async getById(id: number) {
    try {
      const res = await api.get(`/post/${id}`);
      return res.data;
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || 'Erro ao buscar post';
      throw new Error(message);
    }
  },

  async create(data: PostCreate) {
    try {
      const res = await api.post('/post', data);
      return res.data;
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || 'Erro ao criar post';
      throw new Error(message);
    }
  },

 async update(postData: PostUpdate) {
  try {
    const res = await api.put('/post', postData);
    return res.data;
  } catch (error: any) {
    const message = error.response?.data?.message || error.message || 'Erro ao atualizar post';
    throw new Error(message);
  }
},

  async deletePost(id: number) {
  try {
    const res = await api.delete(`/post/${id}`);
    return res.data;
  } catch (error: any) {
    const message = error.response?.data?.message || error.message || 'Erro ao deletar post';
    throw new Error(message);
  }
}
};