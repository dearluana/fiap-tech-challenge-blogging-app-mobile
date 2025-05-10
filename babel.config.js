module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      '@babel/plugin-syntax-import-assertions',
      // outros plugins se necessário
    ],
  };
};
// Este arquivo é usado para configurar o Babel, que é um transpilador JavaScript usado pelo Expo para converter o código moderno em uma versão compatível com navegadores mais antigos.
// O Babel permite o uso de recursos modernos do JavaScript, como importações dinâmicas e sintaxe ES6+.
// O plugin '@babel/plugin-syntax-import-assertions' é usado para habilitar a sintaxe de importação de asserções, que é uma nova funcionalidade do JavaScript.
// O Babel é uma ferramenta essencial para garantir que o código JavaScript funcione em uma ampla gama de ambientes, incluindo navegadores mais antigos e dispositivos móveis.
// O Expo é uma plataforma para desenvolvimento de aplicativos móveis usando React Native, e o Babel é uma parte importante do processo de construção do aplicativo.
// O arquivo babel.config.js é onde você pode configurar o Babel para o seu projeto Expo.
// O Babel é uma ferramenta poderosa que permite usar as últimas funcionalidades do JavaScript sem se preocupar com a compatibilidade com navegadores mais antigos.
// O Babel converte o código moderno em uma versão que pode ser executada em ambientes mais antigos, garantindo que seu aplicativo funcione corretamente em uma ampla gama de dispositivos e navegadores.
// O Babel é uma ferramenta essencial para o desenvolvimento moderno de JavaScript, especialmente em projetos que usam frameworks como React e React Native.
// O Babel é amplamente utilizado em projetos de front-end para garantir que o código JavaScript seja compatível com uma ampla gama de navegadores e dispositivos.
// O Babel é uma ferramenta poderosa que permite usar as últimas funcionalidades do JavaScript sem se preocupar com a compatibilidade com navegadores mais antigos.   