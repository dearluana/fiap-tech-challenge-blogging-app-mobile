import * as Yup from 'yup';

export const createUserSchema = Yup.object().shape({
  username: Yup.string().required('Nome de usuário é obrigatório'),
  password: Yup.string()
    .min(8, 'A senha deve ter pelo menos 8 caracteres')
    .matches(/[A-Z]/, 'A senha deve conter pelo menos uma letra maiúscula')
    .matches(/[a-z]/, 'A senha deve conter pelo menos uma letra minúscula')
    .matches(/[0-9]/, 'A senha deve conter pelo menos um número')
    .matches(/[^a-zA-Z0-9]/, 'A senha deve conter pelo menos um caractere especial'),
  confirmPassword: Yup.string()
});

export const userSchema = Yup.object().shape({
    username: Yup.string().required('Informe o nome de usuário'),
    password: Yup.string().required('Informe a senha do usuário'),
  });