'use client'

import { gsap } from 'gsap'
import { useEffect, useRef } from 'react'

interface Props {
	dict: { role: string; quote: string; meta: string }
}

export default function Hero({ dict }: Props) {
	const containerRef = useRef<HTMLElement>(null)

	useEffect(() => {
		const ctx = gsap.context(() => {
			gsap.fromTo(
				'.hero-item',
				{
					opacity: 0,
					y: 60,
					filter: 'blur(10px)'
				},
				{
					opacity: 1,
					y: 0,
					filter: 'blur(0px)',
					duration: 1.2,
					stagger: 0.22,
					ease: 'power4.out',
					delay: 0.5
				}
			)
		}, containerRef)

		return () => ctx.revert()
	}, [])

	return (
		<section
			ref={containerRef}
			id="hero"
			className="hero"
			aria-label="Hero section"
		>
			<div
				className="hero__bg"
				aria-hidden="true"
			/>

			<div className="site-container hero__content">
				<p className="hero-item hero__meta">{dict.meta}</p>
				<h1 className="hero-item hero__title">{dict.role}</h1>
				<p className="hero-item hero__quote">{dict.quote}</p>

				<div className="hero-item hero__scroll">
					<div className="hero__scroll-line" />
					<span className="hero__scroll-text">Scroll</span>
				</div>
			</div>
		</section>
	)
}
