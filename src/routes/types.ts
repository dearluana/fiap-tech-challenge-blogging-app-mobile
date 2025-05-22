// src/routes/types.ts
export type RootStackParamList = {

  login: undefined;
  cadastro: undefined;
  dashboard: undefined;
  'add-post': undefined;
  'post-details': { id: string };
  'edit-post': { id: string };
  'view-posts': undefined;

};
