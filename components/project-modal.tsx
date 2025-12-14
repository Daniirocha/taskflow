"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { FolderPlus } from "lucide-react"

interface ProjectModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: { name: string; description: string }) => void
}

export function ProjectModal({ open, onOpenChange, onSubmit }: ProjectModalProps) {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return

    setIsSubmitting(true)
    await onSubmit({ name: name.trim(), description: description.trim() })
    setIsSubmitting(false)
    setName("")
    setDescription("")
    onOpenChange(false)
  }

  const handleCancel = () => {
    setName("")
    setDescription("")
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px] bg-card border-border p-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          <DialogHeader className="p-6 pb-4 bg-secondary/30">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                <FolderPlus className="w-5 h-5 text-primary" />
              </div>
              <div>
                <DialogTitle className="text-xl font-semibold text-foreground">Novo Projeto</DialogTitle>
                <DialogDescription className="text-muted-foreground">
                  Crie um novo projeto para organizar suas tarefas
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <form onSubmit={handleSubmit}>
            <div className="p-6 space-y-5">
              <div className="space-y-2">
                <Label htmlFor="project-name" className="text-foreground font-medium">
                  Nome do projeto <span className="text-primary">*</span>
                </Label>
                <Input
                  id="project-name"
                  placeholder="Ex: Redesign do Website"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-background border-input focus:border-primary focus:ring-primary/20 h-11"
                  autoFocus
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="project-description" className="text-foreground font-medium">
                  Descrição <span className="text-muted-foreground font-normal">(opcional)</span>
                </Label>
                <Textarea
                  id="project-description"
                  placeholder="Descreva brevemente o objetivo do projeto..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="bg-background border-input focus:border-primary focus:ring-primary/20 min-h-[100px] resize-none"
                />
              </div>
            </div>

            <DialogFooter className="p-6 pt-4 bg-secondary/20 gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                className="border-border hover:bg-secondary/50 text-foreground bg-transparent"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                disabled={!name.trim() || isSubmitting}
                className="bg-primary text-primary-foreground hover:bg-primary/90 min-w-[120px]"
              >
                {isSubmitting ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
                  />
                ) : (
                  "Criar projeto"
                )}
              </Button>
            </DialogFooter>
          </form>
        </motion.div>
      </DialogContent>
    </Dialog>
  )
}
