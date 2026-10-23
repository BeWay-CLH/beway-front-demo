# Necesidades para backend

Lo que el frontend va a necesitar. **No son endpoints existentes ni propuestos como URL**: son operaciones con sus
datos, permisos y errores. El backend decide forma, transporte y DTOs; el frontend escribirá adapters
([FRONTEND_MODELS.md](FRONTEND_MODELS.md#adapters-cuando-exista-la-api)).

Estado de todas: **Pendiente — DTO por definir**, salvo que se indique.

## Resumen

| ID | Operación | Pantallas | Bloque |
|---|---|---|---|
| BE-001 | Sesión, identidad y roles | Todas las privadas | A/B |
| BE-002 | Alta, verificación de correo, acceso, cierre de sesión | `/signup`, `/login` | B |
| BE-003 | Autorización de operaciones Admin y registro de auditoría | `/admin/*` | A/F |
| BE-004 | Guardar el onboarding | `/talent/onboarding` | B |
| BE-005 | Leer perfil por username respetando visibilidad | `/u/[username]`, `/talent/profile` | B |
| BE-006 | Editar el perfil propio | `/talent/profile/edit` | B |
| BE-007 | Cuenta y privacidad | `/talent/settings` | B |
| BE-008 | Catálogo de empresas publicadas | `/companies` | C |
| BE-009 | Ficha de empresa por slug | `/companies/[slug]` | C |
| BE-010 | Encuestas disponibles para el usuario | `/talent/surveys` | E |
| BE-011 | Detalle de encuesta | `/talent/surveys/[slug]` | E |
| BE-012 | Guardar borrador y enviar respuestas | `/talent/surveys/[slug]` | E |
| BE-013 | Catálogo de cursos | `/talent/courses` | E |
| BE-014 | Detalle de curso e interés de inscripción | `/talent/courses/[slug]` | E |
| BE-015 | Credenciales del usuario | `/talent/credentials`, perfil | E |
| BE-016 | Fichas de empresa en el backoffice: listar, editar, enviar a revisión | `/admin/companies*` | F |
| BE-017 | Cola editorial: aprobar, pedir cambios, publicar | `/admin/reviews` | F |
| BE-018 | Gestión de encuestas | `/admin/surveys` | F |
| BE-019 | Gestión de cursos | `/admin/courses` | F |
| BE-020 | Unicidad y redirección de slugs y usernames | Ficha, perfil | B/C |
| BE-021 | Resumen del dashboard Talent | `/talent/dashboard` | D |
| BE-022 | Formulario de contacto | `/contact` | B |
| BE-023 | Recuperación de contraseña | `/forgot-password` | B |
| BE-024 | Cifras públicas de la landing | `/` | A-08 |
| BE-025 | Seguir y dejar de seguir empresas | `/companies/[slug]`, perfil propio, audiencia de encuestas | C |

---

> **Estado (bloque B, demo):** el frontend ya usa estas operaciones con datos de ejemplo. La sesión es la cookie
> `bw_demo` con el id de una cuenta de ejemplo (DEC-023). Lo que espera del backend está en cada BE.

### BE-001 · Sesión, identidad y roles
- **Necesita:** `userId`, `username`, `displayName`, `roles[]` (`talent`, `company`, `admin`), si el correo está verificado y si el onboarding está completo.
- **Uso:** guards de layout, redirección a `/login?next=` desde `proxy.ts`, cabeceras de los shells.
- **Permisos:** el backend es la única autoridad; el frontend solo decide qué pantalla mostrar.
- **Errores:** sesión caducada → la UI lleva a `/login?next=`.
- **Preferencia:** cookie httpOnly; nada de tokens en `localStorage`.
- **Frontend hoy:** `lib/session.ts` lee `bw_demo`; `proxy.ts` redirige. Al llegar la API se sustituye la lectura por la
  verificación real de la cookie del backend, sin tocar las pantallas.

### BE-002 · Alta, verificación, acceso
- **Entradas alta:** nombre completo (2–80), correo, contraseña (≥ 8), intención (`talent`/`company`, OI-007), aceptación de términos con versión.
- **Entradas acceso:** correo y contraseña (DEC-018). Google y otros proveedores, después: conviene que el modelo de
  identidad admita varios métodos por cuenta desde el principio.
- **Estados que la UI pinta:** correo ya registrado · verificación pendiente · enlace caducado · credenciales incorrectas · cuenta bloqueada · demasiados intentos.
- **Auditoría:** alta, verificación, acceso fallido.
- **No filtrar** si un correo existe en mensajes de acceso o recuperación.

### BE-003 · Autorización Admin y auditoría
- Toda operación de BE-016…BE-019 exige rol `admin` en servidor.
- Registro de auditoría: quién, cuándo, qué entidad, qué cambió (antes/después). Solo visible en `/admin/companies/[id]/audit` (LATER).
- **Errores:** sin rol → 403; la UI muestra `PageState forbidden`.

### BE-004 · Onboarding
- **Entradas por paso:** titular, ubicación, sobre ti · experiencia y formación básicas · intereses (categorías del catálogo) · visibilidad (por defecto `private`).
- **Necesita:** guardar por paso (reanudar) y marcar onboarding completo.
- **Validaciones:** las de `ProfileFormVM`.

### BE-005 · Perfil por username
- **Público:** devuelve `PublicProfileVM` público.
- **Privado:** devuelve solo que es privado; **ningún** dato personal (DEC-012). Mismo comportamiento para usuarios sin sesión, otros usuarios y empresas, salvo reglas futuras (OI-005).
- **Inexistente o username antiguo:** 404 (DEC-017: al cambiar el username, el anterior deja de existir). Indistinguible
  en tiempo de un privado (evitar enumeración, a criterio del backend).
- **Owner:** `isOwner: true` y siempre ve su perfil completo.

### BE-006 · Edición del perfil propio
- **Entradas:** `ProfileFormVM`. Solo el owner.
- **Validaciones:** longitudes, fechas coherentes (`end ≥ start`), máximo de elementos por lista.
- **Errores:** conflicto de edición concurrente (si aplica), validación por campo.

### BE-007 · Cuenta y privacidad
- Cambiar visibilidad, preferencias de notificación, correo (con reverificación), contraseña, cerrar sesión en todos los dispositivos, solicitar baja.
- **Auditoría:** cambios de visibilidad, correo y contraseña.

### BE-008 · Catálogo de empresas
- **Solo fichas publicadas.** Filtros: categoría, texto. Paginación (hoy 6 por página).
- **Necesita por empresa:** `CompanyCardVM`.
- **Cifras:** las `stats` deben ser reales o no enviarse (el frontend no las inventa).
- **Frontend hoy (C-03):** `getCompanies({ q, category, page })` ya resuelve en servidor con `?q=`, `?category=<slug>` y `?page=`.
  Necesita del backend: texto sobre nombre y descripción, categoría por slug estable, tamaño de página (hoy 6), total y el
  listado de categorías **de fichas publicadas** (una categoría con solo borradores no debe aparecer). Sin acentos en la comparación.

### BE-009 · Ficha por slug
- **Necesita:** `CompanyDetailVM` sin `isStale` (lo calcula frontend con `lastReviewedAt`, OI-004) y con fuentes por módulo si las hay.
- No publicada o inexistente → 404. Slug antiguo → indicar el nuevo (BE-020).
- **Nunca** incluir notas internas, auditoría ni datos de contacto no públicos (decisión 13).
- **Frontend hoy (C-02, C-04):** espera `modules` en orden y solo los que tienen contenido, `sources` con `id`, `label`, `retrievedAt`
  y `url` solo si es real, y `sourceIds` en cada módulo. El estado editorial (`draft`) nunca viaja. El frontend calcula
  `isStale`. Para saber si la persona sigue la empresa necesita `isFollowing` en la misma lectura (BE-025).

### BE-010 · Encuestas disponibles
- **Necesita:** `SurveySummaryVM[]` con `participation` y `eligibility` del usuario actual.
- **Audiencia (DEC-016):** encuestas de empresas que el usuario sigue (BE-025) o en las que está interesado (OI-017).
  CLH publica como una empresa más.
- Filtros: disponibles / completadas.

### BE-011 · Detalle de encuesta
- **Necesita:** `SurveyDetailVM`. Si no es elegible, cerrada o próxima: el resumen, sin preguntas.
- **Privacidad:** texto de quién verá las respuestas y consentimiento con versión (OI-008).

### BE-012 · Respuestas de encuesta
- **Guardar borrador** (reanudar en otro dispositivo) y **enviar** (definitivo).
- **Validaciones servidor:** obligatorias, tipos, límites de longitud y de selección, encuesta abierta, elegibilidad, consentimiento aceptado.
- **Idempotencia:** un envío por usuario y encuesta; reintentos no duplican.
- **Errores:** encuesta cerrada durante la respuesta · ya enviada · validación por pregunta.
- **Auditoría:** envío con versión de la encuesta y del consentimiento.

### BE-013 · Catálogo de cursos
- **Necesita:** `CourseSummaryVM[]`. Filtros: formato, estado, tema.

### BE-014 · Detalle de curso
- **Necesita:** `CourseDetailVM`. Inscripción: "me interesa" interno o URL externa **real**.
- **Errores:** curso cerrado, sin plazas.

### BE-015 · Credenciales
- **Necesita:** `CredentialVM[]` del usuario; solo las emitidas por un emisor identificado.
- La UI no emite credenciales. Modelo de verificación pendiente (OI-009).

### BE-016 · Fichas en backoffice
- Listar con estado editorial, buscar y filtrar · leer por `id` · guardar borrador por módulo · enviar a revisión · archivar.
- **Validaciones:** slug único, módulo Resumen obligatorio, fuentes con fecha.
- **Auditoría:** BE-003.

### BE-017 · Cola editorial
- Listar envíos pendientes con módulos cambiados · aprobar y publicar · pedir cambios con comentario.
- **Errores:** envío ya resuelto por otra persona.

### BE-018 · Gestión de encuestas
- La usan Admin CLH (para `cmp-clh` y cualquier empresa) y, en G, los representantes de cada empresa (solo la suya).
- Crear, editar (secciones, preguntas, consentimiento), elegir audiencia (seguidores, interesados), programar apertura y
  cierre, publicar, cerrar, exportar resultados (LATER).
- No editar preguntas de una encuesta con respuestas (o versionar).

### BE-019 · Gestión de cursos
- Crear, editar, publicar, cerrar; asociar emisión de credencial.

### BE-020 · Slugs y usernames
- Unicidad y formato `a-z0-9-` (3–30).
- **Usernames:** se pueden cambiar; el anterior deja de resolver (DEC-017). Si queda libre o bloqueado, a criterio del backend.
- **Slugs de empresa:** el antiguo indica el nuevo para no romper enlaces compartidos (DEC-011).

### BE-021 · Resumen del dashboard
- Agregado de `TalentDashboardVM` o, si se prefiere, el frontend lo compone con BE-005, BE-008, BE-010 y BE-013.
- **Frontend hoy (D-01):** lo compone `getTalentDashboard(userId)` con perfil (BE-005), empresas (BE-008) y seguidas (BE-025). No necesita
  un endpoint propio para funcionar; un agregado solo ahorraría tres lecturas.
- **Necesita (propio o compuesto):** apartados del perfil con su estado (los cinco de `ProfileCompletionVM`), intereses, visibilidad,
  ids de empresas que sigue y fichas **publicadas** cuya categoría coincide con algún interés (el filtro por categoría de BE-008 sirve).
- **Reglas de negocio que el backend debe respetar:** el dashboard no calcula "afinidad" ni puntuación: coincide la categoría o no
  (decisión 11 del brief). El porcentaje de completitud son cinco apartados iguales; si producto cambia los apartados, cambia aquí y
  en el editor a la vez.
- **Pendiente:** cómo saber que alguien es nuevo y debe pasar por el onboarding (OI-021). Hoy se deduce de que no tiene ningún apartado.
- **Permisos:** solo la propia persona. No devuelve datos de otras personas.
- **E-09:** añadirá encuestas pendientes (BE-010) y cursos abiertos (BE-013).

### BE-022 · Contacto
- Nombre, correo, motivo, mensaje (≤ 2.000), consentimiento. Anti-spam en servidor.

### BE-023 · Recuperación de contraseña
- Solicitar enlace (respuesta idéntica exista o no el correo), restablecer con token caducable.

### BE-024 · Cifras públicas de la landing
- Las cifras actuales (1.240 perfiles, 86 empresas, 18 retos, 42 mentores) son inventadas (OI-003).
- **Necesita:** conteos reales y públicos (perfiles, empresas publicadas, retos abiertos, mentores; qué cuenta como
  "perfil" lo decide producto) con fecha de cálculo. Puede ser un valor cacheado.
- Si un conteo no está disponible, no se envía y el frontend no pinta esa cifra.

### BE-025 · Seguir empresas
- Seguir / dejar de seguir una empresa publicada; listar las empresas que sigue el usuario; saber si sigue una ficha concreta.
- **Permisos:** solo el propio usuario. Si la empresa ve quién la sigue lo decide legal (LQ-03, LQ-05).
- **Uso:** botón en la ficha (C-05), audiencia de encuestas (BE-010), empresas sugeridas en el dashboard (BE-021).
- **Frontend hoy (C-05):** `setFollowing(companyId, following)` devuelve una simulación; los cambios solo viven en `sessionStorage`.
  "Empresas que sigues" se pinta únicamente para el titular del perfil: el backend no debe devolver esa lista a nadie más.
