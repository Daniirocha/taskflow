"use client"

import { motion } from "framer-motion"
import { Sidebar } from "@/components/sidebar"
import { Card } from "@/components/ui/card"

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />

      <main className="ml-[280px] p-8">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Configurações</h1>
          <p className="text-muted-foreground">Gerencie suas preferências e configurações</p>
        </motion.div>

        <Card className="p-8 border-border bg-card">
          <p className="text-muted-foreground text-center">Configurações em desenvolvimento...</p>
        </Card>
      </main>
    </div>
  )
}
