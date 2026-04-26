import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

export interface SiteSettings {
  siteName: string
  tagline: string
  slogan: string
  phone: string
  email: string
  address: string
  addressLine2: string
  zone: string
  hours: string
  socialFacebook?: string
  socialInstagram?: string
  socialLinkedin?: string
  socialWhatsapp?: string
  logo?: SanityImageSource
}

export interface Hero {
  titleLine1: string
  titleLine2: string
  titleLine3: string
  subtitle: string
  badge1: string
  badge2: string
  badge3: string
  backgroundImage?: SanityImageSource
  ctaPrimary: string
  ctaSecondary: string
}

export interface Vehicule {
  _id: string
  marque: string
  modele: string
  slug?: { current: string }
  categorie: 'tracteur' | 'benne' | 'rigide' | 'special' | 'remorque'
  badge: string
  badgeType: 'new' | 'promo' | 'std'
  puissance: string
  annee: string
  configuration?: string   // ex: 6×4, 4×2, 8×4
  autonomie?: string       // carburant / énergie
  transmission?: string
  poids?: string
  empattement?: string
  image: SanityImageSource
  gallery?: SanityImageSource[]
  description?: string
  equipements?: string[]
  prixLabel: string
  prixSub: string
  ordre: number
}

export interface Temoignage {
  _id: string
  nom: string
  role: string
  ville: string
  note: number
  texte: string
  initiales: string
  ordre: number
}

export interface Domaine {
  _id: string
  numero: string
  titre: string
  points: string[]
  ordre: number
}

export interface Equipement {
  _id: string
  marque: string
  sousTitre: string
  description: string
  items: string[]
  ordre: number
}

export interface StatItem {
  valeur: number
  suffixe?: string
  label: string
}

export interface Stats {
  items: StatItem[]
}

export interface Apropos {
  titre: string
  titreMet: string
  texte: string
  vision: string
  image?: SanityImageSource
}

export interface AtoutsData {
  items: { texte: string }[]
  image?: SanityImageSource
}

export interface EngagementItem {
  titre: string
  texte: string
  icone: string
}

export interface EngagementsData {
  items: EngagementItem[]
}

export interface FinancementData {
  titre: string
  description: string
  options: string[]
  tauxIndicatif: number
}

export interface Marque {
  _id: string
  nom: string
  ordre: number
}
