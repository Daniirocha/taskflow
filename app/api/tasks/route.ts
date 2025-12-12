import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const projectId = searchParams.get("projectId")

    const tasks = db.getTasks(projectId || undefined)

    return NextResponse.json(tasks)
  } catch (error) {
    console.error("[v0] Failed to fetch tasks:", error)
    return NextResponse.json({ error: "Failed to fetch tasks" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { title, description, priority, dueDate, assignee, projectId, columnId } = body

    if (!title || !projectId) {
      return NextResponse.json({ error: "Title and projectId are required" }, { status: 400 })
    }

    const task = db.createTask({
      title,
      description,
      priority,
      dueDate,
      assignee,
      projectId,
      columnId,
    })

    return NextResponse.json(task)
  } catch (error) {
    console.error("[v0] Failed to create task:", error)
    return NextResponse.json({ error: "Failed to create task" }, { status: 500 })
  }
}
