'use client'

import type { Project } from '@/types'
import Image from 'next/image'
import { useRef, useState } from 'react'

interface Props {
	project: Project | null
	onSaved: (project: Project, isEdit: boolean) => void
	onCancel: () => void
}

const EMPTY = {
	title: '',
	concept: '',
	description: '',
	year: new Date().getFullYear(),
	type: 'Web App',
	github: '',
	live: '',
	tags: ''
}

export default function ProjectForm({ project, onSaved, onCancel }: Props) {
	const isEdit = !!project
	const [form, setForm] = useState({
		title: project?.title ?? EMPTY.title,
		concept: project?.concept ?? EMPTY.concept,
		description: project?.description ?? EMPTY.description,
		year: project?.year ?? EMPTY.year,
		type: project?.type ?? EMPTY.type,
		github: project?.github ?? EMPTY.github,
		live: project?.live ?? EMPTY.live,
		tags: project?.tags.join(', ') ?? EMPTY.tags
	})
	const [imageFile, setImageFile] = useState<File | null>(null)
	const [preview, setPreview] = useState(project?.image ?? '')
	const [loading, setLoading] = useState(false)
	const fileRef = useRef<HTMLInputElement>(null)

	const set = (k: string, v: string | number) =>
		setForm(f => ({ ...f, [k]: v }))

	const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (!file) return
		setImageFile(file)
		setPreview(URL.createObjectURL(file))
	}

	const handleSubmit = async () => {
		setLoading(true)
		const fd = new FormData()
		Object.entries(form).forEach(([k, v]) => fd.append(k, String(v)))
		if (imageFile) fd.append('image', imageFile)
		else if (preview) fd.append('imageUrl', preview)

		const url = isEdit
			? `/api/admin/projects/${project!.id}`
			: '/api/admin/projects'
		const method = isEdit ? 'PUT' : 'POST'

		const res = await fetch(url, { method, body: fd })
		const data = await res.json()

		if (res.ok) {
			const saved = isEdit
				? {
						...project!,
						...form,
						tags: form.tags.split(',').map(t => t.trim()),
						image: preview
					}
				: data
			onSaved(saved, isEdit)
		}
		setLoading(false)
	}

	const fields = [
		{ key: 'title', label: 'Title', type: 'text' },
		{ key: 'concept', label: 'Concept', type: 'text' },
		{ key: 'type', label: 'Type', type: 'text' },
		{ key: 'year', label: 'Year', type: 'number' },
		{ key: 'github', label: 'GitHub URL', type: 'text' },
		{ key: 'live', label: 'Live URL', type: 'text' },
		{ key: 'tags', label: 'Tags (comma separated)', type: 'text' }
	]

	return (
		<div className="admin-project-form">
			<h2 className="admin-project-form__title">
				{isEdit ? 'Edit Project' : 'New Project'}
			</h2>

			<div className="admin-project-form__grid">
				{fields.map(f => (
					<div
						key={f.key}
						className="admin-field"
					>
						<label className="admin-label">{f.label}</label>
						<input
							type={f.type}
							value={String(form[f.key as keyof typeof form])}
							onChange={e => set(f.key, e.target.value)}
							className="admin-input"
						/>
					</div>
				))}
			</div>

			<div className="admin-field">
				<label className="admin-label">Description</label>
				<textarea
					value={form.description}
					onChange={e => set('description', e.target.value)}
					rows={3}
					className="admin-textarea"
				/>
			</div>

			<div className="admin-field">
				<label className="admin-label">Image</label>

				{preview && (
					<Image
						src={preview}
						alt="preview"
						width={160}
						height={112}
						className="admin-project-form__preview"
					/>
				)}

				<button
					onClick={() => fileRef.current?.click()}
					className="admin-project-form__upload"
				>
					{preview ? 'Change image' : 'Upload image'}
				</button>

				<input
					ref={fileRef}
					type="file"
					accept="image/*"
					className="admin-hidden"
					onChange={handleFile}
				/>
			</div>

			<div className="admin-project-form__actions">
				<button
					onClick={handleSubmit}
					disabled={loading || !form.title}
					className="admin-enter"
				>
					<span />
					{loading ? 'Saving...' : isEdit ? 'Save Changes' : 'Add Project'}
				</button>

				<button
					onClick={onCancel}
					className="admin-button admin-button--ghost"
				>
					Cancel
				</button>
			</div>
		</div>
	)
}
