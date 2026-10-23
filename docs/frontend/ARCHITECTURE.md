# Arquitectura frontend

Estado: vigente desde 2026-10-22. Cambios a este documento requieren una entrada en [DECISIONS.md](DECISIONS.md).

## 1. Requisitos

### Funcionales

- Cuatro espacios de producto, **Public**, **Talent**, **Company** y **Admin CLH**, más **Auth** transversal (DEC-001).
- Recorridos completos a nivel visual con datos simulados: alta y onboarding, perfil compartible, catálogo y ficha de
  empresa, encuestas, cursos y credenciales, backoffice mínimo.
- Estados de feedback en todas las pantallas: vacío, carga, error, 404, sin acceso, sin sesión, perfil privado, ficha desactualizada.

### No funcionales

| Requisito | Cómo se cumple |
|---|---|
| Mobile-first en todo | Layouts fluidos con Tailwind; probado a 360–390, 768 y 1280 px (DoD) |
| Tema claro y oscuro | Solo tokens semánticos; `data-theme` en `<html>` |
| Accesibilidad AA | Tokens con contraste verificado, foco visible, `aria-current`, labels obligatorios |
| Independencia del backend | Fixtures + capa de servicios + adapters; las pantallas no cambian al conectar la API |
| Privacidad por defecto | Perfil `private` por defecto; las pantallas públicas solo reciben View Models públicos |
| Trazabilidad | Cada pantalla enlaza sus operaciones `BE-XXX` |

### Restricciones

- Next.js **16.4** (App Router, Turbopack), React 19.3, Tailwind v4.3, TypeScript 5.9, `lucide@0.469.0` fija.
  Next 16 cambia APIs: lee `node_modules/next/dist/docs/` antes de usar algo nuevo (ver `AGENTS.md`).
- `design-system/` es de solo lectura. Los componentes de `@ds` son de cliente.
- Sin backend ni AWS todavía. Sin fechas nuevas: se avanza por dependencias.
- Sin lint ni tests configurados (X-01, X-02).

## 2. Vista general

```text
                         ┌──────────────────────────── Navegador ────────────────────────────┐
                         │                                                                   │
  URL ──► proxy.ts* ──►  │  app/ (rutas finas, Server Components)                            │
       (*futuro, B-02)   │   ├─ (public)/ ─ SiteHeader + SiteFooter                          │
                         │   ├─ (auth)/   ─ AuthShell                                        │
                         │   ├─ talent/   ─ guard rol talent ─ TalentShell                   │
                         │   ├─ company/  ─ (LATER) guard rol company ─ CompanyShell         │
                         │   └─ admin/    ─ guard rol admin ─ AdminShell                     │
                         │          │                                                        │
                         │          ▼  View Models (lib/models)                              │
                         │   lib/services/<dominio>.ts  ◄── hoy: data/fixtures               │
                         │          │                   ◄── mañana: API + lib/adapters        │
                         │          ▼                                                        │
                         │   componentes de cliente: @ds + components/<dominio>              │
                         └───────────────────────────────────────────────────────────────────┘
                                                    │ (futuro)
                                                    ▼
                                     API backend (AWS) · autorización real · auditoría
```

La autorización de verdad vive en el backend. Los guards del frontend solo deciden **qué pantalla mostrar** (DEC-005).

## 3. Estructura de carpetas

Se conserva la estructura del starter y se añade lo mínimo. La organización por `features/` es opcional y no se adopta
por ahora (DEC-008): el código de dominio crece en `components/<dominio>/` y `lib/`.

```text
app/
├─ layout.tsx                 raíz: <html>, script de tema, fuentes. Sin cabecera.
├─ not-found.tsx              404 global (con cabecera y pie públicos)
├─ (public)/                  layout: SiteHeader + SiteFooter
│  ├─ page.tsx                /
│  ├─ companies/              /companies (+ [slug] en C-02)
│  ├─ programas/              legado del starter, ver DEC-009
│  ├─ styleguide/             herramienta interna
│  └─ error.tsx
├─ (auth)/                    layout: AuthShell
│  └─ signup/                 /signup (+ login, forgot-password en B)
├─ talent/                    layout: guard + TalentShell
│  ├─ page.tsx                → /talent/dashboard
│  ├─ dashboard/
│  ├─ companies/              → /companies
│  ├─ [...missing]/           404 dentro del shell
│  ├─ not-found.tsx · error.tsx
└─ admin/                     layout: guard + AdminShell
   ├─ page.tsx                → /admin/dashboard
   ├─ dashboard/
   ├─ [...missing]/
   └─ not-found.tsx · error.tsx

components/
├─ SiteHeader.tsx · SiteFooter.tsx · ThemeToggle.tsx · NavButton.tsx   (del starter)
├─ PageState.tsx              estados de página (not-found, forbidden, signed-out, error, private, empty)
├─ RouteError.tsx             contenido de los error.tsx
├─ shells/                    AppHeader (cabecera única), DemoBar, AppShell (Talent/Admin), AuthShell,
│                             ShellNav/NavList, MobileMenu
└─ <dominio>/                 (al crecer) company/, profile/, survey/, course/, admin/

lib/
├─ routes.ts                  navegación por espacio con estado live/planned
├─ session.ts                 sesión simulada y resolveAccess()
├─ models/                    (B/C) View Models por dominio, solo tipos
├─ services/                  (B/C) lectura/escritura por dominio; única puerta a los datos
└─ adapters/                  (con la API) DTO → View Model

data/
└─ mock.ts                    fixtures actuales; se divide en data/fixtures/<dominio>.ts en C-01
```

`lib/models`, `lib/services` y `lib/adapters` no existen todavía: se crean con el primer ticket que los necesite
(B-01 o C-01), no antes.

## 4. Flujo de datos

```text
fixture (data/fixtures/companies.ts)
   └─► service  getCompanyBySlug(slug): Promise<CompanyDetailVM | null>
          └─► page (Server Component)  null → notFound()
                 └─► componentes de cliente con props = View Model
```

Reglas:

1. **Las páginas no importan `data/` directamente** a partir del bloque B. Las páginas del bloque A y del starter
   lo hacen todavía; se migran cuando se tocan.
2. **Los servicios devuelven View Models**, nunca DTOs. Cuando exista la API, el servicio llama a la API y pasa la
   respuesta por un adapter. La firma no cambia.
3. **`null` significa "no existe o no es visible"** y la página llama a `notFound()`. Un perfil privado no es `null`:
   el servicio devuelve `{ visibility: 'private' }` sin datos personales y la página muestra el estado privado.
4. **Errores**: el servicio lanza; el `error.tsx` del espacio muestra `RouteError` con "Reintentar".
5. **Escrituras simuladas**: las funciones de escritura (`submitSurvey`, `saveProfile`…) existen en el servicio,
   devuelven `{ simulated: true }` y la UI muestra un aviso "Simulación". Nunca un éxito real (DEC-006).
6. **Filtros y paginación**: hoy se filtran en cliente sobre el fixture. Al conectar la API pasan a `searchParams`
   y se resuelven en servidor (C-03).

## 5. Sesión, roles y acceso

| Pieza | Hoy (mock) | Producción |
|---|---|---|
| Identidad | `mockSession` en `data/mock.ts` | Sesión real (BE-001) |
| Rol | `roles: ['talent','admin']`; `BEWAY_MOCK_ROLES` para probar | Claims del backend |
| Sin sesión en `/talent/*` | `PageState signed-out` dentro de AuthShell | `proxy.ts` redirige a `/login?next=<ruta>` (B-02) |
| Sin rol en `/admin/*` | `PageState forbidden` | Igual + el backend rechaza cada operación (BE-003) |
| Perfil privado | El servicio no devuelve datos | El backend no devuelve datos |

- `forbidden()` y `unauthorized()` de Next 16 son **experimentales** (`authInterrupts`): no se usan (DEC-005).
- `middleware.ts` se llama ahora `proxy.ts` en Next 16. Solo hará redirecciones optimistas; nunca es la única barrera.
- `BEWAY_MOCK_ROLES` se lee en servidor. En `next build` las páginas se generan estáticas con el valor del momento
  del build; para probar roles usa `npm run dev`.

## 6. Layouts y navegación

Todos los espacios comparten **la misma cabecera** (`AppHeader` sobre el `NavBar` del DS) para que el logo y la
navegación no cambien de sitio al pasar de un espacio a otro (DEC-013):

```text
┌ DemoBar ─ DEMO  Público · Talent · Admin CLH ─────────────────────────── Datos de ejemplo ┐
├ NavBar ── [Logo][badge]  enlaces del espacio   (búsqueda: solo Público)    tema · acción ┤
└──────────────────────────────────────────────────────────────────────────────────────────┘
```

| Espacio | Shell | Enlaces | Acciones | Pie |
|---|---|---|---|---|
| Public | `SiteHeader` + `SiteFooter` | `publicNav` + búsqueda | Tema, Crear cuenta | Sí |
| Auth | `AuthShell` | — | Tema | No |
| Talent | `AppShell space="talent"` | `talentNav` | Tema, avatar | No |
| Admin | `AppShell space="admin"` + `Badge` "Admin CLH" | `adminNav` | Tema, avatar | No |
| Company | `AppShell space="company"` (G) | `companyNav` | Tema, avatar | No |

- Por debajo de `md` los enlaces pasan a `MobileMenu` (se cierra al navegar y con Escape).
- La navegación sale de [`lib/routes.ts`](../../lib/routes.ts). Un ítem `planned` está en el mapa pero no se pinta.
  `NavList` marca la página actual con `aria-current="page"`.
- `DemoBar` permite recorrer los espacios en una presentación. Se apaga con `NEXT_PUBLIC_BEWAY_DEMO_BAR=off`.
- `NavList`, `MobileMenu`, `DemoBar` y el ocultado responsive de `NavBar` son patrones nuevos hechos con tokens y
  deben pasar al design system (DEC-007).

## 7. Estados compartidos

`PageState` envuelve `EmptyState` del DS con textos por defecto:

| `kind` | Uso |
|---|---|
| `not-found` | `not-found.tsx` global, de Talent y de Admin; slugs inexistentes |
| `forbidden` | Rol insuficiente |
| `signed-out` | Sin sesión (mientras no exista `/login`) |
| `error` | `error.tsx` vía `RouteError` |
| `private` | `/u/[username]` de un perfil privado (B-06) |
| `empty` | Listados sin elementos |

Carga: `Skeleton` del DS en `loading.tsx` solo cuando un servicio tenga latencia real; con fixtures no hace falta.
Ficha desactualizada: `Alert tone="warning"` con fecha de última revisión (C-02).

## 8. Renderizado

- Páginas: Server Components. Interactividad en componentes de cliente que reciben View Models por props.
- En páginas de servidor no se pasa `onClick` a componentes del DS: se usa `NavButton` o un componente de cliente.
- `params` y `searchParams` son `Promise` en Next 16: `const { slug } = await params`.
- Rutas dinámicas con fixtures pueden usar `generateStaticParams`; con API, renderizado dinámico.
- Metadatos con `export const metadata` o `generateMetadata`. Las páginas de perfil privado y Admin llevan `robots: noindex`.

## 9. Decisiones y alternativas

| Decisión | Alternativa descartada | Por qué |
|---|---|---|
| Route groups `(public)`, `(auth)` y carpetas `talent/`, `admin/` | Un solo layout con cabecera condicional | Cada espacio tiene su shell sin `if`; el 404 mantiene el contexto |
| Guards que renderizan estado, no redirigen | Redirigir ya a `/login` | `/login` no existe aún; no se enlaza a páginas inexistentes |
| `[...missing]` en Talent y Admin | Solo `app/not-found.tsx` | Sin él, `/talent/xyz` pierde el shell |
| Servicios + View Models desde B | Importar `data/mock` en páginas | Conectar la API sin tocar pantallas |
| Sin `features/` | Reorganizar por dominio | El brief prohíbe reestructurar por preferencia; se puede adoptar más tarde |
| Redirecciones 307 `/empresas`, `/registro` | Borrar rutas antiguas | Enlaces del prototipo ya compartidos; se quitan cuando dejen de usarse |

## 10. Destino: monorepo con el backend

El repo definitivo tendrá `frontend/` (este proyecto) y el backend al lado (DEC-019). Reglas desde ya:

- Nada fuera de este proyecto: sin imports `../` hacia fuera, sin scripts que asuman la raíz del repo.
- Configuración solo por variables `BEWAY_*` / `NEXT_PUBLIC_BEWAY_*`; la API por `BEWAY_API_URL`.
- Los adapters (`lib/adapters/`) son el único punto que conoce los DTOs del backend. Si el backend publica tipos o un
  esquema (OpenAPI, por ejemplo), los adapters los importan; los View Models no cambian.

## 11. Qué revisar cuando crezca

- **Datos reales**: filtros en servidor, paginación por cursor, caché por ruta (`use cache`/revalidación según Next 16).
- **Auth real**: `proxy.ts`, sesión en cookie httpOnly, `next` validado contra rutas internas.
- **Company Portal**: si su navegación diverge mucho de Admin, shell propio.
- **Volumen de dominio**: si `components/<dominio>` y `lib/services` superan ~10 archivos por dominio, valorar `features/`.
- **Tests**: Playwright para recorridos críticos (alta, encuesta, 404, roles) y comprobación de contraste en ambos temas.
- **Fuentes**: pasar de `<link>` de Google Fonts a `next/font` (X-03).
