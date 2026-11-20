# Carte de visite digitale — Luc Agboblaka (EA HOLDINGS)

| Élément | URL / fichier |
|---|---|
| Page publique FR/EN | `https://eamotorsafrique.com/luc-agboblaka` (`?lang=en` force l'anglais) |
| Fiche vCard 3.0 | `/api/contact/luc-agboblaka.vcf` (`?lang=fr` : fonction en français) |
| QR code PNG / SVG | `/assets/qr/luc-agboblaka.png` · `.svg` (`public/assets/qr/`) |
| Visuel de partage Open Graph | `/luc-agboblaka/opengraph-image` (1200×630, généré par `app/luc-agboblaka/opengraph-image.tsx`) |

Le QR code encode **uniquement** l'URL de la page : il ne change jamais, même si les coordonnées changent.

## Déploiement
Aucun changement d'infrastructure : le push sur la branche déployée par Vercel suffit
(`npm install --legacy-peer-deps` + `npm run build`, comme le reste du site). Aucune variable d'environnement requise.

## Modifier les coordonnées / entités
Tout est dans **`lib/cards/luc-agboblaka.ts`** (téléphone, emails, site, fonction FR/EN, entités).
Les textes d'interface FR/EN sont dans `lib/cards/i18n.ts`. La page, la vCard, les liens et le visuel de partage se mettent à jour d'eux-mêmes.
Ajouter ensuite une entité = une ligne ; `description` (FR/EN), `logo`, `photo`, `website` sont optionnels et s'affichent dès qu'ils sont renseignés. Réseaux sociaux : champ `socials`.

## Regénérer le QR code
Uniquement si le domaine ou le chemin change : `npm run qr` (le QR est ensuite à recommuniquer).

## Autre dirigeant
Dupliquer `lib/cards/luc-agboblaka.ts`, `app/luc-agboblaka/` et `app/api/contact/luc-agboblaka.vcf/` avec un autre slug.

## Vérifications manuelles à faire après déploiement
- Scan du QR avec l'appareil photo iOS, Android, Google Lens et une application tierce.
- « Enregistrer le contact » : import réel dans Contacts iOS (Safari) et Google Contacts / Android (Chrome).
- Aperçu du lien collé dans WhatsApp et LinkedIn (ces plateformes mettent l'aperçu en cache : utiliser le Post Inspector LinkedIn pour rafraîchir).
- Redirection http → https et éventuel `www` (réglage Vercel/DNS).
- Bouton de partage natif sur mobile (Web Share API ; copie du lien sinon).
