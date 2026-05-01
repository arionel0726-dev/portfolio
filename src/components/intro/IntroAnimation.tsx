'use client'

import { gsap } from 'gsap'
import { useEffect, useRef } from 'react'

const WORDS = [
	'Welcome',
	'Добро пожаловать',
	'Bienvenido',
	'Bienvenue',
	'Willkommen',
	'欢迎'
]

const FINAL_WORD = 'Welcome'

interface Props {
	onComplete: () => void
}

export default function IntroAnimation({ onComplete }: Props) {
	const containerRef = useRef<HTMLDivElement>(null)
	const wordRef = useRef<HTMLSpanElement>(null)

	useEffect(() => {
		let index = 0

		const showNext = () => {
			if (index >= WORDS.length) {
				if (wordRef.current) wordRef.current.textContent = FINAL_WORD

				gsap.fromTo(
					wordRef.current,
					{ opacity: 0, y: 20 },
					{
						opacity: 1,
						y: 0,
						duration: 0.4,
						ease: 'power2.out',
						onComplete: () => {
							gsap.delayedCall(0.8, () => {
								gsap.to(containerRef.current, {
									yPercent: -100,
									duration: 0.9,
									ease: 'power3.inOut',
									onComplete
								})
							})
						}
					}
				)

				return
			}

			if (wordRef.current) wordRef.current.textContent = WORDS[index]

			gsap.fromTo(
				wordRef.current,
				{ opacity: 0, y: 20 },
				{
					opacity: 1,
					y: 0,
					duration: 0.27,
					ease: 'power2.out',
					onComplete: () => {
						gsap.to(wordRef.current, {
							opacity: 0,
							y: -20,
							duration: 0.19,
							delay: 0.22,
							ease: 'power2.in',
							onComplete: () => {
								index++
								showNext()
							}
						})
					}
				}
			)
		}

		showNext()

		return () => {
			gsap.killTweensOf([containerRef.current, wordRef.current])
		}
	}, [onComplete])

	return (
		<div
			ref={containerRef}
			className="intro"
			role="status"
			aria-label="Loading"
		>
			<span
				ref={wordRef}
				className="intro__word"
			/>
		</div>
	)
}
