# beway-front

Proyecto visual de BeWay en Next.js (App Router) + Tailwind v4: solo estilo, páginas y arte, con datos de ejemplo.
Sirve como "Figma navegable" y se mueve al repo real cuando esté listo.

## Crearlo desde cero en tu computadora

```bash
unzip beway-front-starter.zip && cd beway-front
npm install
npm run dev          # http://localhost:3000
```

Páginas: `/` (inicio), `/companies` y `/companies/[slug]` (directorio y ficha), `/u/[username]` (perfil), `/signup` (registro),
`/talent/dashboard` (espacio Talent, demo), `/admin/dashboard` (Admin CLH, demo), `/styleguide` (todos los componentes). Arquitectura, mapa de rutas y plan por
bloques en [`docs/frontend/`](docs/frontend/README.md).
El botón de la luna en la barra alterna tema claro y oscuro.

## Estructura

| Ruta | Qué es |
|---|---|
| `design-system/` | Design system: `tokens.css`, `bundle.css`, `theme.css` (Tailwind), componentes en `src/`, tipos en `index.d.ts`. **No se edita aquí**: los cambios se hacen en el design system y se reemplaza esta carpeta. |
| `app/` | Rutas. `(public)`, `(shared)`, `(auth)`, `talent/`, `admin/`: un layout por espacio; `(shared)` es para pantallas que ven visitantes y miembros con la misma URL. Solo pantallas. |
| `components/` | Piezas del sitio que no son del design system: cabecera, pie, tema, `NavButton`, `PageState` y `shells/`. |
| `lib/` | `routes.ts` (navegación por espacio) y `session.ts` (sesión simulada). |
| `docs/frontend/` | Arquitectura, rutas, roadmap, modelos, necesidades de backend y decisiones. |
| `data/mock.ts` | Datos falsos. Se reemplazan por la API real; las pantallas no cambian. |
| `public/assets/` | Logos de marca. |
| `scripts/mk_theme.py` | Regenera `theme.css` desde `tokens.json`. |
| `CLAUDE.md` | Reglas para Claude Code al construir pantallas aquí. |

## Tailwind + design system

Los componentes se usan tal cual (`import { Button, CompanyCard } from '@ds'`) y Tailwind se usa para el layout.
`theme.css` conecta los tokens con Tailwind, así que las clases cambian solas con el tema oscuro:

| Qué | Clases |
|---|---|
| Fondos | `bg-surface-page`, `bg-surface-card`, `bg-surface-sunken`, `bg-surface-inverse`, `bg-surface-accent-subtle`, `bg-action-primary`, `bg-action-secondary`, `bg-brand-gradient` |
| Texto | `text-fg-body`, `text-fg-heading`, `text-fg-muted`, `text-fg-accent`, `text-fg-on-inverse`, `text-status-danger-text` |
| Bordes | `border-line-subtle`, `border-line-strong`, `border-line-control` |
| Radios | `rounded-control` (8px), `rounded-card` (16px), `rounded-panel` (24px), `rounded-full` (solo Tag) |
| Sombras | `shadow-card`, `shadow-raised`, `shadow-overlay` |
| Tipografía | `text-display`, `text-h1`, `text-h2`, `text-h3`, `font-heading`, `tracking-eyebrow` |
| Ancho | `max-w-site` (1200px), `max-w-narrow` (960px) |

`theme.css` vacía la paleta, los radios y las sombras por defecto de Tailwind (`--color-*: initial`, etc.), así que `bg-blue-500` o `rounded-lg` ya no existen. Es a propósito: obliga a usar el sistema.

## Dos reglas de Next

1. Los componentes del design system son componentes de cliente (`'use client'` ya está puesto). En páginas de servidor no se les pueden pasar `onClick`; usa `NavButton` o convierte la página en componente de cliente.
2. Los íconos vienen del paquete `lucide@0.469.0` (versión fija, la del design system). No lo actualices sin revisar el design system.

## Cuando cambie el design system

Reemplaza `design-system/tokens.css`, `tokens.json`, `bundle.css` y `src/`; si cambiaron tokens, corre:

```bash
python3 scripts/mk_theme.py design-system/tokens.json design-system/theme.css
```
