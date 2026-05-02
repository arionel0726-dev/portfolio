import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Arionel — Fullstack & Mobile Developer'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OgImage() {
	return new ImageResponse(
		<div
			style={{
				width: '100%',
				height: '100%',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'flex-end',
				padding: '80px',
				background: '#0a0a0a'
			}}
		>
			{/* Accent line */}
			<div
				style={{
					width: '48px',
					height: '1px',
					background: '#c8b89a',
					marginBottom: '32px'
				}}
			/>

			{/* Name */}
			<div
				style={{
					fontSize: '96px',
					fontWeight: 300,
					color: '#e8e8e0',
					letterSpacing: '-0.02em',
					lineHeight: 1,
					marginBottom: '24px'
				}}
			>
				ARIONEL
			</div>

			{/* Role */}
			<div
				style={{
					fontSize: '24px',
					color: '#666660',
					letterSpacing: '0.1em',
					textTransform: 'uppercase',
					marginBottom: '48px'
				}}
			>
				Fullstack · Mobile Developer
			</div>

			{/* Meta */}
			<div
				style={{
					fontSize: '14px',
					color: '#c8b89a',
					letterSpacing: '0.2em',
					textTransform: 'uppercase'
				}}
			>
				Moldova · 19
			</div>
		</div>,
		{ ...size }
	)
}
