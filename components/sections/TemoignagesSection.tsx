'use client'
import type { Temoignage } from '@/lib/types'

export default function TemoignagesSection({ temoignages }: { temoignages: Temoignage[] }) {
  const items = temoignages.length > 0 ? temoignages : [
    { _id: 't1', nom: 'Kofi B.', role: 'Directeur logistique', ville: 'Accra, Ghana', note: 5, texte: "EA Motors a gere l'importation de notre flotte de 20 vehicules depuis la Chine jusqu'a Lome sans accroc. Delais respectes, documentation impeccable.", initiales: 'KB', ordre: 1 },
    { _id: 't2', nom: 'Amadou M.', role: 'Client particulier', ville: 'Lome, Togo', note: 5, texte: "J'ai commande un BYD Sealion 7 via EA Motors. Tout gere de A a Z par leur equipe. Livraison en 6 semaines comme promis, excellent suivi.", initiales: 'AM', ordre: 2 },
    { _id: 't3', nom: 'Felix S.', role: 'DG BTP', ville: 'Lome, Togo', note: 5, texte: "Notre entreprise BTP utilise les camions HOWO via EA Motors. Rapport qualite-prix imbattable, SAV tres reactif sur Lome.", initiales: 'FS', ordre: 3 },
    { _id: 't4', nom: 'Yao D.', role: 'Importateur', ville: 'Cotonou, Benin', note: 5, texte: "La maitrise des procedures douanieres CEDEAO par EA Motors nous a fait economiser temps et argent. Partenaire de confiance.", initiales: 'YD', ordre: 4 },
  ]
  return (
    <section id="temoignages" style={{ background: 'var(--off)', padding: '90px 6%' }}>
      <div style={{ textAlign: 'center', marginBottom: '46px' }}>
        <p className="section-tag" style={{ justifyContent: 'center' }}>Avis Clients</p>
        <h2 style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(2.5rem,5vw,4.5rem)', textTransform: 'uppercase', color: 'var(--dark)' }}>
          Ils nous font <span style={{ color: 'var(--blue)' }}>confiance</span>
        </h2>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: '20px' }}>
        {items.map((t) => (
          <div key={t._id}
            style={{ background: 'white', borderRadius: '6px', border: '1.5px solid var(--border)', padding: '28px', boxShadow: 'var(--sh-sm)', transition: 'all .3s' }}
            onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.transform = 'translateY(-4px)'; el.style.boxShadow = 'var(--sh-md)' }}
            onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.transform = 'none'; el.style.boxShadow = 'var(--sh-sm)' }}
          >
            <div style={{ color: '#f4b942', fontSize: '.85rem', marginBottom: '12px' }}>{'★'.repeat(t.note)}</div>
            <div style={{ fontFamily: 'var(--font-bebas)', fontSize: '2.6rem', color: 'var(--blue-pale)', lineHeight: .6, marginBottom: '11px' }}>"</div>
            <p style={{ fontSize: '.84rem', lineHeight: 1.8, color: 'var(--mid)', fontStyle: 'italic', fontWeight: 300, marginBottom: '17px' }}>{t.texte}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '37px', height: '37px', borderRadius: '50%', background: 'var(--blue-pale)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-bebas)', fontSize: '1rem', color: 'var(--blue)', border: '2px solid var(--border)', flexShrink: 0 }}>{t.initiales}</div>
              <div>
                <div style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '.82rem', color: 'var(--dark)' }}>{t.nom}</div>
                <div style={{ fontSize: '.67rem', color: 'var(--soft)', marginTop: '2px' }}>{t.role} · {t.ville}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
