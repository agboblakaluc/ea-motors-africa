'use client'
import { useState } from 'react'
import { urlFor } from '@/lib/sanity'
import type { Vehicule } from '@/lib/types'

const FILTERS = [
  { label: 'Tous', value: 'all' },
  { label: 'Tracteurs routiers', value: 'tracteur' },
  { label: 'Camions benne', value: 'benne' },
  { label: 'Camions rigides', value: 'rigide' },
  { label: 'Spéciaux', value: 'special' },
  { label: 'Remorques', value: 'remorque' },
]

const BADGE_COLORS: Record<string, string> = {
  new:   'var(--blue)',
  promo: '#c0392b',
  std:   '#8a9ab0',
}

// Catalogue FAW / FOTON — engins lourds uniquement
const DEFAULT_VEHICULES: Vehicule[] = [
  // ── FAW ────────────────────────────────────────────────────────────────────
  {
    _id: 'faw-j6p-6x4-tractor',
    marque: 'FAW', modele: 'J6P 6×4 · 420 ch Tracteur',
    categorie: 'tracteur', badge: '420 ch', badgeType: 'new',
    puissance: '420 ch', annee: '2025', configuration: '6×4',
    transmission: 'Boîte 12 rapports', poids: '25 T',
    description: "Tracteur semi-remorque robuste pour le transport longue distance en Afrique de l'Ouest. Moteur CA6DK1 Euro II/III, cabine grand confort, direction assistée.",
    equipements: ['Moteur CA6DK1 420 ch', 'Direction assistée hydraulique', 'Cabine grand confort', 'Climatisation', 'Radio/Bluetooth', 'Frein moteur'],
    image: null as any, prixLabel: 'Sur devis', prixSub: 'Import direct Chine', ordre: 1,
  },
  {
    _id: 'faw-j6p-4x2-tractor',
    marque: 'FAW', modele: 'J6P 4×2 Tracteur Semi',
    categorie: 'tracteur', badge: '4×2', badgeType: 'std',
    puissance: '380 ch', annee: '2025', configuration: '4×2',
    transmission: 'Boîte 9 rapports', poids: '18 T',
    description: "Tracteur 4×2 idéal pour les trajets régionaux. Compact, économique, fiable. Parfait pour débutants en flotte ou transport léger.",
    equipements: ['Moteur CA6DM2 380 ch', 'Boîte 9 rapports synchronisée', 'Direction assistée', 'Cabine longue', 'Climatisation'],
    image: null as any, prixLabel: 'Sur devis', prixSub: 'Import direct Chine', ordre: 2,
  },
  {
    _id: 'faw-j6p-dump-6x4',
    marque: 'FAW', modele: 'J6P 6×4 Camion Benne',
    categorie: 'benne', badge: 'Benne', badgeType: 'std',
    puissance: '420 ch', annee: '2025', configuration: '6×4',
    poids: '30 T utile', transmission: 'Boîte 12 rapports',
    description: "Benne robuste pour mines, carrières et BTP. Benne acier haute résistance, déversement arrière hydraulique.",
    equipements: ['Benne acier 10 mm', 'Vérin hydraulique double effet', 'Hayon escamotable', 'Moteur 420 ch Euro III'],
    image: null as any, prixLabel: 'Sur devis', prixSub: 'Import direct Chine', ordre: 3,
  },
  {
    _id: 'faw-semi-dump-3ax',
    marque: 'FAW', modele: 'Semi-Remorque Benne 3 essieux',
    categorie: 'remorque', badge: 'Benne 3ax', badgeType: 'std',
    puissance: '—', annee: '2025', configuration: '3 essieux',
    poids: '40 T', transmission: '—',
    description: "Semi-remorque benne 3 essieux pour transport de vrac, mines, sable, gravier. Structure renforcée.",
    equipements: ['Benne acier soudée', 'Suspension pneumatique', '3 essieux relevables', 'Plaques renforcées 8 mm'],
    image: null as any, prixLabel: 'Sur devis', prixSub: 'Import direct Chine', ordre: 4,
  },
  {
    _id: 'faw-semi-flatbed-4ax',
    marque: 'FAW', modele: 'Semi-Remorque Plateau Porte-engins',
    categorie: 'remorque', badge: 'Plateau', badgeType: 'new',
    puissance: '—', annee: '2025', configuration: '4 essieux',
    poids: '60 T', transmission: '—',
    description: "Plateau 4 essieux pour engins de chantier, conteneurs, charges hors-gabarit. Renforcé pour terrains difficiles.",
    equipements: ['Plateau acier 12 mm', '4 essieux porteurs', "Colliers d'arrimage intégrés", "Rampes d'accès"],
    image: null as any, prixLabel: 'Sur devis', prixSub: 'Import direct Chine', ordre: 5,
  },
  {
    _id: 'faw-semi-tanker-3ax',
    marque: 'FAW', modele: 'Semi-Remorque Citerne Carburant',
    categorie: 'remorque', badge: 'Citerne', badgeType: 'promo',
    puissance: '—', annee: '2025', configuration: '3 essieux',
    poids: '40 000 L', transmission: '—',
    description: "Citerne carburant 40 000 litres, acier inoxydable, 6 compartiments. Idéale pour distribution de carburant.",
    equipements: ['Cuve inox 40 000 L', '6 compartiments', 'Pompe de vidange', 'Compteur litreur', 'Système anti-débordement'],
    image: null as any, prixLabel: 'Sur devis', prixSub: 'Import direct Chine', ordre: 6,
  },
  // ── Foton ──────────────────────────────────────────────────────────────────
  {
    _id: 'foton-auman-gtl-tractor',
    marque: 'FOTON', modele: 'AUMAN GTL 6×4 Tracteur',
    categorie: 'tracteur', badge: 'Nouveau', badgeType: 'new',
    puissance: '420 ch', annee: '2025', configuration: '6×4',
    transmission: 'Boîte 12 rapports', poids: '25 T',
    description: "Le Foton AUMAN GTL est un tracteur semi-remorque robuste et économique, idéal pour le transport longue distance en Afrique de l'Ouest.",
    equipements: ['Moteur ISG 420 ch', 'Boîte 12 rapports', 'Direction assistée', 'Cabine grand confort', 'Climatisation', 'Cruise control'],
    image: null as any, prixLabel: 'Sur devis', prixSub: 'Import direct Chine', ordre: 7,
  },
  {
    _id: 'foton-auman-gtl-dump',
    marque: 'FOTON', modele: 'AUMAN GTL 6×4 Benne',
    categorie: 'benne', badge: 'Benne', badgeType: 'std',
    puissance: '380 ch', annee: '2025', configuration: '6×4',
    poids: '28 T utile', transmission: 'Boîte 9 rapports',
    description: "Camion benne 6×4 pour mines, carrières et BTP. Structure renforcée, benne acier haute résistance, déversement arrière hydraulique.",
    equipements: ['Benne acier 10 mm', 'Vérin hydraulique', 'Moteur 380 ch Euro III', 'Freinage pneumatique'],
    image: null as any, prixLabel: 'Sur devis', prixSub: 'Import direct Chine', ordre: 8,
  },
  {
    _id: 'foton-auman-8x4-dump',
    marque: 'FOTON', modele: 'AUMAN GTL 8×4 Benne',
    categorie: 'benne', badge: '8×4', badgeType: 'std',
    puissance: '420 ch', annee: '2025', configuration: '8×4',
    poids: '35 T utile', transmission: 'Boîte 12 rapports',
    description: "Benne 8×4 grand tonnage pour chantiers lourds. Configuration 8 roues pour stabilité maximale sur terrain difficile.",
    equipements: ['Moteur 420 ch', 'Configuration 8×4', 'Benne acier renforcée', 'Suspension mécanique renforcée'],
    image: null as any, prixLabel: 'Sur devis', prixSub: 'Import direct Chine', ordre: 9,
  },
  {
    _id: 'foton-auman-est-dump',
    marque: 'FOTON', modele: 'AUMAN EST Benne Premium',
    categorie: 'benne', badge: 'EST', badgeType: 'new',
    puissance: '430 ch', annee: '2025', configuration: '6×4',
    poids: '30 T utile', transmission: 'Boîte AMT automatisée',
    description: "Le Foton AUMAN EST est le haut de gamme de la benne Foton. Motorisation puissante, boîte AMT, cabine premium pour opérations intensives.",
    equipements: ['Moteur 430 ch Euro V', 'Boîte AMT 12 rapports', 'Cabine premium', 'Climatisation automatique', 'Freinage avancé'],
    image: null as any, prixLabel: 'Sur devis', prixSub: 'Import direct Chine', ordre: 10,
  },
]

// Photos locales — chemins réels dans /public
const LOCAL_IMAGES: Record<string, string[]> = {
  'faw-j6p-6x4-tractor': [
    '/faw/1-01.jpg',
    '/faw/j6p-6x4/face.jpg',
    '/faw/j6p-6x4/pd.jpg',
    '/faw/j6p-6x4/pd2.jpg',
    '/faw/j6p-6x4/pg.jpg',
  ],
  'faw-j6p-4x2-tractor': [
    '/faw/j6p-4x2/face.jpg',
    '/faw/j6p-4x2/pd1.jpg',
    '/faw/j6p-4x2/pd2.jpg',
    '/faw/j6p-4x2/profil-g.jpg',
  ],
  'faw-j6p-dump-6x4': [
    '/faw/faw-dump-truck/photo-01-j6p-dump.jpg',
  ],
  'faw-semi-dump-3ax': [
    '/faw/semi-benne-3ax.png',
    '/faw/semi-trailer/3ax-dump.jpg',
    '/faw/semi-trailer/4ax-dump.jpg',
    '/faw/semi-trailer/5ax-dump.jpg',
  ],
  'faw-semi-flatbed-4ax': [
    '/faw/semi-plateau.png',
    '/faw/faw-trailer/photo-01-flatbed-trailer.jpg',
    '/faw/faw-trailer/photo-02-flatbed-trailer.jpg',
    '/faw/semi-trailer/4ax-flatbed.jpg',
    '/faw/semi-trailer/4ax-flatbed2.jpg',
  ],
  'faw-semi-tanker-3ax': [
    '/faw/semi-citerne.png',
    '/faw/semi-trailer/3ax-tanker.jpg',
  ],
  'foton-auman-gtl-tractor': [
    '/faw/7-07.jpg',
    '/foton/Foton-AUMAN-GTL-6X4-Tractor-Red.jpg',
    '/foton/Foton-AUMAN-GTL-6X4-Tractor-Red-1.jpg',
    '/foton/Foton-AUMAN-GTL-6X4-Silver-Tractor.jpg',
    '/foton/Foton-AUMAN-GTL-6X4-Silver-Tractor-1.jpg',
    '/foton/Foton-AUMAN-GTL-6X4-Silver-Tractor-2.jpg',
  ],
  'foton-auman-gtl-dump': [
    '/faw/8-08.jpg',
    '/foton/FOTON-Auman-GTL-6X4-dump-truck.jpg',
  ],
  'foton-auman-8x4-dump': [
    '/faw/9-09.jpg',
    '/faw/12-roues-chantier.jpg',
    '/foton/FOTON-Auman-GTL-8X4-Dump-Truck-Green.jpg',
  ],
  'foton-auman-est-dump': [
    '/foton/AUMAN-EST-DUMPER.jpg',
  ],
}

interface VehiculesSectionProps {
  vehicules: Vehicule[]
}

export default function VehiculesSection({ vehicules }: VehiculesSectionProps) {
  const [activeFilter, setActiveFilter] = useState('all')
  const [selected, setSelected] = useState<Vehicule | null>(null)
  const [galleryIdx, setGalleryIdx] = useState(0)

  // Toujours afficher le catalogue complet — Sanity en overlay quand il dépasse le catalogue par défaut
  const sanityItems = vehicules.filter((v) => ['FAW', 'FOTON'].includes(v.marque.toUpperCase()))
  const items = sanityItems.length >= DEFAULT_VEHICULES.length ? sanityItems : DEFAULT_VEHICULES

  const filtered = activeFilter === 'all'
    ? items
    : items.filter((v) => v.categorie === activeFilter)

  function openModal(v: Vehicule) {
    setSelected(v)
    setGalleryIdx(0)
    document.body.style.overflow = 'hidden'
  }
  function closeModal() {
    setSelected(null)
    document.body.style.overflow = ''
  }

  return (
    <>
      <section id="vehicules" style={{ background: 'var(--off)', padding: '90px 6%' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '46px', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <p className="section-tag">Catalogue FAW · FOTON</p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem,5vw,4.5rem)', textTransform: 'uppercase', color: 'var(--dark)' }}>
              Nos <span style={{ color: 'var(--accent)' }}>Engins Lourds</span>
            </h2>
          </div>

          {/* Filter bar */}
          <div style={{ display: 'flex', border: '1.5px solid var(--border)', borderRadius: '3px', overflow: 'hidden', flexWrap: 'wrap' }}>
            {FILTERS.map((f) => (
              <button
                key={f.value}
                onClick={() => setActiveFilter(f.value)}
                style={{
                  fontFamily: 'var(--font-body)', fontSize: '.68rem', fontWeight: 700,
                  letterSpacing: '.08em', textTransform: 'uppercase',
                  padding: '9px 16px', border: 'none', borderRight: '1px solid var(--border)',
                  background: activeFilter === f.value ? 'var(--blue)' : 'transparent',
                  color: activeFilter === f.value ? 'white' : 'var(--soft)',
                  cursor: 'pointer', transition: 'all .22s',
                }}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="vehicules-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: '14px',
        }}>
          {filtered.map((v) => {
            const photos = v.image
              ? [urlFor(v.image).width(640).url()]
              : LOCAL_IMAGES[v._id] ?? []
            const imgSrc = photos[0] ?? null

            return (
              <div
                key={v._id}
                onClick={() => openModal(v)}
                style={{
                  background: 'white', borderRadius: '4px',
                  border: '1.5px solid var(--border)',
                  overflow: 'hidden', transition: 'all .32s', cursor: 'pointer',
                  boxShadow: 'var(--sh-sm)',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement
                  el.style.transform = 'translateY(-5px)'
                  el.style.boxShadow = 'var(--sh-lg)'
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement
                  el.style.transform = 'none'
                  el.style.boxShadow = 'var(--sh-sm)'
                }}
              >
                {/* Image */}
                <div style={{ position: 'relative', height: '200px', background: '#e8edf4', overflow: 'hidden' }}>
                  {imgSrc ? (
                    <img
                      src={imgSrc}
                      alt={`${v.marque} ${v.modele}`}
                      loading="lazy"
                      style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform .5s' }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.04)' }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)' }}
                    />
                  ) : (
                    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '8px', color: 'var(--silver)' }}>
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="1" y="3" width="15" height="13" rx="1"/><path d="M16 8h4l3 3v4h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
                      </svg>
                      <span style={{ fontSize: '.62rem', letterSpacing: '.1em', textTransform: 'uppercase' }}>Photo à venir</span>
                    </div>
                  )}
                  {v.badge && (
                    <span style={{
                      position: 'absolute', top: '10px', left: '10px',
                      fontFamily: 'var(--font-body)', fontSize: '.57rem', fontWeight: 700,
                      letterSpacing: '.14em', textTransform: 'uppercase',
                      padding: '4px 9px', borderRadius: '2px',
                      background: BADGE_COLORS[v.badgeType] ?? 'var(--blue)', color: 'white',
                    }}>
                      {v.badge}
                    </span>
                  )}
                  {/* Click hint */}
                  <div style={{
                    position: 'absolute', bottom: '8px', right: '8px',
                    background: 'rgba(5,13,26,.65)', backdropFilter: 'blur(6px)',
                    borderRadius: '20px', padding: '4px 10px',
                    fontSize: '.58rem', color: 'rgba(255,255,255,.85)', fontWeight: 600,
                    letterSpacing: '.06em', textTransform: 'uppercase',
                  }}>
                    Voir détails →
                  </div>
                </div>

                {/* Body */}
                <div style={{ padding: '16px' }}>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '.55rem', fontWeight: 700, letterSpacing: '.22em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '3px' }}>
                    {v.marque}
                  </div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '.92rem', fontWeight: 700, color: 'var(--dark)', marginBottom: '10px', lineHeight: 1.3 }}>
                    {v.modele}
                  </div>

                  {/* Specs row */}
                  <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '12px' }}>
                    {v.puissance && v.puissance !== '—' && <Spec label={v.puissance} />}
                    {v.configuration && <Spec label={v.configuration} />}
                    {v.poids && <Spec label={v.poids} />}
                  </div>

                  {/* Price + CTA */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1.5px solid var(--border)', paddingTop: '11px' }}>
                    <div>
                      <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--blue)', letterSpacing: '.03em' }}>
                        {v.prixLabel}
                      </div>
                      <div style={{ fontSize: '.57rem', color: 'var(--soft)', marginTop: '1px' }}>{v.prixSub}</div>
                    </div>
                    <span
                      style={{
                        fontFamily: 'var(--font-body)', fontSize: '.62rem', fontWeight: 700,
                        letterSpacing: '.1em', textTransform: 'uppercase',
                        color: 'var(--accent)', border: '1.5px solid var(--accent)',
                        background: 'none', padding: '6px 12px',
                        borderRadius: '2px', textDecoration: 'none',
                      }}
                    >
                      Devis →
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div style={{ textAlign: 'center', marginTop: '46px' }}>
          <a href="#contact" className="btn-primary">Demander un catalogue complet →</a>
        </div>
      </section>

      {/* Modal détail véhicule */}
      {selected && (
        <VehiculeModal
          vehicule={selected}
          photos={selected.image
            ? [urlFor(selected.image).width(1200).url()]
            : LOCAL_IMAGES[selected._id] ?? []
          }
          galleryIdx={galleryIdx}
          setGalleryIdx={setGalleryIdx}
          onClose={closeModal}
        />
      )}
    </>
  )
}

function VehiculeModal({ vehicule: v, photos, galleryIdx, setGalleryIdx, onClose }: {
  vehicule: Vehicule
  photos: string[]
  galleryIdx: number
  setGalleryIdx: (i: number) => void
  onClose: () => void
}) {
  const specs = [
    { label: 'Marque', value: v.marque },
    { label: 'Modèle', value: v.modele },
    { label: 'Année', value: v.annee },
    { label: 'Catégorie', value: v.categorie },
    v.puissance && v.puissance !== '—' ? { label: 'Puissance', value: v.puissance } : null,
    v.configuration ? { label: 'Configuration', value: v.configuration } : null,
    v.transmission ? { label: 'Transmission', value: v.transmission } : null,
    v.poids ? { label: 'Charge / PTC', value: v.poids } : null,
    v.autonomie ? { label: 'Carburant / Énergie', value: v.autonomie } : null,
    v.empattement ? { label: 'Empattement', value: v.empattement } : null,
  ].filter(Boolean) as { label: string; value: string }[]

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(5,13,26,.82)', backdropFilter: 'blur(8px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '20px',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="vehicule-modal-inner"
        style={{
          background: 'white', borderRadius: '6px',
          maxWidth: '960px', width: '100%', maxHeight: '90vh',
          overflow: 'auto', boxShadow: '0 40px 120px rgba(5,13,26,.5)',
          display: 'grid', gridTemplateColumns: '1.1fr 1fr',
        }}
      >
        {/* Gauche — photo + galerie */}
        <div style={{ position: 'relative', background: '#e8edf4', minHeight: '420px' }}>
          {photos.length > 0 ? (
            <>
              <img
                src={photos[galleryIdx]}
                alt={v.modele}
                style={{ width: '100%', height: '360px', objectFit: 'cover', display: 'block' }}
              />
              {/* Thumbnails */}
              {photos.length > 1 && (
                <div style={{ display: 'flex', gap: '6px', padding: '10px', flexWrap: 'wrap' }}>
                  {photos.map((p, i) => (
                    <img
                      key={i}
                      src={p}
                      alt=""
                      onClick={() => setGalleryIdx(i)}
                      style={{
                        width: '56px', height: '40px', objectFit: 'cover',
                        borderRadius: '3px', cursor: 'pointer',
                        border: i === galleryIdx ? '2px solid var(--accent)' : '2px solid transparent',
                        opacity: i === galleryIdx ? 1 : .65,
                        transition: 'all .2s',
                      }}
                    />
                  ))}
                </div>
              )}
            </>
          ) : (
            <div style={{ height: '360px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--silver)' }}>
              <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="1" y="3" width="15" height="13" rx="1"/><path d="M16 8h4l3 3v4h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
              </svg>
            </div>
          )}
        </div>

        {/* Droite — specs */}
        <div style={{ padding: '32px', overflowY: 'auto' }}>
          {/* Close */}
          <button
            onClick={onClose}
            style={{ position: 'absolute', top: '16px', right: '16px', background: 'rgba(5,13,26,.08)', border: 'none', borderRadius: '50%', width: '32px', height: '32px', cursor: 'pointer', fontSize: '1rem', color: 'var(--dark)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >✕</button>

          <div style={{ fontSize: '.57rem', fontWeight: 700, letterSpacing: '.22em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '4px' }}>
            {v.marque}
          </div>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.9rem', color: 'var(--dark)', textTransform: 'uppercase', lineHeight: 1, marginBottom: '6px' }}>
            {v.modele}
          </h3>
          {v.badge && (
            <span style={{ background: BADGE_COLORS[v.badgeType] ?? 'var(--blue)', color: 'white', fontSize: '.56rem', fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', padding: '3px 9px', borderRadius: '2px', display: 'inline-block', marginBottom: '16px' }}>
              {v.badge}
            </span>
          )}

          {v.description && (
            <p style={{ fontSize: '.82rem', color: 'var(--mid)', lineHeight: 1.7, marginBottom: '20px', fontWeight: 300 }}>
              {v.description}
            </p>
          )}

          {/* Specs table */}
          <div style={{ borderTop: '1.5px solid var(--border)', paddingTop: '16px', marginBottom: '16px' }}>
            <div style={{ fontSize: '.6rem', fontWeight: 700, letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--soft)', marginBottom: '10px' }}>Spécifications</div>
            {specs.map(({ label, value }) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', borderBottom: '1px solid rgba(5,13,26,.06)', fontSize: '.78rem' }}>
                <span style={{ color: 'var(--soft)', fontWeight: 500 }}>{label}</span>
                <span style={{ color: 'var(--dark)', fontWeight: 600, textAlign: 'right', maxWidth: '55%' }}>{value}</span>
              </div>
            ))}
          </div>

          {/* Équipements */}
          {v.equipements && v.equipements.length > 0 && (
            <div style={{ marginBottom: '20px' }}>
              <div style={{ fontSize: '.6rem', fontWeight: 700, letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--soft)', marginBottom: '10px' }}>Équipements inclus</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {v.equipements.map((eq) => (
                  <span key={eq} style={{ background: 'var(--off)', border: '1px solid var(--border)', borderRadius: '2px', fontSize: '.67rem', padding: '4px 9px', color: 'var(--mid)' }}>
                    {eq}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Prix + CTA */}
          <div style={{ borderTop: '1.5px solid var(--border)', paddingTop: '16px' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: 'var(--blue)', letterSpacing: '.03em' }}>{v.prixLabel}</div>
            <div style={{ fontSize: '.6rem', color: 'var(--soft)', marginBottom: '14px' }}>{v.prixSub}</div>
            <a
              href="#contact"
              onClick={onClose}
              className="btn-primary"
              style={{ display: 'block', textAlign: 'center' }}
            >
              Demander un devis →
            </a>
            <a
              href="#financement"
              onClick={onClose}
              style={{
                display: 'block', textAlign: 'center', marginTop: '8px',
                fontSize: '.7rem', color: 'var(--accent)', fontWeight: 600,
                letterSpacing: '.06em', textTransform: 'uppercase', textDecoration: 'none',
              }}
            >
              Voir options de financement →
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

function Spec({ label }: { label: string }) {
  return (
    <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '.67rem', color: 'var(--soft)' }}>
      <span style={{ color: 'var(--blue)', fontWeight: 700 }}>·</span> {label}
    </span>
  )
}
