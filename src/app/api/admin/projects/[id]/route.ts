import { verifyToken } from '@/lib/auth'
import { uploadImage } from '@/lib/cloudinary'
import { updateProject } from '@/lib/projects-store'
import { NextRequest, NextResponse } from 'next/server'

export async function PUT(
	req: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	if (!(await verifyToken())) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
	}

	const { id } = await params
	const form = await req.formData()
	const file = form.get('image') as File | null

	const updates: Record<string, unknown> = {
		title: form.get('title'),
		concept: form.get('concept'),
		description: form.get('description'),
		year: Number(form.get('year')),
		type: form.get('type'),
		github: form.get('github'),
		live: form.get('live'),
		tags: (form.get('tags') as string).split(',').map(t => t.trim())
	}

	if (file && file.size > 0) {
		updates.image = await uploadImage(file)
	}

	await updateProject(id, updates as any)
	return NextResponse.json({ success: true })
}
