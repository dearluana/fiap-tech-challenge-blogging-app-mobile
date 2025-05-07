import { PostCreate, PostUpdate } from "@/types/post";

// export interface PostData {
//   id: number;
//   title: string;
//   content: string;
//   createdAt: string;
//   updatedAt: string;
// }

type Header = {
  'Content-Type': string;
  Authorization: string;
}

const BASE_URL = process.env.NEXT_PUBLIC_API_URL + 'post';

const headers = (token: string) : Header => {
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
};

export const PostService = {
  async getAll(token: string, page = 1, limit = 10) {
    const res = await fetch(`${BASE_URL}?page=${page}&limit=${limit}`, {
      headers: headers(token),
    });
    return res.json();
  },

  async getById(token: string, id: number) {
    const res = await fetch(`${BASE_URL}/${id}`, {
      headers: headers(token),
    });
    return res.json();
  },

  async create(token: string, data: PostCreate) {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: headers(token),
      body: JSON.stringify(data),
    });
    return res.json();
  },

  async update(token: string, postData: PostUpdate) {
    const res = await fetch(BASE_URL, {
      method: 'PUT',
      headers: headers(token),
      body: JSON.stringify(postData),
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(errorText);
    }

    return res.json();
  },

  async deletePost(token: string, id: number) {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
      headers: headers(token),
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(errorText || 'Erro ao deletar o post');
    }
  }
};