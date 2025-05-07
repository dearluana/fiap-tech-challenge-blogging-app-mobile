import * as Yup from 'yup';

export const postSchema = Yup.object().shape({
  author: Yup.number().required('Por favor, informe o autor'),
  title: Yup.string().required('Por favor, informe um título'),
  content: Yup.string().required('Por favor, preencha o conteúdo do post'),
});