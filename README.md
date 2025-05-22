# 📱 FIAP Tech Challenge - Blogging App Mobile

Aplicação mobile para blog desenvolvida em **React Native com Expo**, como parte do desafio técnico da FIAP.

---

## 📄 Descrição

Este projeto é a **versão mobile** do Blogging App, criado para permitir a criação, edição e visualização de posts de forma prática e intuitiva. A aplicação mobile deve ser responsiva, acessível e fácil de navegar, permitindo interação com os endpoints REST já existentes no back-end e na aplicação web dos projetos anteriores.

A aplicação utiliza tecnologias modernas como **React Native**, **TypeScript**, **Context API** para gerenciamento de estado, **AsyncStorage** para persistência de dados (token de autenticação), e uma arquitetura limpa baseada em **telas e componentes reutilizáveis**.

---

## ✅ Funcionalidades

- 🔐 Autenticação de usuários com persistência de login via token
- 📝 Cadastro de novos usuários
- 🗂 Listagem de posts
- 🔎 Visualização detalhada de posts
- ➕ Adição e ✏️ edição de posts
- 🔒 Controle de acesso baseado em roles (aluno, professor)
- 🎨 Interface responsiva e com padrão visual alinhado à versão web

---

## 🛠 Tecnologias

- React Native
- Expo
- TypeScript
- React Navigation
- AsyncStorage
- Context API
- Styled Components / Tailwind CSS (se aplicável)
- Integração com API REST (em desenvolvimento)

---

## 🔧 Requisitos Técnicos

### 1. Desenvolvimento em React Native com Expo

- ⚙️ Utilizar React Native com Expo.
- ⚙️ Estrutura baseada em **TypeScript**, componentes funcionais e React Hooks.
- ⚙️ Organização modular: `screens`, `components`, `context`, `services`, `routes`, `styles`, `hooks`.

### 2. Estilização e Design Responsivo

- 🎨 Estilos globais centralizados: `theme.ts`, `colors.ts`, `typography.ts`.
- 📱 Layout responsivo, adaptado para diferentes tamanhos de tela.
- ✨ Alinhamento visual com a versão web (seguindo o padrão da FIAP ON).

### 3. Autenticação e Controle de Acesso

- 🔐 Autenticação com JWT e armazenamento de token via **AsyncStorage**.
- 🔄 Gerenciamento de autenticação e role com Context API.
- 🚫 Proteção de rotas com base no tipo de usuário (aluno ou professor).

### 4. Integração com o Back-End

- 🔗 Comunicação com API RESTful para criar, editar, visualizar e deletar posts.
- 📡 Consumo da API com `fetch` ou `axios` via serviços centralizados.
- ⏳ Dados **mockados** enquanto a integração final está em andamento.

### 5. Navegação

- 🧭 Navegação com **React Navigation**, rotas públicas e autenticadas.
- 📂 Separação clara entre fluxos autenticados e não autenticados.
- 🔁 Navegação fluida entre telas de login, cadastro, dashboard, post details, etc.

---

## 🗂 Estrutura do Projeto

```
src/
├── components/        # Componentes reutilizáveis
├── context/           # Context API (auth, role)
├── hooks/             # Hooks personalizados
├── routes/            # Configuração de rotas
├── screens/           # Telas principais da aplicação
│   ├── Dashboard/
│   ├── AddPost/
│   ├── EditPost/
│   ├── PostDetails/
│   ├── ViewPost/
│   ├── Login/
│   └── Cadastro/
├── services/          # Funções para comunicação com a API
├── styles/            # Temas, cores e tipografia
└── App.tsx            # Ponto de entrada da aplicação
```

---

## 🚀 Instalação e Execução

### 📌 Pré-requisitos

Certifique-se de ter instalado:

- Node.js (v16 ou superior)
- Expo CLI (`npm install -g expo-cli`)
- Gerenciador de pacotes (npm, yarn, pnpm ou bun)
- Docker e Docker Compose (para back-end)

---

### 📥 Clonar os Repositórios

```bash
# Aplicação mobile (este repositório)
git clone https://github.com/dearluana/fiap-tech-challenge-blogging-app-mobile.git

# Aplicação web
git clone https://github.com/gturcheti/fiap-tech-challenge-blogging-app-web.git

# API back-end
git clone https://github.com/gturcheti/fiap-tech-challenge-blogging-api.git
```

---

### 📦 Instalar as Dependências

Dentro de cada repositório, instale as dependências:

```bash
npm install
# ou
yarn install
```

---

### ⚙️ Configuração do Back-End

No arquivo `main.ts`, configure o CORS corretamente:

```ts
app.enableCors({
  origin: 'http://localhost:3001', // Porta da aplicação web/mobile
  credentials: true,
});
```

Ajuste a porta do servidor:

```ts
await app.listen(process.env.PORT || 3000);
```

Crie o arquivo `.env` com as variáveis:

```env
NODE_ENV=development
PORT=3000
DATABASE=postgres
DATABASE_PASSWORD=pass
DATABASE_PORT=5432
JWT_SECRET=minhajwtsecretauth
```

---

### 🐳 Executando o Back-End com Docker

```bash
docker-compose up --build
```

---

### 🔧 Configuração do Front-End Web

Crie um `.env` com a URL da API:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

Inicie o front-end web:

```bash
npm run dev
# ou
yarn dev
```

---

## 🔐 Autenticação JWT

- O usuário faz login e recebe um token JWT.
- O token é armazenado com segurança (AsyncStorage na versão mobile).
- As requisições autenticadas usam o token no cabeçalho `Authorization`.

**Exemplo:**

```ts
const response = await fetch('/api/protected-route', {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${token}`
  }
});
```

---

## 📬 Contato

- **Hericles Thomas** - [GitHub](https://github.com/hericlesthomas)
- **Gabriel Turcheti** - [GitHub](https://github.com/gturcheti)
- **Luana Silva** - [GitHub](https://github.com/dearluana)

---

## 📝 Licença

Este projeto é de uso acadêmico e segue as diretrizes educacionais da FIAP.
