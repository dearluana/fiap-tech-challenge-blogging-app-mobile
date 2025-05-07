import React from 'react';
import { View, Image, ScrollView } from 'react-native';
import LoginForm from './LoginForm';
import styles from './styles';

export default function LoginScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={require('@/assets/logo.png')} style={styles.logo} resizeMode="contain" />
      <LoginForm />
    </ScrollView>
  );
}
// src/screens/Login/styles.ts      