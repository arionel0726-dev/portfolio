import Link from 'next/link'

export default function NotFound() {
	return (
		<div className="notfound">
			<p className="notfound__code">404</p>

			<h1 className="notfound__title">Lost.</h1>

			<p className="notfound__text">
				This page doesn't exist or was moved somewhere else.
			</p>

			<Link
				href="/en"
				className="notfound__link"
			>
				<span className="notfound__line" />
				Back to Home
			</Link>
		</div>
	)
}
