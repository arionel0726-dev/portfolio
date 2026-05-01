'use client'
import Link from 'next/link'

interface Props {
	dict: { rights: string }
}

export default function Footer({ dict }: Props) {
	return (
		<footer
			role="contentinfo"
			className="footer"
		>
			<div className="site-container footer__inner">
				<Link
					href="https://github.com/arionel0726-dev"
					target="_blank"
					rel="noopener noreferrer"
					className="footer__link"
					aria-label="GitHub profile"
				>
					<span className="footer__dot" />
					<span>arionel0726-dev</span>
				</Link>

				<p className="footer__rights">
					© {new Date().getFullYear()} Arionel. {dict.rights}
				</p>
			</div>
		</footer>
	)
}
