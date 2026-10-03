@echo off
title CreatorAi - Spider-Sense Platform Launcher
color 0B

echo.
echo =======================================
echo   CreatorAi - Spider-Sense Platform
echo =======================================
echo.

echo [1/2] Starting Backend on http://localhost:8000 ...
start "CreatorAi Backend" cmd /k "cd /d %~dp0backend && uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload"

timeout /t 3 /nobreak >nul

echo [2/2] Starting Frontend on http://localhost:5173 ...
start "CreatorAi Frontend" cmd /k "cd /d %~dp0frontend && npm run dev"

timeout /t 4 /nobreak >nul

echo.
echo =======================================
echo   All servers started!
echo.
echo   Frontend  -^> http://localhost:5173
echo   Backend   -^> http://localhost:8000
echo   API Docs  -^> http://localhost:8000/docs
echo =======================================
echo.
pause
