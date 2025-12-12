"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Sidebar } from "@/components/sidebar"
import { TaskCard } from "@/components/task-card"
import { Button } from "@/components/ui/button"
import { ListChecks, Clock, CheckCircle2 } from "lucide-react"

export default function TasksPage() {
  const [tasks, setTasks] = useState<any[]>([])
  const [filter, setFilter] = useState<"all" | "todo" | "in_progress" | "done">("all")

  useEffect(() => {
    fetchTasks()
  }, [])

  const fetchTasks = async () => {
    const res = await fetch("/api/tasks")
    const data = await res.json()
    setTasks(data)
  }

  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true
    return task.status === filter
  })

  const todoCount = tasks.filter((t) => t.status === "todo").length
  const inProgressCount = tasks.filter((t) => t.status === "in_progress").length
  const doneCount = tasks.filter((t) => t.status === "done").length

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />

      <main className="ml-[280px] p-8">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Todas as Tarefas</h1>
          <p className="text-muted-foreground">Visualize e gerencie todas as suas tarefas</p>
        </motion.div>

        <div className="flex gap-3 mb-8 flex-wrap">
          <Button
            onClick={() => setFilter("all")}
            variant={filter === "all" ? "default" : "outline"}
            className={
              filter === "all"
                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                : "border-border text-foreground hover:bg-secondary"
            }
          >
            Todas ({tasks.length})
          </Button>
          <Button
            onClick={() => setFilter("todo")}
            variant={filter === "todo" ? "default" : "outline"}
            className={
              filter === "todo"
                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                : "border-border text-foreground hover:bg-secondary"
            }
          >
            <ListChecks className="w-4 h-4 mr-2" />A Fazer ({todoCount})
          </Button>
          <Button
            onClick={() => setFilter("in_progress")}
            variant={filter === "in_progress" ? "default" : "outline"}
            className={
              filter === "in_progress"
                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                : "border-border text-foreground hover:bg-secondary"
            }
          >
            <Clock className="w-4 h-4 mr-2" />
            Em Andamento ({inProgressCount})
          </Button>
          <Button
            onClick={() => setFilter("done")}
            variant={filter === "done" ? "default" : "outline"}
            className={
              filter === "done"
                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                : "border-border text-foreground hover:bg-secondary"
            }
          >
            <CheckCircle2 className="w-4 h-4 mr-2" />
            Concluídas ({doneCount})
          </Button>
        </div>

        {filteredTasks.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
            <div className="w-20 h-20 rounded-full bg-secondary mx-auto mb-4 flex items-center justify-center">
              <ListChecks className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Nenhuma tarefa encontrada</h3>
            <p className="text-muted-foreground">
              {filter === "all" ? "Crie tarefas nos seus projetos" : "Nenhuma tarefa com este status"}
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
