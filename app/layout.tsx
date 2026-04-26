import type { Metadata } from 'next'
import { Bebas_Neue, Outfit } from 'next/font/google'
import './globals.css'

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas',
  display: 'swap',
})

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'EA Motors — Driving Excellence | Lomé, Togo',
  description:
    'EA Motors — Concessionnaire automobile à Lomé. Vente de véhicules neufs & occasion, location, import/export, engins lourds FAW, SINOTRUK, SANY. Zone CEDEAO.',
  keywords: 'voiture Lomé Togo, BYD Togo, import véhicule Afrique, HOWO Togo, SANY Togo, concessionnaire auto Lomé',
  openGraph: {
    title: 'EA Motors — Driving Excellence',
    description: 'Votre partenaire mobilité en Afrique de l\'Ouest. Vente, location, import/export de véhicules.',
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: 'EA Motors',
    locale: 'fr_TG',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${bebasNeue.variable} ${outfit.variable}`}>
      <body>{children}</body>
    </html>
  )
}
