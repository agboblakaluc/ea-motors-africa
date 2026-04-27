import type { Metadata } from 'next'
import { Bebas_Neue, Outfit } from 'next/font/google'
import './globals.css'
import WhatsAppButton from '@/components/ui/WhatsAppButton'

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
  title: 'EA Motors — Distribution équipements industriels | Lomé, Togo',
  description:
    'EA Motors SARL — Distribution de véhicules et équipements industriels neufs FAW & Foton, structuration de financements d\'actifs pour transporteurs, BTP et secteur minier en Afrique de l\'Ouest.',
  keywords: 'FAW Trucks Togo, Foton Afrique, camion benne Lomé, financement camion Afrique, équipements industriels Togo, tracteur routier CEDEAO',
  openGraph: {
    title: 'EA Motors — Distribution équipements industriels FAW & Foton',
    description: 'Distribution d\'équipements industriels neufs et structuration de financements d\'actifs en Afrique de l\'Ouest.',
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: 'EA Motors',
    locale: 'fr_TG',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${bebasNeue.variable} ${outfit.variable}`}>
      <body>
        {children}
        <WhatsAppButton />
      </body>
    </html>
  )
}
