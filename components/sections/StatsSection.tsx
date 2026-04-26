'use client'
import { useEffect, useRef } from 'react'
import type { Stats, Marque } from '@/lib/types'

// ─── STATS ────────────────────────────────────────────────────────────────────
export function StatsSection({ stats }: { stats: Stats | null }) {
  const items = stats?.items ?? [
    { valeur: 5, label: "Domaines d'expertise" },
    { valeur: 3, label: 'Pays desservis' },
    { valeur: 3, label: 'Continents partenaires' },
    { valeur: 100, suffixe: '%', label: 'Conformité administrative' },
  ]

  return (
    <section id="stats" style={{ background: 'var(--blue)', padding: '0 6%' }}>
      <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: `repeat(${items.length},1fr)`, maxWidth: '1200px', margin: '0 auto' }}>
        {items.map((item, i) => (
          <StatBox key={i} item={item} delay={i * 100} />
        ))}
      </div>
    </section>
  )
}

function StatBox({ item, delay }: { item: { valeur: number; suffixe?: string; label: string }; delay: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const numRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = numRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !el.dataset.done) {
            el.dataset.done = '1'
            const target = item.valeur
            let current = 0
            const step = target / (1600 / 16)
            const iv = setInterval(() => {
              current += step
              if (current >= target) { current = target; clearInterval(iv) }
              el.textContent = String(Math.floor(current))
            }, 16)
          }
        })
      },
      { threshold: 0.5 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [item.valeur])

  return (
    <div
      ref={ref}
      style={{
        padding: '42px 24px', textAlign: 'center',
        borderRight: '1px solid rgba(255,255,255,.1)',
        transition: 'background .3s',
      }}
      onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = 'rgba(0,0,0,.1)')}
      onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = 'transparent')}
    >
      <div style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(2.5rem,5vw,3.8rem)', color: 'white', lineHeight: 1, marginBottom: '6px' }}>
        <span ref={numRef}>0</span>
        {item.suffixe && <span style={{ fontSize: '1.4rem', opacity: .5 }}>{item.suffixe}</span>}
      </div>
      <div style={{ fontFamily: 'var(--font-body)', fontSize: '.66rem', fontWeight: 600, letterSpacing: '.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,.48)' }}>
        {item.label}
      </div>
    </div>
  )
}

// ─── MARQUES TICKER ───────────────────────────────────────────────────────────
export function MarquesTicker({ marques }: { marques: Marque[] }) {
  const items = marques.length > 0
    ? marques.map((m) => m.nom)
    : ['BYD', 'MG Motor', 'Lingco', 'SINOTRUK', 'FAW Trucks', 'HOWO', 'Sany', 'Mahindra', 'Foton', 'Dongfeng']

  const doubled = [...items, ...items]

  return (
    <section id="marques" style={{ padding: '56px 6%', background: 'var(--light)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: '.66rem', fontWeight: 700, letterSpacing: '.28em', textTransform: 'uppercase', color: 'var(--soft)', textAlign: 'center', marginBottom: '34px' }}>
        Nos marques & partenaires
      </p>
      <div style={{ overflow: 'hidden', position: 'relative' }}>
        <div style={{
          position: 'absolute', top: 0, bottom: 0, left: 0, width: '80px', zIndex: 2,
          background: 'linear-gradient(to right, var(--light), transparent)',
        }} />
        <div style={{
          position: 'absolute', top: 0, bottom: 0, right: 0, width: '80px', zIndex: 2,
          background: 'linear-gradient(to left, var(--light), transparent)',
        }} />
        <div style={{
          display: 'flex', gap: '56px', alignItems: 'center',
          animation: 'scroll-br 22s linear infinite', width: 'max-content',
        }}>
          {doubled.map((name, i) => (
            <span
              key={i}
              style={{
                fontFamily: 'var(--font-bebas)', fontSize: '1.6rem',
                letterSpacing: '.14em', textTransform: 'uppercase',
                color: 'var(--silver)', whiteSpace: 'nowrap',
                transition: 'color .3s', cursor: 'default',
              }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = 'var(--blue)')}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = 'var(--silver)')}
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

export default StatsSection
