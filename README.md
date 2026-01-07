# Tenant Template Médico - Miancho SaaS

Template Next.js para consultorios médicos y profesionales de la salud.

## Características

- **Static Export**: Optimizado para servir con Caddy/Nginx
- **Configurable**: Todo personalizable desde `tenant.config.json`
- **Responsive**: Diseño adaptable a todos los dispositivos
- **SEO Ready**: Metadata configurable por tenant
- **WhatsApp Integration**: Botón flotante y CTAs integrados
- **Formulario de contacto**: Envía a webhook de n8n

## Estructura

```
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── sections/       # Hero, Servicios, FAQ, etc.
│   │   ├── shared/         # WhatsAppButton, etc.
│   │   └── ui/             # Button, Accordion, etc.
│   ├── config/
│   │   └── site.ts         # Lee tenant.config.json
│   └── lib/
│       └── utils.ts
├── public/
│   └── images/
├── tenant.config.json      # ← CONFIGURACIÓN DEL TENANT
└── next.config.js          # output: 'export'
```

## Uso

### 1. Personalizar configuración

Editar `tenant.config.json` con los datos del cliente:

- Información del negocio
- Colores y branding
- Secciones activas y contenido
- SEO y metadata

### 2. Agregar imágenes

Colocar imágenes en `public/images/`:

- `logo.png` - Logo del negocio
- `hero.jpg` - Imagen principal
- `doctor.jpg` - Foto del profesional
- `servicios/*.jpg` - Imágenes de servicios

### 3. Build

```bash
pnpm install
pnpm build
```

El resultado estará en `/out` listo para servir.

### 4. Deploy

Copiar contenido de `/out` al servidor:

```bash
# En el VPS
cp -r out/* /var/www/tenants/cliente.miancho.com/
```

## Configuración de Caddy

```caddyfile
cliente.miancho.com {
    root * /var/www/tenants/cliente.miancho.com
    file_server
    encode gzip
    try_files {path} {path}.html {path}/ /404.html
}
```

## Secciones Disponibles

| Sección | Descripción |
|---------|-------------|
| Header | Navegación fija con logo y menú |
| Hero | Banner principal con CTA |
| Servicios | Grid de tratamientos |
| SobreMi | Biografía y credenciales |
| Testimonios | Reseñas de pacientes |
| FAQ | Preguntas frecuentes (accordion) |
| Contacto | Info + formulario |
| Footer | Links y redes sociales |

Cada sección puede activarse/desactivarse desde `tenant.config.json`.

## Licencia

Uso interno - Miancho SaaS
