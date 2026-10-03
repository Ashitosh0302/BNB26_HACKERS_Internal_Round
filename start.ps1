# CreatorAi - One-Click Startup Script (PowerShell)
# Starts backend (FastAPI) on port 8000 and frontend (Vite) on port 5173

$ROOT = Split-Path -Parent $MyInvocation.MyCommand.Definition
$BACKEND = Join-Path $ROOT "backend"
$FRONTEND = Join-Path $ROOT "frontend"

Write-Host ""
Write-Host "=======================================" -ForegroundColor Cyan
Write-Host "  CreatorAi - Spider-Sense Platform  " -ForegroundColor Cyan
Write-Host "=======================================" -ForegroundColor Cyan
Write-Host ""

# Start Backend
Write-Host "[1/2] Starting Backend (FastAPI) on http://localhost:8000 ..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$BACKEND'; uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload" -WindowStyle Normal

Start-Sleep -Seconds 2

# Start Frontend
Write-Host "[2/2] Starting Frontend (Vite) on http://localhost:5173 ..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$FRONTEND'; npm run dev" -WindowStyle Normal

Start-Sleep -Seconds 3

Write-Host ""
Write-Host "=======================================" -ForegroundColor Green
Write-Host "  All servers started!" -ForegroundColor Green
Write-Host ""
Write-Host "  Frontend  -> http://localhost:5173" -ForegroundColor White
Write-Host "  Backend   -> http://localhost:8000" -ForegroundColor White
Write-Host "  API Docs  -> http://localhost:8000/docs" -ForegroundColor White
Write-Host "=======================================" -ForegroundColor Green
Write-Host ""
