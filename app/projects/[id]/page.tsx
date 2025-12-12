"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, Plus } from "lucide-react"
import { Sidebar } from "@/components/sidebar"
import { KanbanBoard } from "@/components/kanban-board"
import { Button } from "@/components/ui/button"
import { TaskModal } from "@/components/task-modal"
import Link from "next/link"
import { useParams } from "next/navigation"

export default function ProjectPage() {
  const { id } = useParams() as { id?: string }
  const [project, setProject] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    if (id) fetchProject()
  }, [id])

  const fetchProject = async () => {
    const res = await fetch(`/api/projects/${id}`)
    const data = await res.json()
    setProject(data)
  }

  const handleSaveTask = async (taskData: any) => {
    try {
      await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(taskData),
      })
      setIsModalOpen(false)
      fetchProject()
    } catch (error) {
      console.error("Failed to create task:", error)
    }
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-background">
        <Sidebar />
        <main className="ml-[280px] p-8">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-secondary rounded w-64" />
            <div className="h-4 bg-secondary rounded w-96" />
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />

      <main className="ml-[280px] p-8">
        <div className="flex items-center justify-between mb-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4"
          >
            <Link href="/projects">
              <Button variant="ghost" size="icon" className="hover:bg-secondary">
                <ArrowLeft className="w-5 h-5 text-foreground" />
              </Button>
            </Link>
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-1">{project.name}</h1>
              {project.description && <p className="text-muted-foreground">{project.description}</p>}
            </div>
          </motion.div>

          <Button
            onClick={() => setIsModalOpen(true)}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Plus className="w-4 h-4 mr-2" />
            Criar Tarefa
          </Button>
        </div>

        <KanbanBoard columns={project.columns || []} projectId={project.id} onTaskUpdate={fetchProject} />

        <TaskModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveTask}
          projectId={project.id}
          columnId={project.columns?.[0]?.id}
        />
      </main>
    </div>
  )
}
