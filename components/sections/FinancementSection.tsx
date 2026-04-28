'use client'
import { useState } from 'react'
import type { FinancementData } from '@/lib/types'

export default function FinancementSection({ financement }: { financement: FinancementData | null }) {
  const [carVal, setCarVal] = useState(35_000_000)
  const [apport, setApport] = useState(0)
  const [duree, setDuree] = useState(48)
  const [qty, setQty] = useState(1)
  const taux = financement?.tauxIndicatif ?? 5.5

  const principal = Math.max(0, carVal - apport) * qty
  const r = taux / 100 / 12
  const monthly = principal > 0 && r > 0
    ? principal * r * Math.pow(1 + r, duree) / (Math.pow(1 + r, duree) - 1)
    : principal / duree

  const fmt = (n: number) => Math.round(n).toLocaleString('fr-FR')

  const defaultOptions = [
    "Credit-bail (LOA) — jusqu'a 60 mois",
    'Location Longue Duree (LLD) — flotte professionnelle',
    "Financement adapte — jusqu'a 100% selon votre dossier",
    'Solutions sur mesure — reponse sous 48h ouvrees',
    'Reprise de votre ancien vehicule deduite',
  ]

  return (
    <section id="financement" style={{ background: 'var(--navy)', padding: '80px 0 90px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', right: '-8%', top: '-20%', width: '600px', height: '600px', borderRadius: '50%', background: 'rgba(255,255,255,.03)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', left: '-5%', bottom: '-15%', width: '400px', height: '400px', borderRadius: '50%', background: 'rgba(255,255,255,.025)', pointerEvents: 'none' }} />

      <div style={{ position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '60px', alignItems: 'start', maxWidth: '1200px', margin: '0 auto', padding: '0 6%' }}>
        <div>
          <p style={{ fontSize: '.68rem', fontWeight: 700, letterSpacing: '.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,.45)', marginBottom: '12px' }}>Solutions disponibles</p>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem,5vw,4.5rem)', textTransform: 'uppercase', color: 'white', lineHeight: .9, marginBottom: '8px' }}>
            Votre Financement
          </h2>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: 'rgba(255,255,255,.3)', letterSpacing: '.02em', marginBottom: '18px' }}>
            Sur Mesure
          </div>
          <p style={{ fontSize: '.88rem', color: 'rgba(255,255,255,.55)', lineHeight: 1.8, marginBottom: '32px', fontWeight: 300, maxWidth: '480px' }}>
            {financement?.description ?? 'Nos conseillers accompagnent transporteurs, entreprises de BTP et exploitants miniers. Solutions adaptees a chaque profil, de la PME au grand compte.'}
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {(financement?.options ?? defaultOptions).map((opt, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', fontSize: '.86rem', color: 'rgba(255,255,255,.76)', lineHeight: 1.6 }}>
                <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: 'rgba(255,255,255,.1)', border: '1px solid rgba(255,255,255,.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.9)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                {opt}
              </div>
            ))}
          </div>

          <div style={{ marginTop: '36px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <a href="#contact" className="btn-primary">Deposer mon dossier &rarr;</a>
            <a href="#contact" style={{
              border: '2px solid rgba(255,255,255,.25)', color: 'rgba(255,255,255,.8)',
              fontFamily: 'var(--font-body)', fontSize: '.78rem', fontWeight: 700,
              letterSpacing: '.1em', textTransform: 'uppercase',
              padding: '13px 30px', borderRadius: '2px', textDecoration: 'none',
              display: 'inline-block', transition: 'all .3s',
            }}>
              Parler a un conseiller
            </a>
          </div>
        </div>

        <div style={{ background: 'white', borderRadius: '8px', padding: '36px', boxShadow: '0 24px 80px rgba(0,0,0,.3)', position: 'sticky', top: '24px' }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: 'var(--dark)', letterSpacing: '.04em', textTransform: 'uppercase', marginBottom: '2px' }}>
            Simuler mes mensualites
          </div>
          <div style={{ fontSize: '.74rem', color: 'var(--soft)', marginBottom: '28px' }}>
            Taux indicatif {taux}% / an &middot; engins lourds
          </div>

          <CalcSlider
            label="Quantite de vehicules"
            value={qty} min={1} max={20} step={1}
            display={`${qty} vehicule${qty > 1 ? 's' : ''}`}
            onChange={setQty}
            marks={['1', '10', '20']}
          />
          <CalcSlider
            label="Valeur du vehicule"
            value={carVal} min={5_000_000} max={200_000_000} step={1_000_000}
            display={`${fmt(carVal)} FCFA`}
            onChange={setCarVal}
            marks={['5M', '100M', '200M']}
          />
          <CalcSlider
            label="Apport initial (0% possible)"
            value={apport} min={0} max={60_000_000} step={1_000_000}
            display={apport === 0 ? 'Sans apport' : `${fmt(apport)} FCFA`}
            onChange={setApport}
            marks={['0', '30M', '60M']}
          />
          <CalcSlider
            label="Duree (mois)"
            value={duree} min={12} max={60} step={12}
            display={`${duree} mois`}
            onChange={setDuree}
            marks={['12', '36', '60']}
          />

          <div style={{ background: 'var(--navy)', borderRadius: '6px', padding: '22px 24px', marginTop: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: '.68rem', fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,.6)', marginBottom: '3px' }}>Mensualite estimee</div>
              <div style={{ fontSize: '.62rem', color: 'rgba(255,255,255,.4)' }}>Indicatif — sans engagement</div>
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.8rem', color: 'white', lineHeight: 1 }}>
              {fmt(monthly)}<span style={{ fontSize: '1rem', opacity: .5 }}> F</span>
            </div>
          </div>

          <a href="#contact" style={{
            display: 'block', width: '100%', background: 'var(--navy)', color: 'white',
            fontFamily: 'var(--font-body)', fontSize: '.78rem', fontWeight: 700,
            letterSpacing: '.12em', textTransform: 'uppercase', padding: '15px',
            borderRadius: '4px', textAlign: 'center', textDecoration: 'none',
            marginTop: '14px', transition: 'all .3s',
            boxSizing: 'border-box',
          }}>
            Obtenir un devis officiel &rarr;
          </a>

          <p style={{ fontSize: '.62rem', color: 'var(--soft)', textAlign: 'center', marginTop: '10px', lineHeight: 1.5 }}>
            Simulation non contractuelle &middot; Taux soumis a validation dossier
          </p>
        </div>
      </div>
    </section>
  )
}

function CalcSlider({ label, value, min, max, step, display, onChange, marks }: {
  label: string; value: number; min: number; max: number; step: number;
  display: string; onChange: (v: number) => void; marks: string[]
}) {
  const pct = ((value - min) / (max - min)) * 100
  return (
    <div style={{ marginBottom: '22px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
        <span style={{ fontFamily: 'var(--font-body)', fontSize: '.68rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--blue)' }}>{label}</span>
        <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: 'var(--dark)' }}>{display}</span>
      </div>
      <input
        type="range" min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{
          width: '100%', appearance: 'none', height: '5px', borderRadius: '3px',
          outline: 'none', cursor: 'pointer',
          background: `linear-gradient(to right, var(--navy) 0%, var(--navy) ${pct}%, var(--light) ${pct}%, var(--light) 100%)`,
        }}
      />
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
        {marks.map((m) => <span key={m} style={{ fontSize: '.6rem', color: 'var(--soft)' }}>{m}</span>)}
      </div>
    </div>
  )
}
