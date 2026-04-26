'use client'
import { useState, useEffect } from 'react'

export default function Loader() {
  const [visible, setVisible] = useState(true)
  const [progress, setProgress] = useState(0)
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) { clearInterval(interval); return 100 }
        return p + 1.8
      })
    }, 20)
    const fadeTimer = setTimeout(() => setFadeOut(true), 1600)
    const hideTimer = setTimeout(() => setVisible(false), 2100)
    return () => { clearInterval(interval); clearTimeout(fadeTimer); clearTimeout(hideTimer) }
  }, [])

  if (!visible) return null

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: 'white',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '32px',
      transition: 'opacity .5s ease',
      opacity: fadeOut ? 0 : 1,
      pointerEvents: fadeOut ? 'none' : 'all',
    }}>
      <style>{`
        @keyframes logoIn {
          from { opacity: 0; transform: scale(.85) translateY(12px) }
          to   { opacity: 1; transform: scale(1)  translateY(0) }
        }
        @keyframes sloganIn {
          from { opacity: 0; letter-spacing: .5em }
          to   { opacity: 1; letter-spacing: .3em }
        }
        @keyframes barShine {
          0%   { background-position: -200% center }
          100% { background-position: 200% center }
        }
      `}</style>

      {/* Logo — grand, fond blanc */}
      <img
        src="/logo.png"
        alt="EA Motors"
        style={{
          height: '220px', width: 'auto',
          animation: 'logoIn .7s cubic-bezier(.22,1,.36,1) forwards',
          filter: 'none',
        }}
      />

      {/* Slogan */}
      <div style={{
        fontFamily: 'var(--font-bebas)', fontSize: '1rem', letterSpacing: '.3em',
        textTransform: 'uppercase', color: 'var(--blue)',
        animation: 'sloganIn .8s ease .3s both',
      }}>
        ▶ Driving Excellence !
      </div>

      {/* Barre de progression */}
      <div style={{ width: '220px', display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
        <div style={{ width: '100%', height: '3px', background: 'var(--blue-pale)', borderRadius: '4px', overflow: 'hidden' }}>
          <div style={{
            height: '100%',
            width: `${progress}%`,
            borderRadius: '4px',
            background: 'linear-gradient(90deg, var(--blue) 0%, var(--blue-light) 50%, #5aaef7 100%)',
            backgroundSize: '200% auto',
            animation: 'barShine 1.2s linear infinite',
            transition: 'width .04s linear',
          }} />
        </div>
        <div style={{ fontFamily: 'var(--font-body)', fontSize: '.65rem', fontWeight: 600, letterSpacing: '.12em', color: 'var(--silver)', textTransform: 'uppercase' }}>
          {Math.min(100, Math.round(progress))}%
        </div>
      </div>
    </div>
  )
}
