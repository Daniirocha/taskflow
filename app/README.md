🚀 TaskFlow Pro

TaskFlow Pro é uma aplicação web moderna para gerenciamento de projetos e tarefas, inspirada em metodologias Kanban, com foco em produtividade, organização e uma experiência visual limpa e profissional.

O projeto foi desenvolvido com Next.js (App Router), backend integrado com Prisma, e uma interface minimalista com microinterações suaves.

✨ Funcionalidades

📊 Dashboard interativo

Métricas de tarefas (pendentes, em andamento e concluídas)

Lista de projetos recentes

Sidebar recolhível

📁 Gerenciamento de Projetos

Criar e listar projetos

Navegação individual por projeto

🧩 Kanban Board

Colunas: A Fazer, Em Progresso e Concluído

Drag & Drop entre colunas

Atualização de status em tempo real

📝 Gerenciamento de Tarefas

Criar, editar e remover tarefas

Campos: título, descrição, prioridade, prazo e responsável

🎨 Design moderno e responsivo

Estilo minimalista

Cantos arredondados e espaçamento confortável

Microanimações com Framer Motion

Paleta de cores personalizada

🛠️ Tecnologias Utilizadas
Frontend

Next.js 14+ (App Router)

React

TypeScript

Tailwind CSS

shadcn/ui

Framer Motion

Lucide Icons

Backend

API Routes (Next.js)

Prisma ORM

SQLite (ambiente local)

🎨 Identidade Visual

O projeto utiliza uma paleta de cores suave e elegante, focada em tons rosados/mauve, aplicada de forma consistente em toda a interface:

#fdf7f9 – background

#d990aa – elementos de destaque

#4b2e35 – texto principal

Tons neutros para cards e bordas

📦 Estrutura do Projeto (resumo)
app/
 ├─ api/            # API routes (CRUD)
 ├─ projects/       # Páginas de projetos
 ├─ tasks/          # Kanban e tarefas
 ├─ layout.tsx      # Layout global
 └─ page.tsx        # Dashboard

components/
 ├─ sidebar.tsx
 ├─ project-card.tsx
 ├─ metric-card.tsx
 └─ ui/             # Componentes shadcn

prisma/
 └─ schema.prisma   # Modelos do banco de dados

public/
 └─ favicon.svg

▶️ Como rodar o projeto localmente
1️⃣ Clone o repositório
git clone https://github.com/seu-usuario/taskflow-pro.git
cd taskflow-pro

2️⃣ Instale as dependências
npm install

3️⃣ Crie o banco de dados
npm run prisma:push

4️⃣ Rode o projeto
npm run dev


Acesse:
👉 http://localhost:3000

🚀 Deploy

O projeto está pronto para deploy em plataformas como Vercel.
Não há dependências de serviços externos obrigatórios para rodar a aplicação.

📌 Status do Projeto

✅ Funcional
🚧 Em evolução (novas features e melhorias de UX podem ser adicionadas)

👩‍💻 Autora

Desenvolvido por Danielle Rocha
Projeto criado com foco em aprendizado prático, portfólio e boas práticas em aplicações modernas com React e Next.js.