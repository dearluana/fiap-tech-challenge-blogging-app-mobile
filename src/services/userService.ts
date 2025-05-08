import Constants from 'expo-constants';
import { User, UserCreate, UserUpdate } from '../types/user';

const API_URL = Constants.expoConfig?.extra?.API_URL;

export const userService = {
  async createUser(user: UserCreate): Promise<User> {
    const response = await fetch(`${API_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Erro ao criar usuário');
    }

    return response.json();
  },

  async getUserById(id: number): Promise<User> {
    const response = await fetch(`${API_URL}/users/${id}`);
    if (!response.ok) {
      throw new Error('Erro ao buscar usuário');
    }
    return response.json();
  },

  async getAllUsers(page: number, limit: number): Promise<User[]> {
    const response = await fetch(`${API_URL}/users?page=${page}&limit=${limit}`);
    if (!response.ok) {
      throw new Error('Erro ao buscar usuários');
    }
    return response.json();
  },

  async updateUser(user: UserUpdate): Promise<User> {
    const response = await fetch(`${API_URL}/users`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error('Erro ao atualizar usuário');
    }
    return response.json();
  },

  async deleteUser(id: number): Promise<void> {
    const response = await fetch(`${API_URL}/users/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Erro ao deletar usuário');
    }
  },
};
//   };
//
//   const login = async (token: string) => {
//     try {    