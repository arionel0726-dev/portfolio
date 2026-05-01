import { gsap } from 'gsap'
import { usePathname, useRouter } from 'next/navigation'

export function usePageNav() {
	const router = useRouter()
	const pathname = usePathname()

	const navigateTo = (href: string, label: string = '') => {
		const currentBase = pathname.split('#')[0]
		const targetBase = href.split('#')[0]
		if (currentBase === targetBase) return

		const el = document.getElementById('page-transition')
		const labelEl = el?.querySelector('span') as HTMLSpanElement | null

		if (!el) {
			router.push(href)
			return
		}

		if (labelEl) labelEl.textContent = label

		gsap.killTweensOf([el, labelEl])
		gsap.set(el, { yPercent: 100, display: 'flex', pointerEvents: 'all' })
		if (labelEl) gsap.set(labelEl, { opacity: 0, y: 20 })

		const tl = gsap.timeline({
			onComplete: () => router.push(href)
		})

		// Overlay въезжает снизу
		tl.to(el, { yPercent: 0, duration: 0.55, ease: 'power4.inOut' })

		// Текст появляется
		if (label && labelEl) {
			tl.to(
				labelEl,
				{ opacity: 1, y: 0, duration: 0.25, ease: 'power2.out' },
				'-=0.15'
			)
			// Текст исчезает перед переходом
			tl.to(
				labelEl,
				{ opacity: 0, y: -15, duration: 0.2, ease: 'power2.in' },
				'+=0.3'
			)
		}
	}

	return { navigateTo }
}
