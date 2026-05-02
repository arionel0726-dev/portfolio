import About from '@/components/sections/About'
import Contact from '@/components/sections/Contact'
import Hero from '@/components/sections/Hero'
import Projects from '@/components/sections/Projects'
import { getDictionary } from '@/lib/i18n'
import type { Locale } from '@/types'
import { Metadata } from 'next'

interface Props {
	params: Promise<{ locale: Locale }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { locale } = await params
	const dict = getDictionary(locale)
	const isRu = locale === 'ru'

	return {
		title: isRu
			? 'Arionel — Fullstack & Mobile Разработчик'
			: 'Arionel — Fullstack & Mobile Developer',
		description: isRu
			? 'Арсен — Fullstack & Mobile разработчик из Молдовы. Создаю чистые, быстрые и качественные продукты.'
			: 'Arsen — Fullstack & Mobile Developer from Moldova. Building clean, fast and purposeful digital products.',
		openGraph: {
			title: 'Arionel — Fullstack & Mobile Developer',
			description: dict.hero.quote,
			url: `https://arionel.dev/${locale}`,
			images: [
				{ url: 'https://arionel.dev/opengraph-image', width: 1200, height: 630 }
			]
		}
	}
}

export default async function HomePage({ params }: Props) {
	const { locale } = await params
	const dict = getDictionary(locale)

	return (
		<>
			<Hero dict={dict.hero} />
			<About dict={dict.about} />
			<Projects
				dict={dict.projects}
				locale={locale}
			/>
			<Contact dict={dict.contact} />
		</>
	)
}
