# Changelog

## 2026-11-05 · Correcciones visuales, fase 01 (base: tokens, DS, cabecera, cuenta, pie)

### Cambiado
- **Tokens y DS:** paleta de la referencia (navy, teal, paper, ink), Manrope y DM Sans con `next/font`, radios 7/13/14/12, modal con blur de 5 px, primario navy y acento sin cian. Lista completa en `docs/correcciones-visuales/DS_CAMBIOS.md`.
- **Cabecera:** dos filas (logo, buscador y cuenta; navegación a izquierda y derecha) con alturas por contexto. Navegación de talento en el orden de la guía. Banda de demo de 28 px.
- **Cuenta:** campana (notificaciones) y avatar (menú personal) abren ventanas centradas de 740 px. Cerrar sesión pasa a esa ventana, con el mismo formulario.
- **Pie:** claro, con marca, enlaces reales y frase central vacía hasta tener el copy.
- **Botones:** medidas de la referencia (42 px, 12 px / 650), secundario blanco con borde, sin brillo en hover.

### Añadido
- `data/fixtures/notifications.ts` y `lib/services/notifications.ts`: notificaciones ficticias marcadas como ejemplo.
- `PRODUCT.md` (impeccable) y `docs/correcciones-visuales/` (plan, fichas, DS_CAMBIOS, PENDIENTES).

### Decisiones
- DEC-037 a DEC-045 en `DECISIONS.md`.

## 2026-10-23 (2) · Bloque E: encuestas, cursos y credenciales (demo)

### Añadido
- **E-01 y E-04:** `lib/models/survey.ts` y `lib/models/course.ts`; servicios `surveys`, `courses` y `credentials`; acciones `surveys` y `courses`; fixtures
  `surveys.ts` (6 encuestas), `courses.ts` (7 cursos) y `credentials.ts` (2 para Lucía, ninguna para Marcos); `getCompanyRefs` en el servicio de empresas.
- **E-02 `/talent/surveys`:** pestañas Disponibles y Completadas con contador, filas de dos líneas con "por qué la ves", una sola acción `primary`, vacíos, y
  "No son para ti por ahora" con las no elegibles. Una encuesta enviada en la sesión pasa a Completadas y una con borrador sale "En curso".
- **E-03 `/talent/surveys/[slug]`:** introducción con "Quién verá tus respuestas", consentimiento obligatorio y "Qué te preguntaremos"; una pantalla por sección con
  los cinco tipos de pregunta (controles del DS); validación con foco en la primera pregunta sin responder; revisión con "Editar"; envío simulado; borrador del
  navegador y del servidor. Si no se puede responder (no elegible, próxima, cerrada o enviada) muestra el resumen sin preguntas y el motivo.
- **E-05 `/talent/courses`** (filtros `?format=&status=` en servidor), **E-06 `/talent/courses/[slug]`** ("Me interesa" simulado, cerrado con su motivo) y **E-07
  `/talent/credentials`** (solo lista; vacío con cursos que otorgan credencial).
- **E-08:** `/programas` redirige a `/companies` y se borra `ProgramasView.tsx` (DEC-035).
- **E-09:** "Encuestas por responder" y "Cursos abiertos" en el inicio, con su vacío; el inicio pasa a filas 6 + 6.
- Componentes: `components/survey/`, `components/course/`, `tabs/KeyboardTabs`, `StatusBadge`, `demo-store`. Documentación: DEC-034…DEC-036, OI-022…OI-024, LQ-10, L-30…L-33,
  punto 18 de DS_REQUESTS, BE-010…BE-015 con "Frontend hoy", fichas E-02…E-09 en SCREENS.

### Cambiado
- Las rutas Encuestas, Cursos y Credenciales pasan a `live` en `talentNav`. Con seis enlaces, `AppHeader` pliega la navegación en el menú por debajo de `lg` (antes
  `md`) cuando hay más de cuatro (DEC-036).
- X-04: `Radio`, `RadioGroup` y `Checkbox` del DS ya no bloquean E-03 (resueltos en v1.1).

### Corregido
- **La cabecera desbordaba a 768 px** (196 px) con los seis enlaces de Talent. Lo detectó el `inspect` del skill de estilo, no la revisión visual a 1280 y 390.

### Verificado
- `npm run typecheck` y `npm run build` sin errores (25 rutas).
- `lint.mjs --app` del skill `taste-skill`: 0 fallos y 0 avisos sobre los 72 archivos del bloque (y 0 fallos en los 128 de `app`, `components`, `lib` y `data`; sus dos avisos
  `eyebrow` son los de la landing y el Styleguide, ya aceptados en DEC-026). `inspect.mjs --app` sobre `next start`: 0 fallos en las seis pantallas (encuestas,
  introducción de encuesta, cursos, curso, credenciales, inicio). Avisos que quedan y se defienden en DEC-036: `icon-tiles` (logos), `panel-void` en el inicio y en
  credenciales, `hero-void` en credenciales.
- Chrome headless sobre producción: 38 escenarios (11 pantallas × 1280, 768 y 390 px, claro y oscuro) sin desbordes, errores de consola ni páginas de error; menú de la
  cabecera a 768 px con las seis rutas; `/programas` → `/companies`; cabeceras pública y Admin a 768 px sin cambios.
- Flujo completo de encuesta con teclado y clic: sin consentimiento no empieza, error por pregunta y foco, máximo de tres opciones, progreso 0 → 100 %, revisión,
  envío simulado, lista actualizada (Disponibles 4 → 3, Completadas 1 → 2, el inicio deja de mostrarla), reanudar desde el borrador del servidor.

### Pendiente
- Backend: BE-010…BE-015. Legal: L-30…L-33 y LQ-10. Producto: OI-022…OI-024 (y OI-016, OI-017 abiertas).
- Petición al DS: `Badge` sin mayúsculas (punto 18).
- Los controles locales de `components/forms/` pueden sustituirse ya por los del DS (DEC-029); sigue siendo un paso aparte.
- No hay otro estado de carga que el del servidor: las encuestas y cursos salen de fixtures.
- Verificado solo en Chrome headless: falta Safari y un dispositivo táctil real.

## 2026-10-23 · Bloque D: dashboard Talent (demo)

### Añadido
- **D-01:** `/talent/dashboard` compuesto. Cabecera con saludo, hallazgo y el único botón `primary`, que nombra el paso siguiente
  ("Añadir formación") y enlaza al apartado del editor; "Qué falta en tu perfil" con una barra de cinco apartados y una fila por
  apartado pendiente; "Empresas de tus intereses"; "Accesos rápidos" (Editar mi perfil, Ver mi perfil, Explorar empresas, Ajustes).
- Estados: perfil a medias, perfil completo (el módulo "Qué falta" se oculta y no hay `primary`), perfil vacío ("Empezar mi perfil" →
  onboarding), sin intereses, sin fichas de esos temas y "ya sigues a todas".
- `lib/models/dashboard.ts` y `lib/services/dashboard.ts` (`getTalentDashboard`), `getCompaniesByInterests` en el servicio de empresas
  y `formatList` en `lib/format.ts`.
- `components/dashboard/CompletionRail.tsx` y `SuggestedCompanies.tsx`; `components/company/CompanyRow.tsx`, compartido con
  "Empresas que sigues".
- Documentación: DEC-033, OI-021, LQ-09, punto 17 de DS_REQUESTS; BE-021 detallado; ficha D-01 completa en SCREENS.

### Cambiado
- Se retiran de Inicio las cuatro tarjetas de cifras y "Tu cuenta" (no responden a la pregunta de la pantalla). Las empresas dejan de
  ser las tres primeras del catálogo y pasan a ser las de los intereses de la persona, sin las que ya sigue.
- Las secciones de `/talent/profile/edit` tienen `id` (`datos-basicos`, `sobre-ti`, `experiencia`, `formacion`, `intereses`) y
  `scroll-mt-32`, para enlazarlas desde el inicio sin que las tape la cabecera fija.
- `FollowedCompanies` usa `CompanyRow`; mismo aspecto que antes.

### Verificado
- `npm run typecheck` y `npm run build` sin errores (22 rutas).
- Chrome headless sobre `next start` y `next dev`: 1280, 768 y 390 px en claro y oscuro, sin scroll horizontal ni errores de consola.
- Cuentas: Lucía (80 %) y Marcos (100 %, privado). Perfil vacío, sin intereses y con interés sin fichas publicadas, probados vaciando
  esos campos de Lucía en el fixture (restaurado después).
- Flujos: el botón principal abre el editor en `#formacion`; seguir Orbital en su ficha la quita de las sugerencias al volver; al seguir
  también Vialink aparece "Ya sigues a todas las empresas de tus intereses". Regresión: "Empresas que sigues" del perfil, `/companies`,
  `/talent/profile` y `/talent/dashboard` sin sesión (→ `/login?next=…`).
- Sin literales de color, paleta de Tailwind ni emoji en el código nuevo (búsqueda manual: `taste-skill` no está instalado aquí).

### Pendiente
- Backend: BE-021 (con BE-005, BE-008, BE-025). Producto: OI-021. Legal: LQ-09.
- E-09 añade encuestas y cursos al inicio cuando existan E-02 y E-05.
- Petición al design system: `Button` fija `margin: 0` en línea (punto 17); los botones `ghost` no se alinean con el texto.
- Verificado solo en Chrome headless: falta Safari y un dispositivo táctil real.

### Grafo (graphify)
- `graphify-out/` regenerado el 2026-10-23 con `/graphify` (954 nodos, 2.363 aristas, 47 comunidades). El grafo anterior tenía 1.026
  nodos: la reducción es intencionada, porque `.graphifyignore` deja fuera CHANGELOG, EXISTING_UI_AUDIT, DS_UPDATE_1.1, MIGRACION,
  AGENTS, `public/`, `package.json` y `design-system/*`, y los documentos re-extraídos cambian de ids. Se forzó el guard de reducción (#479)
  tras guardar una copia del grafo anterior. D-01, DEC-033, BE-021 y la barra de cinco apartados ya están en la comunidad "Dashboard Talent y perfil".
- Aviso de salud: 170 aristas apuntan a nodos que no existen (73 son referencias externas a `next` y `react`, 163 extremos son de `@ds`, que el
  `.graphifyignore` excluye salvo `index.d.ts`); el build las descartó. No afectan a los nodos.

## 2026-10-22 (5) · Navegación coherente y bloque C: catálogo y ficha de empresa (demo)

### Corregido
- **La cabecera cambiaba entre páginas.** `/companies` pintaba la navegación pública (solo "Empresas", con búsqueda) y
  `/u/[username]` no tenía cabecera ni barra de demo. Ahora la navegación sigue a quien mira (DEC-030): con sesión es siempre
  Inicio, Empresas, Perfil; sin sesión, la pública. También en la landing, los legales y los 404.
- "Perfil" queda marcado como actual en el perfil propio (`/u/<usuario>`), y "Empresas" en la ficha.
- "Mi espacio" solo aparece cuando la cabecera no trae ya "Inicio" (acceso y registro con sesión).

### Añadido
- **Grupo `app/(shared)/`** con `ViewerShell`: `/companies`, `/companies/[slug]` y `/u/[username]`, con su 404 y su error.
- **C-01:** `lib/models/company.ts`, `lib/services/companies.ts`, `lib/actions/companies.ts`, fixtures `companies.ts` (11 fichas),
  `follows.ts` y `logo.ts`; `formatDate` y `formatCount` en `lib/format.ts`.
- **C-02:** `/companies/[slug]` con banner y logo en chip blanco, cifras, aviso de desactualizada, pestañas por módulo
  (`?tab=`, teclado, desplazamiento en móvil), fuentes y nota de origen de los datos (`components/company/`).
- **C-03:** `/companies` filtra y pagina en servidor con `?q=`, `?category=` y `?page=`; la tarjeta navega a la ficha; resumen
  con `aria-live`.
- **C-04:** una ficha en borrador o inexistente da 404 sin distinguirse; las categorías salen solo de fichas publicadas.
- **C-05:** "Seguir / Siguiendo" simulado con `Toast` "Simulación" y "Empresas que sigues" en el perfil propio (solo su titular).
- Documentación: DEC-030…DEC-032, OI-019 y OI-020, peticiones al DS 13 a 16, textos provisionales L-20 y L-21.

### Cambiado
- `data/mock.ts` ya no contiene empresas (X-06 hecho para empresas). `/talent/dashboard` enlaza sus tres empresas a la ficha y el
  panel de Admin cuenta desde el servicio.
- Catálogo: la búsqueda y el filtro dejan de ser estado local; ignoran tildes y mayúsculas.

### Verificado
- `npm run typecheck` y `npm run build` sin errores (22 rutas, `/companies/[slug]` nueva).
- Chrome headless (DevTools) sobre desarrollo y sobre `next start`: recorrido Talent → Empresas → ficha → Perfil → Inicio con la
  misma cabecera y el elemento activo correcto, para sesión y para visitante; menú móvil igual en todas las páginas.
- 45 comprobaciones de flujo: pestañas con clic y teclado, `?tab=` válido e inválido, seguir y dejar de seguir con reflejo en el
  perfil, estado vacío de Marcos, visitante a `/signup`, 404 de borrador sin filtrar su nombre, filtros, búsqueda, paginación y
  parámetros inválidos. Consola sin errores en producción.
- Sin scroll horizontal a 390, 768 y 1280 px, en claro y oscuro. Sin literales de color, paleta de Tailwind ni emoji en el código nuevo.
- Regresión: perfil privado sin nombre en HTML ni título; Marcos sin acceso a Admin; rutas del bloque B con el mismo código HTTP.

### Pendiente
- Backend: BE-008, BE-009, BE-025. Legal: L-20, L-21, LQ-06. Producto: OI-019, OI-020.
- En desarrollo, las páginas 404 muestran en consola un aviso de React por la etiqueta `<script>` del tema en `app/layout.tsx`
  (también `/talent/xyz`). No aparece en producción. Se resuelve con `next/font` y el tema fuera del `<head>` (X-03).
- Peticiones al design system: `DS_REQUESTS.md`, puntos 13 a 16.
- No se ha regenerado `graphify-out/` (se hace con `/graphify`).
- Verificado solo en Chrome headless: falta Safari y un dispositivo táctil real.

## 2026-10-22 (4) · Design system v1.1

### Cambiado
- `design-system/` reemplazada entera por la v1.1 (21 archivos modificados, 1 nuevo: `src/a11y.js`). Detalle y
  verificación en [DS_UPDATE_1.1.md](DS_UPDATE_1.1.md).
- `StepNav` del onboarding con `width={300}` (el DS ahora mide 100 % por defecto).
- Cuatro tarjetas con `elevation="sm"` para conservar la sombra que ya tenían (landing, admin, programas).

### Verificado
- `tsc --noEmit` y `npm run build` sin errores. Rutas HTTP como antes.
- Recorrido de 18 pasos en Chrome: producción sin problemas; desarrollo sin fallos de flujo.
- Aviso nuevo en dev por `background` en `Button` (punto 12 de DS_REQUESTS). Pendiente en el DS.

## 2026-10-22 (3) · Bloque B: acceso, registro, perfil, ajustes y onboarding (demo)

### Añadido
- **Acceso:** `/login` con cuentas de demostración (Lucía y Marcos), `/forgot-password` (respuesta única, simulada).
- **Registro:** `/signup` en dos pasos (datos y simulación). "Busco talento" visible y desactivada (DEC-022).
- **Sesión de demo:** cookie `bw_demo`, `lib/session.ts`, `lib/auth-actions.ts`, `proxy.ts` (redirección a `/login?next=`).
- **Perfil:** `/u/[username]` (público, privado para visitantes, propio con aviso, 404 para nombres antiguos).
  `/talent/profile` redirige al propio perfil. `/talent/profile/edit` con secciones y listas editables.
- **Ajustes:** `/talent/settings` con cuenta, privacidad (interruptor + vista previa en vivo), notificaciones, sesión y
  zona de peligro. Diálogos de contraseña y de eliminación, ambos simulados.
- **Onboarding:** `/talent/onboarding` en cuatro pasos con borrador en sessionStorage y guardado simulado al terminar.
- **Legal:** `/privacy` y `/terms` como borrador (estructura visible), `/contact` con formulario simulado.
- **Modelos y servicios:** `lib/models/*`, `lib/services/profiles.ts`, `lib/completion.ts`, `lib/format.ts`,
  `lib/navigation.ts`, fixtures `data/fixtures/accounts.ts` y `profiles.ts`.
- **Controles locales con input nativo:** `components/forms/` (DEC-024).
- **Vista previa de visibilidad:** `components/profile/ProfilePreview.tsx`.
- **Documentación:** `DESIGN.md` (criterios de diseño y estilo elegido), `DS_REQUESTS.md` (peticiones a Claude Design),
  DEC-023…DEC-028, este changelog.
- `app/icon.png` (icono de la marca, copiado de `public/assets`): elimina el 404 del favicon.

### Cambiado
- `AppHeader` muestra la cuenta (avatar y cerrar sesión) o los accesos según haya sesión. El admin sin rol ve la barra
  DEMO en "Admin CLH" y "sin acceso".
- Espacios Talent y Admin usan `AppShell`; el acceso y los estados sin sesión usan `AuthShell` con `quiet`.
- Botones `outline` retirados del código de la app (quedan en el Styleguide): evitan el aviso de `borderColor` en dev.
- Títulos de pantallas de app: 24 px en móvil, 32 px desde `md` (DEC-027).
- Pie: enlaces legales con destino; se quita "Cookies" (sin página).
- `BEWAY_MOCK_ROLES` y `resolveAccess` retirados (DEC-023).
- Rutas de cuenta y el 404 global usan la sesión real de la cookie.

### Verificado
- `npm run typecheck` y `npm run build` sin errores (22 rutas, proxy detectado).
- HTTP: sin sesión, `/talent/*` y `/admin/*` redirigen a `/login?next=`; perfil privado sin nombre en HTML ni en título;
  `/u/lucia-m` da 404; Marcos ve "sin acceso" en Admin; cookie inválida cae en `/login`.
- Recorrido en Chrome headless (DevTools): entrada de demo, ajustes con guardado simulado, onboarding completo, registro
  con errores y con datos válidos, perfil privado, acceso por rol, móvil y tema oscuro. Consola sin errores ni excepciones.
- Lint de taste-skill (`--app`): 0 FAIL; 2 WARN defendidos (eyebrows permitidos por la marca).
- Inspector de taste-skill (`--app`, 1440/768/390): 0 FAIL. Avisos defendidos: borde y color en oscuro, editor largo.

### Pendiente
- Backend: BE-001 a BE-007, BE-022, BE-023. Legal: LQ-02, LQ-04, LQ-08 y textos definitivos.
- Peticiones al design system: ver `DS_REQUESTS.md`.
- Verificado solo en Chrome headless: falta comprobar en Safari y en un dispositivo táctil real.

## 2026-10-22 (2) · Navegación unificada, barra de demo y respuestas de producto

### Cambiado
- Una sola cabecera para todos los espacios (`AppHeader` sobre el `NavBar` del DS): mismo alto y logo en el mismo sitio
  en Público, Auth, Talent y Admin (DEC-013). El logo enlaza al inicio de cada espacio.
- Admin CLH pasa de barra lateral a navegación superior. `TalentShell` y `AdminShell` se sustituyen por `AppShell`.
- `ShellNav` se divide en `NavList` (enlaces) y `ShellNav` (con `<nav>`); el activo se marca con subrayado de acento.
- Pie: se quitan los enlaces "(demo)", ahora en la barra de demo.
- Registro: "Busco talento" visible pero desactivada (DEC-022); descripción de "Busco oportunidades" sin prometer visibilidad.
- Margen lateral del panel Admin igual al resto.

### Añadido
- `DemoBar`: salto entre Público, Talent y Admin CLH desde cualquier página; `NEXT_PUBLIC_BEWAY_DEMO_BAR=off` la apaga.
- `spaces` en `lib/routes.ts`.
- `LEGAL_REQUESTS.md` con todo lo que hay que pedir a legal (LQ-01…LQ-08, L-01…L-33).
- DEC-013…DEC-022, tickets A-09, C-05, X-07, BE-024 y BE-025, peticiones al DS con el defecto de `Button outline` y la accesibilidad de `Radio`.

### Documentación
- OPEN_ISSUES: 14 dudas resueltas; nuevas OI-016 (anonimato de encuestas), OI-017 (qué es "interesado"), OI-018 (edad mínima).

### Verificado
- `npm run typecheck` y `npm run build` sin errores.
- Capturas a 1280 px (claro) de Público, Talent y Admin: logo y cabecera en la misma posición; `/signup` en oscuro; Talent a 500 px.
- **No verificado:** menú móvil con interacción real; 360–390 px.

## 2026-10-22 · Bloque A: arquitectura, shells y documentación

### Añadido
- `docs/frontend/`: README, AGENT_BRIEF, ARCHITECTURE, ROUTES, ROADMAP, SCREENS, FRONTEND_MODELS, BACKEND_HANDOFF
  (BE-001…BE-023), DECISIONS (DEC-001…DEC-012), OPEN_ISSUES (OI-001…OI-015), EXISTING_UI_AUDIT, CHANGELOG.
- Route groups `app/(public)/` y `app/(auth)/` con sus layouts.
- Espacio Talent: `app/talent/` con guard, `TalentShell`, `/talent` → `/talent/dashboard`, `/talent/companies` → `/companies`,
  inicio mínimo, 404 y error propios.
- Espacio Admin CLH: `app/admin/` con guard, `AdminShell` (barra lateral), `/admin` → `/admin/dashboard`, inicio mínimo, 404 y error propios.
- `app/not-found.tsx` global.
- `components/PageState.tsx` (not-found, forbidden, signed-out, error, private, empty) y `components/RouteError.tsx`.
- `components/shells/`: `AuthShell`, `TalentShell`, `AdminShell`, `ShellNav`, `MobileMenu`.
- `lib/routes.ts` (navegación con `live`/`planned`) y `lib/session.ts` (sesión simulada, `BEWAY_MOCK_ROLES`).
- `mockSession` en `data/mock.ts`.
- Redirecciones 307 `/empresas` → `/companies` y `/registro` → `/signup` en `next.config.ts`.

### Cambiado
- `app/layout.tsx` ya no monta cabecera ni pie.
- `/empresas` → `/companies` (`EmpresasView` → `CompaniesView`); `/registro` → `/signup`.
- `SiteHeader`: enlaces desde `lib/routes.ts`; en móvil oculta enlaces y búsqueda y muestra menú; "Iniciar sesión" oculto hasta que exista `/login`.
- `SiteFooter`: enlaces a las nuevas rutas y a los espacios demo.
- Registro: la confirmación "Perfil creado" pasa a "Simulación" (DEC-006).
- Márgenes laterales de `/companies` y `/signup` a 16 px en móvil.

### Verificado
- `npm run typecheck` y `npm run build` sin errores (12 rutas).
- Respuestas HTTP: 200 en páginas, 307 en redirecciones, 404 en `/nope`, `/talent/nope`, `/admin/nope`.
- Capturas en Chrome headless a 500 px y 1280 px, temas claro y oscuro: shells, 404 de Talent, inicio Admin.
- **No verificado:** apertura del menú móvil con interacción real; ancho de 360–390 px (Chrome headless no baja de 500 px);
  `BEWAY_MOCK_ROLES` en `npm run dev`.
