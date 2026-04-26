'use client'
import type { Equipement } from '@/lib/types'

const defaultEquipements: Omit<Equipement, '_id'>[] = [
  {
    marque: 'FAW Trucks', sousTitre: 'First Automobile Works · Chine', ordre: 1,
    description: "Véhicules utilitaires lourds robustes, adaptés aux routes et conditions de l'Afrique de l'Ouest. Tracteurs, bennes, citernes et semi-remorques.",
    items: ['Tracteurs routiers 4×2 & 6×4', 'Camions benne 6×4 — 30 T utile', 'Semi-remorques plateau, citerne & benne', 'Import direct Chine · stock disponible'],
  },
  {
    marque: 'FOTON', sousTitre: 'Foton Motor Co. · Chine', ordre: 2,
    description: "Leader des véhicules utilitaires en Asie, Foton propose des camions légers à lourds fiables et économiques pour les marchés africains.",
    items: ['Camions porteurs & frigorifiques', 'Camions benne moyens tonnages', 'Véhicules de chantier & BTP', 'Excellent rapport qualité/prix'],
  },
]

export default function EquipementsSection({ equipements }: { equipements: Equipement[] }) {
  const items = equipements.length > 0 ? equipements : defaultEquipements as Equipement[]
  return (
    <section id="equipements" style={{ background: 'var(--dark)', padding: '80px 6%', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg,#0f1d33 0%,#1a2e4a 50%,#0f1d33 100%)' }} />
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle,rgba(255,255,255,.025) 1px,transparent 1px)', backgroundSize: '28px 28px' }} />
      <div style={{ position: 'relative', zIndex: 1, maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <p className="section-tag" style={{ justifyContent: 'center', color: 'rgba(200,210,222,.6)' }}>Materiel Professionnel</p>
          <h2 style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(2.5rem,5vw,4.5rem)', textTransform: 'uppercase', color: 'white' }}>
            Nos Equipements & Engins Lourds
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '18px', maxWidth: '800px', margin: '0 auto' }}>
          {items.map((eq) => (
            <div key={eq._id || eq.marque}
              style={{ background: 'rgba(255,255,255,.05)', border: '1px solid rgba(255,255,255,.08)', borderRadius: '6px', padding: '28px 26px', transition: 'all .3s' }}
              onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = 'rgba(27,58,107,.38)'; el.style.transform = 'translateY(-3px)' }}
              onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = 'rgba(255,255,255,.05)'; el.style.transform = 'none' }}
            >
              <div style={{ fontFamily: 'var(--font-bebas)', fontSize: '1.9rem', letterSpacing: '.08em', color: 'var(--silver-l)' }}>{eq.marque}</div>
              <div style={{ fontSize: '.63rem', fontWeight: 600, letterSpacing: '.18em', textTransform: 'uppercase', color: 'rgba(200,210,222,.38)', marginBottom: '14px', marginTop: '3px' }}>{eq.sousTitre}</div>
              <div style={{ width: '32px', height: '2px', background: 'var(--blue-light)', marginBottom: '14px' }} />
              <p style={{ fontSize: '.8rem', color: 'rgba(200,210,222,.55)', lineHeight: 1.7, marginBottom: '16px', fontWeight: 300 }}>{eq.description}</p>
              {eq.items.map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '9px', fontSize: '.76rem', color: 'rgba(200,210,222,.65)', lineHeight: 1.55, marginBottom: '8px' }}>
                  <div style={{ width: '16px', height: '16px', borderRadius: '50%', background: 'rgba(27,58,107,.55)', border: '1px solid rgba(58,107,181,.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '.55rem', color: 'white' }}><svg width='9' height='9' viewBox='0 0 24 24' fill='none' stroke='white' strokeWidth='3' strokeLinecap='round' strokeLinejoin='round'><polyline points='20 6 9 17 4 12'/></svg></div>
                  {item}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
