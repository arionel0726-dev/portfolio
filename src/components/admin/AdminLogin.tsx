'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function AdminLogin() {
	const [password, setPassword] = useState('')
	const [error, setError] = useState('')
	const [loading, setLoading] = useState(false)
	const router = useRouter()

	const handleLogin = async () => {
		setLoading(true)

		setError('')

		const res = await fetch('/api/admin/login', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ password })
		})

		if (res.ok) {
			router.push('/admin')
		} else {
			setError('Invalid password')
			setLoading(false)
		}
	}

	return (
		<div className="admin-login">
			<div className="admin-login__card">
				<p className="admin-pre">Admin</p>
				<h1 className="admin-login__title">ARIONEL</h1>

				<div className="admin-login__form">
					<div className="admin-field">
						<label className="admin-label">Password</label>

						<input
							type="password"
							value={password}
							onChange={e => setPassword(e.target.value)}
							onKeyDown={e => e.key === 'Enter' && handleLogin()}
							className="admin-input"
							placeholder="••••••••"
							autoFocus
						/>
					</div>

					{error && <p className="admin-error">{error}</p>}

					<button
						onClick={handleLogin}
						disabled={loading || !password}
						className="admin-enter"
					>
						<span />
						{loading ? 'Checking...' : 'Enter'}
					</button>
				</div>
			</div>
		</div>
	)
}
