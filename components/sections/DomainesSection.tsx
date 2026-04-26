'use client'
import type { Domaine } from '@/lib/types'

const defaultDomaines: Omit<Domaine, '_id'>[] = [
  { numero: '01', titre: 'Vente Véhicules Neufs & Occasion', points: ['Importation toutes marques', 'Partenariats Europe & Asie', 'Gros & détail'], ordre: 1 },
  { numero: '02', titre: 'Location de Véhicules', points: ['Flotte pro & particuliers', 'Courte, moyenne & longue durée'], ordre: 2 },
  { numero: '03', titre: 'Concession & Représentation', points: ['Négociation constructeurs', 'Réseaux de distribution'], ordre: 3 },
  { numero: '04', titre: 'Négoce & Commerce Général', points: ['Véhicules, pièces, équipements', 'Multi-marchés & multi-produits'], ordre: 4 },
  { numero: '05', titre: 'Import / Export', points: ["Chaîne d'appro complète", 'Procédures douanières CEDEAO'], ordre: 5 },
]

export default function DomainesSection({ domaines }: { domaines: Domaine[] }) {
  const items = domaines.length > 0 ? domaines : defaultDomaines as Domaine[]
  const cols = Math.min(items.length, 5)
  return (
    <section id="domaines" style={{ background: 'white', padding: '90px 6%' }}>
      <div style={{ textAlign: 'center', marginBottom: '50px' }}>
        <p className="section-tag" style={{ justifyContent: 'center' }}>Domaines Expertise</p>
        <h2 style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(2.5rem,5vw,4.5rem)', textTransform: 'uppercase', color: 'var(--dark)' }}>
          Nos <span style={{ color: 'var(--blue)' }}>{cols} Domaines</span>
        </h2>
      </div>
      <div className="domaines-grid" style={{ display: 'grid', gridTemplateColumns: `repeat(${cols},1fr)`, gap: '2px', background: 'rgba(27,58,107,.07)' }}>
        {items.map((d) => (
          <div key={d._id || d.numero}
            style={{ background: 'white', padding: '36px 26px', position: 'relative', overflow: 'hidden', transition: 'background .3s', cursor: 'default' }}
            onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = 'var(--off)'; }}
            onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = 'white'; }}
          >
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
