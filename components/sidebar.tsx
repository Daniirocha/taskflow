"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { LayoutDashboard, FolderKanban, ListChecks, Settings, ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/" },
  { icon: FolderKanban, label: "Projetos", href: "/projects" },
  { icon: ListChecks, label: "Tarefas", href: "/tasks" },
  { icon: Settings, label: "Configurações", href: "/settings" },
]

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()

  return (
    <motion.aside
      initial={{ width: 280 }}
      animate={{ width: collapsed ? 80 : 280 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed left-0 top-0 h-screen bg-card border-r border-border flex flex-col"
    >
      <div className="p-6 flex items-center justify-between">
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: collapsed ? 0 : 1 }}
          transition={{ duration: 0.2 }}
          className="flex items-center gap-3"
        >
          {!collapsed && (
            <>
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <FolderKanban className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="font-bold text-xl text-foreground">TaskFlow</h1>
                <p className="text-xs text-muted-foreground">Pro</p>
              </div>
            </>
          )}
        </motion.div>
        <Button variant="ghost" size="icon" onClick={() => setCollapsed(!collapsed)} className="hover:bg-secondary">
          {collapsed ? (
            <ChevronRight className="w-5 h-5 text-foreground" />
          ) : (
            <ChevronLeft className="w-5 h-5 text-foreground" />
          )}
        </Button>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href))

          return (
            <Link key={item.href} href={item.href}>
              <motion.div
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  "flex items-center gap-4 px-4 py-3 rounded-xl transition-colors",
                  isActive ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-secondary",
                )}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {!collapsed && <span className="font-medium">{item.label}</span>}
              </motion.div>
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-border">
        <div className={cn("flex items-center gap-3 p-3 rounded-xl bg-secondary", collapsed && "justify-center")}>
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
            <span className="text-primary-foreground font-semibold">D</span>
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm text-foreground truncate">Danielle</p>
              <p className="text-xs text-muted-foreground truncate">danielle@taskflow.pro</p>
            </div>
          )}
        </div>
      </div>
    </motion.aside>
  )
}
