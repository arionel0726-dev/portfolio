import ProjectDetail from '@/components/projects/ProjectDetail'
import { PROJECTS } from '@/data/projects'
import { getDictionary } from '@/lib/i18n'
import type { Locale } from '@/types'
import { notFound } from 'next/navigation'

interface Props {
	params: Promise<{ locale: Locale; slug: string }>
}

export async function generateStaticParams() {
	return PROJECTS.map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props) {
	const { slug } = await params
	const project = PROJECTS.find(p => p.slug === slug)
	if (!project) return {}
	return {
		title: project.title,
		description: project.concept
	}
}

export default async function ProjectDetailPage({ params }: Props) {
	const { slug, locale } = await params
	const dict = getDictionary(locale)
	const project = PROJECTS.find(p => p.slug === slug)
	if (!project) notFound()

	return (
		<ProjectDetail
			project={project}
			locale={locale}
			dict={dict.projects}
		/>
	)
}
