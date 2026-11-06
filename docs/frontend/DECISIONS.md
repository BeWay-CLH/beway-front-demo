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


### DEC-034 · Encuestas, cursos y credenciales: filas de trabajo, controles del DS y estado de sesión

**Contexto.** El bloque E son pantallas de trabajo con listas (encuestas, cursos, credenciales) y un flujo (responder). DEC-024 había dejado
controles locales con input nativo porque `Radio`, `Checkbox` y `Switch` del DS no recibían foco; la v1.1 (DEC-029) los corrigió.
**Decisión.**
- Cada lista es una sola tarjeta con filas de dos líneas (patrón *inbox* del skill de estilo), no una rejilla de tarjetas: logo en chip blanco,
  título con un solo sello de estado, una línea de apoyo, **por qué la ves** (encuestas), la fecha que importa y la acción. Las acciones tienen ancho
  fijo y solo una fila por pantalla lleva el `primary` cyan (la encuesta que antes cierra); los cursos no llevan ninguno (el cyan es el filtro activo).
- La encuesta usa `RadioGroup`, `Checkbox`, `Input` y `Textarea` del DS directamente, cada pregunta como `fieldset` con `legend`. Los controles locales
  de `components/forms/` siguen en B hasta un paso aparte (DEC-029).
- La elegibilidad (`follows` / `interested` / `not-eligible`) se calcula en el servicio con a quién sigue la persona y sus intereses (OI-017); no
  vive en el fixture. Lo no elegible se lista aparte, con motivo y camino a la ficha de la empresa (máx. 3).
- El estado de sesión (borrador, "completada", "me interesa") vive en `sessionStorage` con try/catch (`components/demo-store.ts`), por cuenta; nunca
  en un fixture. Los listados parten de lo que dice el servidor y le aplican ese estado, como "Empresas que sigues" (DEC-032).
- Enviar una encuesta o marcar interés llama a una acción de servidor que devuelve `{ simulated: true }` y se avisa como "Simulación" (DEC-006).
- Pestañas con `KeyboardTabs`, que añade a `Tabs` del DS las flechas y el panel nombrado (DS_REQUESTS, punto 13).
**Consecuencias.** Al llegar BE-010…BE-015 se sustituyen los cuerpos de los servicios y desaparecen `demo-store.ts` y `survey-store.ts`. Las pantallas
no cambian.

### DEC-035 · `/programas` redirige a `/companies` (E-08)

**Contexto.** DEC-009 dejó `/programas` como legado: mezcla mentorías, retos y prácticas, no es un catálogo de cursos y su URL está en español.
**Decisión.** `app/(public)/programas/page.tsx` redirige (307) a `/companies`, donde cada ficha ya tiene el módulo "Programas" (DEC-020), y se borra
`ProgramasView.tsx`. El modelo `Program` de `data/mock.ts` se conserva solo porque el inicio de Admin cuenta con él (F-01).
**Consecuencias.** Un enlace compartido sigue funcionando. Cuando existan retos y oportunidades (G), esa URL puede apuntar a ellos. Mentorías y
cursos siguen siendo dominios distintos (OI-010).

### DEC-036 · Cabecera plegable hasta `lg` y sellos de estado en frase

**Contexto.** Con Encuestas, Cursos y Credenciales activos, la cabecera de Talent tiene seis enlaces. A 768 px la fila desbordaba 196 px y el
último enlace tocaba el borde. El `inspect` del skill de estilo lo detectó; la revisión a 1280 y 390 px no.
**Decisión.**
- `AppHeader` pliega la navegación en el menú desplegable por debajo de `lg` (1024 px) cuando hay más de cuatro enlaces; con cuatro o menos
  (público y Admin) mantiene `md`. Las clases son literales para que Tailwind las vea.
- `StatusBadge` (`components/StatusBadge.tsx`) es el `Badge` del DS con el texto en frase y sin tracking, para los sellos de estado de las filas
  ("En curso", "Cerrada"). El DS los pinta en mayúsculas con tracking y tres o cuatro seguidos leen como una franja de etiquetas. Color e icono
  siguen siendo del DS; el `Badge` de la cabecera ("Admin CLH") no cambia.
**Consecuencias.** Petición al DS (punto 18): una prop para el caso del texto. Los avisos del `inspect` que se defienden: `icon-tiles` (son logos
de empresa en chip blanco, regla de marca), `panel-void` en el inicio y en credenciales (tarjetas hermanas con distinto número de filas, que comparten el borde
inferior y llevan la acción fijada al pie; lo que el propio skill prevé en §4.2) y `hero-void` en credenciales, una pantalla que cabe entera en el primer pantallazo
con solo dos logros y sin contenido que inventar.

### DEC-037 · Acento navy y teal, sin cian en acciones (corrección visual, D2)

**Contexto.** La guía de correcciones de los fundadores (2026-10-29) fija navy para el primario y teal para progreso y estados. El DS tenía cian `#00D4FF` como acento de acción, foco y enlace, y `CLAUDE.md` lo exigía ("cian como único acento").
**Decisión.** Se toma la referencia: primario navy con texto blanco; teal solo para progreso, estados y marcas; cian solo como arte de marca. Los tokens se cambian en `design-system/tokens.json` (ver `DS_CAMBIOS.md`). `CLAUDE.md` se actualiza en el mismo cambio.
**Consecuencias.** Un primario navy por vista. El filtro de categoría seleccionado es navy. El texto teal usa `accent-teal-strong` (ver DEC-039). Se supera la regla "un primario cian por vista" de `CLAUDE.md`.

### DEC-038 · Edición del design system con registro (corrección visual, D1)

**Contexto.** Los estilos del DS van en línea; los overrides desde Tailwind no alcanzan sin `!`. La regla "no editar `design-system/`" bloqueaba el cambio. Los fundadores autorizaron editarlo.
**Decisión.** Se edita `design-system/` cuando el choque es de componente o de token. Cada cambio queda en `docs/correcciones-visuales/DS_CAMBIOS.md` (archivo, antes, después, motivo) para reaplicarlo si el DS se reemplaza. Los overrides en `components/` solo como puente temporal.
**Consecuencias.** `design-system/` ya no es de solo lectura en este repo, con registro. `CLAUDE.md` y `docs/frontend/README.md` lo dicen. `DS_REQUESTS.md` sigue siendo la vía para pedir cambios al origen.

### DEC-039 · Contraste: valores que cumplen, con reporte a los fundadores (corrección visual, D3)

**Contexto.** Con los valores de la referencia, el texto secundario da 3,8:1, el teal como texto 2,5:1 y el borde de campo 1,3:1. `CLAUDE.md` exige 4,5:1 para texto y 3:1 para controles.
**Decisión.** Texto secundario `#5F6B7D` (5,4:1); teal de texto e iconos `#037A78` (5,2:1); borde de control sin cambio (`#7B8BA1`, 3,5:1). El teal `#04B8B6` queda para relleno de progreso. Las diferencias se reportan en `DS_CAMBIOS.md` §4.
**Consecuencias.** Pequeñas diferencias de tono frente a la referencia. Los fundadores pueden pedir fidelidad exacta, asumiendo el contraste.

### DEC-040 · Modo oscuro conservado y derivado (corrección visual, D4)

**Contexto.** La referencia no define tema oscuro; el DS sí.
**Decisión.** Se conserva el modo oscuro. Los tokens nuevos (navy, teal, paper, ink, muted) reciben valores oscuros derivados y comprobados por contraste (texto secundario `#B3BDCC`, acento de texto `#5EE0DE`). El primario se invierte a paper con texto navy.
**Consecuencias.** Cada pantalla se revisa en claro y oscuro antes de cerrarse (regla de `CLAUDE.md`).

### DEC-041 · Pantallas del bloque G construidas "en proceso" (corrección visual, D5)

**Contexto.** Aula, evaluación, challenges, miniproyectos, oportunidades, candidatura y ayuda no tienen modelo ni ruta. `DEC-004` prohíbe rutas sin construir, y el brief deja G para después.
**Decisión.** Los fundadores piden verlas ya, marcadas "En proceso". Cada pantalla se crea con su ruta y un estado visible "En proceso", sin escrituras reales y sin datos inventados. Se construyen por fases (04, 05, 07) con fixtures `TODO(seed)` y escrituras simuladas.
**Consecuencias.** `DEC-004` deja de aplicarse a estas rutas mientras estén marcadas "En proceso". Ninguna pantalla "En proceso" presenta éxito real.

### DEC-042 · Rutas en inglés, etiquetas de la referencia (corrección visual, D6)

**Contexto.** La referencia usa rutas de prototipo en español (`#/empresas`, `#/perfil`).
**Decisión.** Se mantienen las rutas en inglés (`DEC-002`, `ROUTES.md`). La navegación y los títulos usan las etiquetas de la referencia en español ("Certificaciones", "Mi panel", "Mi perfil").
**Consecuencias.** Un enlace compartido de la referencia no abre la demo. Aceptado por los fundadores ("mantener el orden y congruencia").

### DEC-043 · Nombres reales de empresas con permiso; logos como placeholders (corrección visual, D7)

**Contexto.** Las 17 fichas corporativas usan nombres, logos y colores de marcas reales. Los fundadores confirman el permiso de las empresas.
**Decisión.** Se usan los nombres reales. Los logos y portadas no están en el repo: se usan placeholders `TODO(seed)` (color base e iniciales), y no se dibujan logos a mano. Descargar los archivos oficiales requiere confirmación explícita antes de versionarlos.
**Consecuencias.** Las fichas se ven como demo en vivo sin logos oficiales hasta que se confirme su origen.

### DEC-044 · Contexto de producto con `PRODUCT.md` (corrección visual, D10)

**Contexto.** El skill de diseño impeccable exige un `PRODUCT.md` con la verdad del producto antes de trabajar en visual.
**Decisión.** Entrevista corta (2026-11-05): usuario principal, talento; propuesta, programas de empresas con evidencias. El archivo `PRODUCT.md` en la raíz recoge lo confirmado y marca como abierto lo que no lo está (métricas de éxito, usuarios secundarios).
**Consecuencias.** Las decisiones visuales se revisan contra ese archivo. No se fijan estilos en él.

### DEC-045 · Cabecera en dos filas y cuenta en ventanas (corrección visual, fichas 01 y 06)

**Contexto.** La referencia pide dos filas (logo y buscador; navegación), alturas por contexto y la cuenta (menú personal y notificaciones) en ventanas centradas. El DS tenía una fila de 76 px, y `DEC-013` fijaba una sola altura.
**Decisión.** `NavBar` pasa a dos filas con alturas por contexto (83 y 57 por defecto; 66 y 46 en directorio; 58 en ficha). La cuenta abre dos ventanas de 740 px con el `Dialog` del DS. La navegación de talento sigue el orden de la guía (`lib/routes.ts`). Se mantiene el menú plegable por debajo de lg/md (`DEC-036`) hasta la fase 02, donde la navegación móvil pasa a fila desplazable (ficha 07; cambia `DEC-007`).
**Consecuencias.** Cambia `DEC-013` (altura única) y se completa `DEC-036`. Pendiente de confirmar la fila móvil en la fase 02.

### DEC-046 · Seed de las 17 fichas: fuente en `data/seed/` y adaptador puro (Tarea 2)

**Contexto.** El paquete de la Tarea 2 trae 17 empresas que no existen en el repo (el fixture tiene 11 fichas de ejemplo, de las que 10 están publicadas). No hay base de datos ni API: los datos son fixtures tipados. El paquete no es parte del código y no debe leerse desde `docs/`.
**Decisión.** `data/seed/companies.content.v2.json` es una copia íntegra del JSON consolidado del paquete (SHA-256 igual al original). `lib/seed/companies-adapter.ts` lo convierte en `CompanyRecord` con una función pura, sin efectos. `lib/seed/companies.ts` lo carga una vez. `lib/services/companies.ts` sigue siendo la única puerta a los datos. Ver [SEED_EMPRESAS.md](SEED_EMPRESAS.md).
**Consecuencias.** Actualizar el paquete es reemplazar el JSON y correr `npm run seed:check`. Los tipos de ficha son aditivos (`CompanyPackageVM`, opcional en `CompanyRecord`); las fichas de ejemplo no cambian.

### DEC-047 · Seeding idempotente sin base de datos

**Contexto.** El prompt exige no duplicar empresas al ejecutar el seed dos veces. Aquí no hay almacén que upsert.
**Decisión.** El seed es una función determinista. La fusión con los fixtures es por `slug` e `id`: gana el primero y las repeticiones se descartan y se cuentan. `npm run seed:check` (script `scripts/check-company-seed.mjs`) comprueba conteos, slugs únicos, idempotencia (dos ejecuciones iguales) y que repetir la fusión deja 17 empresas. La clave estable es `cmp-<slug>`.
**Consecuencias.** Con un backend real, el upsert se hace por `cmp-<slug>` (BE-026). El check no toca datos ni escribe ficheros.

### DEC-048 · Las fichas de ejemplo se conservan

**Contexto.** El fixture tiene 11 fichas de ejemplo que usan el resto de la demo (seguimientos, encuestas, dashboard).
**Decisión.** Ninguna se borra ni se modifica. Las 17 nuevas se suman. El catálogo queda con 27 empresas publicadas (10 de ejemplo y 17 del paquete).
**Consecuencias.** `homeStats` (86 empresas) sigue siendo cifra estática y no se recalcula. Los slugs de las 17 no chocan con ninguno de ejemplo (lo comprueba el check).

### DEC-049 · Categoría del catálogo derivada del sector

**Contexto.** El paquete trae `sector` en texto libre ("Educación jurídica y negocios") pero no categoría. El catálogo filtra por categoría y los intereses del perfil usan las de ejemplo.
**Decisión.** Tabla explícita en el adaptador: Finanzas, Educación, Tecnología, Consultoría, Consumo, Medios y Seguros, con icono Lucide. El sector completo pasa a la ficha como "Sector".
**Consecuencias.** Las categorías nuevas aparecen como filtros en `/companies`. `interestOptions` no cambia: los perfiles siguen eligiendo las cinco de siempre.

### DEC-050 · Sin imágenes remotas ni descargas

**Contexto.** Los logotipos, portadas y fotos del paquete son URLs de un prototipo en GitHub Pages. DEC-043 exige placeholders `TODO(seed)` hasta confirmar el origen oficial, y el prompt prohíbe importar fotos sin permiso.
**Decisión.** La ficha muestra la inicial sobre el color base y el degradado de marca, como las fichas de ejemplo. Ninguna imagen se descarga ni se enlaza. Los programas en PDF/TXT del prototipo tampoco se exponen. **Excepción pedida por el prompt:** el CSV del caso de Netflix se enlaza como "Descargar los datos del caso (CSV ficticio)"; sigue alojado en el prototipo (OI-025).
**Consecuencias.** Las 17 fichas se ven con inicial y degradado hasta que haya logotipos confirmados. El check cuenta exactamente un enlace a `github.io` en las fichas.

### DEC-051 · Embajadores CLH: sin nombres hasta tener autorización

**Contexto.** Las 85 apariciones de embajadores (5 por empresa) tienen `authorization: null` y la relación dice "propuesta/ejemplo en la demo, no personal de la empresa". La DoD exige que ningún dato privado aparezca en pantallas públicas. Y el nombre llega al cliente en la carga de la página, aunque no se pinte.
**Decisión.** Solo entra al modelo el perfil con autorización (`AmbassadorVM`). Los demás se cuentan (`ambassadorsPending`) y la pestaña dice cuántos hay y que se publicarán con la autorización. Los nombres no salen del servidor. El render del perfil existe y se activa cuando `authorization` tenga valor. Ninguna foto se importa (`imageUrl`).
**Consecuencias.** La pestaña "Embajadores" aparece en las 17 fichas con un aviso, sin nombres. Cuando se defina el formato de `authorization` hay que revisar `toAmbassador` (OI-026, LQ-11). **Superada en parte por DEC-059** (2026-11-06): los nombres ya se muestran.

### DEC-052 · Estados sin falsas convocatorias

**Contexto.** El paquete mezcla propuestas BEWAY (19 formaciones, 17 retos, 43 miniproyectos), catálogos externos publicados, concursos oficiales externos e históricos. Ningún dato confirma convocatorias abiertas, inscripciones ni certificaciones verificadas.
**Decisión.** `beway_proposal` se llama "Propuesta BeWay" y no es una oferta de la empresa. `external_published` es "Catálogo externo" e `external_official` es "Iniciativa oficial externa", sin implicar convenio. Todas las formaciones llevan "Certificación no verificada" (`certificateVerified: false`). Ningún reto tiene `applicationUrl`, así que no hay botón de inscripción. Un reto cerrado o histórico muestra su estado "Cerrado" y, si existe, su enlace oficial informativo. Solo `officialReferenceUrl` aparece como "Ver la convocatoria oficial". La pestaña de cada tipo lleva una nota fija.
**Consecuencias.** Si la fuente confirma una inscripción, habrá que añadir un CTA con su condición (DEC-052 se reabre). `seed:check` falla si el paquete trae `enrollUrl` o `applicationUrl`.

### DEC-053 · Becas con la fecha de la fuente

**Contexto.** Las becas de Santander son del 21 de octubre de 2026 (`sourceAsOf`). Hoy es 6 de noviembre y el paquete indica "revalidar antes de publicar".
**Decisión.** Se muestra el estado tal como lo dio la fuente, con su fecha y "Cerrada según la fuente", "Consultar el plazo en la convocatoria" o "Abierta según la fuente; comprobar hoy". Nunca se dice "abierta" a secas. El importe y la bonificación ReBeca salen con su calificador ("hasta", "€ brutos").
**Consecuencias.** La tabla de becas lleva la fecha de la fuente en su pie. Revalidar antes de publicar (OI-027).

### DEC-054 · Pestañas del paquete en la ficha

**Contexto.** La ficha tenía los módulos Resumen, Cultura, Programas, Vacantes, Sedes y Fuentes (DEC-020). El paquete trae formación, retos, miniproyectos, embajadores, recursos, becas, grados y másteres y marcas.
**Decisión.** Cada colección es una pestaña que solo aparece si tiene datos (igual que los módulos vacíos). Usan los patrones de la ficha y del DS (`Badge`, `Tag`, `Table`, `Button`, `Card`, `EmptyState`). Sin componentes nuevos en el DS ni cambios de estilo. El titular de la fuente (`sectionHeadings`) es el encabezado de cada pestaña. La cabecera (`heroActions`) lleva a su pestaña.
**Consecuencias.** Hasta 7 pestañas por ficha (Resumen, hasta cinco del paquete y Fuentes), con desplazamiento horizontal como ya tenía la barra. Ver [SEED_EMPRESAS.md](SEED_EMPRESAS.md).

### DEC-055 · Recursos de marca fuera de "Recursos"

**Contexto.** En L'Oréal, sus 12 marcas se repiten como 12 recursos (`state: brand`).
**Decisión.** La pestaña Recursos no los muestra; aparecen en Marcas. El dato sigue en `data/seed/`, sin borrar nada.
**Consecuencias.** Recursos de L'Oréal: 0 en la pestaña. El check lo cuenta así.

### DEC-056 · Destino de los CTA de la cabecera

**Contexto.** `heroActions` apunta a una sección de la fuente (`learning`, `challenges`, `resources`, `scholarships`).
**Decisión.** Cada CTA lleva a su pestaña, y solo si existe. Excepción documentada: en Garrigues, "Ver grados y másteres" apunta a `resources` en la fuente y el adaptador lo lleva a "Grados y másteres". Es una corrección de destino, no de contenido.
**Consecuencias.** Un CTA cuyo destino no existe no se muestra.

### DEC-057 · Cifras de la tarjeta del catálogo

**Contexto.** La tarjeta del catálogo tiene cinco cifras (guía de correcciones, ficha 04). Retos y oportunidades salían de `stats`, que el paquete no trae.
**Decisión.** Miniproyectos cuenta los del paquete (las de ejemplo siguen en "—"). Retos y oportunidades se muestran como "—": el paquete no indica convocatorias abiertas, así que un número en esa cifra sería falso. Certificaciones y encuestas siguen su fórmula de siempre, que da 0 para las 17.
**Consecuencias.** Las tarjetas nuevas tienen dos cifras de "—". Cuando haya convocatorias vigentes, `metricsFor` cambia por su fuente.

### DEC-058 · Avisos visibles y notas de revisión del paquete

**Contexto.** Cada ficha trae `metadata.importantNotices`. Son notas para el equipo ("no crear un proyecto separado", "revalidar antes de publicar", "no incluir contratación de alcohol en BEWAY"). Algunas se contradicen con la copia pública (la demo y el prototipo). Otras son avisos útiles, pero ya están cubiertos por los campos estructurados (certificación no verificada, presupuesto no es premio, iniciativa oficial externa, cerrado).
**Decisión.** No se muestran tal cual. La ficha muestra un aviso fijo "Datos a confirmar" con la fecha de revisión y la lista `requiresLiveReview` (convocatorias activas, plazos, precios, certificaciones, licencias de imágenes). Las notas se quedan en `data/seed/` para la revisión editorial de Admin (F) (OI-027).
**Consecuencias.** Hay que redactar en español público los avisos que el equipo considere imprescindibles antes de publicar.

### DEC-059 · Embajadores CLH con nombre y etiqueta de autorización pendiente (supera en parte DEC-051)

**Contexto.** DEC-051 ocultaba los nombres de los 85 embajadores hasta tener autorización. El responsable de producto decidió mostrarlos (2026-11-06). Ningún embajador tiene `authorization` registrada en el paquete.
**Decisión.** La pestaña Embajadores lista a todas las personas con nombre, organización y país. Cada una sin autorización lleva la etiqueta «Pendiente de autorización». No se importa ninguna foto (`imageUrl` sigue fuera, DEC-050). La cifra de pendientes sale del modelo: `ambassadorsPending` se elimina y `AmbassadorVM` gana `authorized`.
**Consecuencias.** Los nombres de personas reales (o de ejemplo del prototipo) salen en la página y en su HTML, sin consentimiento registrado. Antes de publicar en producción hay que resolver el consentimiento (LQ-11, OI-026). Para volver a ocultarlos basta con filtrar en `toCollections` (`companies-adapter.ts`).

### DEC-060 · Las 17 fichas de fase 03 se alimentan con el paquete

**Contexto.** En `origin/main` la fase 03 ya tiene 17 fichas corporativas (`data/fixtures/brands.ts` y `components/brand/BrandPage.tsx`): las mismas empresas, con las composiciones de la guía (arquetipo, colores, altura, fuentes y orden de bloques). Sus textos y cifras son de ejemplo y se sirven por `/companies/<slug>` antes que la ficha genérica. Con dos fuentes para las mismas 17 empresas, el paquete no se veía y Garrigues aparecía dos veces.
**Decisión.** La composición de `brands.ts` queda solo como diseño. Los datos de cada ficha salen del paquete (`data/seed/`, DEC-046) y `BrandPage` pinta cada bloque con ellos. Se eliminan `brandCompanyRecords` y las cifras a cero de fase 03; `data/fixtures/companies.ts` vuelve a tener solo las 11 fichas de ejemplo. La cabecera dice "Ficha de empresa · {sector}" en lugar de "Ficha de ejemplo".
**Consecuencias.** Cambian los datos y el contenido de cada bloque. No cambian el arquetipo, los colores, las alturas, las fuentes ni el orden de bloques. DEC-046 deja de crear registros separados para estas 17.

### DEC-061 · Slug y nombre de las 17 fichas

**Contexto.** El prompt pide no reemplazar slugs consolidados, y fase 03 usa `garrigues` (no `centro-garrigues`). Retos, oportunidades y cursos buscan la marca por nombre (`brandBySlug(...).name`, `brands.find(b => b.name === course.provider)`). La guía escribe "McKinsey & Company", "SILBON", "HEINEKEN" y "L'Oréal".
**Decisión.** El slug del repo es `garrigues` (id `cmp-garrigues`), y `CentroGarriguesxBeway` se asocia a él. Para McKinsey, Silbon, Heineken y L'Oréal se muestra el nombre de la guía (`name` en `PACKAGE_COMPANIES`). El resto de nombres es el del paquete.
**Consecuencias.** `/companies/centro-garrigues` deja de existir (404) y la ficha vive en `/companies/garrigues`. `seed:check` falla si el nombre de una composición no coincide con el de su registro.

### DEC-062 · Bloques de la ficha alimentados por el paquete

**Contexto.** Las composiciones de fase 03 tienen bloques con los nombres de la guía (Certificaciones, Challenges, Miniproyectos...). No hay bloque para recursos ni para los grados de Garrigues.
**Decisión.** Mapa de bloques: `sobre` ← resumen (texto, datos y web); `curso` ← formación, renombrado "Formación" porque el paquete no trae certificaciones verificadas; `challenges` y `brandstorm` ← retos; `miniproyectos` ← miniproyectos; `embajadores` ← embajadores (DEC-059); `becas` ← becas (Santander); `grados` ← programas académicos (bloque nuevo, en lugar de `ecommerce` en Garrigues); `marcas` ← marcas (L'Oréal); `herramientas`, `servicios`, `ecosistema` y `tienda` ← recursos de la empresa. Si la composición no tiene ninguno de esos cuatro, se añade `recursos` (Instituto BME, McGraw Hill, Garrigues, IBM, Santander y Netflix).
**Consecuencias.** Cada recurso aparece una sola vez por página. Las 40 herramientas de Google se agrupan por categoría en `herramientas`.

### DEC-063 · Bloques sin datos y menú local

**Contexto.** Ecommerce y cierre no tienen datos en el paquete. Oportunidades y encuestas tampoco, aunque sí existen en Beway. Algunos menús de fase 03 apuntaban a anclas que no existen (`ecosistema` en IBM).
**Decisión.** Ecommerce y cierre muestran "Próximamente." sin enlace, como pide la guía. Oportunidades y encuestas siguen enlazando a su sección de Beway. El menú local solo lista bloques que existen en la composición.
**Consecuencias.** Algunas fichas muestran bloques "Próximamente.": es la señal honesta de lo que el paquete no cubre.
