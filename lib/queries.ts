// All GROQ queries for Sanity CMS

// ─── SITE SETTINGS ────────────────────────────────────────────────────────────
export const SETTINGS_QUERY = `
  *[_type == "siteSettings"][0] {
    siteName,
    tagline,
    slogan,
    phone,
    email,
    address,
    addressLine2,
    zone,
    hours,
    socialFacebook,
    socialInstagram,
    socialLinkedin,
    socialWhatsapp,
    logo
  }
`

// ─── HERO ─────────────────────────────────────────────────────────────────────
export const HERO_QUERY = `
  *[_type == "hero"][0] {
    titleLine1,
    titleLine2,
    titleLine3,
    subtitle,
    badge1,
    badge2,
    badge3,
    backgroundImage,
    ctaPrimary,
    ctaSecondary
  }
`

// ─── VEHICULES ────────────────────────────────────────────────────────────────
export const VEHICULES_QUERY = `
  *[_type == "vehicule"] | order(ordre asc) {
    _id,
    marque,
    modele,
    categorie,
    badge,
    badgeType,
    puissance,
    annee,
    configuration,
    autonomie,
    transmission,
    poids,
    empattement,
    image,
    prixLabel,
    prixSub,
    ordre
  }
`

export const VEHICULE_BY_SLUG_QUERY = `
  *[_type == "vehicule" && slug.current == $slug][0] {
    _id,
    marque,
    modele,
    slug,
    categorie,
    badge,
    badgeType,
    puissance,
    annee,
    configuration,
    autonomie,
    transmission,
    poids,
    empattement,
    image,
    gallery[],
    description,
    equipements,
    prixLabel,
    prixSub,
    ordre
  }
`

// ─── TEMOIGNAGES ──────────────────────────────────────────────────────────────
export const TEMOIGNAGES_QUERY = `
  *[_type == "temoignage"] | order(ordre asc) {
    _id,
    nom,
    role,
    ville,
    note,
    texte,
    initiales,
    ordre
  }
`

// ─── DOMAINES ─────────────────────────────────────────────────────────────────
export const DOMAINES_QUERY = `
  *[_type == "domaine"] | order(ordre asc) {
    _id,
    numero,
    titre,
    points,
    ordre
  }
`

// ─── EQUIPEMENTS ──────────────────────────────────────────────────────────────
export const EQUIPEMENTS_QUERY = `
  *[_type == "equipement"] | order(ordre asc) {
    _id,
    marque,
    sousTitre,
    description,
    items,
    ordre
  }
`

// ─── STATS ────────────────────────────────────────────────────────────────────
export const STATS_QUERY = `
  *[_type == "stats"][0] {
    items[] {
      valeur,
      suffixe,
      label
    }
  }
`

// ─── A PROPOS ─────────────────────────────────────────────────────────────────
export const APROPOS_QUERY = `
  *[_type == "apropos"][0] {
    titre,
    titreMet,
    texte,
    vision,
    image
  }
`

// ─── ATOUTS ───────────────────────────────────────────────────────────────────
export const ATOUTS_QUERY = `
  *[_type == "atouts"][0] {
    items[] {
      texte
    },
    image
  }
`

// ─── ENGAGEMENTS ──────────────────────────────────────────────────────────────
export const ENGAGEMENTS_QUERY = `
  *[_type == "engagements"][0] {
    items[] {
      titre,
      texte,
      icone
    }
  }
`

// ─── FINANCEMENT ──────────────────────────────────────────────────────────────
export const FINANCEMENT_QUERY = `
  *[_type == "financement"][0] {
    titre,
    description,
    options[],
    tauxIndicatif
  }
`

// ─── MARQUES ──────────────────────────────────────────────────────────────────
export const MARQUES_QUERY = `
  *[_type == "marque"] | order(ordre asc) {
    _id,
    nom,
    ordre
  }
`
