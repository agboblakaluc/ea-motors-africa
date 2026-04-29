'use client'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity'
import type { Apropos, Domaine, Equipement } from '@/lib/types'

// ─── ABOUT ────────────────────────────────────────────────────────────────────
const ABOUT_TEXTE = "EA Motors SARL est une société spécialisée dans la distribution de véhicules et équipements industriels neufs, et dans la structuration de solutions de financement d'actifs pour les opérateurs économiques d'Afrique de l'Ouest.\n\nBasée à Lomé, Togo, EA Motors s'appuie sur l'expertise de ses dirigeants en commerce international, distribution automobile et financement d'actifs pour proposer une offre complète : importation directe des meilleurs constructeurs, accès à des solutions de financement adaptées à chaque profil, et un accompagnement de A à Z, de la sélection de l'équipement jusqu'à la livraison.\n\nNotre objectif : permettre à chaque opérateur, transporteur, entreprise de BTP, exploitant minier... d'accéder à des équipements de qualité à des conditions financières réalistes."

export function AboutSection({ apropos }: { apropos: Apropos | null }) {
  const d = {
    titre: apropos?.titre ?? 'Qui Sommes-Nous ?',
    titreMet: 'jeune.',
    texte: ABOUT_TEXTE,
    vision: apropos?.vision ?? "Notre vision est de devenir l'acteur de référence en Afrique de l'Ouest pour la distribution d'équipements industriels neufs et la structuration de financements d'actifs, en proposant une offre fiable, transparente et compétitive.",
    image: apropos?.image,
  }

  return (
    <section id="about" style={{ background: 'var(--off)', padding: '90px 6%' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '72px', alignItems: 'center', maxWidth: '1200px', margin: '0 auto' }}
           className="grid-responsive">
        {/* Image */}
        <div style={{ position: 'relative', height: '480px' }}>
          <div style={{ position: 'relative', width: '88%', height: '100%', overflow: 'hidden', borderRadius: '4px', boxShadow: 'var(--sh-lg)', filter: 'brightness(.92)' }}>
            <Image
              src={apropos?.image ? urlFor(apropos.image).width(800).url() : '/faw/family%20entrepot.png'}
              alt="EA Motors showroom"
              fill
              sizes="(max-width: 768px) 100vw, 44vw"
              style={{ objectFit: 'cover' }}
            />
          </div>
          <div style={{ position: 'absolute', bottom: '-16px', right: '-16px', width: '130px', height: '130px', border: '2px solid var(--blue)', borderRadius: '4px', zIndex: -1 }} />
          <div style={{ position: 'absolute', top: '26px', right: 0, background: 'var(--blue)', color: 'white', padding: '16px 20px', borderRadius: '4px', boxShadow: '0 8px 32px rgba(27,58,107,.35)' }}>
            <div style={{ fontFamily: 'var(--font-bebas)', fontSize: '2rem', lineHeight: 1 }}>Lomé</div>
            <div style={{ fontSize: '.59rem', fontWeight: 700, letterSpacing: '.15em', textTransform: 'uppercase', opacity: .6, marginTop: '3px' }}>Togo · Afrique de l'Ouest</div>
          </div>
        </div>

        {/* Text */}
        <div>
          <p className="section-tag">{d.titre}</p>
          <h2 style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(2.5rem,5vw,4.5rem)', textTransform: 'uppercase', lineHeight: .95, color: 'var(--dark)' }}>
            Une entreprise <span style={{ color: 'var(--blue)' }}>{d.titreMet}</span> Un positionnement solide.
          </h2>
          <div style={{ width: '44px', height: '2px', background: 'var(--blue)', borderRadius: '2px', margin: '14px 0' }} />
          <p style={{ fontSize: '.88rem', color: 'var(--mid)', lineHeight: 1.85, marginBottom: '24px', fontWeight: 300 }}>{d.texte}</p>
          <div style={{ background: 'var(--blue-pale)', borderLeft: '3px solid var(--blue)', padding: '15px 18px', borderRadius: '0 4px 4px 0', fontSize: '.85rem', color: 'var(--dark)', lineHeight: 1.75, fontStyle: 'italic', marginBottom: '28px' }}>
            {d.vision}
          </div>
          <a href="#contact" className="btn-primary">Nous rencontrer →</a>
        </div>
      </div>
    </section>
  )
}

// ─── DOMAINES ─────────────────────────────────────────────────────────────────
const defaultDomaines: Omit<Domaine, '_id'>[] = [
  { numero: '01', titre: 'Vente Véhicules Neufs & Occasion', points: ['Importation toutes marques', 'Partenariats Europe & Asie', 'Gros & détail'], ordre: 1 },
  { numero: '02', titre: 'Location de Véhicules', points: ['Flotte pro & particuliers', 'Courte, moyenne & longue durée'], ordre: 2 },
  { numero: '03', titre: 'Concession & Représentation', points: ['Négociation constructeurs', 'Réseaux de distribution'], ordre: 3 },
  { numero: '04', titre: 'Négoce & Commerce Général', points: ['Véhicules, pièces, équipements', 'Multi-marchés & multi-produits'], ordre: 4 },
  { numero: '05', titre: 'Import / Export', points: ["Chaîne d'appro complète", 'Procédures douanières CEDEAO'], ordre: 5 },
]

export function DomainesSection({ domaines }: { domaines: Domaine[] }) {
  const items = domaines.length > 0 ? domaines : defaultDomaines as Domaine[]
  const cols = Math.min(items.length, 5)

  return (
    <section id="domaines" style={{ background: 'white', padding: '90px 6%' }}>
      <div style={{ textAlign: 'center', marginBottom: '50px' }}>
        <p className="section-tag" style={{ justifyContent: 'center' }}>Domaines d'Expertise</p>
        <h2 style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(2.5rem,5vw,4.5rem)', textTransform: 'uppercase', color: 'var(--dark)' }}>
          Nos <span style={{ color: 'var(--blue)' }}>{cols} Domaines</span> d'Activité
        </h2>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols},1fr)`, gap: '2px', background: 'rgba(27,58,107,.07)' }}
           className="domaines-grid">
        {items.map((d) => (
          <div
            key={d._id || d.numero}
            style={{ background: 'white', padding: '36px 26px', position: 'relative', overflow: 'hidden', transition: 'background .3s', cursor: 'default' }}
            onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = 'var(--off)'; (el.querySelector('.dom-line') as HTMLElement).style.transform = 'scaleX(1)' }}
            onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = 'white'; (el.querySelector('.dom-line') as HTMLElement).style.transform = 'scaleX(0)' }}
          >
            <div className="dom-line" style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(to right, var(--blue), var(--blue-light))', transform: 'scaleX(0)', transformOrigin: 'left', transition: 'transform .4s' }} />
            <div style={{ fontFamily: 'var(--font-bebas)', fontSize: '3rem', color: 'rgba(27,58,107,.06)', lineHeight: 1, marginBottom: '-4px' }}>{d.numero}</div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: '.88rem', fontWeight: 700, color: 'var(--dark)', marginBottom: '8px', lineHeight: 1.3 }}>{d.titre}</div>
            {d.points.map((p, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '7px', fontSize: '.76rem', color: 'var(--soft)', lineHeight: 1.6, marginBottom: '4px', fontWeight: 300 }}>
                <span style={{ color: 'var(--blue)', flexShrink: 0 }}>·</span> {p}
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}

// ─── EQUIPEMENTS ──────────────────────────────────────────────────────────────
const defaultEquipements: Omit<Equipement, '_id'>[] = [
  {
    marque: 'FAW Trucks', sousTitre: 'First Automobile Works · Chine', ordre: 1,
    description: "Véhicules utilitaires lourds robustes, adaptés aux routes et conditions de l'Afrique de l'Ouest.",
    items: ['Tracteurs routiers & semi-remorques', 'Camions benne 6×4 et 8×4', 'Transport de marchandises CEDEAO'],
  },
  {
    marque: 'FOTON', sousTitre: 'Foton Motor Co. · Chine', ordre: 2,
    description: "Leader des véhicules utilitaires en Asie, Foton propose des camions légers à lourds fiables et économiques pour les marchés africains.",
    items: ['Camions benne GTL 6×4 & 8×4', 'Tracteurs routiers AUMAN GTL', 'Benne premium AUMAN EST'],
  },
]

export function EquipementsSection({ equipements }: { equipements: Equipement[] }) {
  const items = equipements.length > 0 ? equipements : defaultEquipements as Equipement[]
  return (
    <section id="equipements" style={{ background: 'var(--dark)', padding: '80px 6%', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg,#0f1d33 0%,#1a2e4a 50%,#0f1d33 100%)' }} />
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle,rgba(255,255,255,.025) 1px,transparent 1px)', backgroundSize: '28px 28px' }} />
      <div style={{ position: 'relative', zIndex: 1, maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <p className="section-tag" style={{ justifyContent: 'center', color: 'rgba(200,210,222,.6)' }}>Matériel Professionnel</p>
          <h2 style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(2.5rem,5vw,4.5rem)', textTransform: 'uppercase', color: 'white' }}>
            Nos Équipements & Engins Lourds
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '18px' }} className="eq-grid">
          {items.map((eq) => (
            <div
              key={eq._id || eq.marque}
              style={{ background: 'rgba(255,255,255,.05)', border: '1px solid rgba(255,255,255,.08)', borderRadius: '6px', padding: '28px 26px', transition: 'all .3s' }}
              onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = 'rgba(27,58,107,.38)'; el.style.borderColor = 'rgba(58,107,181,.35)'; el.style.transform = 'translateY(-3px)' }}
              onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = 'rgba(255,255,255,.05)'; el.style.borderColor = 'rgba(255,255,255,.08)'; el.style.transform = 'none' }}
            >
              <div style={{ fontFamily: 'var(--font-bebas)', fontSize: '1.9rem', letterSpacing: '.08em', background: 'var(--metal)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{eq.marque}</div>
              <div style={{ fontSize: '.63rem', fontWeight: 600, letterSpacing: '.18em', textTransform: 'uppercase', color: 'rgba(200,210,222,.38)', marginBottom: '14px', marginTop: '3px' }}>{eq.sousTitre}</div>
              <div style={{ width: '32px', height: '2px', background: 'linear-gradient(to right,var(--blue-light),transparent)', marginBottom: '14px' }} />
              <p style={{ fontSize: '.8rem', color: 'rgba(200,210,222,.55)', lineHeight: 1.7, marginBottom: '16px', fontWeight: 300 }}>{eq.description}</p>
              {eq.items.map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '9px', fontSize: '.76rem', color: 'rgba(200,210,222,.65)', lineHeight: 1.55, marginBottom: '8px' }}>
                  <div style={{ width: '16px', height: '16px', borderRadius: '50%', background: 'rgba(27,58,107,.55)', border: '1px solid rgba(58,107,181,.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '.55rem', color: 'var(--silver-l)' }}><svg width='9' height='9' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='3' strokeLinecap='round' strokeLinejoin='round'><polyline points='20 6 9 17 4 12'/></svg></div>
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

export default AboutSection
