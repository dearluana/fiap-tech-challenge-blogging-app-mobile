// App.tsx

import React from 'react';
import { AuthProvider } from '@/app/context/AuthContext';
import AppNavigator from '@/app/navigation/AppNavigator';

export default function App() {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}
// //       await fetchUser(token);
// //     } catch (error) {
// //       console.error('Erro ao fazer login:', error);
// //     }
// //   };
//
// //   const logout = async () => {
// //     try {
// //       await AsyncStorage.removeItem('authToken');
// //       setToken(null);
// //       setUser(null);
// //     } catch (error) {
// //       console.error('Erro ao fazer logout:', error);
// //     }
// //   };
// //   return (
// //     <AuthContext.Provider value={{ user, token, loading, login, logout }}>
// //       {children}
// //     </AuthContext.Provider>
// //   );
// // }
// // }
// //   return (    