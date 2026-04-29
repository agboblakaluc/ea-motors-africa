'use client'
import { useState } from 'react'
import type { SiteSettings } from '@/lib/types'

// SVG Icons — toujours blanc sur fond bleu
const IconPin = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
const IconPhone = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6 6l1-1a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
const IconMail = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
const IconClock = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
const IconGlobe = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>

const iconBox: React.CSSProperties = {
  width: '42px', height: '42px', flexShrink: 0, borderRadius: '6px',
  background: 'var(--blue)', display: 'flex', alignItems: 'center',
  justifyContent: 'center', boxShadow: '0 4px 12px rgba(27,58,107,.3)',
}

export default function ContactSection({ settings }: { settings: SiteSettings | null }) {
  const s = {
    ...(settings ?? {}),
    email: 'contact@eamotorsafrique.com',
    phone: settings?.phone ?? '+228 9603 4681',
    address: settings?.address ?? "Rue de l'ancien siège Unir",
    addressLine2: settings?.addressLine2 ?? 'Agbalépédo, Lomé - Togo',
    zone: settings?.zone ?? 'Togo · Bénin · Burkina Faso',
    hours: settings?.hours ?? 'Lun–Ven 08h–18h · Sam 08h–14h',
  } as SiteSettings

  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [form, setForm] = useState({ prenom: '', nom: '', email: '', tel: '', type: '', detail: '', message: '' })

  const handleSubmit = async () => {
    if (!form.prenom || !form.nom || !form.email) return
    setSending(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) setSent(true)
    } finally {
      setSending(false)
    }
  }

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }))

  const inputStyle: React.CSSProperties = {
    width: '100%', background: 'var(--off)', border: '1.5px solid var(--border)',
    borderRadius: '3px', color: 'var(--dark)', fontFamily: 'var(--font-body)',
    fontSize: '.88rem', padding: '11px 14px', outline: 'none',
  }

  const contactItems = [
    { icon: <IconPin />, label: 'Adresse', value: <>{s.address}<br />{s.addressLine2}</> },
    { icon: <IconPhone />, label: 'Téléphone / WhatsApp', value: s.phone },
    { icon: <IconMail />, label: 'Email', value: s.email },
    { icon: <IconClock />, label: 'Horaires', value: s.hours },
    { icon: <IconGlobe />, label: 'Zone desservie', value: <>{s.zone} · Espace CEDEAO</> },
  ]

  return (
    <section id="contact" style={{ background: 'white', padding: '90px 6%' }}>
      <div style={{ textAlign: 'center', marginBottom: '54px' }}>
        <p className="section-tag" style={{ justifyContent: 'center' }}>Nous Contacter</p>
        <h2 style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(2.5rem,5vw,4.5rem)', textTransform: 'uppercase', color: 'var(--dark)' }}>
          Prenez <span style={{ color: 'var(--blue)' }}>Contact</span>
        </h2>
      </div>

      <div className="contact-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '72px', maxWidth: '1200px', margin: '0 auto' }}>
        {/* Info panel */}
        <div>
          {contactItems.map((item) => (
            <div key={item.label} style={{ display: 'flex', gap: '14px', marginBottom: '22px', alignItems: 'flex-start' }}>
              <div style={iconBox}>{item.icon}</div>
              <div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '.6rem', fontWeight: 700, letterSpacing: '.17em', textTransform: 'uppercase', color: 'var(--blue)', marginBottom: '3px' }}>{item.label}</div>
                <div style={{ fontSize: '.85rem', color: 'var(--mid)', lineHeight: 1.65, fontWeight: 300 }}>{item.value}</div>
              </div>
            </div>
          ))}

          {/* Social links */}
          <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
            {[
              { label: 'F', href: s.socialFacebook },
              { label: 'IN', href: s.socialLinkedin },
              { label: 'IG', href: s.socialInstagram },
              { label: 'WA', href: s.socialWhatsapp },
            ].map((soc) => (
              <a key={soc.label} href={soc.href ?? '#'}
                style={{ width: '36px', height: '36px', borderRadius: '4px', border: '1.5px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--soft)', textDecoration: 'none', fontFamily: 'var(--font-bebas)', fontSize: '.85rem', transition: 'all .25s' }}
                onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = 'var(--blue)'; el.style.color = 'white'; el.style.borderColor = 'var(--blue)' }}
                onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = 'transparent'; el.style.color = 'var(--soft)'; el.style.borderColor = 'var(--border)' }}
              >{soc.label}</a>
            ))}
          </div>
        </div>

        {/* Form */}
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: '.59rem', fontWeight: 700, letterSpacing: '.15em', textTransform: 'uppercase', color: 'var(--blue)', marginBottom: '5px' }}>Prénom</label>
              <input style={inputStyle} type="text" placeholder="Kofi" value={form.prenom} onChange={set('prenom')} />
            </div>
            <div>
              <label style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: '.59rem', fontWeight: 700, letterSpacing: '.15em', textTransform: 'uppercase', color: 'var(--blue)', marginBottom: '5px' }}>Nom</label>
              <input style={inputStyle} type="text" placeholder="Mensah" value={form.nom} onChange={set('nom')} />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '14px' }}>
            <div>
              <label style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: '.59rem', fontWeight: 700, letterSpacing: '.15em', textTransform: 'uppercase', color: 'var(--blue)', marginBottom: '5px' }}>Email</label>
              <input style={inputStyle} type="email" placeholder="kofi@exemple.com" value={form.email} onChange={set('email')} />
            </div>
            <div>
              <label style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: '.59rem', fontWeight: 700, letterSpacing: '.15em', textTransform: 'uppercase', color: 'var(--blue)', marginBottom: '5px' }}>Téléphone</label>
              <input style={inputStyle} type="tel" placeholder="+228 00 00 00 00" value={form.tel} onChange={set('tel')} />
            </div>
          </div>

          <div style={{ marginTop: '14px' }}>
            <label style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: '.59rem', fontWeight: 700, letterSpacing: '.15em', textTransform: 'uppercase', color: 'var(--blue)', marginBottom: '5px' }}>Type de demande</label>
            <select style={{ ...inputStyle, appearance: 'none' }} value={form.type} onChange={set('type')}>
              <option>Achat véhicule neuf / occasion</option>
              <option>Location de véhicule</option>
              <option>Import / Export de véhicules</option>
              <option>Engins & Équipements (FAW, FOTON)</option>
              <option>Financement (LOA / LLD / Crédit)</option>
              <option>Partenariat commercial</option>
              <option>Autre</option>
            </select>
          </div>

          <div style={{ marginTop: '14px' }}>
            <label style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: '.59rem', fontWeight: 700, letterSpacing: '.15em', textTransform: 'uppercase', color: 'var(--blue)', marginBottom: '5px' }}>Détails</label>
            <input style={inputStyle} type="text" placeholder="ex : FAW J6P 6×4, Flotte 5 camions Foton..." value={form.detail} onChange={set('detail')} />
          </div>

          <div style={{ marginTop: '14px' }}>
            <label style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: '.59rem', fontWeight: 700, letterSpacing: '.15em', textTransform: 'uppercase', color: 'var(--blue)', marginBottom: '5px' }}>Message</label>
            <textarea style={{ ...inputStyle, minHeight: '100px', resize: 'vertical' }} placeholder="Décrivez votre projet..." value={form.message} onChange={set('message')} />
          </div>

          <button onClick={handleSubmit} disabled={sending || sent}
            style={{ width: '100%', background: sent ? '#1a6f3c' : 'var(--blue)', color: 'white', fontFamily: 'var(--font-body)', fontSize: '.8rem', fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', padding: '15px', border: 'none', cursor: 'pointer', borderRadius: '3px', marginTop: '14px', transition: 'all .3s' }}
          >
            {sent ? '✓ Message envoyé !' : sending ? 'Envoi en cours…' : 'Envoyer ma demande →'}
          </button>

          {sent && (
            <div style={{ marginTop: '11px', background: 'var(--blue-pale)', border: '1.5px solid rgba(27,58,107,.18)', borderRadius: '3px', padding: '11px 15px', fontFamily: 'var(--font-body)', fontSize: '.74rem', fontWeight: 600, color: 'var(--blue)', textAlign: 'center' }}>
              ✓ Message reçu — Nous vous répondrons dans les 24h ouvrées.
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
