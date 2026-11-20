export type Lang = 'fr' | 'en'
export type Localized = Record<Lang, string>

export interface CardEntity {
  id: string
  name: string
  /** Champs optionnels — à renseigner plus tard, rien n'est affiché tant qu'ils sont vides. */
  description?: Localized
  logo?: string // chemin sous /public, ex. '/entities/ea-logistics.png'
  photo?: string
  website?: string
}

export interface CardPerson {
  slug: string
  firstName: string
  lastName: string
  title: Localized
  group: string
  phone: string // format international, sans espaces, ex. +22896034681
  emails: { label: Localized; address: string }[]
  website: string
  socials?: { label: string; url: string }[]
}

export interface CardProfile {
  person: CardPerson
  parent: CardEntity
  entities: CardEntity[]
}
