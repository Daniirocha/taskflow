"use client"

import { motion } from "framer-motion"
import { Calendar, ListChecks, Clock, CheckCircle2 } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface TaskCardProps {
  task: {
    id: string
    title: string
    description?: string | null
    priority: string
    dueDate?: Date | string | null
    assignee?: string | null
    status?: string
  }
  onClick?: () => void
  isDragging?: boolean
}

const priorityColors = {
  low: "bg-accent text-accent-foreground",
  medium: "bg-secondary text-secondary-foreground",
  high: "bg-primary text-primary-foreground",
}

const priorityLabels = {
  low: "Baixa",
  medium: "Média",
  high: "Alta",
}

const statusConfig = {
  todo: {
    label: "A Fazer",
    icon: ListChecks,
    color: "text-accent",
  },
  in_progress: {
    label: "Em Andamento",
    icon: Clock,
    color: "text-primary",
  },
  done: {
    label: "Concluída",
    icon: CheckCircle2,
    color: "text-accent",
  },
}

export function TaskCard({ task, onClick, isDragging }: TaskCardProps) {
  const formatDate = (date: Date | string | null | undefined) => {
    if (!date) return null
    const d = new Date(date)
    return d.toLocaleDateString("pt-BR", { day: "2-digit", month: "short" })
  }

  const status = statusConfig[task.status as keyof typeof statusConfig] || statusConfig.todo
  const StatusIcon = status.icon

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      <Card
        className={`p-4 cursor-pointer hover:shadow-lg transition-shadow border-border bg-card ${
          isDragging ? "opacity-50" : ""
        }`}
        onClick={onClick}
      >
        <div className="space-y-3">
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-semibold text-foreground line-clamp-2 flex-1">{task.title}</h3>
            <StatusIcon className={`w-4 h-4 flex-shrink-0 ${status.color}`} />
          </div>

          {task.description && <p className="text-sm text-muted-foreground line-clamp-2">{task.description}</p>}

          <div className="flex items-center justify-between gap-2 flex-wrap">
            <Badge className={priorityColors[task.priority as keyof typeof priorityColors]}>
              {priorityLabels[task.priority as keyof typeof priorityLabels] || task.priority}
            </Badge>

            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              {task.dueDate && (
                <div className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{formatDate(task.dueDate)}</span>
                </div>
              )}

              {task.assignee && (
                <Avatar className="w-6 h-6 border-2 border-border">
                  <AvatarFallback className="text-xs bg-primary text-primary-foreground">
                    {task.assignee.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
