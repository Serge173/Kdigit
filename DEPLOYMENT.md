# Guide de déploiement KDIGIT (sans Docker)

Ce guide décrit le déploiement en production sur **Vercel** avec une base **PostgreSQL** hébergée (Neon ou Supabase). Aucun Docker requis.

---

## Architecture recommandée

| Composant | Service | Coût |
|-----------|---------|------|
| Application Next.js | [Vercel](https://vercel.com) | Gratuit (Hobby) |
| Base PostgreSQL | [Neon](https://neon.tech) ou [Supabase](https://supabase.com) | Gratuit (tier free) |
| Email SMTP | Gmail, Brevo, SendGrid | Variable |
| Nom de domaine | OVH, Namecheap, Cloudflare | ~10€/an |

---

## Étape 1 — Créer la base PostgreSQL

### Option A : Neon (recommandé)

1. Créer un compte sur [neon.tech](https://neon.tech)
2. Créer un projet `kdigit-production`
3. Copier la **Connection string** (format `postgresql://user:pass@host/db?sslmode=require`)

### Option B : Supabase

1. Créer un compte sur [supabase.com](https://supabase.com)
2. Nouveau projet → Settings → Database → Connection string (URI)
3. Utiliser le mode **Transaction** ou **Session**

---

## Étape 2 — Initialiser la base de données

En local, avec la connection string de production :

```bash
# Copier la variable
DATABASE_URL="postgresql://..." 

# Pousser le schéma
npx prisma db push

# Peupler les données initiales
npm run db:seed
```

> **Important** : changez le mot de passe admin après le premier déploiement.

---

## Étape 3 — Déployer sur Vercel

### Via l'interface web

1. Pousser le code sur **GitHub** / GitLab / Bitbucket
2. Aller sur [vercel.com/new](https://vercel.com/new)
3. Importer le repository `KDIGIT`
4. Framework détecté automatiquement : **Next.js**
5. Ajouter les variables d'environnement (voir ci-dessous)
6. Cliquer **Deploy**

### Via CLI

```bash
npm install -g vercel
vercel login
vercel

# Production
vercel --prod
```

---

## Étape 4 — Variables d'environnement Vercel

Dans **Vercel → Project → Settings → Environment Variables** :

| Variable | Valeur | Environnement |
|----------|--------|---------------|
| `DATABASE_URL` | Connection string PostgreSQL | Production, Preview |
| `JWT_SECRET` | Clé aléatoire longue (32+ caractères) | Production, Preview |
| `NEXT_PUBLIC_SITE_URL` | `https://votre-domaine.com` | Production |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | `2250708967624` (sans +) | Production |
| `SMTP_HOST` | `smtp.gmail.com` | Production |
| `SMTP_PORT` | `587` | Production |
| `SMTP_USER` | Votre email SMTP | Production |
| `SMTP_PASS` | Mot de passe application | Production |
| `SMTP_FROM` | `KDIGIT <contact@kdigit.com>` | Production |
| `ADMIN_EMAIL` | `admin@kdigit.com` | Production |
| `CONTACT_RATE_LIMIT_PER_HOUR` | `10` | Production |

Générer un `JWT_SECRET` sécurisé :

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## Étape 5 — Configurer le domaine

1. Vercel → Project → Settings → Domains
2. Ajouter `kdigit.com` et `www.kdigit.com`
3. Configurer les DNS chez votre registrar :

```
Type    Nom     Valeur
A       @       76.76.21.21
CNAME   www     cname.vercel-dns.com
```

4. Mettre à jour `NEXT_PUBLIC_SITE_URL` avec le domaine final
5. HTTPS/SSL est automatique sur Vercel

---

## Étape 6 — Vérifications post-déploiement

- [ ] Site accessible sur `https://votre-domaine.com`
- [ ] Pages FR et EN fonctionnelles (`/en/...`)
- [ ] Formulaire de contact enregistre en base
- [ ] Email de notification reçu
- [ ] Admin accessible : `https://votre-domaine.com/admin`
- [ ] Connexion admin fonctionnelle
- [ ] CRUD réalisations et articles opérationnel
- [ ] Sitemap : `https://votre-domaine.com/sitemap.xml`
- [ ] WhatsApp bouton fonctionnel

---

## Administration en production

| URL | Description |
|-----|-------------|
| `/admin` | Dashboard |
| `/admin/projets/nouveau` | Créer une réalisation |
| `/admin/projets/[id]` | Modifier une réalisation |
| `/admin/articles/nouveau` | Créer un article |
| `/admin/articles/[id]` | Modifier un article |
| `/admin/messages` | Gérer les messages (changer statut) |
| `/admin/devis` | Gérer les devis (changer statut) |
| `/admin/utilisateurs` | Gérer les comptes admin |

### Rôles utilisateurs

| Rôle | Permissions |
|------|-------------|
| `VIEWER` | Lecture seule |
| `EDITOR` | Créer/modifier projets, articles, statuts |
| `ADMIN` | Tout + supprimer + gérer utilisateurs |

---

## Notes importantes

### Upload de fichiers (devis)

Sur Vercel, le système de fichiers est **éphémère**. Les documents uploadés via le formulaire de devis ne persistent pas entre les redéploiements. Pour la production, utilisez un stockage externe :

- [Vercel Blob](https://vercel.com/docs/storage/vercel-blob)
- [Cloudinary](https://cloudinary.com)
- [AWS S3](https://aws.amazon.com/s3/)

Les images du portfolio et du blog utilisent des **URLs externes** (recommandé).

### Sauvegardes PostgreSQL

- **Neon** : sauvegardes automatiques (7 jours sur le plan free)
- **Supabase** : backups quotidiens sur le plan free

### Mises à jour

Chaque push sur la branche `main` redéploie automatiquement sur Vercel.

Pour mettre à jour le schéma de base :

```bash
DATABASE_URL="..." npx prisma db push
```

---

## Déploiement alternatif (VPS sans Docker)

Si vous préférez un serveur dédié (OVH, Hetzner, etc.) :

```bash
# Sur le serveur (Node.js 20+)
git clone <repo>
cd KDIGIT
npm install
cp .env.example .env
# Éditer .env

npx prisma db push
npm run db:seed
npm run build

# Lancer avec PM2
npm install -g pm2
pm2 start npm --name kdigit -- start
pm2 save
pm2 startup
```

Configurer Nginx en reverse proxy vers le port 3000 avec certificat Let's Encrypt (Certbot).

---

## Support

Pour toute question technique : contact@kdigit.com
