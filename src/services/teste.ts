// src/services/test.ts
import api from './api';

export async function testarBackend() {
  try {
    const response = await api.get('/health'); // ou outra rota que seu backend tenha
    console.log('API funcionando:', response.data);
  } catch (error) {
    console.error('Erro ao conectar com o backend:', error);
  }
}
// Chame essa função em algum lugar do seu aplicativo, como no App.tsx ou em um useEffect
// useEffect(() => {
//   const checkBackend = async () => {
//     await testarBackend();
//   };
//   checkBackend();
// }, []);  