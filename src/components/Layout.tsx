import React, { ReactNode } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import Header from './Header';
import Footer from './Footer';
import theme from '@/styles/theme';

interface LayoutProps {
  children: ReactNode;
  userName?: string;
  onLogout?: () => void;
  footer?: ReactNode;
}

export default function Layout({ children, userName, onLogout, footer }: LayoutProps) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <Header userName={userName} onLogout={onLogout} />
      <View style={styles.content}>
        {children}
      </View>
      {footer || <Footer />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    flex: 1,
    padding: theme.spacing.lg,
  },
});