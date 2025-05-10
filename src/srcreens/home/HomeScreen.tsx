import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AppLayout from '@/components/AppLayout';
import styles from './styles'; // Importando o arquivo de estilos

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <AppLayout>
      <Text style={styles.title}>Bem-vindo ao Blog!</Text>
      <Text style={styles.subtitle}>Acesse sua conta ou crie uma nova para continuar.</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('login' as never)} // Navegação para a tela de login
      >
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.secondaryButton]} // Aplicando o estilo secundário ao segundo botão
        onPress={() => navigation.navigate('cadastro' as never)} // Navegação para a tela de cadastro
      >
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
    </AppLayout>
  );
}
//           keyExtractor={(item) => item.id.toString()}
//           renderItem={({ item }) => <PostItem post={item} />}
//           contentContainerStyle={{ paddingBottom: 20 }}
//           showsVerticalScrollIndicator={false}     