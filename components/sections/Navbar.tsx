'use client'
import { useState, useEffect } from 'react'
import type { SiteSettings } from '@/lib/types'

interface NavbarProps { settings: SiteSettings | null }

const navLinks = [
  { label: 'Qui sommes-nous', href: '#about' },
  { label: 'Services', href: '#domaines' },
  { label: 'Véhicules', href: '#vehicules' },
  { label: 'Équipements', href: '#equipements' },
  { label: 'Financement', href: '#financement' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar({ settings }: NavbarProps) {
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)
  const [isMobile, setIsMobile]   = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)

    const mq = window.matchMedia('(max-width: 768px)')
    setIsMobile(mq.matches)
    const onMq = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches)
      if (!e.matches) setMenuOpen(false)
    }
    mq.addEventListener('change', onMq)

    return () => {
      window.removeEventListener('scroll', onScroll)
      mq.removeEventListener('change', onMq)
    }
  }, [])

  // Bloquer le scroll body quand menu mobile ouvert
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        padding: '0 4%', height: scrolled ? '62px' : '74px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        transition: 'all .4s',
        background: scrolled ? 'rgba(255,255,255,.96)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        boxShadow: scrolled ? '0 2px 24px rgba(27,58,107,.1)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(27,58,107,.12)' : 'none',
      }}>
        {/* Logo — toujours à gauche */}
        <a href="#" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', flexShrink: 0 }}>
          <img
            src="/logo.png"
            alt="EA Motors"
            style={{ height: scrolled ? '62px' : '76px', width: 'auto', mixBlendMode: 'multiply', transition: 'height .4s' }}
          />
        </a>

        {/* Liens desktop — masqués sur mobile */}
        {!isMobile && (
          <ul style={{ display: 'flex', gap: '28px', listStyle: 'none', alignItems: 'center', margin: 0, padding: 0 }}>
            {navLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  style={{ fontFamily: 'var(--font-body)', fontSize: '.78rem', fontWeight: 600, letterSpacing: '.07em', textTransform: 'uppercase', color: 'var(--soft)', textDecoration: 'none', transition: 'color .3s' }}
                  onMouseEnter={(e) => ((e.target as HTMLElement).style.color = 'var(--blue)')}
                  onMouseLeave={(e) => ((e.target as HTMLElement).style.color = 'var(--soft)')}
                >{l.label}</a>
              </li>
            ))}
            <li>
              <a href="#contact" style={{ background: 'var(--blue)', color: 'white', fontFamily: 'var(--font-body)', fontSize: '.78rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', padding: '9px 22px', borderRadius: '2px', textDecoration: 'none', boxShadow: '0 4px 16px rgba(27,58,107,.25)', transition: 'all .3s' }}>
                Prendre RDV
              </a>
            </li>
          </ul>
        )}

        {/* Bouton hamburger — uniquement sur mobile, à droite */}
        {isMobile && (
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '5px', background: 'none', border: 'none', cursor: 'pointer', padding: '10px', zIndex: 1001 }}
          >
            {[0, 1, 2].map((i) => (
              <span key={i} style={{
                display: 'block', width: '26px', height: '2.5px',
                background: menuOpen ? 'var(--dark)' : 'var(--blue)',
                borderRadius: '2px', transition: 'all .3s',
                transform: menuOpen
                  ? i === 0 ? 'translateY(7.5px) rotate(45deg)'
                  : i === 1 ? 'scaleX(0) opacity(0)'
                  : 'translateY(-7.5px) rotate(-45deg)'
                  : 'none',
                opacity: menuOpen && i === 1 ? 0 : 1,
              }} />
            ))}
          </button>
        )}
      </nav>

      {/* Menu mobile — plein écran slide depuis la droite */}
      {isMobile && (
        <div style={{
          position: 'fixed', inset: 0, background: 'white', zIndex: 999,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '28px',
          transform: menuOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform .45s cubic-bezier(.77,0,.175,1)',
        }}>
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(1.8rem,7vw,2.8rem)', letterSpacing: '.12em', color: 'var(--dark)', textDecoration: 'none', textTransform: 'uppercase' }}
            >{l.label}</a>
          ))}
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(1.8rem,7vw,2.8rem)', letterSpacing: '.12em', color: 'var(--blue)', textDecoration: 'none', textTransform: 'uppercase' }}
          >Prendre RDV</a>
        </div>
      )}
    </>
  )
}
