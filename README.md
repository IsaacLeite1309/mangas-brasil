# MangaBrasil - Catálogo Nacional de Mangás

## Sobre o Projeto
O **MangaBrasil** é uma plataforma dedicada à catalogação e consulta de informações técnicas sobre mangás publicados no mercado editorial brasileiro. O projeto visa centralizar dados como editora, formato, status de publicação e preços de capa, auxiliando colecionadores e leitores a navegarem pela diversidade de títulos nacionais.

Este projeto faz parte da avaliação contínua da disciplina de **Desenvolvimento Front-End II**, sendo desenvolvido de forma incremental ao longo de três Sprints.

---

## Status da Sprint 1: Pré-Projeto
Nesta fase inicial, estabelecemos a fundação da aplicação utilizando **React + Vite**. O foco foi a estruturação da interface através de componentes reutilizáveis, gerenciamento de estado inicial e manipulação de eventos.

### Funcionalidades Implementadas:
- [x] Configuração do ambiente com Vite e React.
- [x] Estruturação de componentes base: `Header`, `SearchBar`, `MangaList` e `MangaCard`.
- [x] Renderização dinâmica de lista de objetos (Mapeamento de dados).
- [x] Gerenciamento de estado de busca com `useState`.
- [x] Interface responsiva e ocupando 100% da viewport.

---

## Status da Sprint 2: SPA, Formulários e Persistência 
Nesta segunda fase, o aplicativo evoluiu para uma **Single Page Application (SPA)** funcional, implementando lógica de estado complexa e persistência de dados no navegador.

### Funcionalidades Implementadas na Sprint 2:
- [x] **Navegação SPA:** Sistema de rotas customizado utilizando `useState` e renderização condicional para alternar entre "Catálogo", "Cadastro" e "Sobre" sem refresh.
- [x] **Formulários Controlados:** Implementação de formulário de cadastro com múltiplos inputs (Título, Autor, Editora, Edição/Formato, URL da Capa e Sinopse) gerenciados por um único objeto de estado.
- [x] **Persistência com LocalStorage:** Desenvolvimento de um **Custom Hook** (`useLocalStorage`) para sincronizar o acervo de mangás com o armazenamento local do navegador.
- [x] **Renderização Dinâmica:** Listagem automática de cards baseada no array de dados do LocalStorage utilizando o método `.map()`.
- [x] **Filtro de Busca Reativo:** Sistema de busca em tempo real implementado no componente `MangaList` utilizando o método `.filter()`.
- [x] **Página de Detalhes:** Visualização expandida da obra com todas as informações técnicas e capa ampliada, utilizando fluxo de "State Lifting".
- [x] **Arquitetura de Gitflow:** Organização do desenvolvimento através de branches de `feature`, `develop` e Pull Requests no GitHub.

---

## Tecnologias Utilizadas
- **React.js**: Biblioteca principal para construção da UI.
- **Vite**: Ferramenta de build e servidor de desenvolvimento.
- **CSS3**: Estilização modularizada por componente.
- **React Router Dom**: (Instalado) Preparado para navegação na Sprint 2.
- **Axios**: (Instalado) Preparado para consumo de API na Sprint 3.

## Como Rodar o Projeto

Para clonar e executar esta aplicação em sua máquina, você precisará do [Git](https://git-scm.com) e do [Node.js](https://nodejs.org/) instalados.

```bash
# 1. Clone o repositório
$ git clone https://github.com/IsaacLeite1309/mangas-brasil.git

# 2. Acesse a pasta do projeto
$ cd mangas-brasil

# 3. Instale as dependências
$ npm install

# 4. Inicie o servidor de desenvolvimento
$ npm run dev