# Cambios en el design system (`design-system/`)

Registro de cada cambio hecho en `design-system/` durante las correcciones visuales. Autorización: decisión **D1**
(2026-11-05), con la condición del usuario: "siempre que quede registro y ordenado".

Motivo general: la referencia de los fundadores (D2) sustituye el acento cian por navy y teal, y pide medidas
que el DS no tiene. Los componentes del DS usan estilos en línea, así que los cambios van al DS y a sus tokens,
no a overrides en `components/`.

Si el DS se reemplaza al actualizar su origen (`docs/frontend/DS_REQUESTS.md`), reaplicar esta lista.

## 1 · Tokens (`tokens.json` → `tokens.css`, `theme.css` regenerado)

Fuente: `design-system/tokens.json`. Sincronización a mano en `tokens.css` (no hay generador de variables).
`theme.css` se regenera con `python scripts/mk_theme.py design-system/tokens.json design-system/theme.css`.

| Token | Antes | Después | Motivo |
|---|---|---|---|
| `brand-dark` | `#0B132B` | `#0B172C` | Navy de la referencia (01 A2). |
| `brand-light` | `#F8FAFC` | `#F5F7F9` | Paper de la referencia, fondo de página. |
| `brand-gray-100` | `#E2E8F0` | `#E4E9EE` | Línea de la referencia. |
| `brand-ink` (nuevo) | — | `#14223A` | Texto principal de la referencia (ink). |
| `accent-teal` (nuevo) | — | `#04B8B6` (oscuro igual) | Teal de progreso y marcas decorativas. Nunca texto sobre claro. |
| `accent-teal-strong` (nuevo) | — | `#037A78` (oscuro `#5EE0DE`) | Teal para texto, iconos, línea activa y foco. 5,2:1 sobre blanco. |
| `accent-teal-subtle` (nuevo) | — | `#E7F6F5` (oscuro `rgba(4,184,182,.14)`) | Fondo de estado activo (teal claro de la referencia). |
| `text-on-teal` (nuevo) | — | `#072A35` | Texto del botón teal (6,1:1). |
| `border-accent-subtle` (nuevo) | — | `#BFE7E4` (oscuro `rgba(4,184,182,.35)`) | Borde del sello de acento. |
| `surface-sunken` | `#F1F5F9` | `#F6F8FA` | Buscador y celdas de métricas de la referencia. |
| `surface-accent-subtle` | `brand-cyan-100` (`#D6F6FF`) | `accent-teal-subtle` | Acento sin cian. |
| `surface-scrim` | `rgba(11,19,43,.62)` | `rgba(8,27,50,.42)` (oscuro igual) | Backdrop de la referencia (01 A9). |
| `text-body` | navy `#0B132B` | `brand-ink` `#14223A` (oscuro igual) | Texto principal de la referencia. |
| `text-heading` | navy `#0B132B` | `brand-ink` `#14223A` | Titulares en el mismo texto principal. |
| `text-muted` | `#566377` | `#5F6B7D` (oscuro `#B3BDCC`) | **D3:** la referencia (`#788496`) da 3,8:1 sobre blanco. Este da 5,4:1. |
| `text-accent` | `brand-cyan-700` | `accent-teal-strong` (oscuro `#5EE0DE`) | Teal de texto con contraste, sin cian. |
| `text-on-accent` | navy `#0B132B` | blanco; oscuro navy `#0B172C` | Texto sobre el primario navy (blanco) y sobre el teal claro en oscuro. |
| `border-subtle` | `brand-gray-100` (antiguo) | `#E4E9EE` | Hairline de la referencia. |
| `border-accent` | `brand-cyan` | `accent-teal-strong` (oscuro `accent-teal`) | Línea activa de navegación, 2 px. |
| `action-primary` | `brand-cyan` `#00D4FF` | navy `#0B172C` (oscuro `#F5F7F9`) | **D2:** primario navy, con texto blanco. En oscuro se invierte para seguir visible. |
| `action-primary-hover` | cyan-300 | `#183552` (oscuro `#FFFFFF`) | Hover de la referencia (01 A5). |
| `action-primary-active` | cyan-600 | `#0B172C` (oscuro `#DDE3EA`) | Pulsado del primario. |
| `action-secondary` | navy | navy (sin cambio; oscuro `brand-navy-600`) | Marcas navy: Tag seleccionado, página actual, Badge navy. El botón secundario ya no usa este token. |
| `focus-ring` | `brand-cyan-700` | `accent-teal-strong` (oscuro `accent-teal`) | Foco visible sin cian. |
| `focus-ring-on-inverse` | `brand-cyan` | `accent-teal` | Foco sobre navy. |
| `link` / `link-on-inverse` | cyan | `accent-teal-strong` / `accent-teal` | Enlaces sin cian. |
| `link-hover` | navy | navy (oscuro blanco) | Hover de enlaces. |
| `status-info` | `brand-cyan-600` | `accent-teal-strong` (oscuro `#5EE0DE`) | Información sin cian. |
| `border-control` | `brand-gray-500` `#7B8BA1` | sin cambio (oscuro `brand-gray`) | **D3:** la referencia usa `#E0E6EC` (1,26:1). Se mantiene `#7B8BA1` (3,47:1). |
| `radius-md` | `8px` | `7px` | Botones, campos, badges (01 A5, A7). |
| `radius-lg` | `16px` | `13px` | Tarjetas genéricas (01 A6). |
| `radius-dialog` (nuevo) | — | `14px` | Modal (01 A9). |
| `radius-directory` (nuevo) | — | `12px` | Tarjetas del directorio (01 A6). Pendiente de uso en fase 02. |
| `radius-search` (nuevo) | — | `8px` | Buscador de cabecera (01 C.3). |
| `blur-panel` | `blur(12px)` | `blur(5px)` | Blur del backdrop de modal (01 A9). |
| `shadow-sm` (claro) | `0 2px 6px rgba(11,19,43,.08)` | `0 2px 5px rgba(16,42,60,.012)` | Sombra de tarjeta de la referencia (01 A6). |
| `shadow-glow` | cian con halo | `none` | Sin brillo: la referencia no lo usa. Los usos quedan sin efecto. |
| `ring-focus` | cian `rgba(0,212,255,.40)` | teal `rgba(3,122,120,.35)` (oscuro teal `.45`) | Foco sin cian. |
| `font-display` | Space Grotesk | Manrope (`var(--font-manrope)`) | Titulares (01 A1). Cargada con `next/font`. |
| `font-body` | Inter | DM Sans (`var(--font-dm-sans)`) | Interfaz y cuerpo (01 A1). Cargada con `next/font`. |
| `text-h1` | 32px / 1.15 / 700 / −0.01em | `clamp(31px, 3vw, 43px)` / 1.17 / 700 / −0.05em | H1 general (01 A4). Móvil 29 px: pendiente en las páginas. |
| `text-h2` | 24px / 1.2 | 26px / 1.25 / −0.035em | H2 (01 A4). |
| `text-h3` | 20px / 1.3 | 18px / 1.35 / −0.025em | H3 (01 A4). |
| `tracking-h1/h2/h3` (nuevos) | — | −0.05em / −0.035em / −0.025em | Tracking por nivel (01 A4). `mk_theme.py` genera las reglas base. |
| `control-height-sm` | 32px | 34px | Botón pequeño (01 A5). |
| `control-height-md` | 40px | 42px | Botón (01 A5). |
| `container-lg` | 1200px | 1510px | Contenedor general (01 A3). |
| `border-width-accent` | 3px | 2px | Línea de acento de 2 px (01 C.3). |
| `text-control-size` (nuevo) | — | 12px | Texto de botón y control (01 A5). |
| `text-control-sm-size` (nuevo) | — | 11px | Texto de botón pequeño y navegación (01 A5, A10). |

## 2 · Componentes (`design-system/src/`)

| Archivo | Cambio | Motivo |
|---|---|---|
| `Button.jsx` | Medidas: md 42 px, pad 10 px 17 px, 12 px / 650, icono 16; sm 34 px y 11 px. Secundario: superficie blanca con borde `border-control` (antes navy). Hover del primario: `translateY(-1px)`, sin brillo. Hover del secundario: `surface-sunken`. Sin glow. | 01 A5 y D2. |
| `IconButton.jsx` | Quitado el brillo del hover del botón sólido. | Sin brillo (01 A5). |
| `NavBar.jsx` | Reescrito en **dos filas**: fila 1 (`barHeight`, 83 por defecto) con logo, buscador (máx. 515 px, radio 8 px) y acciones; fila 2 (`navHeight`, 57) con `links` a la izquierda y `endLinks` a la derecha. Quitado `tone` navy. Clases `barClassName`, `navClassName`, `searchClassName`. | 01 C.1–C.3. |
| `Dialog.jsx` | Radio 14 px (`radius-dialog`); ancho `calc(100% − 38px)`, `max-height 90dvh`; cabecera 18 px 26 px con borde; cuerpo 30 px; pie 18 px 26 px con borde. Foco, Escape y scrim sin cambios. | 01 A9 y D. |
| `Footer.jsx` | Pie **claro**: fondo `surface-card`, borde superior. Prop `tagline` (vacía hasta tener el copy, D9). Quitado el fondo inverso. | Ficha 40 y D9. |
| `Badge.jsx` | Borde del acento: `border-accent-subtle` (antes cian literal). | Sin cian literal. |
| `SectionLabel.jsx` | Barra: `accent-teal` (antes cian directo). | Sin cian. |
| `Tabs.jsx` | Línea activa: `border-accent`. | Sin cian. |
| `Checkbox.jsx` | Marcado: `action-primary` (navy). | Primario navy (D2). |
| `Alert.jsx`, `Toast.jsx` | Variante info: `status-info`. | Sin cian. |
| `Stat.jsx` | Icono sobre oscuro: `accent-teal`. | Sin cian. |
| `StepNav.jsx` | Pasos completados y línea: `accent-teal` / `border-accent`; activo: `accent-teal-subtle` (sin rgba literal). | Sin cian ni literales. |
| `design-system/index.d.ts` | Tipos de `NavBarProps` (`endLinks`, `barHeight`, `navHeight`, clases) y `FooterProps` (`tagline`). | El tipo se escribe a mano y debe seguir al componente. |

**Pendiente en el DS (no se toca en la fase 01):** `Card.jsx` y `CompanyCard.jsx` siguen con `radius-lg` (13 px)
en la tarjeta de empresa; la fase 02 pasa la tarjeta del directorio a `radius-directory` (12 px). `Tag.jsx` y
`Pagination.jsx` no cambian: el primario de filtro es navy por el token.

## 3 · Aplicación (fuera de `design-system/`)

Cambios de código de la aplicación que dependen de los tokens o del DS:

- `app/layout.tsx`: fuentes con `next/font/google` (DM Sans y Manrope). Se quita el enlace a Google Fonts.
- `lib/routes.ts`: menú de talento en el orden de la referencia; `side` por ítem; "Credenciales" fuera de la cabecera.
- `components/shells/AppHeader.tsx`: dos filas; con sesión muestra campana y avatar (menú personal).
- `components/shells/AccountMenus.tsx` (nuevo): ventanas centradas de notificaciones y de menú personal (ficha 06).
- `components/shells/ShellNav.tsx`: texto 12 px / 550; activo 750 con borde inferior teal de 2 px.
- `components/shells/DemoBar.tsx`: banda de 28 px.
- `data/fixtures/notifications.ts` y `lib/services/notifications.ts` (nuevos): notificaciones **ficticias**, marcadas como ejemplo.
- `app/(public)/page.tsx`: eyebrow del hero en `link-on-inverse` (antes cian).
- `CLAUDE.md`: reglas de acento (D2) y política de `design-system/` (D1).

## 4 · Contraste reportado a los fundadores (D3)

Valores de la referencia que no cumplen `CLAUDE.md` (4,5:1 texto; 3:1 control y marcas), y el valor usado:

| Uso | Referencia | Usado | Razón |
|---|---|---|---|
| Texto secundario (`muted`) | `#788496` · 3,8:1 | `#5F6B7D` · 5,4:1 | Texto. |
| Teal como texto o icono | `#04B8B6` · 2,5:1 | `#037A78` · 5,2:1 | Texto e iconos. El `#04B8B6` queda para relleno de progreso. |
| Borde de campo y control | `#E0E6EC` · 1,3:1 | `#7B8BA1` · 3,5:1 | Control. |
| Borde de botón secundario | `#DFE5EA` · 1,3:1 | `border-control` · 3,5:1 | Control identificable. |
| Línea de navegación activa | `#04B8B6` · 2,5:1 | `#037A78` · 5,2:1 | Marca de estado. |

Pendiente de decisión de los fundadores: si quieren la fidelidad exacta a costa de estos contrastes.
