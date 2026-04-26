'use client'
import type { EngagementsData } from '@/lib/types'

const IconShield = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
const IconDollar = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
const IconTruck = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
const IconStar = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>

const iconMap: Record<string, React.ReactNode> = {
  shield: <IconShield />,
  dollar: <IconDollar />,
  truck: <IconTruck />,
  radio: <IconStar />,
}

export default function EngagementsSection({ engagements }: { engagements: EngagementsData | null }) {
  const items = engagements?.items ?? [
    { titre: 'Inspection Certifiée', texte: "Chaque véhicule passe un contrôle technique de 150 points par nos experts avant d'entrer dans notre stock.", icone: 'shield' },
    { titre: 'Financement Flexible', texte: "LOA, LLD, crédit classique — réponse de principe en 2h. Des solutions adaptées à chaque profil, sans frais cachés.", icone: 'dollar' },
    { titre: 'Livraison à Domicile', texte: "Votre véhicule vous est remis en main propre, en parfait état, à l'adresse de votre choix.", icone: 'truck' },
    { titre: 'Garantie & SAV Premium', texte: "Garantie constructeur sur tous les véhicules neufs. Extension disponible sur occasion. SAV réactif.", icone: 'radio' },
  ]

  return (
    <section id="engagements" style={{ background: 'white', padding: '90px 6%' }}>
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <p className="section-tag" style={{ justifyContent: 'center' }}>Nos Garanties</p>
        <h2 style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(2.5rem,5vw,4.5rem)', textTransform: 'uppercase', color: 'var(--dark)' }}>
          Nos <span style={{ color: 'var(--blue)' }}>Engagements</span>
        </h2>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '2px', background: 'rgba(27,58,107,.07)' }}>
        {items.map((item, i) => (
          <div key={i}
            style={{ background: 'white', padding: '36px 26px', transition: 'background .3s' }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'var(--off)' }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'white' }}
          >
            <div style={{ width: '52px', height: '52px', background: 'var(--blue)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '18px', boxShadow: '0 4px 16px rgba(27,58,107,.3)' }}>
              {iconMap[item.icone] ?? <IconStar />}
            </div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: '.9rem', fontWeight: 700, color: 'var(--dark)', marginBottom: '7px' }}>{item.titre}</div>
            <div style={{ fontSize: '.78rem', color: 'var(--soft)', lineHeight: 1.72, fontWeight: 300 }}>{item.texte}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
