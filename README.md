# MangaBrasil

MangaBrasil e uma aplicacao Full-Stack para cadastro, consulta e gerenciamento de um acervo de mangas. O projeto evoluiu ao longo das sprints de uma SPA em React com persistencia em `localStorage` para um sistema integrado com Front-End React, API RESTful em Node.js/Express e banco de dados MongoDB Atlas.

## Visao Geral

O sistema permite:

- cadastrar mangas no acervo;
- listar obras cadastradas;
- buscar mangas por titulo, autor ou editora;
- visualizar detalhes de uma obra;
- editar dados cadastrados;
- remover obras do acervo.

Na Sprint 3, o `localStorage` deixou de ser a fonte principal de dados. O Front-End passou a consumir uma API RESTful propria, e a persistencia passou a ser feita no MongoDB Atlas.

## Estrutura Do Projeto

```text
mangas-brasil/
|-- backend/
|   |-- src/
|   |   |-- models/
|   |   |   `-- mangaModel.js
|   |   |-- routes/
|   |   |   |-- mangaRoutes.js
|   |   |   `-- mangaRoutes.test.js
|   |   `-- app.js
|   |-- tests/
|   |   `-- rootInterface.selenium.js
|   |-- .env.example
|   |-- eslint.config.js
|   |-- jest.config.js
|   |-- package.json
|   `-- package-lock.json
|-- frontend/
|   |-- public/
|   |-- src/
|   |   |-- components/
|   |   |-- services/
|   |   |   `-- api.js
|   |   |-- App.jsx
|   |   |-- index.css
|   |   `-- main.jsx
|   |-- .env.example
|   |-- eslint.config.js
|   |-- package.json
|   `-- vite.config.js
|-- .github/
|   `-- workflows/
|       |-- backend-ci.yml
|       `-- backend-cd.yml
`-- README.md
```

## Tecnologias Utilizadas

### Front-End

- React
- Vite
- React Router DOM
- Axios
- CSS por componente

### Back-End

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- Dotenv
- CORS

### Qualidade, Testes E DevOps

- ESLint
- Jest
- Supertest
- Selenium WebDriver
- GitHub Actions
- PM2
- AWS EC2
- Relatorio de cobertura de testes

## Rotas Do Front-End

```text
/catalogo      Catalogo de mangas
/cadastro      Cadastro de nova obra
/mangas/:id    Detalhes de uma obra
/editar/:id    Edicao de uma obra
/sobre         Informacoes sobre o projeto
```

A rota `/` redireciona para `/catalogo`.

## Endpoints Da API

Base local da API:

```text
http://localhost:3001/api
```

Rotas principais:

```text
GET    /                 Informacoes da API
GET    /api/health       Verifica se a API esta online
GET    /api/mangas       Lista todos os mangas
POST   /api/mangas       Cadastra um novo manga
GET    /api/mangas/:id   Busca um manga por ID
PUT    /api/mangas/:id   Atualiza um manga
DELETE /api/mangas/:id   Remove um manga
```

## Como Rodar O Projeto

Para executar o projeto localmente, e necessario ter instalado:

- Git
- Node.js
- npm
- uma URI valida do MongoDB Atlas

## Configurando O Back-End

Acesse a pasta do backend:

```bash
cd backend
```

Instale as dependencias:

```bash
npm install
```

Crie um arquivo `.env` dentro da pasta `backend`, seguindo o exemplo de `.env.example`:

```env
MONGODB_URI=mongodb+srv://usuario:senha@cluster.mongodb.net/mangas-brasil?retryWrites=true&w=majority
PORT=3001
```

Inicie a API:

```bash
npm run dev
```

Se estiver tudo certo, a API ficara disponivel em:

```text
http://localhost:3001
```

Teste rapido:

```text
http://localhost:3001/api/health
```

## Configurando O Front-End

Em outro terminal, acesse a pasta do frontend:

```bash
cd frontend
```

Instale as dependencias:

```bash
npm install
```

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

Abra no navegador:

```text
http://localhost:5173/catalogo
```

## Variaveis De Ambiente Do Front-End

O Front-End possui um arquivo `.env.example` com a URL base da API:

```env
VITE_API_URL=http://localhost:3001/api
```

Se o arquivo `.env` do Front-End nao existir, a aplicacao usa `http://localhost:3001/api` como valor padrao.

## Scripts Do Back-End

Dentro da pasta `backend`:

```bash
npm run dev
```

Inicia a API em modo de desenvolvimento.

```bash
npm run start
```

Inicia a API em modo padrao.

```bash
npm run lint
```

Executa a analise estatica com ESLint.

```bash
npm run test
```

Executa os testes com Jest.

```bash
npm run test:coverage
```

Executa os testes e gera o relatorio de cobertura.

```bash
npm run test:interface
```

Executa o teste de interface com Selenium.

## Scripts Do Front-End

Dentro da pasta `frontend`:

```bash
npm run dev
```

Inicia o Vite em modo de desenvolvimento.

```bash
npm run build
```

Gera a versao de producao do Front-End.

```bash
npm run lint
```

Executa a analise estatica com ESLint.

```bash
npm run preview
```

Executa uma previa local da build de producao.

## Testes E Cobertura

O Back-End possui testes automatizados com Jest e Supertest para as rotas de mangas.

Para rodar:

```bash
cd backend
npm run test:coverage
```

Durante a validacao local, os testes cobriram os principais fluxos:

- cadastro de manga;
- listagem de mangas;
- busca por ID;
- atualizacao;
- remocao;
- erros de validacao;
- ID invalido;
- manga nao encontrado;
- rota de health check.

A cobertura minima configurada e de 80%.

### Teste De Interface Com Selenium

Além dos testes unitarios com Jest e Supertest, o Back-End possui um teste de interface com Selenium.

O teste sobe a aplicacao localmente, abre a rota raiz da API em um navegador Chrome headless e valida se a resposta contem as informacoes da API online.

Para rodar:

```bash
cd backend
npm install
npm run test:interface
```

No GitHub Actions, esse teste e executado no workflow de CI apos o lint e a cobertura de testes.

## CI/CD E Deploy

O repositorio possui dois workflows na pasta `.github/workflows`.

### Continuous Integration

O workflow `.github/workflows/backend-ci.yml` roda automaticamente em Pull Requests para a branch `develop`.

Etapas principais:

- instala as dependencias do Back-End;
- executa a analise estatica com ESLint;
- executa os testes unitarios com Jest/Supertest;
- gera o relatorio de cobertura;
- instala o Selenium WebDriver;
- executa o teste de interface com Selenium.

### Deploy Automatizado Na EC2

O workflow `.github/workflows/backend-cd.yml` roda automaticamente quando a branch `develop` recebe atualizacao.

Durante o deploy, o GitHub Actions acessa a instancia EC2 via SSH, atualiza o codigo do projeto, instala as dependencias do Back-End e reinicia a aplicacao com PM2.

Etapas principais:

- conecta na EC2 usando secrets do GitHub;
- acessa a pasta do Back-End configurada em `EC2_BACKEND_PATH`;
- executa `git fetch` e `git reset --hard origin/develop`;
- executa `npm install`;
- reinicia a aplicacao com `pm2`;
- valida se a API esta online com `GET /api/health`.

A aplicacao publicada pode ser acessada em:

```text
http://18.229.164.139/
```

## Evolucao Por Sprint

### Sprint 1

- Criacao da base React com Vite.
- Componentizacao inicial.
- Renderizacao dinamica de lista.
- Busca local.

### Sprint 2

- SPA com navegacao por estado.
- Formulario controlado.
- Persistencia com `localStorage`.
- Hook customizado `useLocalStorage`.
- Tela de detalhes.

### Sprint 3

- Reorganizacao do repositorio em `/frontend` e `/backend`.
- Criacao de API RESTful com Node.js, Express e MongoDB Atlas.
- CRUD completo no Back-End.
- Integracao do Front-End com API usando Axios.
- Substituicao do `localStorage` pelo banco MongoDB.
- Rotas reais com React Router.
- Testes automatizados com Jest/Supertest.
- Teste de interface com Selenium.
- ESLint no Front-End e Back-End.
- CI/CD com GitHub Actions e deploy automatizado na EC2.

## Integrantes

- Isaac da Silva Leite
- Lucas Dalla Porta Freitas
- Gabriel Mourgues Moreira
- Klaudenilson Sampaio Alves
- Higor Pessoa da Silva
