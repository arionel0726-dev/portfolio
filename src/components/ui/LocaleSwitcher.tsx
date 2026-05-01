'use client'

import type { Locale } from '@/types'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface Props {
	locale: Locale
}

export default function LocaleSwitcher({ locale }: Props) {
	const pathname = usePathname()
	const getHref = (next: Locale) => pathname.replace(`/${locale}`, `/${next}`)

	return (
		<div
			className="locale-switcher"
			aria-label="Language switcher"
		>
			{(['en', 'ru'] as Locale[]).map(l => (
				<Link
					key={l}
					href={getHref(l)}
					className={`locale-switcher__link ${locale === l ? 'is-active' : ''}`}
					aria-current={locale === l ? 'true' : undefined}
				>
					{l}
				</Link>
			))}
		</div>
	)
}
