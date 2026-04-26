'use client'
import type { Marque } from '@/lib/types'

export default function MarquesTicker({ marques }: { marques: Marque[] }) {
  const names = marques.length > 0
    ? marques.map((m) => m.nom)
    : ['FAW Trucks', 'Foton', 'FAW Trucks', 'Foton', 'FAW Trucks', 'Foton']
  const doubled = [...names, ...names]
  return (
    <section id="marques" style={{ padding: '56px 6%', background: 'var(--light)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: '.66rem', fontWeight: 700, letterSpacing: '.28em', textTransform: 'uppercase', color: 'var(--soft)', textAlign: 'center', marginBottom: '34px' }}>
        Nos marques & partenaires
      </p>
      <div style={{ overflow: 'hidden', position: 'relative' }}>
        <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: '80px', zIndex: 2, background: 'linear-gradient(to right, var(--light), transparent)' }} />
        <div style={{ position: 'absolute', top: 0, bottom: 0, right: 0, width: '80px', zIndex: 2, background: 'linear-gradient(to left, var(--light), transparent)' }} />
        <div style={{ display: 'flex', gap: '56px', alignItems: 'center', animation: 'scroll-br 22s linear infinite', width: 'max-content' }}>
          {doubled.map((name, i) => (
            <span key={i} style={{ fontFamily: 'var(--font-bebas)', fontSize: '1.6rem', letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--silver)', whiteSpace: 'nowrap', transition: 'color .3s', cursor: 'default' }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = 'var(--blue)')}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = 'var(--silver)')}
            >{name}</span>
          ))}
        </div>
      </div>
    </section>
  )
}
