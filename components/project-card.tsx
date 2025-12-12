"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { FolderKanban } from "lucide-react"

interface ProjectCardProps {
  project: {
    id: string
    name: string
    description?: string | null
    _count?: {
      tasks: number
    }
    tasks?: any[]
  }
  index: number
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const totalTasks = project._count?.tasks || project.tasks?.length || 0
  const completedTasks = project.tasks?.filter((t: any) => t.columnId && t.column?.name === "Concluído").length || 0
  const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0

  return (
    <Link href={`/projects/${project.id}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: index * 0.1 }}
        whileHover={{ y: -4 }}
      >
        <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer border-border bg-card h-full">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
              <FolderKanban className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-lg text-foreground mb-1 truncate">{project.name}</h3>
              {project.description && (
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{project.description}</p>
              )}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{totalTasks} tarefas</span>
                  <span className="text-foreground font-medium">{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    </Link>
  )
}
