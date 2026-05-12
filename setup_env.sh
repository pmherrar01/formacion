#!/bin/bash

echo "🚀 Iniciando configuración del entorno para Laravel + React..."

# 1. Comprobar e instalar Homebrew
if ! command -v brew &> /dev/null
then
    echo "🍺 Homebrew no está instalado. Instalando..."
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
    
    # Añadir Homebrew al PATH dependiendo del procesador (Intel o Apple Silicon)
    if [[ $(uname -m) == 'arm64' ]]; then
        echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
        eval "$(/opt/homebrew/bin/brew shellenv)"
    fi
else
    echo "✅ Homebrew ya está instalado. Actualizando repositorios..."
    brew update
fi

# 2. Instalar PHP
echo "🐘 Comprobando PHP..."
brew list php &>/dev/null || brew install php

# 3. Instalar Composer (Gestor de dependencias de PHP)
echo "📦 Comprobando Composer..."
brew list composer &>/dev/null || brew install composer

# 4. Instalar Node.js y npm (Entorno para React)
echo "🟢 Comprobando Node.js..."
brew list node &>/dev/null || brew install node

# 5. Resumen de versiones
echo "----------------------------------------------------"
echo "🎉 ¡Instalación completada! Versiones instaladas:"
php -v | head -n 1
echo "Composer: $(composer -v | head -n 1)"
echo "Node: $(node -v)"
echo "npm: $(npm -v)"
echo "----------------------------------------------------"
echo "✅ Ya estás listo para empezar con DevTasker."