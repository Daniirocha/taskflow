"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Plus } from "lucide-react"
import { Sidebar } from "@/components/sidebar"
import { ProjectCard } from "@/components/project-card"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function ProjectsPage() {
  const [projects, setProjects] = useState<any[]>([])
  const router = useRouter()

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    const res = await fetch("/api/projects")
    const data = await res.json()
    setProjects(data)
  }

  const handleCreateProject = async () => {
    const name = prompt("Nome do projeto:")
    if (!name) return

    const description = prompt("Descrição (opcional):")

    const res = await fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, description }),
    })

    if (res.ok) {
      const project = await res.json()
      router.push(`/projects/${project.id}`)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />

      <main className="ml-[280px] p-8">
        <div className="flex items-center justify-between mb-8">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl font-bold text-foreground mb-2">Projetos</h1>
            <p className="text-muted-foreground">Gerencie todos os seus projetos em um só lugar</p>
          </motion.div>

          <Button onClick={handleCreateProject} className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Plus className="w-4 h-4 mr-2" />
            Novo Projeto
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </main>
    </div>
  )
}
