'use client'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'
import { useEffect, useRef } from 'react'

gsap.registerPlugin(ScrollTrigger)

interface Props {
	dict: {
		pre: string
		title: string
		bio: string
		quote: string
		location: string
		age: string
		focus: string
		interests: string
		localTime: string
	}
}

function LocalTime({ label }: { label: string }) {
	const timeRef = useRef<HTMLSpanElement>(null)

	useEffect(() => {
		const update = () => {
			if (!timeRef.current) return

			timeRef.current.textContent = new Date().toLocaleTimeString('en-GB', {
				timeZone: 'Europe/Chisinau',
				hour: '2-digit',
				minute: '2-digit',
				second: '2-digit'
			})
		}

		update()
		const id = setInterval(update, 1000)

		return () => clearInterval(id)
	}, [])

	return (
		<div className="about__stat">
			<span className="about__stat-key">{label}</span>
			<span
				ref={timeRef}
				className="about__stat-value about__stat-time"
			/>
		</div>
	)
}

export default function About({ dict }: Props) {
	const sectionRef = useRef<HTMLElement>(null)

	useEffect(() => {
		const ctx = gsap.context(() => {
			gsap.fromTo(
				'.about-item',
				{ opacity: 0, y: 40 },
				{
					opacity: 1,
					y: 0,
					duration: 0.8,
					stagger: 0.1,
					ease: 'power3.out',
					scrollTrigger: {
						trigger: sectionRef.current,
						start: 'top 75%'
					}
				}
			)
		}, sectionRef)

		return () => ctx.revert()
	}, [])

	const stats = [
		{ key: 'location', value: dict.location },
		{ key: 'age', value: dict.age },
		{ key: 'focus', value: dict.focus },
		{ key: 'interests', value: dict.interests },
		{ key: 'github', value: 'arionel0726-dev' }
	]

	return (
		<section
			ref={sectionRef}
			id="about"
			className="section about"
		>
			<div className="site-container">
				<p className="about-item section__pre">{dict.pre}</p>
				<h2 className="about-item section__title">{dict.title}</h2>

				<div className="about__grid">
					<div className="about-item about__stats">
						<div className="about__stats-inner">
							{stats.map(({ key, value }) => (
								<div
									key={key}
									className="about__stat"
								>
									<span className="about__stat-key">{key}</span>

									{key === 'github' ? (
										<Link
											href="https://github.com/arionel0726-dev"
											target="_blank"
											rel="noopener noreferrer"
											className="about__stat-link"
										>
											{value}
										</Link>
									) : (
										<span className="about__stat-value">{value}</span>
									)}
								</div>
							))}

							<LocalTime label={dict.localTime} />
						</div>
					</div>

					<div className="about-item about__content">
						<p className="about__bio">{dict.bio}</p>
						<p className="about__quote">{dict.quote}</p>
					</div>
				</div>
			</div>
		</section>
	)
}
