import IntroWrapper from '@/components/intro/IntroWrapper'
import Footer from '@/components/layout/Footer'
import Header from '@/components/layout/Header'
import SmoothScroll from '@/components/layout/SmoothScroll'
import { getDictionary, locales } from '@/lib/i18n'
import type { Locale } from '@/types'
import type { Metadata } from 'next'

interface Props {
	children: React.ReactNode
	params: Promise<{ locale: Locale }>
}

export async function generateStaticParams() {
	return locales.map(locale => ({ locale }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { locale } = await params

	return {
		alternates: {
			canonical: `https://arionel.dev/${locale}`,
			languages: { en: '/en', ru: '/ru' }
		}
	}
}

export default async function LocaleLayout({ children, params }: Props) {
	const { locale } = await params
	const dict = getDictionary(locale)

	return (
		<div lang={locale}>
			<SmoothScroll />
			<IntroWrapper>
				<Header
					dict={dict.nav}
					locale={locale}
				/>
				<main
					id="main-content"
					tabIndex={-1}
				>
					{children}
				</main>
				<Footer dict={dict.footer} />
			</IntroWrapper>
		</div>
	)
}
