'use client'
import type { AtoutsData } from '@/lib/types'
import { urlFor } from '@/lib/sanity'

export default function AtoutsSection({ atouts }: { atouts: AtoutsData | null }) {
  const items = atouts?.items ?? [
    { texte: 'Réseau international de partenaires fiables en Asie, Moyen-Orient et Afrique.' },
    { texte: "Capacité à traiter des commandes de grande envergure (par lots ou sur mesure)." },
    { texte: "Expérience cumulée dans l'automobile, l'import/export et le transport." },
    { texte: "Flexibilité et réactivité dans l'exécution des opérations." },
  ]
  return (
    <section id="atouts" style={{ background: 'var(--off)', padding: '90px 6%' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '72px', alignItems: 'center', maxWidth: '1200px', margin: '0 auto' }}>
        <div>
          <p className="section-tag">Nos Atouts</p>
          <h2 style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(2.5rem,5vw,4.5rem)', textTransform: 'uppercase', color: 'var(--dark)' }}>
            Pourquoi nous <span style={{ color: 'var(--blue)' }}>faire confiance</span>
          </h2>
          <div style={{ width: '44px', height: '2px', background: 'var(--blue)', borderRadius: '2px', margin: '14px 0 28px' }} />
          <p style={{ fontSize: '.88rem', color: 'var(--mid)', lineHeight: 1.8, marginBottom: '28px', fontWeight: 300 }}>
            Nous comprenons les exigences en matiere de qualite, delais et conformite que requirent vos operations.
          </p>
          {items.map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '11px', fontSize: '.85rem', color: 'var(--mid)', lineHeight: 1.65, marginBottom: '12px' }}>
              <div style={{ width: '21px', height: '21px', borderRadius: '50%', background: 'var(--blue-pale)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: 'var(--blue)', fontSize: '.65rem' }}><svg width='10' height='10' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='3' strokeLinecap='round' strokeLinejoin='round'><polyline points='20 6 9 17 4 12'/></svg></div>
              {item.texte}
            </div>
          ))}
        </div>
        <div style={{ position: 'relative', height: '440px' }}>
          <img
            src={atouts?.image ? urlFor(atouts.image).width(800).url() : 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=800&q=80'}
            alt="EA Motors fleet"
            style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '6px', boxShadow: 'var(--sh-lg)', filter: 'brightness(.9)' }}
          />
        </div>
      </div>
    </section>
  )
}
