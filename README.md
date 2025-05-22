
# 📱 FIAP Tech Challenge - Blogging App Mobile

Aplicação mobile desenvolvida em **React Native com Expo**, como parte do desafio técnico da FIAP. Esta é a versão mobile do Blogging App, permitindo a criação, edição e visualização de posts de forma prática, segura e responsiva.

---

## 📄 Descrição

Este app mobile replica as funcionalidades principais da aplicação web, com interface otimizada para dispositivos móveis. Ele consome a API REST compartilhada entre as versões web e mobile e é desenvolvido com uma arquitetura limpa baseada em **telas, componentes reutilizáveis e Context API**.

Além disso, o projeto conta com:
- ✅ Validação de campos em formulários (login, cadastro, criação e edição de posts)
- 🚫 Tratativa de erros (com mensagens claras ao usuário)
- 🔐 Autenticação robusta com controle de sessão e roles (aluno/professor)

---

## ✅ Funcionalidades

- 🔐 Autenticação com token JWT (persistência via AsyncStorage)
- 👥 Cadastro de usuários
- 🗂 Listagem de posts
- 🔎 Visualização e busca de postagens
- ➕ Criação e ✏️ edição de posts
- 👮 Controle de acesso por tipo de usuário (aluno ou professor)
- 📱 Layout responsivo seguindo o padrão visual da FIAP ON

---

## 🛠 Tecnologias Utilizadas

- React Native (com Expo)
- TypeScript
- React Navigation
- AsyncStorage
- Context API
- Styled Components / Tailwind CSS (se aplicável)
- Integração com API RESTful

---

## 📁 Estrutura do Projeto

```
src/
├── components/        # Componentes reutilizáveis
├── context/           # Autenticação e roles
├── hooks/             # Hooks personalizados
├── routes/            # Navegação pública e privada
├── screens/           # Telas da aplicação
│   ├── AddPost/
│   ├── Cadastro/
│   ├── Dashboard/
│   ├── EditPost/
│   ├── Login/
│   ├── PostDetails/
│   └── ViewPost/
├── services/          # Comunicação com a API
├── styles/            # Tema, cores e tipografia
└── App.tsx            # Arquivo principal
```

---

## 🚀 Como Executar o Projeto

### 📌 Pré-requisitos

- Node.js (v16+)
- Expo CLI (`npm install -g expo-cli`)
- Yarn, npm, pnpm ou bun
- Docker + Docker Compose (para executar a API)
- **Genymotion** (caso utilize um emulador Android alternativo)

---

### 📥 Clonando os Repositórios

```bash
# Mobile
git clone https://github.com/dearluana/fiap-tech-challenge-blogging-app-mobile.git

# API
git clone https://github.com/gturcheti/fiap-tech-challenge-blogging-api.git
```

---

### 📦 Instalando Dependências

Acesse cada pasta e execute:

```bash
npm install
# ou
yarn install
```

---

### ⚙️ Configuração do Back-End

1. Configure o `main.ts` com CORS:

```ts
app.enableCors({
  origin: 'http://localhost:3001',
  credentials: true,
});
```

2. Ajuste a porta de execução:

```ts
await app.listen(process.env.PORT || 3000);
```

3. Crie um arquivo `.env` com:

```env
NODE_ENV=development
PORT=3000
DATABASE=postgres
DATABASE_PASSWORD=pass
DATABASE_PORT=5432
JWT_SECRET=minhajwtsecretauth
```

---

### 🐳 Executando a API com Docker

```bash
docker-compose up --build
```

---

### 🌐 Front-End Mobile - React Native

Inicie com install para instalar todas as dependências:

```bash
npm install
```

---

Se necessário alterar o ip da API, altere no arquivo `.env` na raiz do proejeto para o desejado:

EXPO_PUBLIC_API_URL=http://10.0.3.2:3000 --> altere aqui

## 📱 Executando o Mobile com Expo + Genymotion

### 1. Inicie o Genymotion:

Abra o Genymotion Desktop, selecione um dispositivo virtual Android (ex: Pixel 4, Android 11) e o inicie.

### 2. Conecte o Genymotion ao Expo

Verifique se o dispositivo virtual está conectado:

```bash
adb devices
```

Se aparecer algo como:

```
192.168.x.x:5555	device
```

Você está pronto!

### 3. Rode o App com Expo CLI

Dentro do projeto mobile:

```bash
expo start --android
```

O Expo abrirá o app diretamente no Genymotion.

> ⚠️ Caso o Genymotion não abra automaticamente, clique em “a” no terminal para forçar o envio para o Android.

---

## 🔐 Autenticação JWT

- O token JWT é armazenado com segurança via `AsyncStorage`.
- As requisições autenticadas utilizam o token no header `Authorization`.

```ts
const response = await fetch('/api/protected-route', {
  headers: {
    Authorization: `Bearer ${token}`
  }
});
```

---

## 👤 Contribuidores

- **Luana Silva** - [@dearluana](https://github.com/dearluana)
- **Gabriel Turcheti** - [@gturcheti](https://github.com/gturcheti)
- **Hericles Thomas** - [@hericlesthomas](https://github.com/hericlesthomas)

---

## 📝 Licença

Projeto acadêmico, desenvolvido para fins educacionais no contexto do Tech Challenge da FIAP.
