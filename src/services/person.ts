import Constants from 'expo-constants';
import { Person, PersonCreate, PersonUpdate } from '../types/person';

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

export const personService = {
  async createPerson(person: PersonCreate, token: string): Promise<Person> {
    const response = await fetch(`${API_URL}/person`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(person),
    });
    return handleResponse(response);
  },

  async getPersonById(id: number, token: string): Promise<Person> {
    const response = await fetch(`${API_URL}/person/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return handleResponse(response);
  },

  async getAllPersons(page = 1, limit = 10, token: string): Promise<Person[]> {
    const response = await fetch(`${API_URL}/person?page=${page}&limit=${limit}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return handleResponse(response);
  },

  async updatePerson(person: PersonUpdate, token: string): Promise<Person> {
    const response = await fetch(`${API_URL}/person`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(person),
    });
    return handleResponse(response);
  },

  async deletePerson(id: number, token: string): Promise<void> {
    const response = await fetch(`${API_URL}/person/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    await handleResponse(response);
  },
};
