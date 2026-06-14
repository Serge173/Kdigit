# Créer la base PostgreSQL Neon (5 minutes)

## 1. Créer le compte et le projet

1. Ouvrir [https://neon.tech](https://neon.tech) → **Sign up** (gratuit)
2. **New Project** → nom : `kdigit-production`
3. Région : **Europe (Frankfurt)** ou la plus proche
4. PostgreSQL **17** (par défaut)

## 2. Récupérer les 2 connection strings

Dans Neon → **Dashboard** → **Connect** :

### Connexion poolée (DATABASE_URL)
- Mode : **Pooled connection**
- Copier l'URL, format :
```
postgresql://user:pass@ep-xxx-pooler.eu-central-1.aws.neon.tech/neondb?sslmode=require
```

### Connexion directe (DIRECT_URL)
- Mode : **Direct connection**
- Copier l'URL, format :
```
postgresql://user:pass@ep-xxx.eu-central-1.aws.neon.tech/neondb?sslmode=require
```

## 3. Coller dans `.env.production.local`

Éditer `D:\KDIGIT\.env.production.local` :

```env
DATABASE_URL="votre-url-poolée"
DIRECT_URL="votre-url-directe"
```

## 4. Initialiser la base

```powershell
cd D:\KDIGIT
.\scripts\setup-production-db.ps1
```

Admin créé : `admin@kdigit.com` / `admin123`

## 5. Déployer sur Vercel

```powershell
# Connexion Vercel (navigateur)
vercel login

# Déploiement complet
npm run deploy
```

Après le déploiement, mettre à jour `NEXT_PUBLIC_SITE_URL` avec l'URL Vercel finale
(ex. `https://kdigit-xxx.vercel.app`) puis relancer `npm run deploy`.
