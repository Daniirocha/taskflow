"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Plus } from "lucide-react"
import { TaskCard } from "./task-card"
import { Button } from "@/components/ui/button"
import { TaskModal } from "./task-modal"

interface Task {
  id: string
  title: string
  description?: string | null
  priority: string
  dueDate?: Date | string | null
  assignee?: string | null
  columnId?: string | null
  order: number
}

interface Column {
  id: string
  name: string
  order: number
  tasks: Task[]
}

interface KanbanBoardProps {
  columns: Column[]
  projectId: string
  onTaskUpdate: () => void
}

export function KanbanBoard({ columns, projectId, onTaskUpdate }: KanbanBoardProps) {
  const [draggedTask, setDraggedTask] = useState<Task | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [targetColumnId, setTargetColumnId] = useState<string | null>(null)

  const handleDragStart = (task: Task) => {
    setDraggedTask(task)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = async (columnId: string) => {
    if (!draggedTask) return

    try {
      await fetch("/api/tasks/reorder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          taskId: draggedTask.id,
          newColumnId: columnId,
          newOrder: 0,
        }),
      })
      onTaskUpdate()
    } catch (error) {
      console.error("[v0] Failed to reorder task:", error)
    }

    setDraggedTask(null)
  }

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task)
    setIsModalOpen(true)
  }

  const handleAddTask = (columnId: string) => {
    setSelectedTask(null)
    setTargetColumnId(columnId)
    setIsModalOpen(true)
  }

  const handleSaveTask = async (taskData: any) => {
    try {
      if (taskData.id) {
        await fetch(`/api/tasks/${taskData.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(taskData),
        })
      } else {
        await fetch("/api/tasks", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(taskData),
        })
      }
      setIsModalOpen(false)
      setSelectedTask(null)
      setTargetColumnId(null)
      onTaskUpdate()
    } catch (error) {
      console.error("[v0] Failed to save task:", error)
    }
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {columns
          .sort((a, b) => a.order - b.order)
          .map((column) => {
            const tasks = column.tasks || []

            return (
              <motion.div
                key={column.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold text-lg text-foreground">{column.name}</h3>
                    <span className="px-2 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-medium">
                      {tasks.length}
                    </span>
                  </div>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => handleAddTask(column.id)}
                    className="hover:bg-secondary"
                  >
                    <Plus className="w-4 h-4 text-foreground" />
                  </Button>
                </div>

                <div
                  onDragOver={handleDragOver}
                  onDrop={() => handleDrop(column.id)}
                  className="flex-1 bg-secondary/30 rounded-2xl p-4 space-y-3 min-h-[500px]"
                >
                  {tasks.map((task) => (
                    <div key={task.id} draggable onDragStart={() => handleDragStart(task)}>
                      <TaskCard
                        task={task}
                        onClick={() => handleTaskClick(task)}
                        isDragging={draggedTask?.id === task.id}
                      />
                    </div>
                  ))}
                </div>
              </motion.div>
            )
          })}
      </div>

      <TaskModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setSelectedTask(null)
          setTargetColumnId(null)
        }}
        onSave={handleSaveTask}
        task={selectedTask}
        projectId={projectId}
        columnId={targetColumnId || undefined}
      />
    </>
  )
}
