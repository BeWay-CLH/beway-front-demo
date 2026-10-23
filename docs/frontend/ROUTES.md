# Mapa de rutas

Basado en el `02-route-map.md` acordado. Las URLs están en inglés (DEC-002). `(...)` es un route group sin segmento.

**Estado de producto:** `NOW` construir ya · `NEXT` siguiente bloque · `LATER` solo reservada.
**Estado real:** `Hecha` existe y funciona · `Shell` existe con contenido mínimo · `Redirección` · `—` no existe.
**Ticket:** dónde se construye (ver [ROADMAP.md](ROADMAP.md)).

**Layout `Shared`** (`app/(shared)/`, DEC-030): pantallas con una sola URL para visitantes y miembros. Con sesión se pintan
en el marco de Talent (misma cabecera, sin pie); sin sesión, en el público (con pie).

Una ruta sin construir **no se crea** y **no aparece en menús** (DEC-004). La navegación sale de `lib/routes.ts`.
Para presentar la demo, la `DemoBar` enlaza el inicio de cada espacio: `/`, `/talent/dashboard`, `/admin/dashboard` (DEC-013).

## A. Public y Auth

| URL | Pantalla | Producto | Real | Ticket | Layout | Acceso |
|---|---|---|---|---|---|---|
| `/` | Landing | NOW | Hecha | A-08 (copy) | Public | Público |
| `/companies` | Catálogo de empresas | NOW | Hecha | C-03 | Shared | Público |
| `/companies/[slug]` | Ficha canónica de empresa | NOW | Hecha | C-02 | Shared | Público; solo fichas publicadas |
| `/u/[username]` | Perfil compartible | NOW | Hecha | B-06 | Shared | Según visibilidad; privado por defecto |
| `/login` | Iniciar sesión | NOW | Hecha (demo) | B-02 | Auth | Público |
| `/signup` | Registrarse | NOW | Hecha (simulación) | B-01 | Auth | Público |
| `/forgot-password` | Recuperar acceso | NEXT | Hecha (simulación) | B-09 | Auth | Público |
| `/privacy` | Privacidad | NOW | Hecha (borrador) | B-08 | Public | Público; texto sujeto a revisión legal |
| `/terms` | Términos | NOW | Hecha (borrador) | B-08 | Public | Público; texto sujeto a revisión legal |
| `/contact` | Contacto | NOW | Hecha (simulación) | B-08 | Public | Público |
| `/styleguide` | Guía de componentes | Interna | Hecha | — | Public | Público (herramienta del equipo) |

## B. Talent

| URL | Pantalla | Producto | Real | Ticket | Acceso |
|---|---|---|---|---|---|
| `/talent` | Redirección a dashboard | NOW | Redirección | A-04 | Sesión Talent |
| `/talent/dashboard` | Inicio Talent | NOW | Hecha (D-01; encuestas y cursos llegan con E-09) | D-01 | Sesión Talent |
| `/talent/onboarding` | Primer perfil / alta | NOW | Hecha | B-04 | Sesión Talent |
| `/talent/profile` | Redirección a `/u/[username]` propio | NOW | Redirección | B-06 | Sesión Talent |
| `/talent/profile/edit` | Editor de perfil y CV | NOW | Hecha | B-05 | Owner |
| `/talent/settings` | Cuenta y privacidad | NOW | Hecha | B-07 | Owner |
| `/talent/companies` | Redirección a `/companies` | NOW | Redirección | A-04 | Sesión Talent |
| `/talent/surveys` | Listado de encuestas | NEXT · alta | — | E-02 | Sesión Talent |
| `/talent/surveys/[slug]` | Encuesta | NEXT · alta | — | E-03 | Sesión Talent + elegibilidad |
| `/talent/courses` | Catálogo de cursos | NEXT · alta | — | E-05 | Sesión Talent |
| `/talent/courses/[slug]` | Detalle de curso | NEXT · alta | — | E-06 | Sesión Talent |
| `/talent/credentials` | Credenciales obtenidas | NEXT | — | E-07 | Owner |
| `/talent/opportunities` | Oportunidades | LATER | — | G | Sesión Talent |
| `/talent/opportunities/[slug]` | Oportunidad | LATER | — | G | Sesión Talent |
| `/talent/challenges` | Retos | LATER | — | G | Sesión Talent |
| `/talent/challenges/[slug]` | Reto | LATER | — | G | Sesión Talent |
| `/talent/challenges/[slug]/submit` | Envío de propuesta | LATER | — | G | Participante habilitado |
| `/talent/community` | Comunidad | LATER | — | G | Sesión Talent |
| `/talent/*` sin pantalla | 404 dentro del shell | — | Hecha | A-05 | Sesión Talent |

**Cursos ≠ credenciales** (DEC-010). `/talent/courses` son programas que se descubren o cursan; `/talent/credentials`
son logros ya obtenidos. La ruta `/talent/certifications` del demo antiguo equivale a `/talent/credentials` (DEC-021):
si hay enlaces compartidos a ella, se añade una redirección cuando exista E-07.

## C. Company (privado)

Todo `LATER`. Se crea `company/layout.tsx` con guard de rol `company` y `AppShell space="company"` solo cuando exista
la primera pantalla útil (G). `/company/surveys` reutiliza el editor de encuestas de F-05 (DEC-016).

| URL | Pantalla | Acceso |
|---|---|---|
| `/company` | Redirección a dashboard | Representante |
| `/company/dashboard` | Visión general | Representante |
| `/company/profile` | Administración de ficha | Representante autorizado |
| `/company/surveys` | Encuestas de empresa | Representante autorizado |
| `/company/courses` | Programas corporativos | Representante autorizado |
| `/company/challenges` | Retos corporativos | Representante autorizado |
| `/company/analytics` | Reportes | Representante autorizado |
| `/company/talent` | Talento visible autorizado | Representante autorizado |
| `/company/ambassadors` | Embajadores | Representante autorizado |

## D. Admin CLH

| URL | Pantalla | Producto | Real | Ticket | Acceso |
|---|---|---|---|---|---|
| `/admin` | Redirección a dashboard | NOW | Redirección | A-04 | Admin |
| `/admin/dashboard` | Inicio del backoffice | NOW mínimo | Shell | F-01 | Admin |
| `/admin/companies` | Listado editorial de fichas | NOW mínimo | — | F-02 | Admin |
| `/admin/companies/[id]/edit` | Editor modular de ficha | NOW mínimo | — | F-03 | Admin |
| `/admin/reviews` | Cola editorial | NOW mínimo | — | F-04 | Admin |
| `/admin/surveys` | Gestión de encuestas | NEXT · alta | — | F-05 | Admin |
| `/admin/courses` | Gestión de cursos | NEXT · alta | — | F-06 | Admin |
| `/admin/companies/[id]/audit` | Auditoría privada | LATER | — | G | Admin |
| `/admin/users` | Usuarios | LATER | — | G | Admin |
| `/admin/challenges` | Retos | LATER | — | G | Admin |
| `/admin/claims` | Solicitudes de claiming | LATER | — | G | Admin |
| `/admin/reports` | Reportes | LATER | — | G | Admin |
| `/admin/*` sin pantalla | 404 dentro del shell | — | Hecha | A-05 | Admin |

Admin usa `[id]` (identificador estable) y Public usa `[slug]` (legible, puede cambiar). Ver DEC-011.

## Estado del bloque C (2026-10-22)

`/companies` filtra y pagina en servidor con `?q=`, `?category=<slug>` y `?page=`. `/companies/[slug]` acepta `?tab=<módulo>`
(`summary`, `culture`, `programs`, `openings`, `locations`, `sources`). Una ficha en borrador o inexistente da 404 sin distinguirse
(C-04). Seguir empresa es una simulación (DEC-032). Pendiente de backend: BE-008, BE-009, BE-025.

## Estado del bloque B (2026-10-22)

Todas las rutas de acceso y de perfil funcionan en modo demo. Las escrituras son simulaciones (DEC-006).
Acceso: cookie `bw_demo` (DEC-023). Sin cookie, `proxy.ts` manda `/talent/*` y `/admin/*` a `/login?next=<ruta>`.
Cuentas: Lucía (Talent y Admin CLH) y Marcos (solo Talent, perfil privado). Un nombre de usuario antiguo da 404.

## Redirecciones y legado

| Origen | Destino | Tipo | Dónde | Motivo | Quitar cuando |
|---|---|---|---|---|---|
| `/empresas` | `/companies` | 307 | `next.config.ts` | URL del prototipo | Nadie use enlaces antiguos |
| `/registro` | `/signup` | 307 | `next.config.ts` | URL del prototipo | Ídem |
| `/talent` | `/talent/dashboard` | 307 | `app/talent/page.tsx` | Entrada del espacio | Permanente |
| `/talent/companies` | `/companies` | 307 | `app/talent/companies/page.tsx` | Ficha única (DEC-001, decisión 3) | Si hay exploración personalizada |
| `/admin` | `/admin/dashboard` | 307 | `app/admin/page.tsx` | Entrada del espacio | Permanente |
| `/talent/certifications` | `/talent/credentials` | 307 | Pendiente (E-07) | Ruta del demo antiguo (DEC-021) | Si no hay enlaces que proteger, no se crea |
| `/programas` | — | Sigue viva | `app/(public)/programas` | Legado, sin enlaces | E-08 (DEC-009) |

Rutas demo antiguas que **no** se deben recrear: `/talent/empresa/santander`, `/talent/perfil/...`, `/beta`.

## Reglas especiales

- Slug inexistente o ficha no publicada: `notFound()` dentro del marco de quien mira (`app/(shared)/not-found.tsx`).
- `/u/[username]` privado: estado "Este perfil es privado" sin ningún dato del usuario, ni siquiera el nombre.
- `/u/[username]` con un username antiguo: 404. Los usernames se pueden cambiar y el anterior deja de funcionar (DEC-017).
- Sin sesión en `/talent/*`: hoy `PageState signed-out`; con `/login`, redirección a `/login?next=<ruta>` validando que `next` sea interna.
- Sin rol en Company/Admin: `PageState forbidden`. Nunca basta con ocultar el menú.
- `/talent/profile` resuelve el username de la sesión, nunca de un parámetro.
- Mensajería: **sin ruta** hasta el final de G.
