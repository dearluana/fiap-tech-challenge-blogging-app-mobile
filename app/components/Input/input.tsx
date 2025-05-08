import React from 'react';
import { TextInput, View, Text } from 'react-native';
import styles from './styles'; 

const Input = ({ label, value, onChangeText, secureTextEntry = false }) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

export default Input;
