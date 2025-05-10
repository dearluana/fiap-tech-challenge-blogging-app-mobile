import Constants from 'expo-constants';
import { User, UserUpdate, createUser } from '../types/user';

const { API_URL } = Constants.manifest?.extra || Constants.expoConfig?.extra || {};

if (!API_URL) {
  throw new Error('API_URL não está definido nas variáveis de ambiente do Expo.');
}
// Removed local declaration of UserCreate to avoid conflict with imported type.

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
export interface CreateUserPayload {
  username: string;
  email: string;
  password: string;
}
export const userService = {
  async createUser(user: CreateUserPayload): Promise<User> {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    return handleResponse(response);
  },

  async login(username: string, password: string): Promise<{ token: string }> {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: username, password }),
    });

    return handleResponse(response);
  },

  async getUserById(id: string, token: string): Promise<User> {
    const response = await fetch(`${API_URL}/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return handleResponse(response);
  },

  async getAllUsers(page = 1, limit = 10, token: string): Promise<User[]> {
    const response = await fetch(`${API_URL}/users?page=${page}&limit=${limit}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return handleResponse(response);
  },

  async updateUser(user: UserUpdate, token: string): Promise<User> {
    const response = await fetch(`${API_URL}/users/${user.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(user),
    });

    return handleResponse(response);
  },

  async deleteUser(id: string, token: string): Promise<void> {
    const response = await fetch(`${API_URL}/users/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    await handleResponse(response);
  },
};
export default userService;
// This code defines a user service for a React Native application that interacts with a RESTful API.   

