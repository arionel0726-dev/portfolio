import type { Project } from '@/types'
import { promises as fs } from 'fs'
import path from 'path'

const FILE = path.join(process.cwd(), 'src/data/projects.json')

export async function getProjects(): Promise<Project[]> {
	try {
		const raw = await fs.readFile(FILE, 'utf-8')
		return JSON.parse(raw)
	} catch {
		return []
	}
}

export async function saveProjects(projects: Project[]): Promise<void> {
	await fs.writeFile(FILE, JSON.stringify(projects, null, 2))
}

export async function addProject(project: Project): Promise<void> {
	const projects = await getProjects()
	projects.unshift(project)
	await saveProjects(projects)
}

export async function updateProject(
	id: string,
	data: Partial<Project>
): Promise<void> {
	const projects = await getProjects()
	const idx = projects.findIndex(p => p.id === id)
	if (idx === -1) return
	projects[idx] = { ...projects[idx], ...data }
	await saveProjects(projects)
}

export async function deleteProject(id: string): Promise<void> {
	const projects = await getProjects()
	await saveProjects(projects.filter(p => p.id !== id))
}
