#!/bin/bash
# =============================================================================
# deploy-tenant.sh - Deploy de website para tenant de Miancho SaaS
#
# Uso: ./deploy-tenant.sh <tenant_id> <domain> <config_json_path>
# Ejemplo: ./deploy-tenant.sh cliente1 cliente1.miancho.com /tmp/config.json
#
# Este script:
# 1. Clona el template desde GitHub (o actualiza si existe)
# 2. Copia el tenant.config.json con los datos del cliente
# 3. Hace build del sitio estático
# 4. Configura Caddy para servir el sitio
# 5. Recarga Caddy para aplicar cambios
# =============================================================================

set -e  # Exit on error

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuración
TEMPLATE_REPO="https://github.com/miancho/tenant-template-medico.git"
BASE_PATH="/opt/miancho/tenants"
CADDY_SITES="/opt/miancho/caddy/sites"
CADDY_CONTAINER="caddy"

# Argumentos
TENANT_ID=$1
DOMAIN=$2
CONFIG_PATH=$3

# Validar argumentos
if [ -z "$TENANT_ID" ] || [ -z "$DOMAIN" ]; then
    echo -e "${RED}Error: Faltan argumentos${NC}"
    echo "Uso: $0 <tenant_id> <domain> [config_json_path]"
    exit 1
fi

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  Deploy Tenant Website - Miancho SaaS ${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo "Tenant ID: $TENANT_ID"
echo "Domain: $DOMAIN"
echo ""

# 1. Crear directorio
echo -e "${YELLOW}[1/6] Creando directorio para $DOMAIN...${NC}"
mkdir -p $BASE_PATH/$DOMAIN
cd $BASE_PATH/$DOMAIN

# 2. Clonar o actualizar template
echo -e "${YELLOW}[2/6] Configurando template...${NC}"
if [ -d ".git" ]; then
    echo "  → Actualizando repositorio existente..."
    git fetch origin
    git reset --hard origin/main
else
    echo "  → Clonando template desde GitHub..."
    git clone $TEMPLATE_REPO .
fi

# 3. Copiar configuración del tenant
echo -e "${YELLOW}[3/6] Aplicando configuración del tenant...${NC}"
if [ -n "$CONFIG_PATH" ] && [ -f "$CONFIG_PATH" ]; then
    echo "  → Copiando config desde $CONFIG_PATH"
    cp "$CONFIG_PATH" tenant.config.json
else
    echo "  → Usando configuración por defecto (editar tenant.config.json)"
fi

# 4. Instalar dependencias y build
echo -e "${YELLOW}[4/6] Build del sitio...${NC}"
echo "  → Instalando dependencias..."
pnpm install --frozen-lockfile 2>/dev/null || pnpm install

echo "  → Generando build estático..."
pnpm build

# Verificar que se generó el output
if [ ! -d "out" ]; then
    echo -e "${RED}Error: No se generó el directorio 'out'${NC}"
    exit 1
fi

echo "  → Build completado: $(ls -la out | wc -l) archivos generados"

# 5. Configurar Caddy
echo -e "${YELLOW}[5/6] Configurando Caddy...${NC}"
mkdir -p $CADDY_SITES

cat > $CADDY_SITES/$TENANT_ID.caddy << EOF
# Configuración generada automáticamente para $TENANT_ID
# Fecha: $(date -Iseconds)

$DOMAIN {
    root * $BASE_PATH/$DOMAIN/out
    file_server
    encode gzip

    # SPA fallback para rutas
    try_files {path} {path}.html {path}/ /404.html

    # Headers de seguridad
    header {
        X-Tenant-ID "$TENANT_ID"
        X-Frame-Options "SAMEORIGIN"
        X-Content-Type-Options "nosniff"
        X-XSS-Protection "1; mode=block"
        Referrer-Policy "strict-origin-when-cross-origin"
    }

    # Cache para assets estáticos
    @static {
        path *.css *.js *.ico *.gif *.jpg *.jpeg *.png *.svg *.woff *.woff2
    }
    header @static Cache-Control "public, max-age=31536000, immutable"

    # Logs
    log {
        output file /var/log/caddy/$TENANT_ID.log
        format json
    }
}
EOF

echo "  → Archivo Caddy creado: $CADDY_SITES/$TENANT_ID.caddy"

# 6. Recargar Caddy
echo -e "${YELLOW}[6/6] Recargando Caddy...${NC}"

# Verificar si Caddy corre en Docker
if docker ps --format '{{.Names}}' | grep -q "^${CADDY_CONTAINER}$"; then
    echo "  → Recargando Caddy en Docker..."
    docker exec $CADDY_CONTAINER caddy reload --config /etc/caddy/Caddyfile
else
    echo "  → Recargando Caddy local..."
    sudo systemctl reload caddy || caddy reload
fi

# Resultado
echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  ✅ Deploy completado exitosamente!   ${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo "URL: https://$DOMAIN"
echo "Tenant ID: $TENANT_ID"
echo "Path: $BASE_PATH/$DOMAIN"
echo "Caddy config: $CADDY_SITES/$TENANT_ID.caddy"
echo ""
echo "Nota: Asegurate de que el DNS apunte a este servidor."
