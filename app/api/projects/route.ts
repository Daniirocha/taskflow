import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function GET() {
  try {
    const projects = db.getProjects()
    return NextResponse.json(projects)
  } catch (error) {
    console.error("[v0] Failed to fetch projects:", error)
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, description } = body

    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 })
    }

    const project = db.createProject({ name, description })
    return NextResponse.json(project)
  } catch (error) {
    console.error("[v0] Failed to create project:", error)
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 })
  }
}
