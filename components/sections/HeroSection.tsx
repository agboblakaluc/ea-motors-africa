'use client'
import { useState, useEffect } from 'react'
import type { Hero, SiteSettings } from '@/lib/types'

type IntroSlide = { type: 'intro'; src: string; photoLabel: string }
type FinSlide = {
  type: 'fin'; icon: string; finLabel: string; finValue: string
  finSub: string; finDesc: string; src: string; photoLabel: string
}
type Slide = IntroSlide | FinSlide

const SLIDES: Slide[] = [
  {
    type: 'intro',
    src: '/faw/j6p-6x4/face.jpg',
    photoLabel: 'FAW J6P 6×4 · 420 ch',
  },
  {
    type: 'intro',
    src: '/foton/Foton-AUMAN-GTL-6X4-Tractor-Red.jpg',
    photoLabel: 'Foton AUMAN GTL 6×4 · Tracteur',
  },
  {
    type: 'fin', icon: '◆',
    finLabel: 'Foton AUMAN GTL',
    finValue: 'Benne 6×4 & 8×4',
    finSub: 'BTP · Mines · Carrières',
    finDesc: "Puissant et fiable, le Foton AUMAN GTL Benne est conçu pour les conditions les plus exigeantes d'Afrique. Charge utile jusqu'à 35 T, motorisation Euro III.",
    src: '/foton/FOTON-Auman-GTL-6X4-dump-truck.jpg',
    photoLabel: 'Foton AUMAN GTL 6×4 Benne',
  },
  {
    type: 'fin', icon: '—',
    finLabel: 'Financement longue durée',
    finValue: "Jusqu'à 60 mois",
    finSub: 'de crédit',
    finDesc: "Étalez le coût de votre engin sur 5 ans. Des mensualités adaptées à votre trésorerie, sans alourdir votre bilan.",
    src: '/faw/j6p-4x2/face.jpg',
    photoLabel: 'FAW J6P 4×2 · Tracteur routier',
  },
  {
    type: 'fin', icon: '✦',
    finLabel: 'Sans apport initial',
    finValue: '100% financé',
    finSub: 'de la valeur du véhicule',
    finDesc: "Démarrez sans immobiliser votre capital. Votre engin travaille dès le premier jour et génère son propre remboursement.",
    src: '/faw/semi-trailer/3ax-tanker.jpg',
    photoLabel: 'FAW Semi-Remorque Citerne',
  },
  {
    type: 'fin', icon: '◈',
    finLabel: 'Apport réduit',
    finValue: 'À partir de 30%',
    finSub: "d'apport personnel",
    finDesc: "Un apport minimal de 30% suffit pour déclencher votre dossier. Idéal pour les PME et transporteurs en développement de flotte.",
    src: '/faw/semi-trailer/4ax-flatbed.jpg',
    photoLabel: 'FAW Semi-Remorque Plateau 4 essieux',
  },
  {
    type: 'fin', icon: '»',
    finLabel: 'Accord rapide',
    finValue: 'Réponse en 24h',
    finSub: 'ouvrées garantie',
    finDesc: "Notre équipe analyse votre dossier en un temps record. Pas de longue attente — votre projet démarre quand vous le décidez.",
    src: '/faw/semi-trailer/3ax-dump.jpg',
    photoLabel: 'FAW Semi-Remorque Benne 3 essieux',
  },
]

interface HeroProps { hero: Hero | null; settings: SiteSettings | null }

/* Stagger helper: animation avec délai */
const stagger = (delay: number) => ({
  animation: `hero-slide-up 0.65s cubic-bezier(0.22,1,0.36,1) ${delay}ms both`,
} as React.CSSProperties)

export default function HeroSection({ hero, settings }: HeroProps) {
  const [slideIdx, setSlideIdx] = useState(0)
  const [prevIdx, setPrevIdx] = useState<number | null>(null)

  useEffect(() => {
    const t = setInterval(() => {
      setSlideIdx((i) => {
        setPrevIdx(i)
        return (i + 1) % SLIDES.length
      })
    }, 5500)
    return () => clearInterval(t)
  }, [])

  const goTo = (i: number) => {
    setPrevIdx(slideIdx)
    setSlideIdx(i)
  }

  const h = hero ?? {
    titleLine1: 'Mobilité',
    titleLine2: 'Excellence',
    titleLine3: 'Logistique',
    subtitle: "EA MOTORS — entreprise dynamique spécialisée dans les solutions de mobilité, le négoce et la logistique en Afrique de l'Ouest.",
    ctaPrimary: 'Voir les véhicules →',
    ctaSecondary: 'Prendre RDV',
  }

  const slogan = settings?.slogan ?? '▶ Driving Excellence !'
  const active = SLIDES[slideIdx]

  return (
    <section
      id="hero"
      style={{
        position: 'relative', minHeight: '88vh', overflow: 'hidden',
        background: '#fff', display: 'flex', alignItems: 'stretch',
      }}
    >
      {/* ── Photos empilées avec clip-path wipe + Ken Burns ── */}
      <div style={{
        position: 'absolute', right: '4%', top: '50%',
        transform: 'translateY(-50%)',
        width: '43%', height: '80%',
        overflow: 'hidden',
      }}>
        {SLIDES.map((s, i) => {
          const isActive = i === slideIdx
          return (
            <div
              key={i}
              style={{
                position: 'absolute', inset: 0, overflow: 'hidden',
                /* clip-path wipe: entrant vient de gauche, sortant part à droite */
                clipPath: isActive ? 'inset(0 0% 0 0)' : 'inset(0 100% 0 0)',
                transition: isActive
                  ? 'clip-path 0.9s cubic-bezier(0.77,0,0.175,1)'
                  : i === prevIdx
                    ? 'clip-path 0.9s cubic-bezier(0.77,0,0.175,1) 0.05s'
                    : 'none',
                zIndex: isActive ? 2 : 1,
              }}
            >
              <img
                src={s.src}
                alt={s.photoLabel}
                style={{
                  width: '100%', height: '100%',
                  objectFit: 'cover', objectPosition: 'center',
                  /* Ken Burns sur la photo active */
                  animation: isActive
                    ? 'hero-ken-burns 6s ease-out forwards'
                    : 'none',
                  transform: isActive ? undefined : 'scale(1.08)',
                }}
              />
            </div>
          )
        })}

        {/* Label modèle en haut */}
        <span style={{
          position: 'absolute', top: '14px', left: '14px', zIndex: 10,
          background: 'rgba(5,13,26,.7)', borderRadius: '2px', padding: '4px 10px',
          fontFamily: 'var(--font-body)', fontSize: '.55rem', fontWeight: 700,
          letterSpacing: '.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,.92)',
        }}>
          {active.photoLabel}
        </span>

        {/* Bande accent couleur en bas de la photo */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '4px',
          background: 'var(--accent)', zIndex: 10,
        }} />
      </div>

      {/* ── Colonne gauche — contenu, re-key pour relancer les animations ── */}
      <div style={{ width: '52%', display: 'flex', alignItems: 'center' }}>
        <div
          key={slideIdx}
          style={{
            padding: '90px 8% 80px 6%',
            display: 'flex', flexDirection: 'column', justifyContent: 'center',
            width: '100%',
          }}
        >
          {active.type === 'intro' ? (
            /* ── Slide 1 : EA MOTORS intro ── */
            <>
              <h1
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(3.2rem, 8vw, 7rem)',
                  lineHeight: '.9', letterSpacing: '.02em',
                  textTransform: 'uppercase', marginBottom: '24px',
                }}
              >
                <span style={{ display: 'block', background: 'linear-gradient(135deg, #050d1a 0%, #0F2B5B 30%, #3a7bd5 52%, #0F2B5B 72%, #050d1a 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', ...stagger(0) }}>
                  {h.titleLine1}
                </span>
                <span style={{ display: 'block', background: 'linear-gradient(135deg, #050d1a 0%, #0F2B5B 30%, #3a7bd5 52%, #0F2B5B 72%, #050d1a 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', ...stagger(80) }}>
                  {h.titleLine2}
                </span>
                <span style={{ display: 'block', background: 'linear-gradient(135deg, #050d1a 0%, #0F2B5B 30%, #3a7bd5 52%, #0F2B5B 72%, #050d1a 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', ...stagger(160) }}>
                  {h.titleLine3}
                </span>
              </h1>
              <p style={{
                fontSize: '.92rem', color: 'var(--mid)', lineHeight: 1.8,
                maxWidth: '420px', marginBottom: '26px', fontWeight: 300,
                ...stagger(240),
              }}>
                {h.subtitle}
              </p>
            </>
          ) : (
            /* ── Slides financement ── */
            <>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px', ...stagger(0) }}>
                <span style={{ fontSize: '1.5rem' }}>{active.icon}</span>
                <span style={{
                  fontFamily: 'var(--font-body)', fontSize: '.65rem', fontWeight: 700,
                  letterSpacing: '.22em', textTransform: 'uppercase', color: 'var(--accent)',
                }}>
                  {active.finLabel}
                </span>
              </div>

              <div style={{ marginBottom: '12px', ...stagger(80) }}>
                <span style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(3rem, 7.5vw, 6.5rem)',
                  lineHeight: 1, letterSpacing: '.02em', display: 'block',
                  background: 'linear-gradient(135deg, #050d1a 0%, #0F2B5B 30%, #3a7bd5 52%, #0F2B5B 72%, #050d1a 100%)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                }}>
                  {active.finValue}
                </span>
                <span style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(3rem, 7.5vw, 6.5rem)',
                  lineHeight: 1, letterSpacing: '.02em', display: 'block',
                  background: 'linear-gradient(135deg, #050d1a 0%, #0F2B5B 30%, #3a7bd5 52%, #0F2B5B 72%, #050d1a 100%)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                }}>
                  {active.finSub}
                </span>
              </div>

              <p style={{
                fontSize: '.88rem', color: 'var(--mid)', lineHeight: 1.75,
                maxWidth: '400px', marginBottom: '26px', fontWeight: 300,
                borderLeft: '3px solid var(--accent)', paddingLeft: '14px',
                ...stagger(160),
              }}>
                {active.finDesc}
              </p>
            </>
          )}

          {/* Éléments communs — slogan + CTAs */}
          <div style={{
            fontFamily: 'var(--font-display)', fontSize: '1.1rem',
            letterSpacing: '.2em', textTransform: 'uppercase',
            color: 'var(--blue)', marginBottom: '24px',
            ...stagger(active.type === 'intro' ? 300 : 220),
          }}>
            {slogan}
          </div>
          <div style={{
            display: 'flex', gap: '13px', flexWrap: 'wrap',
            ...stagger(active.type === 'intro' ? 380 : 300),
          }}>
            <a href="#vehicules" className="btn-primary">{h.ctaPrimary}</a>
            <a href="#contact" className="btn-outline">{h.ctaSecondary}</a>
          </div>
        </div>
      </div>

      {/* ── Navigation ── */}
      <div style={{
        position: 'absolute', bottom: '28px', left: '6%',
        display: 'flex', alignItems: 'center', gap: '10px', zIndex: 10,
      }}>
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Slide ${i + 1}`}
            style={{
              width: i === slideIdx ? '32px' : '8px',
              height: '8px', borderRadius: '4px', border: 'none', padding: 0,
              background: i === slideIdx ? 'var(--accent)' : 'rgba(15,43,91,.18)',
              cursor: 'pointer', transition: 'all .4s cubic-bezier(0.22,1,0.36,1)',
            }}
          />
        ))}
        <span style={{ width: '1px', height: '20px', background: 'rgba(15,43,91,.15)', margin: '0 4px' }} />
        <button
          onClick={() => goTo((slideIdx - 1 + SLIDES.length) % SLIDES.length)}
          style={{ background: 'none', border: '1.5px solid rgba(15,43,91,.22)', color: 'var(--navy)', width: '32px', height: '32px', borderRadius: '50%', cursor: 'pointer', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all .25s' }}
        >‹</button>
        <button
          onClick={() => goTo((slideIdx + 1) % SLIDES.length)}
          style={{ background: 'none', border: '1.5px solid rgba(15,43,91,.22)', color: 'var(--navy)', width: '32px', height: '32px', borderRadius: '50%', cursor: 'pointer', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all .25s' }}
        >›</button>

        {/* Indicateur de progression */}
        <span style={{
          fontFamily: 'var(--font-body)', fontSize: '.6rem', fontWeight: 700,
          letterSpacing: '.1em', color: 'rgba(15,43,91,.35)',
          marginLeft: '4px',
        }}>
          {String(slideIdx + 1).padStart(2, '0')} / {String(SLIDES.length).padStart(2, '0')}
        </span>
      </div>
    </section>
  )
}
