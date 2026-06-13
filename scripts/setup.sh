#!/usr/bin/env bash
# KDIGIT — Script d'installation complète (Linux/macOS)
# Usage : chmod +x scripts/setup.sh && ./scripts/setup.sh

set -e
cd "$(dirname "$0")/.."

echo ""
echo "========================================"
echo "  KDIGIT — Configuration automatique"
echo "========================================"
echo ""

# 1. Node.js
echo "[1/6] Vérification Node.js..."
if ! command -v node &> /dev/null; then
    echo "ERREUR: Node.js non installé. Installez Node.js 20+"
    exit 1
fi
echo "  Node.js $(node -v) OK"

# 2. .env
echo "[2/6] Configuration .env..."
if [ ! -f .env ]; then
    cp .env.example .env
    JWT=$(node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")
    sed -i.bak "s/change-this-to-a-long-random-secret-key/$JWT/" .env && rm -f .env.bak
    echo "  .env créé avec JWT_SECRET généré"
else
    echo "  .env existe déjà"
fi

# 3. Dépendances
echo "[3/6] Installation npm..."
npm install

# 4. Prisma
echo "[4/6] Génération Prisma Client..."
npx prisma generate

# 5. Database
echo "[5/6] Configuration PostgreSQL..."
if npx prisma db push --accept-data-loss 2>/dev/null; then
    echo "  Schéma synchronisé"
    echo "[6/6] Seed des données..."
    npm run db:seed
    echo "  Admin: admin@kdigit.com / admin123"
else
    echo "  PostgreSQL non accessible."
    echo "  Configurez DATABASE_URL dans .env puis:"
    echo "    npm run db:push && npm run db:seed"
fi

echo ""
echo "========================================"
echo "  Configuration terminée !"
echo "========================================"
echo "  npm run dev  →  http://localhost:3000"
echo "  Admin        →  http://localhost:3000/admin"
echo ""
