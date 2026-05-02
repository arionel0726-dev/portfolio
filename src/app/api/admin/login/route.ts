import { setAuthCookie, signToken } from '@/lib/auth'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
	const { password } = await req.json()

	if (password !== process.env.ADMIN_PASSWORD) {
		return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
	}

	const token = await signToken()
	await setAuthCookie(token)
	return NextResponse.json({ success: true })
}
