import React, { useEffect, useState } from 'react';
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
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '@/routes/types';
import { getPostById, updatePost } from '@/services/mock-post';
import theme from '@/styles/theme';
import Footer from '@/components/Footer';

type RouteProps = RouteProp<RootStackParamList, 'edit-post'>;

export default function EditPostScreen() {
  const route = useRoute<RouteProps>();
  const navigation = useNavigation();
  const { id } = route.params;

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState<'success' | 'danger'>('danger');
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    getPostById(id).then((post) => {
      if (post) {
        setTitle(post.title);
        setContent(post.content);
      }
    });
  }, [id]);

  const showAlertCustom = (message: string, type: 'success' | 'danger') => {
    setAlertMessage(message);
    setAlertType(type);
    setShowAlert(true);
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
        }).start(() => setShowAlert(false));
      }, 2000);
    });
  };

  const handleUpdate = async () => {
    if (!title || !content) {
      showAlertCustom('Erro: Preencha todos os campos.', 'danger');
      return;
    }

    await updatePost(id, { title, content });

    showAlertCustom('Post atualizado com sucesso!', 'success');

    setTimeout(() => {
      navigation.goBack();
    }, 2200); // aguarda o alerta sumir antes de voltar
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
        {/* ALERTA CUSTOMIZADO */}
        {showAlert && (
          <Animated.View
            style={[
              styles.alertBox,
              alertType === 'danger' ? styles.alertDanger : styles.alertSuccess,
              { opacity: fadeAnim },
            ]}
          >
            <Text style={styles.alertText}>{alertMessage}</Text>
          </Animated.View>
        )}

        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.topButtons}>
            <TouchableOpacity onPress={handleBack} style={styles.iconButton}>
              <Ionicons name="arrow-back" size={24} color={theme.colors.white} />
            </TouchableOpacity>
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

          <TouchableOpacity style={styles.button} onPress={handleUpdate}>
            <Text style={styles.buttonText}>Atualizar</Text>
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
    marginBottom: theme.spacing.md,
  },
  iconButton: {
    backgroundColor: theme.colors.secondary,
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius,
    alignSelf: 'flex-start',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: theme.typography.body.fontSize,
    fontWeight: theme.typography.body.fontWeight as any,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
    marginTop: theme.spacing.sm,
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
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.borderRadius,
    alignItems: 'center',
    marginTop: theme.spacing.lg,
  },
  buttonText: {
    color: theme.colors.white,
    fontSize: theme.typography.subheading.fontSize,
    fontWeight: theme.typography.subheading.fontWeight as any,
  },
  alertBox: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : 30,
    alignSelf: 'center',
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
  alertText: {
    color: theme.colors.white,
    fontWeight: '600',
    fontSize: theme.typography.body.fontSize,
  },
  alertDanger: {
    backgroundColor: theme.colors.danger,
  },
  alertSuccess: {
    backgroundColor: theme.colors.success,
  },
});
