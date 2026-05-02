import { ImageResponse } from 'next/og'

export const runtime = 'edge'
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
			<div
				style={{
					width: '48px',
					height: '1px',
					background: '#c8b89a',
					marginBottom: '32px'
				}}
			/>
			<div
				style={{
					fontSize: '80px',
					fontWeight: 300,
					color: '#e8e8e0',
					lineHeight: 1,
					marginBottom: '24px'
				}}
			>
				Projects
			</div>
			<div
				style={{
					fontSize: '18px',
					color: '#666660',
					letterSpacing: '0.15em',
					textTransform: 'uppercase'
				}}
			>
				Arionel · Selected Work
			</div>
		</div>,
		{ ...size }
	)
}
