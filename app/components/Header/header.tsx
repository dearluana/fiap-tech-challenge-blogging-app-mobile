import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import styles from './styles';  // Importando o arquivo de estilos

type RootStackParamList = {
  dashboard: undefined;
  login: undefined;
};

const Header = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const navigateTo = (screen: 'dashboard' | 'login') => {
    navigation.navigate(screen);
  };

  return (
    <View style={styles.headerContainer}>
      <Text style={styles.brand}>Blogging App</Text>
      <View style={styles.navLinks}>
        <TouchableOpacity onPress={() => navigateTo('dashboard')} style={styles.navLink}>
          <Text style={styles.navLinkText}>Dashboard</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigateTo('login')} style={styles.navLink}>
          <Text style={styles.navLinkText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;
