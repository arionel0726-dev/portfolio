export interface Project {
	id: string
	slug: string
	title: string
	concept: string
	description: string
	year: number
	type: string
	image: string
	github: string
	live: string
	tags: string[]
}

export interface NavItem {
	label: string
	href: string
}

export type Locale = 'en' | 'ru'
