'use client'

import { useEffect, useState } from 'react'
import IntroAnimation from './IntroAnimation'

interface Props {
	children: React.ReactNode
}

export default function IntroWrapper({ children }: Props) {
	const [done, setDone] = useState(false)
	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		setMounted(true)
		const seen = sessionStorage.getItem('intro-seen')
		if (seen) setDone(true)
	}, [])

	const handleComplete = () => {
		sessionStorage.setItem('intro-seen', '1')
		setDone(true)
	}

	// До mount — полностью скрываем (предотвращает мелькание)
	if (!mounted) {
		return <div style={{ opacity: 0, visibility: 'hidden' }}>{children}</div>
	}

	return (
		<>
			{!done && <IntroAnimation onComplete={handleComplete} />}
			<div className={`intro-content ${done ? 'is-visible' : ''}`}>
				{children}
			</div>
		</>
	)
}
