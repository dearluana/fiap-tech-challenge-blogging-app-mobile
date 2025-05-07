import { Person, PersonCreate, PersonUpdate } from "../types/person";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const personService = {
  async createPerson(person: PersonCreate): Promise<Person> {
    const response = await fetch(`${API_URL}/person`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(person),
    });
    if (!response.ok) {
      throw new Error('Failed to create person');
    }
    return response.json();
  },

  async getPersonById(id: number): Promise<Person> {
    const response = await fetch(`${API_URL}/person/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch person');
    }
    return response.json();
  },

  async getAllPersons(page: number, limit: number): Promise<Person[]> {
    const response = await fetch(`${API_URL}/person?page=${page}&limit=${limit}`);
    if (!response.ok) {
      throw new Error('Failed to fetch persons');
    }
    return response.json();
  },

  async updatePerson(person: PersonUpdate): Promise<Person> {
    const response = await fetch(`${API_URL}/person`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(person),
    });
    if (!response.ok) {
      throw new Error('Failed to update person');
    }
    return response.json();
  },

  async deletePerson(id: number): Promise<void> {
    const response = await fetch(`${API_URL}/person/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete person');
    }
  },
};