# KDIGIT — Déploiement complet sur Vercel
# Usage : .\scripts\deploy-vercel.ps1
#
# Prérequis :
#   1. Compte Vercel connecté (vercel login)
#   2. Base PostgreSQL Neon/Supabase créée
#   3. Fichier .env.production.local avec les variables (voir .env.production.example)

param(
    [switch]$SkipDb,
    [switch]$SkipEnv
)

$ErrorActionPreference = "Stop"
$ProjectRoot = Split-Path -Parent $PSScriptRoot
Set-Location $ProjectRoot

function Write-Step($msg) {
    Write-Host ""
    Write-Host $msg -ForegroundColor Cyan
}

function Load-ProductionEnv {
    $envFile = ".env.production.local"
    if (-not (Test-Path $envFile)) {
        Write-Host "ERREUR: $envFile introuvable." -ForegroundColor Red
        Write-Host "Copiez .env.production.example vers .env.production.local et remplissez les valeurs." -ForegroundColor Yellow
        exit 1
    }

    Get-Content $envFile | ForEach-Object {
        if ($_ -match '^\s*#' -or $_ -match '^\s*$') { return }
        if ($_ -match '^([^=]+)=(.*)$') {
            $key = $matches[1].Trim()
            $value = $matches[2].Trim().Trim('"').Trim("'")
            Set-Item -Path "env:$key" -Value $value
        }
    }
}

function Add-VercelEnv($name, $value, $env = "production") {
    if ([string]::IsNullOrWhiteSpace($value)) {
        Write-Host "  SKIP $name (vide)" -ForegroundColor DarkYellow
        return
    }
    Write-Host "  + $name" -ForegroundColor Gray
    $value | vercel env add $name $env --force 2>&1 | Out-Null
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  KDIGIT — Deploiement Vercel" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

# 1. Vercel login
Write-Step "[1/6] Verification connexion Vercel..."
try {
    vercel whoami 2>&1 | Out-Null
    if ($LASTEXITCODE -ne 0) { throw "not logged in" }
    $user = vercel whoami 2>&1
    Write-Host "  Connecte: $user" -ForegroundColor Green
} catch {
    Write-Host "  Connexion requise. Suivez les instructions dans le navigateur..." -ForegroundColor Yellow
    vercel login
    if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
}

# 2. Lier le projet
Write-Step "[2/6] Liaison projet Vercel..."
if (-not (Test-Path ".vercel\project.json")) {
    vercel link --yes
    if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
}
Write-Host "  Projet lie" -ForegroundColor Green

# 3. Charger les variables
Write-Step "[3/6] Variables d'environnement..."
if (-not $SkipEnv) {
    Load-ProductionEnv

    if (-not $env:JWT_SECRET -or $env:JWT_SECRET -like "*GENERER*") {
        $env:JWT_SECRET = node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
        Write-Host "  JWT_SECRET genere automatiquement" -ForegroundColor Yellow
    }

    $vars = @{
        DATABASE_URL = $env:DATABASE_URL
        DIRECT_URL = if ($env:DIRECT_URL) { $env:DIRECT_URL } else { $env:DATABASE_URL }
        JWT_SECRET = $env:JWT_SECRET
        SMTP_HOST = $env:SMTP_HOST
        SMTP_PORT = $env:SMTP_PORT
        SMTP_USER = $env:SMTP_USER
        SMTP_PASS = $env:SMTP_PASS
        SMTP_FROM = $env:SMTP_FROM
        ADMIN_EMAIL = $env:ADMIN_EMAIL
        NEXT_PUBLIC_SITE_URL = $env:NEXT_PUBLIC_SITE_URL
        NEXT_PUBLIC_WHATSAPP_NUMBER = $env:NEXT_PUBLIC_WHATSAPP_NUMBER
        CONTACT_RATE_LIMIT_PER_HOUR = $env:CONTACT_RATE_LIMIT_PER_HOUR
        NODE_ENV = "production"
    }

    foreach ($target in @("production", "preview")) {
        Write-Host "  Environnement: $target" -ForegroundColor Yellow
        foreach ($entry in $vars.GetEnumerator()) {
            Add-VercelEnv $entry.Key $entry.Value $target
        }
    }
    Write-Host "  Variables configurees" -ForegroundColor Green
} else {
    Write-Host "  Variables ignorees (--SkipEnv)" -ForegroundColor DarkYellow
}

# 4. Base de données
if (-not $SkipDb) {
    Write-Step "[4/6] Initialisation base PostgreSQL..."
    if (-not $env:DATABASE_URL) { Load-ProductionEnv }
    if ($env:DATABASE_URL -like "*USER:PASSWORD*" -or $env:DATABASE_URL -like "*localhost*") {
        Write-Host "  ERREUR: DATABASE_URL de production invalide dans .env.production.local" -ForegroundColor Red
        Write-Host "  Creez une base sur https://neon.tech puis copiez la connection string." -ForegroundColor Yellow
        exit 1
    }
    & "$PSScriptRoot\setup-production-db.ps1"
} else {
    Write-Step "[4/6] Base ignoree (--SkipDb)"
}

# 5. Build local (verification)
Write-Step "[5/6] Verification build..."
npm run build
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
Write-Host "  Build OK" -ForegroundColor Green

# 6. Deploiement production
Write-Step "[6/6] Deploiement production..."
vercel deploy --prod --yes
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "  Deploiement termine !" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Verifications:" -ForegroundColor Cyan
Write-Host "  - Site public: $env:NEXT_PUBLIC_SITE_URL" -ForegroundColor White
Write-Host "  - Admin: $env:NEXT_PUBLIC_SITE_URL/admin" -ForegroundColor White
Write-Host "  - Login: admin@kdigit.com / admin123" -ForegroundColor White
Write-Host ""
