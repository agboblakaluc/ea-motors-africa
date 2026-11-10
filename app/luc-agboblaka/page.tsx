import type { Metadata } from 'next'
import DigitalCard from '@/components/card/DigitalCard'
import { profile, cardUrl, SITE_URL } from '@/lib/cards/luc-agboblaka'
import { strings } from '@/lib/cards/i18n'

const { person } = profile
const fullName = `${person.firstName} ${person.lastName}`
const title = `${fullName} — ${person.title.fr} / ${person.title.en} | ${person.group}`
const description = `${strings.fr.ogDescription} ${strings.en.ogDescription}`

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title,
  description,
  alternates: { canonical: cardUrl },
  openGraph: {
    type: 'profile',
    url: cardUrl,
    siteName: person.group,
    title: `${fullName} — ${person.group}`,
    description: `${person.title.fr} / ${person.title.en}`,
    locale: 'fr_FR',
    alternateLocale: ['en_US'],
    firstName: person.firstName,
    lastName: person.lastName,
    // l'image vient de opengraph-image.tsx (même dossier)
  },
  twitter: { card: 'summary_large_image', title: `${fullName} — ${person.group}`, description: `${person.title.fr} / ${person.title.en}` },
  robots: { index: true, follow: true },
}

export default function Page() {
  return <DigitalCard profile={profile} cardUrl={cardUrl} />
}
