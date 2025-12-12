"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ListChecks, Clock, CheckCircle2, Plus } from "lucide-react"
import { Sidebar } from "@/components/sidebar"
import { MetricCard } from "@/components/metric-card"
import { ProjectCard } from "@/components/project-card"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function Dashboard() {
  const [projects, setProjects] = useState<any[]>([])
  const [tasks, setTasks] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [projectsRes, tasksRes] = await Promise.all([fetch("/api/projects"), fetch("/api/tasks")])

      if (!projectsRes.ok || !tasksRes.ok) {
        console.error("[v0] API request failed:", {
          projectsStatus: projectsRes.status,
          tasksStatus: tasksRes.status,
        })
        setProjects([])
        setTasks([])
        setLoading(false)
        return
      }

      const projectsData = await projectsRes.json()
      const tasksData = await tasksRes.json()

      setProjects(projectsData)
      setTasks(tasksData)
    } catch (error) {
      console.error("[v0] Failed to fetch data:", error)
      setProjects([])
      setTasks([])
    } finally {
      setLoading(false)
    }
  }

  const todoTasks = tasks.filter((t) => t.status === "todo").length
  const inProgressTasks = tasks.filter((t) => t.status === "in_progress").length
  const completedTasks = tasks.filter((t) => t.status === "done").length

  const handleCreateProject = async () => {
    const name = prompt("Nome do projeto:")
    if (!name) return

    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      })

      if (res.ok) {
        const project = await res.json()
        router.push(`/projects/${project.id}`)
      } else {
        console.error("[v0] Failed to create project:", res.status)
        alert("Erro ao criar projeto. Tente novamente.")
      }
    } catch (error) {
      console.error("[v0] Error creating project:", error)
      alert("Erro ao criar projeto. Tente novamente.")
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Sidebar />
        <main className="ml-[280px] p-8">
          <div className="flex items-center justify-center h-[50vh]">
            <div className="text-muted-foreground">Carregando...</div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />

      <main className="ml-[280px] p-8">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Bem-vinda, Danielle</h1>
          <p className="text-muted-foreground">Aqui está uma visão geral dos seus projetos e tarefas</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <MetricCard title="Tarefas Pendentes" value={todoTasks} icon={ListChecks} index={0} />
          <MetricCard title="Em Andamento" value={inProgressTasks} icon={Clock} index={1} />
          <MetricCard title="Concluídas" value={completedTasks} icon={CheckCircle2} index={2} />
        </div>

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-foreground">Projetos Recentes</h2>
          <Button onClick={handleCreateProject} className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Plus className="w-4 h-4 mr-2" />
            Novo Projeto
          </Button>
        </div>

        {projects.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
            <div className="w-20 h-20 rounded-full bg-secondary mx-auto mb-4 flex items-center justify-center">
              <ListChecks className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Nenhum projeto ainda</h3>
            <p className="text-muted-foreground mb-6">Crie seu primeiro projeto para começar</p>
            <Button onClick={handleCreateProject} className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              Criar Projeto
            </Button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.slice(0, 6).map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
