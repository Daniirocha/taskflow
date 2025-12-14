![License](https://img.shields.io/badge/license-MIT-brightgreen.svg)
![Next.js](https://img.shields.io/badge/next-16.0.10-informational)
![React](https://img.shields.io/badge/react-19.2.0-informational)
![PNPM](https://img.shields.io/badge/package%20manager-pnpm-blue)

# TaskFlow Pro

TaskFlow Pro é uma aplicação web moderna para gerenciamento de projetos e tarefas com foco em produtividade e usabilidade. Inspirada em metodologias Kanban, traz uma experiência fluida com um design minimalista e interações agradáveis.

## 🔍 Sumário
- [Funcionalidades](#-funcionalidades)
- [Tecnologias](#-tecnologias)
- [Demonstração](#-demonstra%C3%A7%C3%A3o)
- [Instalação e Execução](#-instala%C3%A7%C3%A3o-e-execução)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Autor](#-autor)
- [Licença](#-licença)

## ✨ Funcionalidades
- Dashboard com métricas e visualização de projetos
- Kanban board com colunas (A Fazer / Em Progresso / Concluído)
- Drag & Drop suave entre colunas e sincronização imediata
- CRUD completo para projetos e tarefas (modais de criação/edição)
- Integração com Prisma para persistência (SQLite por padrão em dev)
- Design responsivo com microinterações usando Framer Motion

## 🛠️ Tecnologias
- Frontend: Next.js (App Router), React, TypeScript, Tailwind CSS
- UI primitives: shadcn/ui, Radix
- Animações: Framer Motion
- Backend: Next.js API Routes, Prisma ORM
- DB local (desenvolvimento): SQLite (prisma)

## 🎥 Demonstração
Insira GIFs e screenshots na pasta `public/` e substitua os links abaixo.

- Dashboard: `public/gifs/dashboard.gif`
- Criação de Projeto: `public/gifs/create-project.gif`
- Board Kanban (Drag & Drop): `public/gifs/kanban.gif`

## 📦 Estrutura do Projeto (resumida)
```
app/
├─ api/                # Rotas de API (tasks, projects)
├─ projects/           # Pages de projeto, ex: /projects/[id]
├─ tasks/              # Páginas e rotas relacionadas a tarefas
├─ layout.tsx          # Layout global
└─ page.tsx            # Dashboard

components/            # Componentes React reusáveis (ui, atoms)
prisma/                # Schema Prisma
public/                # Recursos públicos (imagens, gifs)
```

## ▶️ Executando localmente
Siga estes passos rápidos para rodar o projeto em sua máquina:

1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/taskflow-pro.git
cd taskflow-pro
```

2. Instale dependências (pnpm ou npm)

```bash
pnpm install
# ou
npm install
```

3. Inicialize o banco (Prisma)

```bash
pnpm prisma:push
# ou
npm run prisma:push
```

4. Ambiente de desenvolvimento

```bash
pnpm dev
# ou
npm run dev
```

> Abra http://localhost:3000

## 🔁 Scripts úteis
- `dev` — Executa Next.js em modo dev
- `build` — Compila para produção
- `start` — Inicia servidor Next.js buildado
- `prisma:push` — Aplica schema Prisma ao banco

## 💡 Notas sobre Banco de Dados
- Em ambiente de desenvolvimento, o projeto utiliza SQLite por padrão (conforme `prisma/schema.prisma`).
- Para produção, defina `DATABASE_URL` apontando para o provedor desejado (Postgres, MySQL, etc.) e rode as migrations adequadamente.

## 👩‍💻 Autor
Danielle Rocha — Desenvolvedora e autora do projeto. Ideal para portfólio e aprendizado em Next.js, Prisma e ecossistema React.

## 📜 Licença
Este projeto está licenciado sob a licença MIT.

---
