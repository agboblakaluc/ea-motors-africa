'use client'
import type { SiteSettings } from '@/lib/types'

export default function Footer({ settings }: { settings: SiteSettings | null }) {
  const s = settings ?? {} as SiteSettings

  return (
    <footer style={{ background: 'var(--dark)', padding: '62px 6% 30px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '2.2fr 1fr 1fr 1fr', gap: '46px', marginBottom: '44px' }}
           className="ft-grid">
        {/* Brand */}
        <div>
          <img
            src="/logo-blue.jpg"
            alt="EA Motors"
            style={{ height: '120px', width: 'auto', borderRadius: '8px', marginBottom: '14px', display: 'block' }}
          />
          <div style={{ fontFamily: 'var(--font-bebas)', fontSize: '1rem', letterSpacing: '.2em', color: 'rgba(180,200,230,.5)', marginBottom: '10px' }}>
            {s.slogan ?? '▶ Driving Excellence !'}
          </div>
          <p style={{ fontSize: '.77rem', lineHeight: 1.8, color: 'rgba(255,255,255,.36)', marginBottom: '18px', fontWeight: 300 }}>
            Entreprise spécialisée dans les solutions de mobilité, le négoce et la logistique en Afrique de l'Ouest. Votre partenaire de confiance.
          </p>
          <div style={{ display: 'flex', gap: '7px' }}>
            {[
              { l: 'f', href: s.socialFacebook },
              { l: 'in', href: s.socialLinkedin },
              { l: 'ig', href: s.socialInstagram },
              { l: 'wa', href: s.socialWhatsapp },
            ].map((soc) => (
              <a key={soc.l} href={soc.href ?? '#'} style={{ width: '30px', height: '30px', borderRadius: '3px', border: '1px solid rgba(255,255,255,.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,.3)', textDecoration: 'none', fontFamily: 'var(--font-bebas)', fontSize: '.8rem', transition: 'all .25s', textTransform: 'uppercase' }}
                onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = 'var(--blue)'; el.style.color = 'white'; el.style.borderColor = 'var(--blue)' }}
                onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = 'transparent'; el.style.color = 'rgba(255,255,255,.3)'; el.style.borderColor = 'rgba(255,255,255,.1)' }}
              >{soc.l}</a>
            ))}
          </div>
        </div>

        {/* Nav */}
        <div>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: '.59rem', fontWeight: 700, letterSpacing: '.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,.3)', marginBottom: '16px' }}>Navigation</div>
          <ul style={{ listStyle: 'none' }}>
            {[['#about', 'Qui sommes-nous'], ['#domaines', 'Nos services'], ['#vehicules', 'Véhicules'], ['#equipements', 'Équipements'], ['#financement', 'Financement']].map(([href, label]) => (
              <li key={href} style={{ marginBottom: '8px' }}>
                <a href={href} style={{ fontSize: '.76rem', color: 'rgba(255,255,255,.4)', textDecoration: 'none', transition: 'color .3s', fontWeight: 300 }}
                  onMouseEnter={(e) => ((e.target as HTMLElement).style.color = 'rgba(200,210,222,.8)')}
                  onMouseLeave={(e) => ((e.target as HTMLElement).style.color = 'rgba(255,255,255,.4)')}
                >{label}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: '.59rem', fontWeight: 700, letterSpacing: '.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,.3)', marginBottom: '16px' }}>Services</div>
          <ul style={{ listStyle: 'none' }}>
            {['Vente neuf & occasion', 'Location véhicules', 'Import / Export', 'FAW / FOTON', 'Négoce général'].map((label) => (
              <li key={label} style={{ marginBottom: '8px' }}>
                <a href="#contact" style={{ fontSize: '.76rem', color: 'rgba(255,255,255,.4)', textDecoration: 'none', transition: 'color .3s', fontWeight: 300 }}
                  onMouseEnter={(e) => ((e.target as HTMLElement).style.color = 'rgba(200,210,222,.8)')}
                  onMouseLeave={(e) => ((e.target as HTMLElement).style.color = 'rgba(255,255,255,.4)')}
                >{label}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: '.59rem', fontWeight: 700, letterSpacing: '.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,.3)', marginBottom: '16px' }}>Contact</div>
          <ul style={{ listStyle: 'none' }}>
            {[
              ['#', s.address ?? "Rue de l'ancien siège Unir"],
              ['#', s.addressLine2 ?? 'Agbalépédo, Lomé - Togo'],
              [`tel:${s.phone?.replace(/\s/g, '')}`, s.phone ?? '+228 9603 4681'],
              [`mailto:${s.email}`, s.email ?? 'contact@eamotorsafrique.com'],
              ['#', 'Togo · Bénin · Burkina Faso'],
            ].map(([href, label]) => (
              <li key={label} style={{ marginBottom: '8px' }}>
                <a href={href} style={{ fontSize: '.76rem', color: 'rgba(255,255,255,.4)', textDecoration: 'none', transition: 'color .3s', fontWeight: 300 }}
                  onMouseEnter={(e) => ((e.target as HTMLElement).style.color = 'rgba(200,210,222,.8)')}
                  onMouseLeave={(e) => ((e.target as HTMLElement).style.color = 'rgba(255,255,255,.4)')}
                >{label}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div style={{ borderTop: '1px solid rgba(255,255,255,.06)', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '11px' }}>
        <div style={{ fontSize: '.68rem', color: 'rgba(255,255,255,.26)' }}>
          © 2025 <strong style={{ color: 'rgba(255,255,255,.5)' }}>EA Motors</strong> — Tous droits réservés · Lomé, Togo
        </div>
        <div style={{ display: 'flex', gap: '16px' }}>
          {['Mentions légales', 'Confidentialité'].map((label) => (
            <a key={label} href="#" style={{ fontSize: '.66rem', color: 'rgba(255,255,255,.26)', textDecoration: 'none', transition: 'color .3s' }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = 'rgba(255,255,255,.6)')}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = 'rgba(255,255,255,.26)')}
            >{label}</a>
          ))}
        </div>
      </div>
    </footer>
  )
}
