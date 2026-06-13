# KDIGIT — Script d'installation complète (Windows PowerShell)
# Usage : .\scripts\setup.ps1

$ErrorActionPreference = "Stop"
$ProjectRoot = Split-Path -Parent $PSScriptRoot
Set-Location $ProjectRoot

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  KDIGIT — Configuration automatique" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# 1. Vérifier Node.js
Write-Host "[1/6] Verification Node.js..." -ForegroundColor Yellow
$nodeVersion = node -v 2>$null
if (-not $nodeVersion) {
    Write-Host "ERREUR: Node.js non installe. Installez Node.js 20+ depuis https://nodejs.org" -ForegroundColor Red
    exit 1
}
Write-Host "  Node.js $nodeVersion OK" -ForegroundColor Green

# 2. Créer .env si absent
Write-Host "[2/6] Configuration .env..." -ForegroundColor Yellow
if (-not (Test-Path ".env")) {
    Copy-Item ".env.example" ".env"
    $jwt = node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
    (Get-Content ".env") -replace 'change-this-to-a-long-random-secret-key', $jwt | Set-Content ".env"
    Write-Host "  .env cree avec JWT_SECRET genere" -ForegroundColor Green
} else {
    Write-Host "  .env existe deja" -ForegroundColor Green
}

# 3. Installer les dépendances
Write-Host "[3/6] Installation des dependances npm..." -ForegroundColor Yellow
npm install
Write-Host "  Dependances installees" -ForegroundColor Green

# 4. Générer Prisma Client
Write-Host "[4/6] Generation Prisma Client..." -ForegroundColor Yellow
npx prisma generate
Write-Host "  Prisma Client genere" -ForegroundColor Green

# 5. Base de données PostgreSQL
Write-Host "[5/6] Configuration PostgreSQL..." -ForegroundColor Yellow

$pgService = Get-Service -Name "postgresql*" -ErrorAction SilentlyContinue | Select-Object -First 1
$pgReady = $false

if ($pgService) {
    Write-Host "  Service PostgreSQL detecte: $($pgService.Name)" -ForegroundColor Green
    $pgReady = $true
} else {
    Write-Host "  PostgreSQL local non detecte." -ForegroundColor Yellow
    Write-Host "  Options:" -ForegroundColor Yellow
    Write-Host "    A) Installer PostgreSQL: winget install PostgreSQL.PostgreSQL.17" -ForegroundColor White
    Write-Host "    B) Utiliser Neon (gratuit): https://neon.tech" -ForegroundColor White
    Write-Host "       -> Copier la connection string dans .env (DATABASE_URL)" -ForegroundColor White
    Write-Host ""
    
    $tryPush = Read-Host "Tenter prisma db push quand meme ? (o/n)"
    if ($tryPush -eq "o" -or $tryPush -eq "O") {
        $pgReady = $true
    }
}

if ($pgReady) {
    try {
        npx prisma db push --accept-data-loss 2>&1 | Out-Host
        Write-Host "  Schema PostgreSQL synchronise" -ForegroundColor Green
        
        Write-Host "[6/6] Seed des donnees initiales..." -ForegroundColor Yellow
        npm run db:seed
        Write-Host "  Donnees initiales inserees" -ForegroundColor Green
        Write-Host ""
        Write-Host "  Admin: admin@kdigit.com / admin123" -ForegroundColor Cyan
    } catch {
        Write-Host "  Echec connexion DB. Configurez DATABASE_URL dans .env" -ForegroundColor Red
        Write-Host "  Puis relancez: npm run db:push && npm run db:seed" -ForegroundColor Yellow
    }
} else {
    Write-Host "[6/6] Seed ignore (pas de base de donnees)" -ForegroundColor Yellow
    Write-Host "  Le site fonctionne avec les donnees de demonstration" -ForegroundColor White
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "  Configuration terminee !" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "  Demarrer le site : npm run dev" -ForegroundColor Cyan
Write-Host "  Site             : http://localhost:3000" -ForegroundColor Cyan
Write-Host "  Admin            : http://localhost:3000/admin" -ForegroundColor Cyan
Write-Host "  Prisma Studio    : npm run db:studio" -ForegroundColor Cyan
Write-Host ""
