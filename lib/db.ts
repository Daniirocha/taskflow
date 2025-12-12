export interface Project {
  id: string
  name: string
  description?: string
  createdAt: string
  updatedAt: string
  tasks?: Task[]
  columns?: Column[]
  _count?: { tasks: number }
}

export interface Column {
  id: string
  name: string
  order: number
  projectId: string
  createdAt: string
  updatedAt: string
}

export interface Task {
  id: string
  title: string
  description?: string
  priority: string
  dueDate?: string
  assignee?: string
  status: string
  columnId?: string
  projectId: string
  order: number
  createdAt: string
  updatedAt: string
}

class Database {
  private projects: Map<string, Project> = new Map()
  private columns: Map<string, Column> = new Map()
  private tasks: Map<string, Task> = new Map()
  private initialized = false

  private generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  }

  initialize() {
    if (this.initialized) return

    const projectId = this.generateId()
    const now = new Date().toISOString()

    const project: Project = {
      id: projectId,
      name: "Projeto de Exemplo",
      description: "Projeto inicial para demonstração",
      createdAt: now,
      updatedAt: now,
    }

    this.projects.set(projectId, project)

    const columns: Column[] = [
      {
        id: this.generateId(),
        name: "A Fazer",
        order: 0,
        projectId,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: this.generateId(),
        name: "Em Progresso",
        order: 1,
        projectId,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: this.generateId(),
        name: "Concluído",
        order: 2,
        projectId,
        createdAt: now,
        updatedAt: now,
      },
    ]

    columns.forEach((col) => this.columns.set(col.id, col))

    const tasks: Task[] = [
      {
        id: this.generateId(),
        title: "Planejar arquitetura do sistema",
        description: "Definir estrutura de componentes e fluxo de dados",
        priority: "high",
        dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
        assignee: "Danielle",
        status: "todo",
        columnId: columns[0].id,
        projectId,
        order: 0,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: this.generateId(),
        title: "Implementar dashboard",
        description: "Criar interface principal com métricas",
        priority: "high",
        dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
        assignee: "Danielle",
        status: "in_progress",
        columnId: columns[1].id,
        projectId,
        order: 0,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: this.generateId(),
        title: "Configurar ambiente de desenvolvimento",
        description: "Setup inicial do projeto",
        priority: "medium",
        assignee: "Danielle",
        status: "done",
        columnId: columns[2].id,
        projectId,
        order: 0,
        createdAt: now,
        updatedAt: now,
      },
    ]

    tasks.forEach((task) => this.tasks.set(task.id, task))

    this.initialized = true
  }

  getProjects() {
    this.initialize()
    return Array.from(this.projects.values()).map((project) => ({
      ...project,
      tasks: Array.from(this.tasks.values()).filter((t) => t.projectId === project.id),
      columns: Array.from(this.columns.values()).filter((c) => c.projectId === project.id),
      _count: {
        tasks: Array.from(this.tasks.values()).filter((t) => t.projectId === project.id).length,
      },
    }))
  }

  getProject(id: string) {
    this.initialize()
    const project = this.projects.get(id)
    if (!project) return null

    const columns = Array.from(this.columns.values())
      .filter((c) => c.projectId === id)
      .map((column) => ({
        ...column,
        tasks: Array.from(this.tasks.values())
          .filter((t) => t.columnId === column.id)
          .sort((a, b) => a.order - b.order),
      }))

    return {
      ...project,
      tasks: Array.from(this.tasks.values()).filter((t) => t.projectId === id),
      columns,
    }
  }

  createProject(data: { name: string; description?: string }) {
    this.initialize()
    const id = this.generateId()
    const now = new Date().toISOString()

    const project: Project = {
      id,
      name: data.name,
      description: data.description,
      createdAt: now,
      updatedAt: now,
    }

    this.projects.set(id, project)

    const columns: Column[] = [
      {
        id: this.generateId(),
        name: "A Fazer",
        order: 0,
        projectId: id,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: this.generateId(),
        name: "Em Progresso",
        order: 1,
        projectId: id,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: this.generateId(),
        name: "Concluído",
        order: 2,
        projectId: id,
        createdAt: now,
        updatedAt: now,
      },
    ]

    columns.forEach((col) => this.columns.set(col.id, col))

    return {
      ...project,
      columns,
    }
  }

  updateProject(id: string, data: { name?: string; description?: string }) {
    this.initialize()
    const project = this.projects.get(id)
    if (!project) return null

    const updated = {
      ...project,
      ...data,
      updatedAt: new Date().toISOString(),
    }

    this.projects.set(id, updated)
    return updated
  }

  deleteProject(id: string) {
    this.initialize()
    this.projects.delete(id)
    Array.from(this.columns.values())
      .filter((c) => c.projectId === id)
      .forEach((c) => this.columns.delete(c.id))
    Array.from(this.tasks.values())
      .filter((t) => t.projectId === id)
      .forEach((t) => this.tasks.delete(t.id))
  }

  getTasks(projectId?: string) {
    this.initialize()
    const allTasks = Array.from(this.tasks.values())
    return projectId ? allTasks.filter((t) => t.projectId === projectId) : allTasks
  }

  getTask(id: string) {
    this.initialize()
    return this.tasks.get(id) || null
  }

  createTask(data: {
    title: string
    description?: string
    priority?: string
    dueDate?: string
    assignee?: string
    projectId: string
    columnId?: string
  }) {
    this.initialize()
    const id = this.generateId()
    const now = new Date().toISOString()

    const tasksInColumn = Array.from(this.tasks.values()).filter((t) => t.columnId === (data.columnId || null)).length

    const task: Task = {
      id,
      title: data.title,
      description: data.description,
      priority: data.priority || "medium",
      dueDate: data.dueDate,
      assignee: data.assignee,
      status: "todo",
      columnId: data.columnId,
      projectId: data.projectId,
      order: tasksInColumn,
      createdAt: now,
      updatedAt: now,
    }

    this.tasks.set(id, task)
    return task
  }

  updateTask(
    id: string,
    data: {
      title?: string
      description?: string
      priority?: string
      dueDate?: string
      assignee?: string
      columnId?: string
      order?: number
    },
  ) {
    this.initialize()
    const task = this.tasks.get(id)
    if (!task) return null

    let status = task.status
    if (data.columnId) {
      const column = this.columns.get(data.columnId)
      if (column) {
        if (column.name === "A Fazer") status = "todo"
        else if (column.name === "Em Progresso") status = "in_progress"
        else if (column.name === "Concluído") status = "done"
      }
    }

    const updated = {
      ...task,
      ...data,
      status,
      updatedAt: new Date().toISOString(),
    }

    this.tasks.set(id, updated)
    return updated
  }

  deleteTask(id: string) {
    this.initialize()
    this.tasks.delete(id)
  }

  reorderTasks(updates: { id: string; columnId: string; order: number }[]) {
    this.initialize()
    updates.forEach(({ id, columnId, order }) => {
      const task = this.tasks.get(id)
      if (task) {
        const column = this.columns.get(columnId)
        let status = task.status
        if (column) {
          if (column.name === "A Fazer") status = "todo"
          else if (column.name === "Em Progresso") status = "in_progress"
          else if (column.name === "Concluído") status = "done"
        }

        this.tasks.set(id, {
          ...task,
          columnId,
          order,
          status,
          updatedAt: new Date().toISOString(),
        })
      }
    })
  }
}

export const db = new Database()
