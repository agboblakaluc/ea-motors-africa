# 🚀 Guide de Déploiement — EA Motors
## Next.js 14 + Sanity CMS + Vercel

---

## 📋 Ce que vous avez reçu

```
ea-motors/
├── app/                    ← Pages Next.js
│   ├── page.tsx            ← Page d'accueil (charge les données Sanity)
│   ├── layout.tsx          ← Layout global + polices
│   ├── globals.css         ← Styles globaux
│   └── studio/             ← Interface admin Sanity (yoursite.com/studio)
├── components/
│   ├── sections/           ← Toutes les sections du site
│   └── ui/                 ← Composants réutilisables
├── lib/
│   ├── sanity.ts           ← Client Sanity
│   ├── queries.ts          ← Requêtes GROQ (lecture données)
│   └── types.ts            ← Types TypeScript
├── sanity/
│   └── schemas/            ← Définition de tous les contenus éditables
├── sanity.config.ts        ← Configuration du Studio d'administration
├── .env.example            ← Variables d'environnement à remplir
└── package.json
```

---

## 🔧 ÉTAPE 1 — Prérequis

Installez ces outils si ce n'est pas encore fait :

1. **Node.js 18+** → https://nodejs.org
2. **Git** → https://git-scm.com
3. Un compte **GitHub** → https://github.com
4. Un compte **Sanity** (gratuit) → https://sanity.io
5. Un compte **Vercel** (gratuit) → https://vercel.com

---

## 🗄️ ÉTAPE 2 — Créer votre projet Sanity

### 2.1 Créer un compte et un projet
1. Allez sur https://sanity.io et créez un compte (gratuit)
2. Cliquez **"Create new project"**
3. Nom du projet : `EA Motors`
4. Dataset : `production` (par défaut)
5. Notez votre **Project ID** (visible dans l'URL ou le tableau de bord)

### 2.2 Récupérer vos identifiants
Sur https://sanity.io/manage → votre projet :
- **Project ID** : une chaîne comme `abc12def`
- **Dataset** : `production`
- **Token (lecture)** : Allez dans `API > Tokens > Add API token`
  - Nom : `Next.js Read Token`
  - Permissions : `Viewer`
  - Copiez le token généré (il ne s'affiche qu'une fois !)

---

## 💻 ÉTAPE 3 — Installation en local

```bash
# Extraire le projet et installer les dépendances
cd ea-motors
npm install

# Créer le fichier de configuration
cp .env.example .env.local
```

Éditez `.env.local` avec vos valeurs :
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=votre_project_id_ici
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
SANITY_API_READ_TOKEN=votre_token_ici
NEXT_PUBLIC_SITE_URL=https://eamotors.tg
```

### 3.1 Lancer en mode développement
```bash
npm run dev
```

Le site sera disponible sur : **http://localhost:3000**
Le studio admin sera sur : **http://localhost:3000/studio**

---

## 📝 ÉTAPE 4 — Peupler le contenu initial (Sanity Studio)

Allez sur **http://localhost:3000/studio** et remplissez :

### ⚙️ Paramètres du site
- Nom, téléphone, email, adresse, réseaux sociaux, logo

### 🏠 Section Hero
- Les 3 lignes du titre, le sous-titre, les badges

### 📊 Statistiques  
- Les 4 chiffres clés (valeur + suffixe + label)

### 🚗 Véhicules (le plus important !)
Créez chaque véhicule avec :
- Marque, modèle, catégorie (ev/suv/pro)
- **Photo principale** (uploadez depuis votre ordinateur)
- Galerie photos supplémentaires
- Puissance, année, autonomie/transmission
- Prix affiché (ex: "Sur devis" ou "12 500 000 FCFA")

### 🏗️ Équipements lourds
- FAW Trucks, SINOTRUK, SANY (déjà définis en fallback, personnalisez)

### ⭐ Témoignages
- Ajoutez de vrais témoignages clients

---

## 🌐 ÉTAPE 5 — Déploiement sur Vercel

### 5.1 Pousser sur GitHub
```bash
# Dans le dossier ea-motors
git init
git add .
git commit -m "EA Motors — première version"
git branch -M main
git remote add origin https://github.com/VOTRE_USERNAME/ea-motors.git
git push -u origin main
```

### 5.2 Connecter à Vercel
1. Allez sur https://vercel.com → **Add New Project**
2. Importez votre repo GitHub `ea-motors`
3. Vercel détecte automatiquement Next.js ✓

### 5.3 Variables d'environnement sur Vercel
Dans Vercel → votre projet → **Settings → Environment Variables**, ajoutez :

| Nom | Valeur |
|-----|--------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | votre project ID |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` |
| `NEXT_PUBLIC_SANITY_API_VERSION` | `2024-01-01` |
| `SANITY_API_READ_TOKEN` | votre token |
| `NEXT_PUBLIC_SITE_URL` | votre URL finale |

### 5.4 Déployer
Cliquez **Deploy** — Vercel construit et déploie automatiquement.

Votre site sera accessible sur : `ea-motors-xxx.vercel.app`

---

## 🌍 ÉTAPE 6 — Nom de domaine personnalisé

### Option A : .tg (Togo)
Contactez l'ANRT Togo (Autorité de Régulation) ou un registrar local.

### Option B : .com (international, recommandé)
Achetez `eamotors.com` sur :
- https://namecheap.com (~10€/an)
- https://godaddy.com
- https://ovh.com

### Connecter le domaine à Vercel
1. Vercel → votre projet → **Settings → Domains**
2. Ajoutez votre domaine (ex: `eamotors.com`)
3. Vercel vous donne des enregistrements DNS à ajouter chez votre registrar
4. Propagation : 5 minutes à 48h

---

## 🔄 ÉTAPE 7 — Mises à jour du contenu

**Tout se passe dans le Studio d'administration :**

Pour accéder au studio en production : **https://votre-domaine.com/studio**

### Ajouter un nouveau véhicule
1. Studio → **🚗 Véhicules** → **Create**
2. Remplissez les champs, uploadez la photo
3. Cliquez **Publish** → le site se met à jour en **60 secondes** (revalidation automatique)

### Modifier un texte
1. Studio → section concernée → modifier → **Publish**

### Ajouter un témoignage
1. Studio → **⭐ Témoignages** → **Create** → remplir → **Publish**

---

## 📧 ÉTAPE 8 — Réception des emails du formulaire de contact

Par défaut, le formulaire simule l'envoi. Pour recevoir les vraies demandes :

### Option recommandée : Resend (gratuit jusqu'à 3000 emails/mois)
1. Créez un compte sur https://resend.com
2. Ajoutez votre API key dans `.env.local` :
   ```env
   RESEND_API_KEY=re_xxxxxxxxxxxx
   ```
3. Créez le fichier `app/api/contact/route.ts` :
```typescript
import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  const body = await req.json()
  await resend.emails.send({
    from: 'EA Motors <noreply@eamotors.tg>',
    to: 'eam.togo@gmail.com',
    subject: `Nouvelle demande : ${body.type}`,
    html: `
      <h2>Nouvelle demande de contact</h2>
      <p><b>Nom :</b> ${body.prenom} ${body.nom}</p>
      <p><b>Email :</b> ${body.email}</p>
      <p><b>Téléphone :</b> ${body.tel}</p>
      <p><b>Type :</b> ${body.type}</p>
      <p><b>Détail :</b> ${body.detail}</p>
      <p><b>Message :</b> ${body.message}</p>
    `,
  })
  return NextResponse.json({ ok: true })
}
```

4. Installez Resend :
```bash
npm install resend
```

---

## 💰 Coûts mensuels estimés

| Service | Coût |
|---------|------|
| Vercel (Hobby) | **Gratuit** (jusqu'à 100GB bandwidth) |
| Sanity (Free) | **Gratuit** (jusqu'à 2 utilisateurs, 20GB assets) |
| Domaine .com | ~**1€/mois** |
| Resend emails | **Gratuit** (3000 emails/mois) |
| **TOTAL** | **~1€/mois** |

Pour un trafic plus élevé (50K+ visiteurs/mois) :
- Vercel Pro : ~$20/mois
- Sanity Growth : ~$15/mois

---

## 🆘 Dépannage fréquent

### Le site affiche des données vides
→ Vérifiez votre `.env.local` — le `NEXT_PUBLIC_SANITY_PROJECT_ID` est peut-être incorrect

### "Failed to fetch" au démarrage
→ Assurez-vous d'avoir publié au moins un document dans chaque schéma Sanity

### Les photos ne s'affichent pas
→ Vérifiez que `cdn.sanity.io` est dans la liste `remotePatterns` de `next.config.js`

### Erreur TypeScript
→ Lancez `npm run build` pour voir toutes les erreurs TypeScript avant de déployer

---

## 📞 Architecture technique — Résumé

```
Visiteur → Vercel (CDN mondial)
              ↓
         Next.js 14 (SSR + ISR)
              ↓
         Sanity CMS (données dynamiques)
              ↓
         Revalidation toutes les 60s
              ↓
         Mise à jour automatique du site
```

**ISR (Incremental Static Regeneration)** = votre site est ultra-rapide car les pages sont pré-générées, mais se mettent à jour automatiquement quand vous publiez du contenu dans Sanity.

---

*Guide généré pour EA Motors · Lomé, Togo*
*Stack : Next.js 14 · Sanity CMS v3 · Vercel · TypeScript · Tailwind CSS*
