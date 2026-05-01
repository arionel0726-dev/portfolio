import ProjectsList from '@/components/projects/ProjectsList'
import { getDictionary } from '@/lib/i18n'
import type { Locale } from '@/types'

interface Props {
	params: Promise<{ locale: Locale }>
}

export async function generateMetadata({ params }: Props) {
	const { locale } = await params
	const dict = getDictionary(locale)
	return {
		title: dict.projects.title,
		description: 'All projects by Arionel — Fullstack & Mobile Developer'
	}
}

export default async function ProjectsPage({ params }: Props) {
	const { locale } = await params
	const dict = getDictionary(locale)

	return (
		<div className="min-h-screen pt-24">
			<ProjectsList
				dict={{
					...dict.projects,
					pre: dict.projects.allPre,
					title: dict.projects.allTitle
				}}
				locale={locale}
			/>
		</div>
	)
}
