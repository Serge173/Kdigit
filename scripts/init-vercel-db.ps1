# Initialise la BDD Neon connectée via Vercel Storage
# Usage :
#   vercel env pull .env.vercel.local
#   .\scripts\init-vercel-db.ps1

$ErrorActionPreference = "Stop"
$ProjectRoot = Split-Path -Parent $PSScriptRoot
Set-Location $ProjectRoot

$envFile = ".env.vercel.local"
if (-not (Test-Path $envFile)) {
    Write-Host "Telechargez les variables Vercel d'abord :" -ForegroundColor Yellow
    Write-Host "  vercel login" -ForegroundColor White
    Write-Host "  vercel link" -ForegroundColor White
    Write-Host "  vercel env pull .env.vercel.local" -ForegroundColor White
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

if ($env:DATABASE_POSTGRES_URL_NON_POOLING) {
    $env:DATABASE_URL = $env:DATABASE_POSTGRES_URL_NON_POOLING
}

& "$PSScriptRoot\setup-production-db.ps1"
