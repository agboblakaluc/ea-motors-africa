import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY)
  const body = await req.json()
  const { prenom, nom, email, tel, type, detail, message } = body

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;border:1px solid #e0e6ef;border-radius:6px;overflow:hidden">
      <div style="background:#0F2B5B;padding:20px 28px">
        <h2 style="color:white;margin:0;font-size:1.3rem;letter-spacing:.05em">EA MOTORS — Nouvelle demande</h2>
      </div>
      <div style="padding:28px">
        <table style="width:100%;border-collapse:collapse;font-size:.9rem">
          <tr><td style="padding:8px 0;color:#6b7e97;width:140px">Nom complet</td><td style="padding:8px 0;font-weight:600;color:#050d1a">${prenom} ${nom}</td></tr>
          <tr><td style="padding:8px 0;color:#6b7e97">Email</td><td style="padding:8px 0;font-weight:600;color:#050d1a">${email}</td></tr>
          <tr><td style="padding:8px 0;color:#6b7e97">Téléphone</td><td style="padding:8px 0;font-weight:600;color:#050d1a">${tel || '—'}</td></tr>
          <tr><td style="padding:8px 0;color:#6b7e97">Type de demande</td><td style="padding:8px 0;font-weight:600;color:#050d1a">${type}</td></tr>
          ${detail ? `<tr><td style="padding:8px 0;color:#6b7e97">Détails</td><td style="padding:8px 0;color:#050d1a">${detail}</td></tr>` : ''}
        </table>
        ${message ? `
        <div style="margin-top:20px;padding:16px;background:#f8fafc;border-left:3px solid #0F2B5B;border-radius:0 4px 4px 0">
          <div style="font-size:.75rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#0F2B5B;margin-bottom:8px">Message</div>
          <p style="margin:0;color:#3a4a60;line-height:1.7;font-size:.9rem">${message}</p>
        </div>` : ''}
      </div>
      <div style="background:#f8fafc;padding:14px 28px;font-size:.75rem;color:#8a9ab0;border-top:1px solid #e0e6ef">
        Reçu depuis eamotorsafrique.com · EA MOTORS Lomé, Togo
      </div>
    </div>
  `

  try {
    await resend.emails.send({
      from: 'EA MOTORS <contact@eamotorsafrique.com>',
      to: 'eam.togo@gmail.com',
      replyTo: email,
      subject: `[EA MOTORS] ${type} — ${prenom} ${nom}`,
      html,
    })
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Mail error:', err)
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
