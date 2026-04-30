import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import {
  siteSettingsSchema,
  heroSchema,
  statsSchema,
  aproposSchema,
  marqueSchema,
  domaineSchema,
  equipementSchema,
  financementSchema,
  engagementsSchema,
  atoutsSchema,
  temoignageSchema,
} from './sanity/schemas'
import { vehiculeSchema as vehiculeSchemaFull } from './sanity/schemas/vehicule'

export default defineConfig({
  name: 'ea-motors-studio',
  title: 'EA Motors — Studio',
  basePath: '/studio',

  projectId: 'ceiyi7wh',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('EA Motors CMS')
          .items([
            S.listItem()
              .title('Parametres du site')
              .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
            S.divider(),
            S.listItem()
              .title('Section Hero')
              .child(S.document().schemaType('hero').documentId('hero')),
            S.listItem()
              .title('Statistiques')
              .child(S.document().schemaType('stats').documentId('stats')),
            S.listItem()
              .title('A Propos')
              .child(S.document().schemaType('apropos').documentId('apropos')),
            S.listItem()
              .title('Financement')
              .child(S.document().schemaType('financement').documentId('financement')),
            S.listItem()
              .title('Engagements')
              .child(S.document().schemaType('engagements').documentId('engagements')),
            S.listItem()
              .title('Atouts')
              .child(S.document().schemaType('atouts').documentId('atouts')),
            S.divider(),
            S.documentTypeListItem('vehicule').title('Vehicules'),
            S.documentTypeListItem('equipement').title('Equipements lourds'),
            S.documentTypeListItem('domaine').title('Domaines activite'),
            S.documentTypeListItem('marque').title('Marques partenaires'),
            S.documentTypeListItem('temoignage').title('Temoignages clients'),
          ]),
    }),
  ],

  schema: {
    types: [
      siteSettingsSchema,
      heroSchema,
      statsSchema,
      aproposSchema,
      marqueSchema,
      domaineSchema,
      equipementSchema,
      vehiculeSchemaFull,
      financementSchema,
      engagementsSchema,
      atoutsSchema,
      temoignageSchema,
    ],
  },
})
