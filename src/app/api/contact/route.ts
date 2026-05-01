import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
	try {
		const { email, message } = await req.json()

		if (!email || !message) {
			return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
		}

		await resend.emails.send({
			from: 'Portfolio <onboarding@resend.dev>',
			to: process.env.CONTACT_EMAIL!,
			subject: `New message from ${email}`,
			html: `
			<!DOCTYPE html>
        <html>
          <body style="margin:0;padding:0;background:#0a0a0a;font-family:'Inter',sans-serif;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0a;padding:40px 0;">
              <tr>
                <td align="center">
                  <table width="560" cellpadding="0" cellspacing="0" style="background:#111111;border:1px solid #1f1f1f;">
                    
                    <!-- Header -->
                    <tr>
                      <td style="padding:32px 40px;border-bottom:1px solid #1f1f1f;">
                        <p style="margin:0;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#666660;">
                          Portfolio · New Message
                        </p>
                        <p style="margin:8px 0 0;font-size:24px;font-weight:300;color:#e8e8e0;letter-spacing:-0.02em;">
                          ARIONEL
                        </p>
                      </td>
                    </tr>

                    <!-- Body -->
                    <tr>
                      <td style="padding:32px 40px;">
                        <p style="margin:0 0 8px;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:#666660;">
                          From
                        </p>
                        <p style="margin:0 0 28px;font-size:14px;color:#c8b89a;">
                          ${email}
                        </p>

                        <p style="margin:0 0 8px;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:#666660;">
                          Message
                        </p>
                        <p style="margin:0;font-size:15px;line-height:1.7;color:#e8e8e0;white-space:pre-wrap;">
                          ${message}
                        </p>
                      </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                      <td style="padding:24px 40px;border-top:1px solid #1f1f1f;">
                        <p style="margin:0;font-size:11px;color:#666660;">
                          Sent via arionel.dev · ${new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </p>
                      </td>
                    </tr>

                  </table>
                </td>
              </tr>
            </table>
          </body>
        </html>
			`
		})

		return NextResponse.json({ success: true })
	} catch (error) {
		return NextResponse.json({ error: 'Failed to send' }, { status: 500 })
	}
}
