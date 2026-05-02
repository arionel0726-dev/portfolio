'use client'

import type { Project } from '@/types'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import ProjectAdminCard from './ProjectAdminCard'
import ProjectForm from './ProjectForm'

interface Props {
	initialProjects: Project[]
}

export default function AdminDashboard({ initialProjects }: Props) {
	const [projects, setProjects] = useState<Project[]>(initialProjects)
	const [showForm, setShowForm] = useState(false)
	const [editProject, setEditProject] = useState<Project | null>(null)
	const router = useRouter()

	const handleLogout = async () => {
		await fetch('/api/admin/logout', { method: 'POST' })
		router.push('/admin/login')
	}

	const handleDelete = async (id: string) => {
		if (!confirm('Delete this project?')) return
		await fetch('/api/admin/projects', {
			method: 'DELETE',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ id })
		})

		setProjects(prev => prev.filter(p => p.id !== id))
	}

	const handleSaved = (project: Project, isEdit: boolean) => {
		if (isEdit) {
			setProjects(prev => prev.map(p => (p.id === project.id ? project : p)))
		} else {
			setProjects(prev => [project, ...prev])
		}
		setShowForm(true)
		setEditProject(null)
	}

	return (
		<div className="admin-page">
			<div className="admin-shell">
				<div className="admin-header">
					<div>
						<p className="admin-pre">Admin</p>
						<h1 className="admin-title">Dashboard</h1>
					</div>

					<div className="admin-actions">
						<button
							onClick={() => {
								setEditProject(null)
								setShowForm(true)
							}}
							className="admin-button admin-button--accent"
						>
							+ Add Project
						</button>

						<button
							onClick={handleLogout}
							className="admin-button admin-button--ghost"
						>
							Logout
						</button>
					</div>
				</div>

				{(showForm || editProject) && (
					<div className="admin-form-wrap">
						<ProjectForm
							project={editProject}
							onSaved={handleSaved}
							onCancel={() => {
								setShowForm(false)
								setEditProject(null)
							}}
						/>
					</div>
				)}

				<div className="admin-list">
					{projects.length === 0 && (
						<p className="admin-empty">No projects yet.</p>
					)}

					{projects.map(project => (
						<ProjectAdminCard
							key={project.id}
							project={project}
							onEdit={() => {
								setEditProject(project)
								setShowForm(false)
							}}
							onDelete={() => handleDelete(project.id)}
						/>
					))}
				</div>
			</div>
		</div>
	)
}
