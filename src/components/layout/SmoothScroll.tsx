'use client'

import Lenis from 'lenis'
import { useEffect } from 'react'

export default function SmoothScroll() {
	useEffect(() => {
		const lenis = new Lenis({
			duration: 1.4,
			easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
			smoothWheel: true
		})

		// Глобальная ссылка для handleNav
		;(window as any).__lenis = lenis

		const raf = (time: number) => {
			lenis.raf(time)
			requestAnimationFrame(raf)
		}

		requestAnimationFrame(raf)

		return () => {
			lenis.destroy()
			delete (window as any).__lenis
		}
	}, [])

	return null
}
