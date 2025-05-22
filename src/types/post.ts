import { Person } from "./person";

export type Post = {
  id: number;
  title: string;
  author: Person;
  content: string;
  createdAt: string;
  updatedAt: string
}

  
  export type PostCreate = {
    author: Person;
    title: string;
    content: string;
  };
  
  export type PostUpdate = {
    id: number;
    title?: string;
    content?: string;
    author?: Person;
  };
  
  export type PostsResponse = {
    data: Post[];
    total: number;
    page: number;
    limit: number;
  };