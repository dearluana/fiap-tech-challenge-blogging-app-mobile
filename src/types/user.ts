export type User = {
    id: number;
    username: string;
    password: string;
    person: number;
    createdAt: string;
    updatedAt: string;
  };
  
  export type createUser = {
    username: string;
    password: string;
  };
  
  export type UserUpdate = {
    id: number;
    username?: string;
    password?: string;
    person?: number;
  };
  
  export type UsersResponse = {
    data: User[];
    total: number;
    page: number;
    limit: number;
  };