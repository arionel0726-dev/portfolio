import type { Project } from '@/types'
import Redis from 'ioredis'

const redis = new Redis(process.env.REDIS_URL!)

const KEY = 'projects'

export async function getProjects(): Promise<Project[]> {
	const data = await redis.get(KEY)
	if (!data) return []
	return JSON.parse(data)
}

export async function saveProjects(projects: Project[]): Promise<void> {
	await redis.set(KEY, JSON.stringify(projects))
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
