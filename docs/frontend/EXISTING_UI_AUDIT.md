# Auditoría del frontend existente

Estado del repo **antes** de los cambios del 2026-10-22. Lo cambiado después se lista al final.

## Stack y convenciones

| Elemento | Encontrado |
|---|---|
| Framework | Next.js 16.4.2 (App Router, Turbopack), React 19.3 |
| Estilos | Tailwind v4.3 vía `@tailwindcss/postcss`; `theme.css` vacía la paleta, radios y sombras por defecto |
| Lenguaje | TypeScript 5.9 estricto; alias `@ds` → `design-system/`, `@/*` → raíz |
| Iconos | `lucide@0.469.0` (fija) a través de `<Icon>` |
| Fuentes | Inter y Space Grotesk por `<link>` de Google Fonts (pendiente `next/font`, X-03) |
| Tema | `data-theme` en `<html>`, script anti-parpadeo en el layout, `ThemeToggle` con `localStorage` |
| Scripts | `dev`, `build`, `start`, `typecheck`. **Sin lint ni tests** |
| Git | La carpeta no es un repositorio git |
| Docs | `README.md`, `MIGRACION.md`, `CLAUDE.md`, `AGENTS.md`. `CLAUDE.md` cita `docs/brand-guide.md`, `docs/components/*.md` y `types/index.d.ts`, que **no existen** (X-05) |

## Rutas encontradas

| Ruta | Archivo | Estado | Problemas |
|---|---|---|---|
| `/` | `app/page.tsx` | Funciona | CTAs a `/registro` y `/empresas` (español); copy con cifras y "verificados" (OI-003); desborda en móvil (A-07) |
| `/empresas` | `app/empresas/` | Funciona | URL en español; `CompanyCard onView={() => {}}` no navega; filtros solo en estado local |
| `/programas` | `app/programas/` | Funciona, sin enlaces | Español; mezcla mentorías, retos y prácticas; "Ver programa" no hace nada |
| `/registro` | `app/registro/page.tsx` | Funciona | Confirmación engañosa "Perfil creado"; sin validación; mezcla alta Talent y Empresa |
| `/styleguide` | `app/styleguide/` | Funciona | Herramienta interna |
| 404, error, loading | — | **No existían** | |
| Talent, Admin, Company, Auth | — | **No existían** | |

Duplicadas: ninguna. Rotas: el CTA de `CompanyCard` y "Ver programa" (no navegan); "Iniciar sesión" del header llevaba a `/registro`;
los enlaces legales del pie no tienen destino.

## Design system (`design-system/`, solo lectura)

36 componentes, todos de cliente. Tipos en `design-system/index.d.ts`.

| Uso previsto | Componentes |
|---|---|
| Shells y navegación | `NavBar`, `Footer`, `Logo`, `Breadcrumbs`, `Tabs`, `Pagination`, `StepNav` |
| Acciones | `Button`, `IconButton`, `Tag`, `Badge` |
| Formularios | `Field`, `Input`, `Textarea`, `Select`, `Checkbox`, `Radio`, `RadioGroup`, `Switch` |
| Contenido | `Card`, `CompanyCard`, `FeatureCard`, `Photo`, `Avatar`, `Stat`, `StatStrip`, `Table`, `SectionLabel`, `LogoMarquee` |
| Feedback y estados | `Alert`, `Toast`, `Dialog`, `Tooltip`, `EmptyState`, `Skeleton` |

### Reutilización prevista por pantalla

| Pantalla | Componentes |
|---|---|
| Signup / onboarding | `StepNav` (pensado para "Pre-Registro, Live CV"), `Field`, `Input`, `RadioGroup`, `Checkbox`, `Alert` |
| Perfil público | `Avatar`, `Badge`, `Tag`, `Card`, `SectionLabel`, `PageState private` |
| Editor de perfil | `StepNav` con `onSelect`, `Field`, `Textarea`, `Select`, `Switch`, `Toast` |
| Settings | `Switch`, `RadioGroup`, `Dialog` para confirmar |
| Ficha de empresa | `Photo overlay="hero"`, `Breadcrumbs`, `Tabs` o secciones, `Stat`, `Alert warning` (desactualizada), `Badge` |
| Encuestas | `Tabs`, `Card`, `Badge`, `StepNav`, `RadioGroup`, `Checkbox`, `Textarea`, `Dialog`, `Alert` |
| Cursos y credenciales | `Card`, `Tag variant="filter"`, `Badge`, `EmptyState` |
| Admin | `Table`, `Badge`, `Tabs`, `Dialog`, `Input`, `Select`, `Toast` |

### Defectos detectados en el DS (petición, X-04)

- `Button` `outline`: mezcla `border` y `borderColor` entre reposo y hover. En desarrollo React avisa *"Removing a style
  property during rerender (borderColor) when a conflicting property is set (border)"* y el borde puede quedarse con
  el color del texto tras el hover. Se arregla en el DS (detalle en ROADMAP, X-04).
- `Radio` / `RadioGroup`: sin `input` nativo ni roles ARIA; no se pueden usar con teclado.

### Variantes que faltan (petición al DS, X-04)

- `NavBar` responsive con menú móvil (hoy estilos inline, altura fija de 76 px, sin breakpoints).
- Navegación lateral / `AppShell` para Admin y Company.
- `StatStrip` que se apile en móvil.
- Estado "actual" para enlaces de navegación (hoy solo existe en `Tabs`, con semántica de pestañas).

## Lo que debe permanecer intacto

- Todo `design-system/` y `theme.css`.
- Composición de la landing (hero con `Photo`, `StatStrip`, `FeatureCard`, `LogoMarquee`, CTA con degradado).
- `CompaniesView`: filtros con `Tag variant="filter"`, búsqueda, `EmptyState`, `Pagination`.
- `ThemeToggle` y el script de tema.
- `NavButton` para navegar desde páginas de servidor.

## Riesgos de migración

| Riesgo | Mitigación |
|---|---|
| Enlaces compartidos a `/empresas` y `/registro` | Redirecciones 307 (DEC-003) |
| Mover el layout raíz rompe cabecera en páginas nuevas | Cada espacio monta su shell (DEC-001) |
| El repo real puede tener rutas distintas | OI-014; `MIGRACION.md` |
| Sin lint ni tests, las regresiones se detectan a mano | X-01, X-02 |
| `NavBar` no responsive | Workaround documentado (DEC-007) |
| Cifras y "verificados" en la landing | OI-003 |

## Cambios aplicados tras la auditoría (2026-10-22)

Ver [CHANGELOG.md](CHANGELOG.md). Resumen: route groups, shells, guards, 404 y error por espacio, rutas en inglés con
redirecciones, menú móvil, confirmación de registro sustituida por "Simulación".
