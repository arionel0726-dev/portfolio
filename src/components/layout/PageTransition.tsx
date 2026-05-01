'use client'

import { gsap } from 'gsap'
import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'

const PAGE_LABELS: Record<string, string> = {
	'/projects': 'Projects',
	'/': 'Home',
	'': 'Home'
}

function getLabel(pathname: string): string {
	const parts = pathname.split('/').filter(Boolean)
	const withoutLocale = '/' + parts.slice(1).join('/')
	// Если это якорная навигация — пустая строка
	if (pathname.includes('#')) return ''
	return PAGE_LABELS[withoutLocale] ?? parts[parts.length - 1] ?? ''
}

export default function PageTransition() {
	const pathname = usePathname()
	const overlayRef = useRef<HTMLDivElement>(null)
	const labelRef = useRef<HTMLSpanElement>(null)
	const isFirst = useRef(true)
	const isAnimating = useRef(false)

	useEffect(() => {
		if (isFirst.current) {
			isFirst.current = false
			return
		}

		const el = overlayRef.current
		if (!el) return

		// Небольшая задержка чтобы страница успела отрендериться
		gsap.delayedCall(0.05, () => {
			gsap.to(el, {
				yPercent: -100,
				duration: 0.55,
				ease: 'power4.inOut',
				onComplete: () => {
					gsap.set(el, {
						display: 'none',
						pointerEvents: 'none',
						yPercent: 100
					})
				}
			})
		})
	}, [pathname])

	return (
		<div
			id="page-transition"
			ref={overlayRef}
			style={{
				position: 'fixed',
				inset: 0,
				zIndex: 200,
				background: '#040404',
				display: 'none',
				alignItems: 'center',
				justifyContent: 'center',
				pointerEvents: 'none'
			}}
		>
			<span
				ref={labelRef}
				style={{
					fontSize: 'clamp(2rem, 5vw, 4rem)',
					fontWeight: 300,
					letterSpacing: '0.15em',
					color: '#ffffff',
					textTransform: 'uppercase'
				}}
			/>
		</div>
	)
}
