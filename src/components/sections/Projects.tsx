'use client'

import { PROJECTS } from '@/data/projects'
import { usePageNav } from '@/hooks/usePageNav'
import type { Locale } from '@/types'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef } from 'react'

gsap.registerPlugin(ScrollTrigger)

interface Props {
	dict: { pre: string; title: string; viewAll: string }
	locale: Locale
}

export default function Projects({ dict, locale }: Props) {
	const sectionRef = useRef<HTMLElement>(null)
	const displayed = PROJECTS.slice(0, 3)
	const { navigateTo } = usePageNav()
	useEffect(() => {
		const ctx = gsap.context(() => {
			gsap.fromTo(
				'.project-item',
				{ opacity: 0, y: 40 },
				{
					opacity: 1,
					y: 0,
					duration: 0.7,
					stagger: 0.15,
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

	return (
		<section
			ref={sectionRef}
			id="projects"
			className="section projects"
		>
			<div className="site-container">
				<p className="section__pre">{dict.pre}</p>
				<h2 className="section__title">{dict.title}</h2>

				<div className="projects__list">
					{displayed.map((project, i) => (
						<a
							key={project.id}
							href={`/${locale}/projects/${project.slug}`}
							className="project-item project-card"
							onClick={e => {
								e.preventDefault()
								navigateTo(`/${locale}/projects/${project.slug}`, project.title)
							}}
						>
							<div className="project-card__main">
								<span className="project-card__number">
									{String(i + 1).padStart(2, '0')}
								</span>
								<span className="project-card__title">{project.title}</span>
							</div>
							<div className="project-card__meta">
								<span>{project.type}</span>
								<span>{project.year}</span>
								<span className="project-card__view">View →</span>
							</div>
						</a>
					))}
				</div>

				<div className="projects__action">
					<a
						href={`/${locale}/projects`}
						className="projects__view-all"
						onClick={e => {
							e.preventDefault()
							navigateTo(`/${locale}/projects`, 'Projects')
						}}
					>
						<span />
						{dict.viewAll}
					</a>
				</div>
			</div>
		</section>
	)
}
