import { jwtVerify, SignJWT } from 'jose'
import { cookies } from 'next/headers'

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET!)
const COOKIE = 'admin_token'

export async function signToken() {
	return await new SignJWT({ admin: true })
		.setProtectedHeader({ alg: 'HS256' })
		.setExpirationTime('7d')
		.sign(SECRET)
}

export async function verifyToken(): Promise<boolean> {
	try {
		const cookieStore = await cookies()
		const token = cookieStore.get(COOKIE)?.value
		if (!token) return false
		await jwtVerify(token, SECRET)
		return true
	} catch {
		return false
	}
}
export async function setAuthCookie(token: string) {
	const cookieStore = await cookies()
	cookieStore.set(COOKIE, token, {
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		sameSite: 'lax',
		maxAge: 60 * 60 * 24 * 7
	})
}
export async function clearAuthCookie() {
	const cookieStore = await cookies()
	cookieStore.delete(COOKIE)
}
