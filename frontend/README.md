# ConnectCommunity

> Plataforma colaborativa para criação e gestão de grupos de estudo desenvolvida no âmbito da unidade curricular **Sistemas de Informação em Rede (SIR)**.

---

## Descrição

O **ConnectCommunity** é uma aplicação Web que permite a estudantes criarem comunidades de aprendizagem através da gestão de grupos de estudo.

A aplicação disponibiliza funcionalidades para criação de grupos, organização de sessões, partilha de recursos e comunicação entre utilizadores através de chat privado e chat das sessões.

O projeto foi desenvolvido utilizando uma arquitetura cliente-servidor baseada em React, Node.js, Express e MongoDB.

---

## Objetivos

O projeto pretende demonstrar a implementação de uma aplicação Web completa utilizando tecnologias modernas, incluindo:

- Autenticação JWT
- API REST
- MongoDB
- Socket.IO
- Upload de ficheiros
- Gestão de utilizadores
- Comunicação em tempo real

---

## Funcionalidades

### Autenticação

- Registo de utilizadores
- Login
- Logout
- Proteção de rotas
- Perfil do utilizador

---

### Grupos

- Criar grupos
- Consultar grupos
- Editar grupos
- Eliminar grupos
- Entrar em grupos
- Sair de grupos

---

### Sessões

Cada grupo permite criar sessões de estudo.

É possível:

- Criar sessões
- Editar sessões
- Eliminar sessões
- Participar numa sessão
- Chat em tempo real da sessão

---

### Recursos

Cada grupo possui uma área de recursos onde é possível:

- Upload de ficheiros
- Download
- Remoção de recursos

---

### Chat Privado

Os utilizadores autenticados podem:

- Ver utilizadores online
- Iniciar conversas privadas
- Enviar mensagens em tempo real

---

## Tecnologias Utilizadas

### Frontend

- React
- React Router
- Bootstrap 5
- Bootstrap Icons
- Axios
- Socket.IO Client

---

### Backend

- Node.js
- Express
- MongoDB
- Mongoose
- JWT
- Bcrypt
- Socket.IO
- Multer

---

### Base de Dados

MongoDB Atlas

---

### Deploy

Frontend

https://ei-sir-connectcommunity-frontend.onrender.com

Backend

Render

---

## Arquitetura

Frontend (React)

↓

REST API + Socket.IO

↓

Backend (Express)

↓

MongoDB Atlas

---

## Estrutura do Projeto

Frontend

```
frontend/
│
├── components/
├── context/
├── layouts/
├── pages/
├── routes/
├── services/
├── socket.js
└── App.jsx
```

Backend

```
backend/
│
├── config/
├── controllers/
├── middleware/
├── models/
├── routes/
├── sockets/
├── uploads/
├── server.js
└── package.json
```

---

# Como executar o projeto

## 1. Clonar

```bash
git clone https://github.com/<utilizador>/ConnectCommunity.git
```

---

## 2. Backend

```bash
cd backend

npm install

npm start
```

ou

```bash
npm run dev
```

---

## 3. Frontend

```bash
cd frontend

npm install

npm run dev
```

---

## Variáveis de ambiente

Backend

```
PORT=5000

JWT_SECRET=...

MONGO_URI=...
```

Frontend

```
VITE_API_URL=http://localhost:5000/api
```

---

## Deploy

O projeto encontra-se disponível em:

Frontend

https://ei-sir-connectcommunity-frontend.onrender.com

---

## Branches do Projeto

### main

Versão estável do projeto.

Contém apenas funcionalidades testadas e concluídas.

---

### dev

Branch principal de desenvolvimento.

Integra todas as funcionalidades antes de serem publicadas na branch **main**.

---

### feature-auth

Implementação do sistema de autenticação.

Inclui:

- Login
- Registo
- JWT
- Proteção de rotas

---

### feature-groups

Desenvolvimento da gestão de grupos.

Inclui:

- CRUD de grupos
- Participação em grupos

---

### feature-sessions

Implementação da gestão das sessões de estudo.

Inclui:

- CRUD de sessões
- Participantes
- Chat das sessões

---

### feature-resources

Implementação da gestão de recursos.

Inclui:

- Upload
- Download
- Remoção de ficheiros

---

### feature-chat

Implementação da comunicação em tempo real.

Inclui:

- Chat privado
- Utilizadores online
- Socket.IO

---

## Estado Atual

Atualmente o projeto suporta:

- Autenticação
- Gestão de grupos
- Gestão de sessões
- Recursos
- Chat das sessões
- Chat privado
- Utilizadores online

---

## Melhorias Futuras

- Notificações em tempo real
- Pesquisa de grupos
- Sistema de convites
- Mensagens não lidas
- Aplicação mobile
- Sistema de administração
- Recuperação de password
- Upload de imagens de perfil

---

---

# Utilização de Inteligência Artificial

Durante o desenvolvimento do projeto foram utilizadas ferramentas de Inteligência Artificial (IA), nomeadamente o ChatGPT (OpenAI), como apoio ao processo de desenvolvimento.

A utilização da IA incidiu sobretudo nas seguintes atividades:

- Esclarecimento de conceitos relacionados com React, Node.js, Express e MongoDB;
- Apoio na resolução de erros de programação e debugging;
- Sugestões de organização da arquitetura da aplicação;
- Auxílio na implementação de funcionalidades utilizando Socket.IO;
- Revisão e melhoria de pequenos excertos de código e interface.

Importa referir que a IA foi utilizada exclusivamente como ferramenta de apoio ao desenvolvimento. Todas as decisões de implementação, integração entre componentes, testes e validação final das funcionalidades foram realizadas pelo autor do projeto.

## Reflexão

A utilização de ferramentas de IA revelou-se uma mais-valia durante o desenvolvimento, sobretudo na identificação de erros, esclarecimento de dúvidas técnicas e aceleração do processo de aprendizagem de novas tecnologias.

Contudo, verificou-se também que as sugestões fornecidas nem sempre eram diretamente aplicáveis ao projeto, sendo frequentemente necessário adaptar, corrigir e validar o código gerado antes da sua integração. Este processo permitiu compreender melhor as tecnologias utilizadas e desenvolver competências de análise crítica e resolução de problemas.

Assim, a IA foi encarada como um assistente de apoio ao desenvolvimento e não como um substituto do processo de programação, mantendo sempre o autor a responsabilidade pela implementação, integração e validação de todas as funcionalidades da aplicação.

## Autor

Gilberto Parente

Licenciatura em Engenharia Informática

Instituto Politécnico de Viana do Castelo

Projeto desenvolvido no âmbito da unidade curricular **Sistemas de Informação em Rede**.