# KDIGIT - Site Web Professionnel

Site vitrine premium pour **KDIGIT**, entreprise spécialisée dans la conception et le développement de solutions digitales innovantes.

## Stack technique

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS 4** — Design premium responsive
- **PostgreSQL** + **Prisma ORM**
- **next-intl** — Multilingue FR/EN
- **Framer Motion** — Animations fluides
- **Nodemailer** — Notifications email
- **JWT** — Authentification admin

## Fonctionnalités

- Page d'accueil avec hero, stats, services, portfolio, témoignages, méthodologie
- Pages : À propos, Services, Réalisations, Blog, Contact, Devis
- Formulaire de contact avec anti-spam (honeypot + rate limiting)
- Demande de devis avec upload de fichiers
- Bouton WhatsApp flottant
- SEO : meta tags, sitemap XML, robots.txt
- Administration : gestion réalisations, articles, messages, devis, utilisateurs
- Multilingue français / anglais

## Démarrage rapide

```bash
# 1. Installer les dépendances
npm install

# 2. Configurer l'environnement
cp .env.example .env
# Éditer .env avec votre DATABASE_URL PostgreSQL

# 3. Initialiser la base de données
npx prisma generate
npx prisma db push
npm run db:seed

# 4. Lancer le serveur de développement
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000)

### Administration

- URL : [http://localhost:3000/admin](http://localhost:3000/admin)
- Email : `admin@kdigit.com`
- Mot de passe : `admin123`

#### CRUD complet

| Section | Actions |
|---------|---------|
| Réalisations | Créer, modifier, supprimer, publier, mettre en avant |
| Articles | Créer, modifier, supprimer, publier (FR/EN) |
| Messages | Changer le statut (Nouveau → Lu → Répondu → Archivé) |
| Devis | Changer le statut (Nouveau → En cours → Devis envoyé...) |
| Utilisateurs | Créer, modifier, désactiver (rôles ADMIN/EDITOR/VIEWER) |

## Déploiement en production (sans Docker)

Voir le guide complet : **[DEPLOYMENT.md](./DEPLOYMENT.md)**

Résumé :
1. Base PostgreSQL sur [Neon](https://neon.tech) ou [Supabase](https://supabase.com)
2. Déploiement sur [Vercel](https://vercel.com) (gratuit, HTTPS automatique)
3. Configurer les variables d'environnement
4. `npx prisma db push` + `npm run db:seed`

```bash
# Déploiement rapide via CLI Vercel
npm install -g vercel
vercel --prod
```

## Charte graphique

| Élément | Valeur |
|---------|--------|
| Orange (principal) | `#F97316` |
| Vert (accent) | `#22C55E` |
| Vert foncé (texte / footer) | `#14532D` |
| Fond | `#FFFFFF` (Blanc) |
| Typographies | Poppins, Inter, Montserrat |

## Structure du projet

```
src/
├── app/
│   ├── [locale]/          # Pages publiques (FR/EN)
│   ├── admin/             # Panneau d'administration
│   └── api/               # Routes API
├── components/
│   ├── layout/            # Header, Footer, WhatsApp
│   ├── sections/          # Sections de page
│   ├── forms/             # Formulaires
│   └── ui/                # Composants UI
├── lib/                   # Utilitaires, auth, email, data
├── i18n/                  # Configuration multilingue
messages/                  # Traductions FR/EN
prisma/                    # Schéma et seed
```

## Scripts

| Commande | Description |
|----------|-------------|
| `npm run dev` | Serveur de développement |
| `npm run build` | Build de production |
| `npm run start` | Serveur de production |
| `npm run db:push` | Synchroniser le schéma Prisma |
| `npm run db:seed` | Peupler la base de données |
| `npm run db:studio` | Interface Prisma Studio |

## Sécurité

- HTTPS/SSL (en production)
- Protection anti-spam (honeypot + rate limiting)
- Protection SQL injection (Prisma ORM paramétré)
- Authentification JWT pour l'admin
- Gestion des rôles utilisateurs (ADMIN, EDITOR, VIEWER)

## Licence

Projet propriétaire — © KDIGIT
