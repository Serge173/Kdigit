# KDIGIT — Initialise la base PostgreSQL de production (schéma + données)
# Usage : .\scripts\setup-production-db.ps1
# Prérequis : DATABASE_URL défini (Neon/Supabase avec ?sslmode=require)

$ErrorActionPreference = "Stop"
$ProjectRoot = Split-Path -Parent $PSScriptRoot
Set-Location $ProjectRoot

if (-not $env:DATABASE_URL) {
    if ($env:DATABASE_POSTGRES_URL_NON_POOLING) {
        $env:DATABASE_URL = $env:DATABASE_POSTGRES_URL_NON_POOLING
    }
}
    Write-Host "ERREUR: DATABASE_URL non defini." -ForegroundColor Red
    Write-Host "Exemple:" -ForegroundColor Yellow
    Write-Host '  $env:DATABASE_URL="postgresql://user:pass@host/db?sslmode=require"' -ForegroundColor White
    Write-Host "  .\scripts\setup-production-db.ps1" -ForegroundColor White
    exit 1
}

Write-Host ""
Write-Host "KDIGIT — Configuration base de production" -ForegroundColor Cyan
Write-Host ""

Write-Host "[1/2] Synchronisation du schema Prisma..." -ForegroundColor Yellow
npx prisma db push
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
Write-Host "  Schema OK" -ForegroundColor Green

Write-Host "[2/2] Insertion des donnees initiales (seed)..." -ForegroundColor Yellow
npm run db:seed
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
Write-Host "  Seed OK" -ForegroundColor Green

Write-Host ""
Write-Host "Base de production prete." -ForegroundColor Green
Write-Host "Admin: admin@kdigit.com / admin123" -ForegroundColor Cyan
Write-Host "Changez le mot de passe admin apres le premier acces." -ForegroundColor Yellow
Write-Host ""
