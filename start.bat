@echo off
chcp 65001 >nul

echo 🌍 Iniciando Simulador de Placas Tectónicas...
echo.

cd web

echo 📡 Iniciando servidor en http://localhost:8000
echo 🛑 Presiona Ctrl+C para detener
echo.

:: Intentar con Python
python -m http.server 8000
if errorlevel 1 (
    echo ❌ Error: No se encontró Python
    echo Por favor instala Python 3 desde https://python.org
    pause
)
