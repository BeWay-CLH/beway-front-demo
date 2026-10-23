# Changelog

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
