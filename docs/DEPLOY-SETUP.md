# Setup del Sistema de Deploy - Miancho SaaS

Este documento explica cómo configurar el sistema de deploy automático de websites para tenants.

## Arquitectura

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│    Dashboard    │────▶│      n8n        │────▶│      VPS        │
│  (Mi Web UI)    │     │  (Workflow)     │     │  (Caddy+Sites)  │
└─────────────────┘     └─────────────────┘     └─────────────────┘
                               │
                               ▼
                        ┌─────────────────┐
                        │   Cloudflare    │
                        │     (DNS)       │
                        └─────────────────┘
```

## Requisitos en el VPS

### 1. Estructura de directorios

```bash
# Crear estructura base
sudo mkdir -p /opt/miancho/{tenants,caddy/sites,scripts}
sudo chown -R $USER:$USER /opt/miancho
```

### 2. Instalar dependencias

```bash
# Node.js y pnpm
curl -fsSL https://get.pnpm.io/install.sh | sh -
source ~/.bashrc

# Git
sudo apt install git -y
```

### 3. Copiar script de deploy

```bash
# Copiar el script
cp scripts/deploy-tenant.sh /opt/miancho/scripts/
chmod +x /opt/miancho/scripts/deploy-tenant.sh
```

### 4. Configurar Caddy

El Caddyfile principal debe incluir los sites de tenants:

```caddyfile
# /etc/caddy/Caddyfile o /opt/miancho/caddy/Caddyfile

# Importar todos los sites de tenants
import /opt/miancho/caddy/sites/*.caddy

# Configuración global
{
    email admin@miancho.com
}
```

Si usás Docker para Caddy, montar los volúmenes:

```yaml
# docker-compose.yml
services:
  caddy:
    image: caddy:2-alpine
    container_name: caddy
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - /opt/miancho/caddy/Caddyfile:/etc/caddy/Caddyfile
      - /opt/miancho/caddy/sites:/etc/caddy/sites
      - /opt/miancho/tenants:/var/www/tenants
      - caddy_data:/data
      - caddy_config:/config
      - /var/log/caddy:/var/log/caddy

volumes:
  caddy_data:
  caddy_config:
```

---

## Configuración de n8n

### 1. Importar el workflow

1. Ir a n8n → Workflows → Import from File
2. Seleccionar `n8n-workflow-deploy.json`
3. Ajustar las credenciales

### 2. Configurar credenciales

#### SSH (para conectar al VPS)

- Tipo: SSH Password o SSH Key
- Host: IP del VPS
- Puerto: 22
- Usuario: tu usuario con permisos sudo
- Password o Private Key

#### Cloudflare API

- Tipo: Header Auth
- Header Name: `Authorization`
- Header Value: `Bearer TU_CLOUDFLARE_API_TOKEN`

### 3. Variables de entorno

Configurar en n8n Settings → Variables:

| Variable | Valor | Descripción |
|----------|-------|-------------|
| `VPS_IP` | `xxx.xxx.xxx.xxx` | IP pública del VPS |
| `CLOUDFLARE_ZONE_ID` | `abc123...` | Zone ID del dominio en Cloudflare |

### 4. Activar el webhook

El workflow creará un webhook en:
```
https://n8n.controlplane.miancho.com/webhook/deploy-tenant-website
```

---

## Uso desde el Dashboard

### Payload del webhook

```json
{
  "tenant_id": "cliente1",
  "domain": "cliente1.miancho.com",
  "negocio": {
    "nombre": "Dr. Cliente",
    "especialidad": "Cirugía Plástica",
    "telefono": "+5491112345678",
    "whatsapp": "+5491112345678",
    "email": "contacto@cliente.com",
    "direccion": "Av. Corrientes 1234, CABA",
    "horarios": {
      "semana": "Lunes a Viernes 9:00 - 18:00",
      "sabado": "Sábados 9:00 - 13:00"
    }
  },
  "branding": {
    "colorPrimario": "#1e3a5f",
    "colorSecundario": "#d4a574",
    "colorAccento": "#2563eb"
  },
  "secciones": {
    "hero": {
      "activo": true,
      "titulo": "Tu título personalizado",
      "subtitulo": "Tu subtítulo",
      "imagen": "/images/hero.jpg"
    },
    "servicios": {
      "activo": true,
      "items": [...]
    }
  },
  "seo": {
    "titulo": "Dr. Cliente | Cirugía Plástica",
    "descripcion": "Descripción para SEO..."
  }
}
```

### Ejemplo con curl

```bash
curl -X POST \
  https://n8n.controlplane.miancho.com/webhook/deploy-tenant-website \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TU_API_KEY" \
  -d '{
    "tenant_id": "cliente1",
    "domain": "cliente1.miancho.com",
    "negocio": {
      "nombre": "Dr. Cliente",
      "especialidad": "Medicina Estética"
    }
  }'
```

### Respuesta exitosa

```json
{
  "success": true,
  "tenant_id": "cliente1",
  "domain": "cliente1.miancho.com",
  "url": "https://cliente1.miancho.com",
  "deployed_at": "2024-01-07T12:00:00.000Z",
  "message": "Website deployed successfully"
}
```

---

## Deploy Manual con Script

Si necesitás hacer un deploy manual:

```bash
# SSH al VPS
ssh usuario@vps

# Crear archivo de config temporal
cat > /tmp/tenant-config.json << 'EOF'
{
  "tenant_id": "cliente1",
  "negocio": { ... },
  "branding": { ... }
}
EOF

# Ejecutar deploy
/opt/miancho/scripts/deploy-tenant.sh cliente1 cliente1.miancho.com /tmp/tenant-config.json
```

---

## Troubleshooting

### El sitio no carga

1. Verificar que Caddy recargó: `docker logs caddy`
2. Verificar config: `cat /opt/miancho/caddy/sites/cliente1.caddy`
3. Verificar build: `ls -la /opt/miancho/tenants/cliente1.miancho.com/out`

### Error de DNS

1. Verificar en Cloudflare que el registro A existe
2. Esperar propagación (puede tardar hasta 5 min con proxy)
3. Verificar: `dig cliente1.miancho.com`

### Error de build

1. Verificar logs: `cd /opt/miancho/tenants/cliente1.miancho.com && pnpm build`
2. Verificar tenant.config.json es JSON válido
3. Verificar permisos del directorio

### Caddy no recarga

```bash
# Ver logs
docker logs caddy --tail 50

# Validar config
docker exec caddy caddy validate --config /etc/caddy/Caddyfile

# Forzar reload
docker exec caddy caddy reload --config /etc/caddy/Caddyfile --force
```
