'use client'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef, useState } from 'react'

gsap.registerPlugin(ScrollTrigger)

interface Props {
	dict: {
		pre: string
		title: string
		text: string
		email: string
		message: string
		send: string
		success: string
		error: string
	}
}

type Status = 'idle' | 'loading' | 'success' | 'error'

export default function Contact({ dict }: Props) {
	const sectionRef = useRef<HTMLElement>(null)
	const [email, setEmail] = useState('')
	const [message, setMessage] = useState('')
	const [status, setStatus] = useState<Status>('idle')

	useEffect(() => {
		const ctx = gsap.context(() => {
			gsap.fromTo(
				'.contact-item',
				{ opacity: 0, y: 40 },
				{
					opacity: 1,
					y: 0,
					duration: 0.8,
					stagger: 0.1,
					ease: 'power3.out',
					scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }
				}
			)
		}, sectionRef)
		return () => ctx.revert()
	}, [])

	const handleSubmit = async () => {
		if (!email || !message) {
			setStatus('error')
			setTimeout(() => setStatus('idle'), 4000)
			return
		}

		setStatus('loading')

		try {
			const res = await fetch('/api/contact', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email, message })
			})

			if (res.ok) {
				setStatus('success')
				setEmail('')
				setMessage('')
				setTimeout(() => setStatus('idle'), 4000)
			} else {
				setStatus('error')
				setTimeout(() => setStatus('idle'), 4000)
			}
		} catch {
			setStatus('error')
			setTimeout(() => setStatus('idle'), 4000)
		}
	}

	return (
		<section
			ref={sectionRef}
			id="contact"
			className="section contact"
		>
			<div className="site-container">
				<p className="contact-item section__pre">{dict.pre}</p>

				<h2 className="contact-item section__title">{dict.title}</h2>

				<p className="contact-item contact__text">{dict.text}</p>

				<div className="contact__form">
					{/* Email */}
					<div className="contact-item contact__field">
						<label className="contact__label">{dict.email}</label>
						<input
							type="email"
							value={email}
							onChange={e => setEmail(e.target.value)}
							disabled={status === 'loading'}
							className="contact__input"
							placeholder="your@email.com"
						/>
					</div>

					{/* Message */}
					<div className="contact-item contact__field">
						<label className="contact__label">{dict.message}</label>
						<textarea
							value={message}
							onChange={e => setMessage(e.target.value)}
							disabled={status === 'loading'}
							rows={5}
							className="contact__textarea"
							placeholder="Tell me about your project..."
						/>
					</div>

					{/* Button */}
					<div className="contact-item contact__actions">
						<button
							onClick={handleSubmit}
							disabled={status === 'loading' || !email || !message}
							className="contact__button"
						>
							<span className="contact__button-line" />
							{status === 'loading' ? '...' : dict.send}
						</button>

						{status === 'success' && (
							<p className="contact__success">{dict.success}</p>
						)}

						{status === 'error' && (
							<p className="contact__error">{dict.error}</p>
						)}
					</div>
				</div>
			</div>
		</section>
	)
}
