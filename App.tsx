import { AuthProvider } from './src/context/AuthContext';
import Routes from './src/routes';

export default function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
    
  );
}
