import { PROJECTS } from '@/data/projects'
import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
	const base = 'https://arionel.dev'
	const locales = ['en', 'ru']

	const static_pages = locales.flatMap(locale => [
		{ url: `${base}/${locale}`, lastModified: new Date() },
		{ url: `${base}/${locale}/projects`, lastModified: new Date() }
	])

	const project_pages = locales.flatMap(locale =>
		PROJECTS.map(p => ({
			url: `${base}/${locale}/projects/${p.slug}`,
			lastModified: new Date()
		}))
	)

	return [...static_pages, ...project_pages]
}
