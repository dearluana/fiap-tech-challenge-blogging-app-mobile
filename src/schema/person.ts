import * as Yup from 'yup';

export const personSchema = Yup.object().shape({
  name: Yup.string().required('Nome é obrigatório'),
  surname: Yup.string().required('Sobrenome é obrigatório'),
  email: Yup.string().email('Email inválido').required('Email é obrigatório'),
  professor: Yup.boolean().required('Status de professor é obrigatório'),
});