import '@/app/globals.css'
import PageTransition from '@/components/layout/PageTransition'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({
	subsets: ['latin', 'cyrillic'],
	variable: '--font-inter'
})

export const metadata: Metadata = {
	metadataBase: new URL('https://arionel.dev'),
	title: {
		default: 'Arionel — Fullstack & Mobile Developer',
		template: '%s | Arionel'
	},
	description:
		'Arsen — Fullstack & Mobile Developer from Moldova. Building clean, fast and purposeful digital products.',
	keywords: [
		'fullstack developer',
		'mobile developer',
		'Moldova',
		'Next.js',
		'React',
		'TypeScript'
	],
	authors: [{ name: 'Arsen', url: 'https://arionel.dev' }],
	creator: 'Arsen',
	openGraph: {
		type: 'website',
		locale: 'en_US',
		url: 'https://arionel.dev',
		siteName: 'Arionel',
		title: 'Arionel — Fullstack & Mobile Developer',
		description: 'Building clean, fast and purposeful digital products.'
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Arionel — Fullstack & Mobile Developer',
		description: 'Building clean, fast and purposeful digital products.'
	},
	robots: {
		index: true,
		follow: true
	}
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html suppressHydrationWarning>
			<body className={`${inter.variable} font-sans antialiased`}>
				<PageTransition />
				{children}
			</body>
		</html>
	)
}
