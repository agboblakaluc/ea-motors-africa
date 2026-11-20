/**
 * CONFIGURATION DE LA CARTE DE VISITE DIGITALE — Luc Agboblaka
 *
 * Point unique de modification des coordonnées et des entités du groupe.
 * La page /luc-agboblaka, le fichier .vcf, les liens d'action et les
 * métadonnées de partage lisent tous ce fichier.
 * Le QR code encode uniquement l'URL de la page : il ne change jamais.
 */
import type { CardProfile } from './types'

export const SITE_URL = 'https://eamotorsafrique.com'

export const profile: CardProfile = {
  person: {
    slug: 'luc-agboblaka',
    firstName: 'Luc',
    lastName: 'Agboblaka',
    title: { fr: 'Directeur Général', en: 'Managing Director' },
    group: 'EA HOLDINGS',
    phone: '+22896034681',
    emails: [
      { label: { fr: 'Email principal', en: 'Main email' }, address: 'eam.togo@gmail.com' },
      { label: { fr: 'Email professionnel', en: 'Business email' }, address: 'contact@eamotorsafrique.com' },
    ],
    website: SITE_URL,
    // socials: [{ label: 'LinkedIn', url: 'https://…' }],  // à ajouter ultérieurement
  },
  parent: { id: 'ea-holdings', name: 'EA HOLDINGS' },
  // Pour enrichir une entité : ajouter description / logo / website sur l'objet concerné.
  entities: [
    { id: 'ea-motors', name: 'EA MOTORS SARL' },
    { id: 'ea-logistics', name: 'EA LOGISTICS' },
    { id: 'ea-mining', name: 'EA MINING' },
    { id: 'meridian-machinery-africa', name: 'MERIDIAN MACHINERY AFRICA' },
  ],
}

export const cardPath = `/${profile.person.slug}`
export const cardUrl = `${SITE_URL}${cardPath}`
export const vcfPath = `/api/contact/${profile.person.slug}.vcf`
export const qrPngPath = `/assets/qr/${profile.person.slug}.png`
export const qrSvgPath = `/assets/qr/${profile.person.slug}.svg`
export const whatsappUrl = `https://wa.me/${profile.person.phone.replace(/\D/g, '')}`
