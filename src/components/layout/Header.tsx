'use client'

import LocaleSwitcher from '@/components/ui/LocaleSwitcher'
import { usePageNav } from '@/hooks/usePageNav'
import type { Locale } from '@/types'
import { gsap } from 'gsap'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

interface Props {
	dict: { about: string; projects: string; contact: string; github: string }
	locale: Locale
}

export default function Header({ dict, locale }: Props) {
	const menuRef = useRef<HTMLDivElement>(null)
	const [menuVisible, setMenuVisible] = useState(false)
	const [menuOpen, setMenuOpen] = useState(false)

	const { navigateTo } = usePageNav()

	const pathname = usePathname()
	const router = useRouter()
	const isHome = pathname === `/${locale}` || pathname === `/${locale}/`

	const navLinks = [
		{
			label: dict.about,
			href: `/${locale}/#about`,
			anchor: 'about',
			pageLabel: ''
		},
		{
			label: dict.projects,
			href: `/${locale}/projects`,
			anchor: null,
			pageLabel: dict.projects
		},
		{
			label: dict.contact,
			href: `/${locale}/#contact`,
			anchor: 'contact',
			pageLabel: ''
		}
	]

	const handleNav = (
		e: React.MouseEvent<HTMLAnchorElement>,
		anchor: string | null
	) => {
		if (!anchor) return
		e.preventDefault()
		e.stopPropagation()

		const scrollTo = () => {
			const el = document.getElementById(anchor)
			if (!el) return
			const lenis = (window as any).__lenis
			if (lenis) {
				lenis.scrollTo(el, { offset: -80, duration: 1.8 })
			} else {
				el.scrollIntoView({ behavior: 'smooth' })
			}
		}

		if (isHome) {
			scrollTo()
		} else {
			const anchorLabel = anchor === 'about' ? dict.about : dict.contact
			navigateTo(`/${locale}`, anchorLabel)
			// Ждём загрузки страницы + завершения анимации
			setTimeout(() => {
				const el = document.getElementById(anchor)
				if (!el) return
				const lenis = (window as any).__lenis
				if (lenis) {
					lenis.scrollTo(el, { offset: -80, duration: 1.8 })
				} else {
					el.scrollIntoView({ behavior: 'smooth' })
				}
			}, 1200)
		}
	}

	// Переход между страницами с анимацией
	const handlePageNav = (
		e: React.MouseEvent<HTMLAnchorElement>,
		href: string,
		label: string = ''
	) => {
		e.preventDefault()
		navigateTo(href, label)
	}

	useEffect(() => {
		if (!menuRef.current) return

		if (menuOpen) {
			gsap.fromTo(
				menuRef.current,
				{ opacity: 0, y: -16, filter: 'blur(8px)' },
				{
					opacity: 1,
					y: 0,
					filter: 'blur(0px)',
					duration: 0.65,
					ease: 'power4.out'
				}
			)

			gsap.fromTo(
				menuRef.current.querySelectorAll('.header__mobile-item'),
				{ opacity: 0, y: 18 },
				{
					opacity: 1,
					y: 0,
					duration: 0.7,
					stagger: 0.08,
					ease: 'power3.out',
					delay: 0.12
				}
			)

			return
		}

		gsap.to(menuRef.current, {
			opacity: 0,
			y: -12,
			filter: 'blur(8px)',
			duration: 0.45,
			ease: 'power3.inOut',
			onComplete: () => setMenuVisible(false)
		})
	}, [menuOpen])

	return (
		<header className="header">
			<div className="site-container header__inner">
				<a
					href={`/${locale}`}
					className="header__logo"
					onClick={e => handlePageNav(e as any, `/${locale}`, 'Home')}
				>
					ARIONEL
				</a>

				<nav
					className="header__nav"
					aria-label="Main navigation"
				>
					{navLinks.map(link => (
						<a
							key={link.href}
							href={link.href}
							className="header__link"
							onClick={e => {
								if (link.anchor) {
									handleNav(e, link.anchor)
								} else {
									handlePageNav(e, link.href, link.pageLabel)
								}
							}}
						>
							{link.label}
						</a>
					))}

					<Link
						href="https://github.com/arionel0726-dev"
						target="_blank"
						rel="noopener noreferrer"
						className="header__github"
					>
						{dict.github}
					</Link>

					<div className="header__divider" />
					<LocaleSwitcher locale={locale} />
				</nav>

				<button
					className={`header__burger ${menuOpen ? 'is-open' : ''}`}
					onClick={() => {
						if (menuOpen) {
							setMenuOpen(false)
						} else {
							setMenuVisible(true)
							setMenuOpen(true)
						}
					}}
					aria-label={menuOpen ? 'Close menu' : 'Open menu'}
					aria-expanded={menuOpen}
				>
					<span />
					<span />
				</button>

				{menuVisible && (
					<div
						ref={menuRef}
						className="header__mobile"
					>
						{navLinks.map(link => (
							<a
								key={link.href}
								href={link.href}
								className="header__mobile-link header__mobile-item"
								onClick={e => {
									if (link.anchor) {
										handleNav(e, link.anchor)
										setMenuOpen(false)
									} else {
										handlePageNav(e, link.href, link.pageLabel)
										setMenuOpen(false)
									}
								}}
							>
								{link.label}
							</a>
						))}

						<Link
							href="https://github.com/arionel0726-dev"
							target="_blank"
							rel="noopener noreferrer"
							className="header__mobile-github header__mobile-item"
						>
							{dict.github}
						</Link>

						<div className="header__mobile-item">
							<LocaleSwitcher locale={locale} />
						</div>
					</div>
				)}
			</div>
		</header>
	)
}
