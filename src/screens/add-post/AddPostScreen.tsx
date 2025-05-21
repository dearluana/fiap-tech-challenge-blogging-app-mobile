import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Animated,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '@/routes/types';
import { addPost } from '@/services/mock-post';
import theme from '@/styles/theme';
import { Ionicons } from '@expo/vector-icons';
import Footer from '@/components/Footer';

type NavProp = StackNavigationProp<RootStackParamList, 'add-post'>;

export default function AddPostScreen() {
  const navigation = useNavigation<NavProp>();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [fadeAnim] = useState(new Animated.Value(0));
  const canGoBack = navigation.canGoBack();

  const showAlert = (message: string, type: 'success' | 'error') => {
    setErrorMessage(message);
    if (type === 'success') {
      setShowSuccess(true);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setTimeout(() => {
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }).start(() => {
            setShowSuccess(false);
            navigation.navigate('dashboard');
          });
        }, 2000);
      });
    } else {
      setShowError(true);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setTimeout(() => {
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }).start(() => {
            setShowError(false);
          });
        }, 3000);
      });
    }
  };

  const handleCreate = async () => {
    if (!title || !content) {
      showAlert('Erro: Preencha todos os campos.', 'error');
      return;
    }

    await addPost({ title, content });

    showAlert('Post adicionado com sucesso!', 'success');

    setTitle('');
    setContent('');
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      style={styles.keyboardAvoiding}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.container}>
        {/* ALERTA SUCCESS */}
        {showSuccess && (
          <Animated.View style={[styles.successBox, { opacity: fadeAnim }]}>
            <Text style={styles.successText}>{errorMessage}</Text>
          </Animated.View>
        )}

        {/* ALERTA ERROR */}
        {showError && (
          <Animated.View style={[styles.errorBox, { opacity: fadeAnim }]}>
            <Text style={styles.errorText}>{errorMessage}</Text>
          </Animated.View>
        )}

        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.topButtons}>
            {canGoBack && (
              <TouchableOpacity onPress={handleBack} style={styles.iconButton}>
                <Ionicons name="arrow-back" size={24} color={theme.colors.white} />
              </TouchableOpacity>
            )}
          </View>

          <Text style={styles.label}>Título</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={setTitle}
            placeholder="Digite o título"
            placeholderTextColor={theme.colors.gray}
          />

          <Text style={styles.label}>Conteúdo</Text>
          <TextInput
            style={[styles.input, styles.textarea]}
            value={content}
            onChangeText={setContent}
            placeholder="Digite o conteúdo"
            placeholderTextColor={theme.colors.gray}
            multiline
            numberOfLines={6}
          />

          <TouchableOpacity style={styles.button} onPress={handleCreate}>
            <Text style={styles.buttonText}>Criar Post</Text>
          </TouchableOpacity>
        </ScrollView>

        <Footer />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardAvoiding: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    justifyContent: 'space-between',
  },
  scrollContainer: {
    padding: theme.spacing.lg,
  },
  topButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: theme.spacing.lg,
  },
  iconButton: {
    backgroundColor: theme.colors.secondary,
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: theme.typography.body.fontSize,
    fontWeight: theme.typography.body.fontWeight as any,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  input: {
    backgroundColor: theme.colors.secondary,
    borderColor: theme.colors.border,
    borderWidth: 1,
    borderRadius: theme.borderRadius,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    color: theme.colors.text,
    fontSize: theme.typography.body.fontSize,
  },
  textarea: {
    height: 120,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius,
    alignItems: 'center',
    marginTop: theme.spacing.md,
  },
  buttonText: {
    color: theme.colors.white,
    fontSize: theme.typography.subheading.fontSize,
    fontWeight: theme.typography.subheading.fontWeight as any,
  },
  successBox: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : 30,
    alignSelf: 'center',
    backgroundColor: theme.colors.success,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.borderRadius,
    zIndex: 999,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  successText: {
    color: theme.colors.white,
    fontWeight: '600',
    fontSize: theme.typography.body.fontSize,
  },
  errorBox: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : 30,
    alignSelf: 'center',
    backgroundColor: theme.colors.danger,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.borderRadius,
    zIndex: 999,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  errorText: {
    color: theme.colors.white,
    fontWeight: '600',
    fontSize: theme.typography.body.fontSize,
  },
});
