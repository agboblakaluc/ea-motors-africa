import { defineField, defineType } from 'sanity'

export const vehiculeSchema = defineType({
  name: 'vehicule',
  title: 'Véhicule',
  type: 'document',
  fields: [
    defineField({
      name: 'marque',
      title: 'Marque',
      type: 'string',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'modele',
      title: 'Modèle',
      type: 'string',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: { source: 'modele' },
    }),
    defineField({
      name: 'categorie',
      title: 'Catégorie',
      type: 'string',
      options: {
        list: [
          { title: 'Tracteurs routiers', value: 'tracteur' },
          { title: 'Camions benne', value: 'benne' },
          { title: 'Camions rigides', value: 'rigide' },
          { title: 'Camions spéciaux', value: 'special' },
          { title: 'Remorques & semi-remorques', value: 'remorque' },
        ],
      },
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'badge',
      title: 'Badge (ex: Nouveau, 6×4, LNG, 420 ch)',
      type: 'string',
    }),
    defineField({
      name: 'badgeType',
      title: 'Style du badge',
      type: 'string',
      options: {
        list: [
          { title: 'Navy (Nouveau)', value: 'new' },
          { title: 'Bleu electric (Promo)', value: 'promo' },
          { title: 'Gris (Standard)', value: 'std' },
        ],
      },
    }),
    defineField({
      name: 'puissance',
      title: 'Puissance (ex: 420 ch, 530 ch)',
      type: 'string',
    }),
    defineField({
      name: 'annee',
      title: 'Année',
      type: 'string',
    }),
    defineField({
      name: 'configuration',
      title: 'Configuration roues (ex: 6×4, 4×2, 8×4)',
      type: 'string',
    }),
    defineField({
      name: 'transmission',
      title: 'Transmission / Boîte (ex: 12 rapports AMT)',
      type: 'string',
    }),
    defineField({
      name: 'poids',
      title: 'PTC / Charge utile (ex: 25 T, 50 T)',
      type: 'string',
    }),
    defineField({
      name: 'empattement',
      title: 'Empattement / Dimensions',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Photo principale',
      type: 'image',
      options: { hotspot: true },
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'gallery',
      title: 'Galerie photos',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'equipements',
      title: 'Équipements / Options',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'prixLabel',
      title: 'Affichage prix (ex: Sur devis, 12 500 000 FCFA)',
      type: 'string',
      initialValue: 'Sur devis',
    }),
    defineField({
      name: 'prixSub',
      title: 'Sous-titre prix (ex: Import direct)',
      type: 'string',
      initialValue: 'Import direct',
    }),
    defineField({
      name: 'ordre',
      title: "Ordre d'affichage",
      type: 'number',
      initialValue: 10,
    }),
  ],
  preview: {
    select: { title: 'modele', subtitle: 'marque', media: 'image' },
  },
})
