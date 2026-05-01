import About from '@/components/sections/About'
import Contact from '@/components/sections/Contact'
import Hero from '@/components/sections/Hero'
import Projects from '@/components/sections/Projects'
import { getDictionary } from '@/lib/i18n'
import type { Locale } from '@/types'

interface Props {
	params: Promise<{ locale: Locale }>
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
