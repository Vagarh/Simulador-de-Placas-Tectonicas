#!/bin/bash

# Script para iniciar el Simulador de Placas Tectónicas

echo "🌍 Iniciando Simulador de Placas Tectónicas..."
echo ""

cd web

echo "📡 Iniciando servidor en http://localhost:8000"
echo "🛑 Presiona Ctrl+C para detener"
echo ""

# Intentar con Python 3
if command -v python3 &> /dev/null; then
    python3 -m http.server 8000
# Intentar con Python 2
elif command -v python &> /dev/null; then
    python -m http.server 8000
# Intentar con Node.js
elif command -v npx &> /dev/null; then
    npx http-server -p 8000
else
    echo "❌ Error: No se encontró Python ni Node.js"
    echo "Por favor instala Python 3 o Node.js para continuar"
    exit 1
fi
