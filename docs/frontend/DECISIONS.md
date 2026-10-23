# Decisiones

Formato: contexto → decisión → consecuencias. Una decisión nueva o un cambio requiere entrada aquí.
Las 16 decisiones del [brief](AGENT_BRIEF.md#decisiones-que-no-debes-reabrir-sin-evidencia-de-conflicto-real) siguen
vigentes y no se reabren sin evidencia de conflicto real; aquí se registran las que se tomaron al aplicarlas.

| ID | Decisión | Fecha | Estado |
|---|---|---|---|
| DEC-001 | Cuatro espacios + Auth transversal, cada uno con su layout | 2026-10-22 | Vigente |
| DEC-002 | URLs en inglés, copy en español | 2026-10-22 | Vigente |
| DEC-003 | Migración de rutas del starter con redirecciones temporales | 2026-10-22 | Vigente |
| DEC-004 | Menús generados desde `lib/routes.ts`; solo rutas vivas | 2026-10-22 | Vigente |
| DEC-005 | Guards de demostración que muestran estado; sin APIs experimentales | 2026-10-22 | Vigente |
| DEC-006 | Toda escritura simulada se anuncia como "Simulación" | 2026-10-22 | Vigente |
| DEC-007 | Patrones nuevos fuera del DS, pendientes de incorporar | 2026-10-22 | Vigente · petición al DS |
| DEC-008 | Sin carpeta `features/` por ahora | 2026-10-22 | Vigente |
| DEC-009 | `/programas` se mantiene como legado sin enlaces | 2026-10-22 | Vigente hasta E-08 |
| DEC-010 | Cursos y credenciales son dominios separados | 2026-10-22 | Vigente |
| DEC-011 | Admin direcciona por `id`, Public por `slug` | 2026-10-22 | Vigente |
| DEC-012 | Perfil privado por defecto y sin fuga de datos | 2026-10-22 | Vigente |
| DEC-013 | Cabecera única en todos los espacios y barra de demo | 2026-10-22 | Vigente · sustituye la barra lateral de Admin |
| DEC-014 | Orden de bloques A → G sin adelantar E | 2026-10-22 | Vigente |
| DEC-015 | Visibilidad del perfil: solo `private` o `public` | 2026-10-22 | Vigente hasta respuesta de legal |
| DEC-016 | Las encuestas las publican empresas; CLH es una empresa más | 2026-10-22 | Vigente |
| DEC-017 | Usernames cambiables, sin redirección del anterior | 2026-10-22 | Vigente |
| DEC-018 | Acceso con correo y contraseña; proveedores externos después | 2026-10-22 | Vigente |
| DEC-019 | Destino: carpeta `frontend/` en un repo con el backend | 2026-10-22 | Vigente |
| DEC-020 | Ficha de empresa: módulos iniciales y umbral de 180 días | 2026-10-22 | Vigente |
| DEC-021 | Credenciales con emisor y fecha; `certifications` → `credentials` | 2026-10-22 | Vigente |
| DEC-022 | Alta de empresa visible y desactivada en el registro | 2026-10-22 | Vigente hasta G |
| DEC-023 | Sesión de demostración por cookie y redirección en `proxy.ts` | 2026-10-22 | Vigente hasta BE-001 |
| DEC-024 | Interruptor, casilla y radio con input nativo | 2026-10-22 | Vigente: el DS v1.1 ya los trae; los locales siguen hasta decidir su sustitución |
| DEC-029 | Design system actualizado a v1.1 (reemplazo de la carpeta desde `TEMP - update`) | 2026-10-22 | Vigente · ver DS_UPDATE_1.1.md |
| DEC-025 | Un solo guardado por vista y vista previa en vivo | 2026-10-22 | Vigente |
| DEC-026 | Estilo de app `editorial-greeting` para pantallas de trabajo (taste-skill), con la marca por encima | 2026-10-22 | Vigente |
| DEC-027 | Títulos de app: 24 px en móvil y 32 px desde md | 2026-10-22 | Vigente |
| DEC-028 | Progreso como dato, sin "Paso N de M" | 2026-10-22 | Vigente |
| DEC-030 | La cabecera sigue a quien mira; grupo `(shared)` para pantallas con una sola URL | 2026-10-22 | Vigente · completa DEC-013 |
| DEC-031 | Ficha de empresa en pestañas por módulo, con `?tab=` y fuentes aparte | 2026-10-22 | Vigente |
| DEC-032 | Catálogo resuelto en servidor y seguimiento simulado por sesión | 2026-10-22 | Vigente hasta BE-008 y BE-025 |

---

### DEC-001 · Cuatro espacios con layout propio

**Contexto.** El starter tenía un único layout raíz con `SiteHeader` y `SiteFooter` para todo.
**Decisión.** El layout raíz solo monta `<html>`, tema y fuentes. Cada espacio tiene su layout: `(public)` y `(auth)`
como route groups (sin segmento de URL), `talent/` y `admin/` como carpetas con guard. `company/` se crea en G.
**Consecuencias.** El 404 global (`app/not-found.tsx`) monta cabecera y pie públicos por su cuenta. Talent y Admin
tienen su propio `not-found.tsx` y un `[...missing]/page.tsx` que llama a `notFound()` para no perder el shell.

### DEC-002 · URLs en inglés

Decisión 2 del brief. El copy visible sigue en español (CLAUDE.md). Nombres de componentes en inglés
(`CompaniesView`, `SignupPage`).

### DEC-003 · Migración de rutas del starter

**Contexto.** El starter usaba `/empresas` y `/registro`, y es un prototipo que ya se ha compartido.
**Decisión.** Se movieron a `/companies` y `/signup`. Redirecciones 307 en `next.config.ts`.
**Consecuencias.** Se quitarán cuando no haya tráfico a las URLs antiguas. No se crean más redirecciones "por si acaso".

### DEC-004 · Menús desde `lib/routes.ts`

**Contexto.** Regla del brief: el menú solo contiene rutas implementadas.
**Decisión.** Cada espacio declara sus ítems con `status: 'live' | 'planned'`; `ShellNav` y `SiteHeader` pintan solo `live`.
**Consecuencias.** Activar una pantalla es cambiar una línea. Los CTA fuera de los menús se revisan a mano (DoD).

### DEC-005 · Guards de demostración

**Contexto.** No hay `/login` ni sesión real. `forbidden()`/`unauthorized()` de Next 16 requieren el flag experimental `authInterrupts`.
**Decisión.** Los layouts de Talent y Admin llaman a `resolveAccess(role)` y, si falla, renderizan `PageState`
(`signed-out` o `forbidden`) dentro de `AuthShell`. Sin APIs experimentales.
**Consecuencias.** Con B-02 se añade `proxy.ts` para redirigir a `/login?next=`. La seguridad real es del backend (BE-001, BE-003).

### DEC-006 · Simulaciones explícitas

**Contexto.** El formulario semilla de registro mostraba "Perfil creado. Revisa tu correo", que es una confirmación falsa.
**Decisión.** Toda escritura sin backend termina en `Alert tone="info" title="Simulación"` explicando que no se guardó nada.
**Consecuencias.** Aplica a registro, onboarding, perfil, encuestas, inscripciones, publicaciones y credenciales.

### DEC-007 · Patrones nuevos pendientes del design system

**Contexto.** El DS no tiene estado "actual" para enlaces, menú móvil ni `NavBar` responsive (`NavBar` usa estilos inline y altura fija).
**Decisión.** Se construyeron con tokens en `components/shells/`:
- `NavList`/`ShellNav`: horizontal dentro del `NavBar` (activo con subrayado `decoration-line-accent`, como `Tabs`) y vertical en el menú móvil (`bg-surface-sunken` en el activo).
- `MobileMenu`: `IconButton` + panel bajo la cabecera.
- `DemoBar`: barra de demostración (DEC-013).
- `AppHeader` oculta enlaces y búsqueda del `NavBar` por debajo de `md` con `max-md:[&>nav]:hidden!` y reduce su
  margen con `max-md:px-4!` (el `!` es necesario porque el DS usa estilos inline).
**Consecuencias.** Petición al DS (X-04): `NavBar` responsive con menú móvil y estado activo, y `StatStrip` apilable.
Cuando existan, se sustituyen y se borran los `!`.

### DEC-008 · Sin `features/`

**Contexto.** El brief la propone como opcional y prohíbe reestructurar por preferencia.
**Decisión.** Código de dominio en `components/<dominio>/` y `lib/{models,services,adapters}/`.
**Consecuencias.** Revisar si un dominio supera ~10 archivos (ARCHITECTURE §10).

### DEC-009 · `/programas` como legado

**Contexto.** `/programas` mezcla mentorías, retos y prácticas. No equivale a cursos (decisión 8 del brief) y su URL está en español.
**Decisión.** Se mantiene sin enlaces en ningún menú. No se migra su modelo `Program` a cursos.
**Consecuencias.** Mentorías y cursos son dominios distintos (OI-010 resuelta). En E-08, cuando existan cursos, `/programas`
se retira o se reparte su contenido en cursos, retos y oportunidades, sin mezclar modelos.

### DEC-010 · Cursos ≠ credenciales

Decisión 8 del brief. `CourseVM` describe un programa; `CredentialVM` un logro obtenido. Un curso puede indicar
`grantsCredential`, pero la credencial solo existe cuando la emite el backend (BE-015).

### DEC-011 · `id` en Admin, `slug` en Public

**Contexto.** El slug puede cambiar al renombrar una empresa; el backoffice necesita una referencia estable.
**Decisión.** `/admin/companies/[id]/edit` y `/companies/[slug]`. Los fixtures llevan ambos campos.
**Consecuencias.** El backend debe resolver slugs antiguos (BE-020).

### DEC-012 · Privacidad por defecto

Decisión 6 del brief. El fixture de perfiles incluye al menos uno privado. El servicio de perfil público devuelve
`{ visibility: 'private' }` sin más campos; la página no recibe datos que no deba pintar.

### DEC-013 · Cabecera única y barra de demo

**Contexto.** Cada espacio tenía su cabecera: Público con el `NavBar` del DS a todo el ancho, Talent con un contenedor
centrado de otra altura y Admin con barra lateral. Al cambiar de espacio el logo y la navegación saltaban de sitio.
Además, la demo se va a presentar al equipo y a stakeholders y necesita recorrerse libremente.
**Decisión.**
- Todos los espacios usan `AppHeader`, que monta el `NavBar` del DS: misma altura, logo siempre en el mismo sitio
  (enlazado al inicio del espacio), enlaces del espacio a su derecha y acciones al final. Solo cambian enlaces y acciones:
  Público lleva búsqueda y "Crear cuenta"; Talent y Admin, avatar; Admin añade `Badge` "Admin CLH" junto al logo; Auth, nada.
- Admin pasa de barra lateral a navegación superior. Talent y Admin comparten `AppShell`.
- `DemoBar` encima de la cabecera, en todas las páginas: enlaces a Público, Talent y Admin CLH con el espacio actual marcado
  y el aviso "Datos de ejemplo". Se apaga con `NEXT_PUBLIC_BEWAY_DEMO_BAR=off`.
**Consecuencias.** Se quitan del pie los enlaces "(demo)". Si Admin o Company crecen a más de 6–7 secciones, revisar
si vuelve la barra lateral (como componente del DS, no local). La `DemoBar` se retira al conectar sesión real.

### DEC-014 · Orden de bloques

Se sigue A → B → C → D → E → F → G. E no se adelanta: backend aún avanza y el orden natural deja los modelos de perfil
y empresa listos antes de encuestas y cursos.

### DEC-015 · Visibilidad del perfil

Solo `private` (por defecto) y `public`. Sin "solo con enlace" ni visibilidad parcial por campo hasta que legal responda (LQ-04).

### DEC-016 · Encuestas publicadas por empresas

**Contexto.** OI-008.
**Decisión.** Toda encuesta la publica una empresa. CLH es una empresa más en el modelo (`cmp-clh`), sin rol especial
en Talent. La audiencia son los jóvenes que siguen a la empresa o están interesados en ella (OI-017).
**Consecuencias.**
- Aparece el concepto **seguir empresa**: botón en la ficha (C-05, simulado) y BE-025.
- `SurveySummaryVM.publisher` apunta a una empresa.
- El editor de encuestas debe servir a la vez para Admin CLH (F-05) y para el Company Portal (`/company/surveys`, G):
  se construye como componente de dominio reutilizable, no como pantalla exclusiva de Admin.

### DEC-017 · Usernames

Se pueden cambiar. El anterior deja de funcionar: `/u/<antiguo>` da 404, sin redirección. El frontend nunca guarda
enlaces a perfiles por username en datos persistentes; usa `userId`.

### DEC-018 · Métodos de acceso

Correo y contraseña. Google y otros proveedores llegan después: el diseño de `/login` y `/signup` deja sitio para
botones de proveedor sin rehacer el layout.

### DEC-019 · Destino de migración

**Contexto.** OI-014. El repo definitivo empezará vacío, con una carpeta `frontend/` y el backend en el mismo repo.
**Decisión.** Este proyecto se mueve entero a `frontend/`. Para que el traslado sea copiar y pegar:
- Todo lo del frontend vive dentro de este proyecto (sin rutas `../` fuera de él).
- Alias relativos a la raíz del proyecto (`@/*`, `@ds`), que siguen valiendo dentro de `frontend/`.
- Configuración por variables de entorno con prefijo `BEWAY_` / `NEXT_PUBLIC_BEWAY_`.
- La URL de la API llegará por variable (`BEWAY_API_URL`), nunca escrita en el código.
**Consecuencias.** Al migrar: actualizar `MIGRACION.md`, revisar la raíz de Turbopack (`turbopack.root`) y los scripts de CI del monorepo.

### DEC-020 · Ficha de empresa

Módulos iniciales: Resumen (obligatorio), Cultura, Programas, Vacantes, Sedes y Fuentes. Habrá más: el modelo de
módulos es una lista abierta. Una ficha está desactualizada si su última revisión tiene más de 180 días (constante única).

### DEC-021 · Credenciales

Cada credencial muestra emisor y fecha, sin sello de "verificada". La ruta antigua `/talent/certifications` equivale
a `/talent/credentials`.

### DEC-022 · Alta de empresa en el registro

La opción "Busco talento" se muestra desactivada con "Próximamente: alta de empresas" hasta el Company Portal (G).

### DEC-023 · Sesión de demostración por cookie

**Contexto.** El bloque B necesita entrar y salir para recorrer la demo, y `/talent/*` y `/admin/*` deben redirigir
al acceso. No hay backend de sesión.
**Decisión.** La cookie `bw_demo` guarda el id de una cuenta de ejemplo (`data/fixtures/accounts.ts`). `lib/session.ts`
la lee en el servidor; `proxy.ts` hace la redirección optimista a `/login?next=<ruta>`; los layouts vuelven a comprobar
rol y sesión. La entrada (`signInAs`) ignora la contraseña: los campos no tienen `name`, así que no viajan.
**Consecuencias.** Las páginas que leen la cookie son dinámicas (la cabecera pública también). La seguridad real
es del backend (BE-001, BE-003). Al llegar la API, `lib/session.ts` y `signInAs` se sustituyen por la sesión real.
`BEWAY_MOCK_ROLES` se retira: los roles de prueba son ahora las cuentas de demostración.

### DEC-024 · Controles con input nativo mientras el design system no los arregle

**Contexto.** `Switch`, `Checkbox` y `Radio` del design system son `<label>` con `onClick` y sin input: no reciben foco
ni responden a teclado. Eso incumple el brief (accesibilidad) en ajustes y registro.
**Decisión.** Se usan `components/forms/ToggleField.tsx`, `CheckField.tsx` y `OptionRadio.tsx` con input nativo y tokens.
Son un patrón nuevo justificado y temporal: se quitan cuando el design system publique las versiones corregidas
(ver [DS_REQUESTS.md](DS_REQUESTS.md), puntos 2 a 4).
**Consecuencias.** `Tag` sí es correcto y se usa tal cual. El DS no se edita en este repo.

### DEC-025 · Un solo guardado por vista y vista previa en vivo

**Contexto.** Ajustes mezclaría interruptores que guardan solos con formularios que guardan al final.
**Decisión.** Cada vista tiene un solo "Guardar cambios" (primario cyan, único). La vista previa de visibilidad
("así lo ve alguien con el enlace") cambia al instante con el interruptor, aunque aún no esté guardado. Las acciones
destructivas (cerrar sesión, eliminar cuenta) van fuera del formulario, en su propia sección.
**Consecuencias.** La cabecera de ajustes sigue al borrador (no al dato guardado).

### DEC-026 · Estilo de app para pantallas de trabajo (taste-skill)

**Contexto.** Las pantallas del bloque B son de trabajo (ajustes, edición, onboarding), no landing. El skill
`taste-skill` tiene una guía de app screens y un estilo para cada tipo de producto.
**Decisión.** Estilo `editorial-greeting` (kind `workspace`, dealt con `--keep palette,type`). Se conserva el movimiento
del estilo: h1 tipográfico, cifras en peso regular, secciones como filas con línea fina, sin tarjetas dentro de tarjetas.
Se descarta `achromatic-ledger` porque exige un primario casi negro y ningún color de marca en el chrome.
Lo que choca con la marca gana la marca: cabecera del design system (no barra lateral), controles de 8 px de radio,
acento cyan solo en el primario, eyebrows permitidos (CLAUDE.md). Razonamiento completo en [DESIGN.md](DESIGN.md).
**Consecuencias.** Los avisos que quedan son deliberados: borde oscuro del tema oscuro (`border-inverse` de la marca),
color del navy en oscuro, editor largo (below-fold), eyebrows del hero y del Styleguide.

### DEC-027 · Tamaño de título en pantallas de trabajo

**Decisión.** Los títulos de pantallas de app usan `text-h2` en móvil y `text-h1` desde `md` (24 px y 32 px). Así cumplen
la regla de app screens (20–24 px en teléfono) y la marca no cambia en escritorio. Las landing y los acceso mantienen
el h1 de marca.

### DEC-028 · Estado de carga y progreso sin números de paso

**Decisión.** El onboarding no escribe "Paso 2 de 4" (la guía de jerarquía lo prohíbe como índice). Muestra el progreso
como dato ("2 de 4 secciones completadas"). En móvil la lista de pasos se sustituye por esa línea y una barra; desde
`md` aparece la lista. Los estados de carga no se animan: la demo lee fixtures.

### DEC-029 · Design system v1.1

**Contexto.** El equipo de diseño entregó la v1.1 en una carpeta de actualización, con un `CAMBIOS.md` que resuelve
los puntos 1 a 11 de [DS_REQUESTS.md](DS_REQUESTS.md).
**Decisión.** Se reemplazó `design-system/` entera por la v1.1, tal como indica el paquete. Se ajustaron cuatro tarjetas
(`elevation="sm"`) y el riel del onboarding (`width={300}`). Los movimientos, las verificaciones y los pendientes están en
[DS_UPDATE_1.1.md](DS_UPDATE_1.1.md). La carpeta de actualización se borró al terminar.
**Consecuencias.** Queda pendiente el punto 12 (conflicto de `background` en `Button`) y X-04. Los controles locales de
DEC-024 pueden sustituirse por los del DS en un paso aparte.


### DEC-030 · La cabecera sigue a quien mira

**Contexto.** DEC-013 unificó la cabecera dentro de cada espacio, pero la navegación dependía de la carpeta de la ruta.
`/companies` (grupo público) y `/u/[username]` (sin layout, y por tanto sin cabecera ni barra de demo) se abren desde
Talent con la misma URL que ve un visitante. Al pulsar "Empresas" o "Perfil" desde Talent la navegación cambiaba por la
pública (solo "Empresas", con búsqueda y sin "Perfil") o desaparecía.
**Decisión.**
- `SiteHeader` sigue a la sesión: con rol `talent` usa `talentNav` (la misma que dentro del espacio); sin sesión, `publicNav`
  con búsqueda y accesos. Vale para la landing, los legales, contacto y el 404 global.
- Nuevo grupo `app/(shared)/` para las pantallas con una sola URL para visitantes y miembros: `companies/`,
  `companies/[slug]` y `u/[username]`. Su layout usa `ViewerShell`: con sesión, `AppShell space="talent"` (misma cabecera,
  barra de demo en Talent, sin pie); sin sesión, `SiteHeader` y pie público.
- `NavItem.alsoActive` (`/u/:me`) marca "Perfil" como actual en el perfil propio, al que se llega por `/talent/profile`.
- "Mi espacio" solo aparece si la cabecera no trae ya "Inicio" (acceso y registro con sesión).
**Consecuencias.** Un miembro nunca ve la navegación pública. Para ver la web como visitante hay que cerrar sesión: la
barra de demo marca "Público" en la landing y los legales, pero no cambia la navegación. Los 404 y errores de `(shared)`
se pintan dentro del marco de quien mira. El "Inicio" de los breadcrumbs sale de `homeFor(signedIn)` (`lib/routes.ts`).
Una pantalla nueva que sirva a visitantes y a miembros con la misma URL va en `(shared)`; no se crean cabeceras propias.

### DEC-031 · Ficha de empresa en pestañas por módulo

**Contexto.** C-02 pide módulos (DEC-020) y un índice navegable; la ficha de una empresa con cinco módulos es larga en móvil.
**Decisión.**
- `Tabs` del DS: una pestaña por módulo con contenido, más "Fuentes" al final. Las fuentes **no** son un módulo
  (`CompanyModuleKind` no incluye `sources`): `SourceVM` lleva `id` y cada módulo cita `sourceIds`; el pie del módulo
  nombra sus fuentes y enlaza a la pestaña "Fuentes".
- La pestaña activa vive también en `?tab=<kind>` (con `history.replaceState`, sin recargar) para poder compartir el enlace.
  Un valor inválido cae en la primera. Flechas, Inicio y Fin cambian de pestaña; en móvil la fila se desplaza en horizontal.
- Cabecera: banner con el logo en chip blanco (como `CompanyCard`) y el título **debajo**, nunca sobre la foto. Así el
  contraste no depende de la imagen ni del degradado. Sin `cover`, el banner es el degradado de marca (uno por pantalla).
- Un módulo sin contenido no llega del servicio. Una ficha sin ningún módulo muestra `PageState empty` dentro de la ficha.
- Aviso de desactualización con `Alert tone="warning"` y la fecha concreta si pasan 180 días (DEC-020).
**Consecuencias.** `Tabs` del DS no tiene `aria-controls`, flechas ni desplazamiento: se suplen aquí y se piden en
[DS_REQUESTS.md](DS_REQUESTS.md) (punto 13). La URL canónica queda pendiente de dominio (OI-020).

### DEC-032 · Catálogo en servidor y seguimiento simulado

**Contexto.** C-03 pide filtros y búsqueda en la URL; C-05 pide seguir empresas sin backend.
**Decisión.**
- `/companies` resuelve texto, categoría y página en servidor con `getCompanies` (`?q=`, `?category=<slug>`, `?page=`). El
  cliente solo actualiza la URL: el texto espera 300 ms tras la última tecla y usa `replace`; la paginación usa `push`.
  Un valor que no existe se ignora. Las categorías salen de las fichas publicadas (un borrador no crea categoría).
- Seguir y dejar de seguir llama a una acción de servidor que devuelve `{ simulated: true }` y avisa con `Toast`
  "Simulación". El cambio se aplica sobre el fixture en `sessionStorage`, por cuenta, y se pierde al cerrar la pestaña.
  "Empresas que sigues" (perfil propio) refleja esos cambios.
- Esa lista solo se carga y se pinta para su titular: ni en el HTML de un perfil ajeno.
- Sin sesión, "Seguir" lleva a `/signup`.
**Consecuencias.** Al llegar BE-008 y BE-025 desaparece `components/company/follow-store.ts` y el servicio lee de la API.


### DEC-033 · Dashboard Talent: un paso, cinco apartados y sugerencias por categoría

**Contexto.** D-01 pide componer el inicio de Talent con completitud de perfil, empresas sugeridas (sin "matching") y accesos rápidos.
La versión básica traía cuatro tarjetas de cifras (visibilidad, intereses, habilidades, experiencia), "Tu cuenta" y las tres primeras
empresas del catálogo, que no eran sugerencias.
**Decisión.**
- Módulos: cabecera con saludo, hallazgo y el único `primary`; "Qué falta en tu perfil" (se oculta con el perfil completo);
  "Empresas de tus intereses"; "Accesos rápidos" (solo rutas `live`). Se retiran las cifras y "Tu cuenta": no responden la pregunta
  de la pantalla (DESIGN.md) y los ajustes ya tienen su ruta. Encuestas y cursos entran con E-09.
- El `primary` es el paso siguiente con nombre propio ("Añadir formación") y enlaza al apartado del editor por ancla. Con el perfil
  vacío es "Empezar mi perfil" (onboarding); con el perfil completo no hay `primary` (OI-021).
- Elemento propio de la pantalla: una barra de cinco segmentos, uno por apartado del porcentaje (relleno = listo, borde = falta). Es
  información real, no una puntuación: no hay degradado, animación ni número que no esté en el título. Usa `fg-heading` y
  `line-control` para mantener contraste en los dos temas.
- Sugerencias: fichas publicadas cuya categoría coincide con un interés, sin las que ya sigue. Sin orden por afinidad ni "match"
  (decisión 11 del brief). Es el mismo supuesto que OI-017 para la audiencia de encuestas. Se aplican encima los seguimientos
  simulados de la sesión (C-05), para que seguir una empresa la quite de la lista al volver.
- El frontend compone el resumen en `getTalentDashboard` con perfil, ajustes, empresas seguidas y empresas por intereses; BE-021
  puede ser un agregado o tres lecturas sin tocar la pantalla.
- `CompanyRow` pasa a ser un componente compartido con "Empresas que sigues". Las secciones del editor ganan `id`
  (`datos-basicos`, `sobre-ti`, `experiencia`, `formacion`, `intereses`) y `scroll-mt-32` para enlazarlas bajo la cabecera fija.
**Consecuencias.** Una persona con el perfil vacío y una que terminó el onboarding con solo su nombre se ven igual: hasta que BE-005
diga si hizo el onboarding, ambas ven "Empezar mi perfil". `Button` del DS fija `margin: 0` en línea, así que ninguna clase de margen
(`-ml-4`) funciona en los botones `ghost`: sus etiquetas quedan 16 px a la derecha del texto (DS_REQUESTS, punto 17).
