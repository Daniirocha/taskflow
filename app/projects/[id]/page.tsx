"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, Plus, Trash, MoreHorizontal } from "lucide-react"
import { Sidebar } from "@/components/sidebar"
import { KanbanBoard } from "@/components/kanban-board"
import { Button } from "@/components/ui/button"
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogAction, AlertDialogCancel } from "@/components/ui/alert-dialog"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { useParams, useRouter } from "next/navigation"
import { TaskModal } from "@/components/task-modal"
import Link from "next/link"

export default function ProjectPage() {
  const { id } = useParams() as { id?: string }
  const router = useRouter()
  const [project, setProject] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)

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
        <main className="ml-70 p-8">
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

      <main className="ml-70 p-8">
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

          <div className="flex items-center gap-2">
            <Button onClick={() => setIsModalOpen(true)} className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              Criar Tarefa
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" onPointerDown={(e) => e.stopPropagation()} aria-label="Menu de opções">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  variant="destructive"
                  onClick={(e) => {
                    e.stopPropagation()
                    setConfirmOpen(true)
                  }}
                >
                  <Trash className="w-4 h-4 mr-2" />
                  Excluir
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Excluir projeto</AlertDialogTitle>
                  <AlertDialogDescription>
                    Tem certeza de que deseja excluir este projeto? Essa ação não poderá ser desfeita.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction
                    className="bg-destructive"
                    onClick={async () => {
                      if (!id) return
                      await fetch(`/api/projects/${id}`, { method: "DELETE" })
                      router.push("/projects")
                    }}
                  >
                    Excluir
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
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

