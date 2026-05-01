import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register plugins — вызывать один раз на клиенте
export function registerGSAP() {
	if (typeof window !== 'undefined') {
		gsap.registerPlugin(ScrollTrigger)
	}
}

// Плавный скролл с инерцией (lenis-style через GSAP ticker)
export function initSmoothScroll() {
	// Будет реализован в SmoothScrollProvider
}

export { gsap, ScrollTrigger }
