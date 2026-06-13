# KDIGIT — État de la configuration

> Dernière mise à jour : configuration automatique effectuée.

## ✅ Configurations appliquées

| Élément | Fichier | Statut |
|---------|---------|--------|
| Variables locales | `.env` | ✅ Créé (JWT généré) |
| Template production | `.env.production.example` | ✅ |
| Variables Vercel | `vercel-env.txt` | ✅ Généré (`npm run vercel:env`) |
| Prisma ORM | `prisma/schema.prisma` | ✅ |
| Next.js + i18n | `next.config.ts` | ✅ Headers sécurité |
| Vercel deploy | `vercel.json` | ✅ Région Paris (cdg1) |
| PWA Manifest | `src/app/manifest.ts` | ✅ |
| Favicon dynamique | `src/app/icon.tsx` | ✅ Logo K bleu |
| Validation env | `src/lib/env.ts` | ✅ |
| Uploads dossier | `public/uploads/` | ✅ |
| SEO | `sitemap.ts`, `robots.ts` | ✅ |
| Scripts setup | `scripts/setup.ps1` | ✅ |
| Node version | `.nvmrc` (v20) | ✅ |
| Git ignore | `.gitignore` | ✅ |

## ⏳ Action requise : Base de données PostgreSQL

PostgreSQL n'est pas installé localement. **2 options** (sans Docker) :

### Option A — Neon (recommandé, gratuit, 2 minutes)

1. Créer un compte sur [neon.tech](https://neon.tech)
2. Créer un projet `kdigit`
3. Copier la **Connection string**
4. Coller dans `.env` :

```env
DATABASE_URL="postgresql://user:pass@ep-xxx.region.aws.neon.tech/kdigit?sslmode=require"
```

5. Initialiser :

```bash
npm run db:setup
```

### Option B — PostgreSQL local (Windows)

```powershell
winget install PostgreSQL.PostgreSQL.17
# Mot de passe superuser : postgres (par défaut lors de l'install)
# Puis :
npm run db:setup
```

## Commandes utiles

```bash
# Installation complète (Windows)
npm run setup

# Base de données
npm run db:push      # Synchroniser le schéma
npm run db:seed      # Données initiales + admin
npm run db:setup     # push + seed
npm run db:studio    # Interface visuelle DB

# Développement
npm run dev          # http://localhost:3000

# Production Vercel
npm run vercel:env   # Régénérer vercel-env.txt
vercel --prod        # Déployer
```

## Identifiants admin (après seed)

| Champ | Valeur |
|-------|--------|
| URL | http://localhost:3000/admin |
| Email | `admin@kdigit.com` |
| Mot de passe | `admin123` |

> ⚠️ Changez le mot de passe en production !

## Variables d'environnement

### Développement (`.env`)

| Variable | Configurée |
|----------|------------|
| `DATABASE_URL` | ⚠️ À connecter (Neon ou local) |
| `JWT_SECRET` | ✅ Générée |
| `NEXT_PUBLIC_SITE_URL` | ✅ localhost:3000 |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | ✅ |
| `SMTP_*` | ⚠️ À configurer pour les emails |

### Production (`vercel-env.txt`)

Importez toutes les variables dans **Vercel → Settings → Environment Variables**.

## Déploiement Vercel (sans Docker)

1. Pousser le code sur GitHub
2. Importer sur [vercel.com/new](https://vercel.com/new)
3. Coller les variables depuis `vercel-env.txt`
4. Remplacer `DATABASE_URL` par la connection string Neon
5. Deploy → Configurer le domaine `kdigit.com`

Voir [DEPLOYMENT.md](./DEPLOYMENT.md) pour le guide complet.
