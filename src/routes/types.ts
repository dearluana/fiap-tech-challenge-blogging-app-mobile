// src/routes/types.ts
export type RootStackParamList = {
  Home: undefined;
  login: undefined;
  cadastro: undefined;
  Dashboard: undefined;
  AddPost: undefined;
  PostDetails: { id: string };
  EditPost: { id: string };
};
