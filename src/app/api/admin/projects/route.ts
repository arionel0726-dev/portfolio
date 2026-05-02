import { verifyToken } from '@/lib/auth'
import { uploadImage } from '@/lib/cloudinary'
import { addProject, getProjects, saveProjects } from '@/lib/projects-store'
import { randomUUID } from 'crypto'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
	if (!(await verifyToken())) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
	}
	const projects = await getProjects()
	return NextResponse.json(projects)
}

export async function POST(req: NextRequest) {
	if (!(await verifyToken())) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
	}

	const form = await req.formData()
	const file = form.get('image') as File | null

	let imageUrl = (form.get('imageUrl') as string) ?? ''
	if (file && file.size > 0) {
		imageUrl = await uploadImage(file)
	}

	const project = {
		id: randomUUID(),
		slug: (form.get('title') as string).toLowerCase().replace(/\s+/g, '-'),
		title: form.get('title') as string,
		concept: form.get('concept') as string,
		description: form.get('description') as string,
		year: Number(form.get('year')),
		type: form.get('type') as string,
		image: imageUrl,
		github: form.get('github') as string,
		live: form.get('live') as string,
		tags: (form.get('tags') as string).split(',').map(t => t.trim())
	}
	await addProject(project)
	return NextResponse.json(project)
}

export async function DELETE(req: NextRequest) {
	if (!(await verifyToken())) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
	}
	const { id } = await req.json()
	const projects = await getProjects()
	await saveProjects(projects.filter(p => p.id !== id))
	return NextResponse.json({ success: true })
}
