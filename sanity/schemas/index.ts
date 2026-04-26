import { defineField, defineType } from 'sanity'

// ─── SITE SETTINGS ────────────────────────────────────────────────────────────
export const siteSettingsSchema = defineType({
  name: 'siteSettings',
  title: 'Paramètres du Site',
  type: 'document',
  fields: [
    defineField({ name: 'siteName', title: 'Nom du site', type: 'string', initialValue: 'EA Motors' }),
    defineField({ name: 'tagline', title: 'Sous-titre', type: 'string', initialValue: 'Concessionnaire Automobile · Lomé, Togo' }),
    defineField({ name: 'slogan', title: 'Slogan', type: 'string', initialValue: '▶ Driving Excellence !' }),
    defineField({ name: 'phone', title: 'Téléphone', type: 'string', initialValue: '+228 9603 4681' }),
    defineField({ name: 'email', title: 'Email', type: 'string', initialValue: 'contact@eamotorsafrique.com' }),
    defineField({ name: 'address', title: 'Adresse ligne 1', type: 'string', initialValue: "Rue de l'ancien siège Unir" }),
    defineField({ name: 'addressLine2', title: 'Adresse ligne 2', type: 'string', initialValue: 'Agbalépédo, Lomé - Togo' }),
    defineField({ name: 'zone', title: 'Zone desservie', type: 'string', initialValue: 'Togo · Bénin · Burkina Faso · Espace CEDEAO' }),
    defineField({ name: 'hours', title: 'Horaires', type: 'string', initialValue: 'Lun–Ven 08h–18h · Sam 08h–14h' }),
    defineField({ name: 'socialFacebook', title: 'Facebook URL', type: 'url' }),
    defineField({ name: 'socialInstagram', title: 'Instagram URL', type: 'url' }),
    defineField({ name: 'socialLinkedin', title: 'LinkedIn URL', type: 'url' }),
    defineField({ name: 'socialWhatsapp', title: 'WhatsApp URL', type: 'url' }),
    defineField({ name: 'logo', title: 'Logo', type: 'image', options: { hotspot: true } }),
  ],
  preview: { select: { title: 'siteName' } },
})

// ─── HERO ─────────────────────────────────────────────────────────────────────
export const heroSchema = defineType({
  name: 'hero',
  title: 'Section Hero (Accueil)',
  type: 'document',
  fields: [
    defineField({ name: 'titleLine1', title: 'Titre ligne 1', type: 'string', initialValue: 'Mobilité' }),
    defineField({ name: 'titleLine2', title: 'Titre ligne 2 (couleur bleue)', type: 'string', initialValue: 'Excellence' }),
    defineField({ name: 'titleLine3', title: 'Titre ligne 3', type: 'string', initialValue: 'Logistique' }),
    defineField({ name: 'subtitle', title: 'Sous-titre', type: 'text', rows: 2 }),
    defineField({ name: 'badge1', title: 'Badge 1', type: 'string', initialValue: 'Véhicules certifiés' }),
    defineField({ name: 'badge2', title: 'Badge 2', type: 'string', initialValue: 'Financement en 2h' }),
    defineField({ name: 'badge3', title: 'Badge 3', type: 'string', initialValue: 'Livraison domicile' }),
    defineField({ name: 'backgroundImage', title: 'Image de fond', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'ctaPrimary', title: 'Bouton principal', type: 'string', initialValue: 'Voir les véhicules →' }),
    defineField({ name: 'ctaSecondary', title: 'Bouton secondaire', type: 'string', initialValue: 'Prendre RDV' }),
  ],
})

// ─── TEMOIGNAGES ──────────────────────────────────────────────────────────────
export const temoignageSchema = defineType({
  name: 'temoignage',
  title: 'Témoignage Client',
  type: 'document',
  fields: [
    defineField({ name: 'nom', title: 'Nom', type: 'string', validation: (R) => R.required() }),
    defineField({ name: 'role', title: 'Rôle / Entreprise', type: 'string' }),
    defineField({ name: 'ville', title: 'Ville, Pays', type: 'string' }),
    defineField({ name: 'note', title: 'Note (1-5)', type: 'number', initialValue: 5, validation: (R) => R.min(1).max(5) }),
    defineField({ name: 'texte', title: 'Témoignage', type: 'text', rows: 4, validation: (R) => R.required() }),
    defineField({ name: 'initiales', title: 'Initiales (ex: KB)', type: 'string' }),
    defineField({ name: 'ordre', title: "Ordre d'affichage", type: 'number', initialValue: 10 }),
  ],
  preview: { select: { title: 'nom', subtitle: 'ville' } },
})

// ─── DOMAINES ─────────────────────────────────────────────────────────────────
export const domaineSchema = defineType({
  name: 'domaine',
  title: "Domaine d'Activité",
  type: 'document',
  fields: [
    defineField({ name: 'numero', title: 'Numéro (ex: 01)', type: 'string' }),
    defineField({ name: 'titre', title: 'Titre', type: 'string', validation: (R) => R.required() }),
    defineField({ name: 'points', title: 'Points clés', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'ordre', title: "Ordre d'affichage", type: 'number', initialValue: 10 }),
  ],
  preview: { select: { title: 'titre', subtitle: 'numero' } },
})

// ─── EQUIPEMENTS ──────────────────────────────────────────────────────────────
export const equipementSchema = defineType({
  name: 'equipement',
  title: 'Équipement / Marque Lourde',
  type: 'document',
  fields: [
    defineField({ name: 'marque', title: 'Marque (ex: FAW Trucks)', type: 'string', validation: (R) => R.required() }),
    defineField({ name: 'sousTitre', title: 'Sous-titre', type: 'string' }),
    defineField({ name: 'description', title: 'Description courte', type: 'text', rows: 3 }),
    defineField({ name: 'items', title: 'Produits / Services', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'ordre', title: "Ordre d'affichage", type: 'number', initialValue: 10 }),
  ],
  preview: { select: { title: 'marque' } },
})

// ─── STATS ────────────────────────────────────────────────────────────────────
export const statsSchema = defineType({
  name: 'stats',
  title: 'Statistiques',
  type: 'document',
  fields: [
    defineField({
      name: 'items',
      title: 'Chiffres clés',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'valeur', title: 'Valeur (nombre)', type: 'number' }),
          defineField({ name: 'suffixe', title: 'Suffixe (ex: +, %)', type: 'string' }),
          defineField({ name: 'label', title: 'Label', type: 'string' }),
        ],
      }],
    }),
  ],
})

// ─── A PROPOS ─────────────────────────────────────────────────────────────────
export const aproposSchema = defineType({
  name: 'apropos',
  title: 'Section À Propos',
  type: 'document',
  fields: [
    defineField({ name: 'titre', title: 'Titre', type: 'string' }),
    defineField({ name: 'titreMet', title: 'Titre mot accentué', type: 'string' }),
    defineField({ name: 'texte', title: 'Texte principal', type: 'text', rows: 6 }),
    defineField({ name: 'vision', title: 'Citation vision', type: 'text', rows: 3 }),
    defineField({ name: 'image', title: 'Photo showroom', type: 'image', options: { hotspot: true } }),
  ],
})

// ─── ATOUTS ───────────────────────────────────────────────────────────────────
export const atoutsSchema = defineType({
  name: 'atouts',
  title: 'Section Atouts',
  type: 'document',
  fields: [
    defineField({
      name: 'items',
      title: 'Points forts',
      type: 'array',
      of: [{ type: 'object', fields: [defineField({ name: 'texte', title: 'Texte', type: 'string' })] }],
    }),
    defineField({ name: 'image', title: 'Photo', type: 'image', options: { hotspot: true } }),
  ],
})

// ─── ENGAGEMENTS ──────────────────────────────────────────────────────────────
export const engagementsSchema = defineType({
  name: 'engagements',
  title: 'Section Engagements',
  type: 'document',
  fields: [
    defineField({
      name: 'items',
      title: 'Engagements',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'titre', title: 'Titre', type: 'string' }),
          defineField({ name: 'texte', title: 'Texte', type: 'text', rows: 3 }),
          defineField({ name: 'icone', title: 'Icône (shield, dollar, truck, radio)', type: 'string' }),
        ],
      }],
    }),
  ],
})

// ─── FINANCEMENT ──────────────────────────────────────────────────────────────
export const financementSchema = defineType({
  name: 'financement',
  title: 'Section Financement',
  type: 'document',
  fields: [
    defineField({ name: 'titre', title: 'Titre principal', type: 'string' }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
    defineField({ name: 'options', title: 'Options disponibles', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'tauxIndicatif', title: 'Taux indicatif (%)', type: 'number', initialValue: 4.9 }),
  ],
})

// ─── MARQUES ──────────────────────────────────────────────────────────────────
export const marqueSchema = defineType({
  name: 'marque',
  title: 'Marque Partenaire',
  type: 'document',
  fields: [
    defineField({ name: 'nom', title: 'Nom', type: 'string', validation: (R) => R.required() }),
    defineField({ name: 'ordre', title: "Ordre d'affichage", type: 'number', initialValue: 10 }),
  ],
  preview: { select: { title: 'nom' } },
})
