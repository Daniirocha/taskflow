import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { updates } = body

    if (Array.isArray(updates)) {
      db.reorderTasks(updates)
    } else {
      const { taskId, newColumnId, newOrder } = body
      db.reorderTasks([{ id: taskId, columnId: newColumnId, order: newOrder }])
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to reorder task" }, { status: 500 })
  }
}
