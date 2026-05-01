'use client'

import { usePageNav } from '@/hooks/usePageNav'
import type { Locale, Project } from '@/types'
import { gsap } from 'gsap'
import { Computer, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useRef } from 'react'

interface Props {
	project: Project
	locale: Locale
	dict: { viewSource: string; livePreview: string; back: string }
}

export default function ProjectDetailt({ project, locale, dict }: Props) {
	const pageRef = useRef<HTMLDivElement>(null)
	const { navigateTo } = usePageNav()
	useEffect(() => {
		const ctx = gsap.context(() => {
			gsap.fromTo(
				'.pd-item',
				{ opacity: 0, y: 40 },
				{ opacity: 1, y: 0, duration: 0.9, stagger: 0.12, ease: 'power3.out' }
			)
		}, pageRef)
		return () => ctx.revert()
	}, [])

	return (
		<div
			ref={pageRef}
			className="project-detail"
		>
			<div className="pd-item project-detail__hero">
				<img
					src={project.image}
					alt={project.title}
					className="project-detail__image"
				/>
			</div>

			<div className="site-container project-detail__content">
				<p className="pd-item project-detail__meta">
					{project.type} · {project.year}
				</p>

				<h1 className="pd-item project-detail__title">{project.title}</h1>

				<p className="pd-item project-detail__concept">{project.concept}</p>

				<p className="pd-item project-detail__description">
					{project.description}
				</p>

				<div className="pd-item project-detail__tags">
					{project.tags.map(tag => (
						<span
							key={tag}
							className="project-detail__tag"
						>
							{tag}
						</span>
					))}
				</div>

				<div className="pd-item project-detail__links">
					<Link
						href={project.github}
						target="_blank"
						rel="noopener noreferrer"
						className="project-detail__link"
					>
						<Computer size={16} />
						<span>{dict.viewSource}</span>
						<span className="project-detail__link-line" />
					</Link>

					<Link
						href={project.live}
						target="_blank"
						rel="noopener noreferrer"
						className="project-detail__link"
					>
						<ExternalLink size={16} />
						<span>{dict.livePreview}</span>
						<span className="project-detail__link-line" />
					</Link>
				</div>

				<div className="pd-item project-detail__back">
					<a
						href={`/${locale}/projects`}
						className="project-detail__back-link"
						onClick={e => {
							e.preventDefault()
							navigateTo(`/${locale}/projects`, 'Projects')
						}}
					>
						<span>←</span>
						{dict.back}
					</a>
				</div>
			</div>
		</div>
	)
}
