import { User, UserCreate, UserUpdate } from "../types/user";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const userService = {
  async createUser(user: UserCreate): Promise<User> {
    const response = await fetch(`${API_URL}/user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    if (!response.ok) {
      throw new Error('Failed to create user');
    }
    return response.json();
  },

  async getUserById(id: number): Promise<User> {
    const response = await fetch(`${API_URL}/user/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch user');
    }
    return response.json();
  },

  async getAllUsers(page: number, limit: number): Promise<User[]> {
    const response = await fetch(`${API_URL}/user?page=${page}&limit=${limit}`);
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }
    return response.json();
  },

  async updateUser(user: UserUpdate): Promise<User> {
    const response = await fetch(`${API_URL}/user`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    if (!response.ok) {
      throw new Error('Failed to update user');
    }
    return response.json();
  },

  async deleteUser(id: number): Promise<void> {
    const response = await fetch(`${API_URL}/user/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete user');
    }
  },
};