'use client'
import type { SiteSettings } from '@/lib/types'

export default function CtaStrip({ settings }: { settings: SiteSettings | null }) {
  return (
    <section id="cta-strip" style={{ background: 'linear-gradient(135deg,white 0%,var(--blue-pale) 100%)', borderTop: '1.5px solid var(--border)', padding: '80px 6%' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '40px', flexWrap: 'wrap' }}>
        <div>
          <div style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(2rem,4.5vw,3.5rem)', textTransform: 'uppercase', color: 'var(--dark)', lineHeight: .95 }}>
            Votre prochain véhicule est<br /><span style={{ color: 'var(--blue)' }}>plus proche de vous que jamais.</span>
          </div>
          <div style={{ fontSize: '.85rem', color: 'var(--soft)', marginTop: '8px', fontWeight: 300 }}>
            Vente · Location · Import/Export · Togo · Benin · Burkina Faso
          </div>
        </div>
        <div style={{ display: 'flex', gap: '13px', flexWrap: 'wrap' }}>
          <a href="#vehicules" className="btn-primary">Voir les vehicules</a>
          <a href={`tel:${settings?.phone?.replace(/\s/g, '')}`} className="btn-outline">
            {settings?.phone ?? '+228 9603 4681'}
          </a>
        </div>
      </div>
    </section>
  )
}
