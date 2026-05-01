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

export default function ProjectsList({ dict, locale }: Props) {
	const listRef = useRef<HTMLDivElement>(null)
	const { navigateTo } = usePageNav()
	useEffect(() => {
		const ctx = gsap.context(() => {
			// Заголовок
			gsap.fromTo(
				'.pl-header',
				{ opacity: 0, y: 30 },
				{ opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
			)

			// Каждый проект появляется при скролле
			gsap.utils.toArray<HTMLElement>('.pl-item').forEach((item, i) => {
				gsap.fromTo(
					item,
					{ opacity: 0, y: 60 },
					{
						opacity: 1,
						y: 0,
						duration: 0.9,
						ease: 'power3.out',
						scrollTrigger: { trigger: item, start: 'top 80%' },
						delay: i * 0.05
					}
				)
			})
		}, listRef)

		return () => ctx.revert()
	}, [])

	return (
		<div
			ref={listRef}
			className="projects-page"
		>
			<div className="site-container">
				<div className="pl-header projects-page__header">
					<p className="section__pre">{dict.pre}</p>
					<h1 className="projects-page__title">{dict.title}</h1>
				</div>

				<div className="projects-page__list">
					{PROJECTS.map((project, i) => (
						<a
							key={project.id}
							href={`/${locale}/projects/${project.slug}`}
							className="pl-item projects-page__item"
							onClick={e => {
								e.preventDefault()
								navigateTo(`/${locale}/projects/${project.slug}`, project.title)
							}}
						>
							<div className="projects-page__item-inner">
								<div className="projects-page__left">
									<span className="projects-page__number">
										{String(i + 1).padStart(2, '0')}
									</span>

									<div>
										<p className="projects-page__meta">
											{project.type} · {project.year}
										</p>

										<h2 className="projects-page__name">{project.title}</h2>

										<p className="projects-page__concept">{project.concept}</p>
									</div>
								</div>

								<div className="projects-page__view">
									<span>View</span>
									<span>→</span>
								</div>
							</div>
						</a>
					))}

					<div className="projects-page__bottom-line" />
				</div>
			</div>
		</div>
	)
}
