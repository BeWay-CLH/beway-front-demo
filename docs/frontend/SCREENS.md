# Pantallas

Primera parte: pantallas **existentes**. Segunda parte: especificación de las **planificadas**, para construirlas sin
tener que redecidir. Plantilla al final. Modelos en [FRONTEND_MODELS.md](FRONTEND_MODELS.md); operaciones en
[BACKEND_HANDOFF.md](BACKEND_HANDOFF.md).

---

## Parte 1 · Existentes

### Landing · `/`
- **Archivo:** `app/(public)/page.tsx` · **Actor:** visitante · **Bloque:** starter, A-07/A-08 pendientes.
- **Componentes:** `Photo overlay="hero"`, `NavButton`, `Card`, `StatStrip`, `SectionLabel`, `FeatureCard`, `LogoMarquee`, `Card surface="gradient"`.
- **Datos:** `homeStats`, `pillars`, `partnerLogos` de `data/mock.ts`.
- **Interacciones:** CTAs a `/signup` y `/companies`.
- **Simulación:** las cifras de `homeStats` son de ejemplo (OI-003).
- **Mobile:** desborda a 390 px (A-07).

### Catálogo de empresas · `/companies`
- **Archivo:** `app/(shared)/companies/` (`page.tsx` de servidor, `CompaniesView` de cliente) · **Actor:** cualquiera · **Bloque/ticket:** C-03.
- **Componentes:** `Breadcrumbs`, `SectionLabel`, `Tag variant="filter"`, `Input`, `CompanyCard`, `EmptyState`, `Pagination`.
- **Datos:** `getCompanies({ q, category, page })` y `getCompanyCategories()` de `lib/services/companies.ts`. Todo en la URL: `?q=`, `?category=<slug>`, `?page=`.
- **Estados:** lista · sin resultados (con "Limpiar filtros") · parámetros inválidos se ignoran. Sin carga ni error (fixture).
- **Interacciones:** la tarjeta ("Ver perfil") navega a `/companies/[slug]`; el texto espera 300 ms; el resumen "N empresas en X para «q»" se anuncia con `aria-live`.
- **BE:** BE-008.

### Registro (semilla) · `/signup`
- **Archivo:** `app/(auth)/signup/page.tsx` · **Actor:** visitante · **Bloque:** starter → B-01.
- **Componentes:** `Field`, `RadioGroup`, `Input`, `Select`, `Textarea`, `Checkbox`, `Button`, `Alert`.
- **Simulación:** al enviar muestra `Alert` "Simulación: no hemos creado ninguna cuenta" (DEC-006).
- **Intención:** "Busco oportunidades" marcada; "Busco talento" visible pero desactivada con "Próximamente: alta de empresas" (DEC-022).
  Usa `Radio` en un `role="radiogroup"`; el `Radio` del DS no es accesible con teclado (X-04).
- **Pendiente:** validación, pasos, contraseña, verificación (B-01). "Cancelar" no hace nada.
- **BE:** BE-002.

### Inicio Talent · `/talent/dashboard`
Ficha completa en [D-01](#d-01--dashboard-talent--talentdashboard) (más abajo).

### Inicio Admin (shell) · `/admin/dashboard`
- **Archivo:** `app/admin/dashboard/page.tsx` · **Actor:** Admin CLH · **Bloque:** A → F-01.
- **Componentes:** `SectionLabel`, `Alert info`, `Card`, `StatStrip`, `EmptyState`.
- **Datos:** conteos derivados del fixture (empresas, categorías, programas), rotulados como ejemplo.
- **Estados:** sin rol → `forbidden`; sin sesión → `signed-out`.

### Cabecera y shells

Una sola cabecera para todo (`components/shells/AppHeader.tsx`, DEC-013): `DemoBar` + `NavBar` del DS, sticky.
El logo está siempre en el mismo sitio y enlaza al inicio del espacio.

| Shell | Archivo | Enlaces | Acciones | Pie |
|---|---|---|---|---|
| Public | `components/SiteHeader.tsx`, `SiteFooter.tsx` | Empresas + búsqueda; con sesión, los de Talent | Tema, Crear cuenta; con sesión, avatar | Sí |
| Shared | `components/shells/ViewerShell.tsx` (`app/(shared)/`) | Con sesión Inicio, Empresas, Perfil; sin sesión Empresas + búsqueda | Tema, avatar o Crear cuenta | Solo sin sesión |
| Auth | `components/shells/AuthShell.tsx` | — | Tema | No |
| Talent | `components/shells/AppShell.tsx` (`space="talent"`) | Inicio, Empresas, Perfil | Tema, avatar | No |
| Admin | `components/shells/AppShell.tsx` (`space="admin"`) | Inicio · `Badge navy` "Admin CLH" junto al logo | Tema, avatar | No |

- **DemoBar** (`components/shells/DemoBar.tsx`): franja oscura con "DEMO", enlaces a Público (`/`), Talent
  (`/talent/dashboard`) y Admin CLH (`/admin/dashboard`), el espacio actual subrayado (`aria-current`) y "Datos de
  ejemplo". En móvil se puede desplazar en horizontal. Se apaga con `NEXT_PUBLIC_BEWAY_DEMO_BAR=off`.
- **Móvil:** por debajo de `md` los enlaces y la búsqueda pasan al menú desplegable (`MobileMenu`, con
  `aria-expanded`/`aria-controls`, se cierra al navegar y con Escape).
- **La navegación sigue a quien mira** (DEC-030): con sesión es la de Talent en cualquier página que no sea de Admin; sin sesión,
  la pública. "Empresas" y "Perfil" no cambian la cabecera.

### Estados globales
| Estado | Dónde | Acción |
|---|---|---|
| 404 público | `app/not-found.tsx` | "Ir al inicio" |
| 404 de ficha o perfil | `app/(shared)/not-found.tsx` (dentro del marco de quien mira) | "Ver empresas" |
| 404 Talent | `app/talent/not-found.tsx` + `[...missing]` | "Volver a tu inicio" |
| 404 Admin | `app/admin/not-found.tsx` + `[...missing]` | "Volver al panel" |
| Error | `error.tsx` en `(public)`, `(shared)`, `talent`, `admin` → `RouteError` | "Reintentar" (`retry()`) |
| Sin sesión / sin rol | Layouts de Talent y Admin | "Crear cuenta" / "Ir al inicio" |

### Legado e internas
- `/programas` (`app/(public)/programas/`): sin enlaces; ver DEC-009.
- `/styleguide`: catálogo de componentes en el tema activo.

---

## Bloque B · implementado en modo demo (2026-10-22)

| Pantalla | Ruta | Archivo | Pregunta y hallazgo | Simulación |
|---|---|---|---|---|
| Acceso | `/login` | `app/(auth)/login/page.tsx` | "¿Cómo entro?" · cualquier correo y contraseña entran como Lucía | La entrada es la cookie de demo; ningún campo se envía |
| Registro | `/signup` | `app/(auth)/signup/SignupFlow.tsx` | "¿Qué pasa después?" · tu perfil empieza en privado | Dos pasos; el segundo dice que no hay cuenta nueva |
| Recuperar acceso | `/forgot-password` | `app/(auth)/forgot-password/` | Respuesta única | Aviso "Simulación" |
| Inicio Talent | `/talent/dashboard` | `app/talent/dashboard/page.tsx` | "¿Qué me falta?" · "Lo siguiente: …" | Ninguna (lectura) |
| Encuestas | `/talent/surveys` | `app/talent/surveys/page.tsx` | "¿Cuál cierra antes?" · "La que antes cierra es la de Datalia…" | Enviadas y borradores solo en `sessionStorage` |
| Encuesta | `/talent/surveys/[slug]` | `app/talent/surveys/[slug]/page.tsx` | "¿Quién verá mis respuestas?" · el resumen | Envío simulado ("No hemos guardado tus respuestas") |
| Cursos | `/talent/courses` | `app/talent/courses/page.tsx` | "¿Qué puedo cursar ahora?" · "Hay 3 cursos abiertos…" | Ninguna (lectura) |
| Curso | `/talent/courses/[slug]` | `app/talent/courses/[slug]/page.tsx` | "¿Me interesa?" · el resumen | "Me interesa" simulado |
| Credenciales | `/talent/credentials` | `app/talent/credentials/page.tsx` | "¿Qué logros tengo?" · "La última es…" | Ninguna (nunca emite) |
| Onboarding | `/talent/onboarding` | `app/talent/onboarding/OnboardingFlow.tsx` | "¿Qué necesito para empezar?" · solo el nombre | Borrador en sessionStorage; "Terminar" simulado |
| Editar perfil | `/talent/profile/edit` | `app/talent/profile/edit/ProfileEditor.tsx` | "¿Qué ven los demás?" · lo que más falta | "Guardar cambios" simulado |
| Ajustes | `/talent/settings` | `app/talent/settings/AccountSettingsForm.tsx` | "¿Quién puede ver mi perfil?" · empieza en privado | Guardar, contraseña y eliminar, todos simulados |
| Perfil propio o ajeno | `/u/[username]` | `app/u/[username]/page.tsx` | "¿Quién es esta persona?" | Ninguna |
| Perfil privado | `/u/[username]` (visitante) | `components/PageState.tsx` | Solo el nombre de usuario | Ninguna |
| Contacto | `/contact` | `app/(public)/contact/ContactForm.tsx` | "¿A quién escribo?" | "Enviar mensaje" simulado |
| Privacidad y términos | `/privacy`, `/terms` | `app/(public)/privacy/`, `terms/` | Borrador con estructura | Aviso de borrador legal |
| Sin acceso | `/admin/*` con Marcos | `app/admin/layout.tsx` | "¿Puedo entrar aquí?" · no | Ninguna |

Para el tratamiento visual de estas pantallas (estilo, hoja, criterios) ver [DESIGN.md](DESIGN.md).

---

## Bloque C · implementado en modo demo (2026-10-22)

| Pantalla | Ruta | Archivo | Pregunta y hallazgo | Simulación |
|---|---|---|---|---|
| Catálogo | `/companies` | `app/(shared)/companies/` | "¿Qué empresas hay?" · cuántas, por categoría y búsqueda | Ninguna (lectura) |
| Ficha de empresa | `/companies/[slug]` | `components/company/CompanyProfile.tsx` | "¿Qué hace esta empresa y qué ofrece?" | "Seguir" simulado con `Toast` |
| Ficha sin contenido | `/companies/trazo` | Mismo componente | `PageState empty` dentro de la ficha | Ninguna |
| Ficha desactualizada | `/companies/vialink` | Mismo componente | `Alert warning` con la fecha de revisión | Ninguna |
| Ficha no publicada | `/companies/brisa-salud` | `app/(shared)/not-found.tsx` | 404 sin distinguirse de un slug inexistente | Ninguna |
| Empresas que sigues | `/u/[username]` (titular) | `components/company/FollowedCompanies.tsx` | Solo la ve su titular; vacía para Marcos | Refleja los cambios de la sesión |

### C-02 · Ficha de empresa · `/companies/[slug]`
- **Archivo:** `app/(shared)/companies/[slug]/page.tsx` + `components/company/` · **Actor:** cualquiera · **Bloque/ticket:** C-02, C-04, C-05.
- **Componentes:** `Breadcrumbs`, `Photo`, `Alert`, `Tabs`, `Button`, `Toast`, `Icon`, `PageState`; propios: `CompanyProfile`,
  `CompanyTabs`, `CompanyModules`, `FollowButton`.
- **Datos:** `getCompanyBySlug(slug, viewerId)` → `CompanyDetailVM | null` (null → `notFound()`). Sin estado editorial ni auditoría.
- **Estructura:** migas (Inicio sigue a quien mira) · banner con logo en chip blanco · nombre, categoría y descripción ·
  "Seguir" (único primary) · aviso de desactualizada · cuatro cifras (2×2 en móvil) · pestañas · nota sobre el origen de los datos.
- **Pestañas:** una por módulo con contenido (Resumen, Cultura, Programas, Vacantes, Sedes) y "Fuentes". `?tab=<kind>`,
  flechas/Inicio/Fin, desplazamiento horizontal en móvil. Cada módulo nombra sus fuentes y enlaza a "Fuentes".
- **Estados:** completa · módulo vacío (sin pestaña) · sin módulos (`PageState empty`) · desactualizada (>180 días, con fecha) ·
  no publicada o inexistente (404 en el marco de quien mira).
- **Seguir:** sin sesión lleva a `/signup`. Con sesión alterna "Seguir" / "Siguiendo", muestra `Toast` "Simulación" y guarda el
  cambio solo en `sessionStorage` (DEC-032).
- **Textos provisionales:** L-20 (origen de los datos y cómo corregir) y L-21 (qué pasa al seguir), marcados "pendientes de revisión legal".
- **BE:** BE-009, BE-025. **Autorización:** pública, solo fichas publicadas.
- **A11y / mobile:** `role="tabpanel"` con nombre, `aria-live` en el aviso, foco visible; sin scroll horizontal a 390 px; claro y oscuro.
- **Meta:** `generateMetadata` con nombre y descripción. Canónica pendiente de dominio (OI-020).

---

## Parte 2 · Planificadas

### B-01 · Registro · `/signup`
- **Pasos:** 1) Intención (Talent/Empresa) 2) Datos de cuenta 3) "Revisa tu correo" (estado).
- **Campos:** nombre, correo, contraseña con requisitos visibles, términos (enlace a `/terms`).
- **Estados:** validación por campo · correo ya registrado (simulado con un correo del fixture) · enviando (botón deshabilitado) · simulación completada.
- **Componentes:** `StepNav` (horizontal no existe: en móvil, texto "Paso 1 de 3"), `Field`, `Input`, `RadioGroup`, `Checkbox`, `Alert`.
- **Mobile:** un campo por fila, botón a ancho completo.

### B-02 · Acceso · `/login`
- **Campos:** correo, contraseña, "¿Has olvidado tu contraseña?" (cuando exista B-09).
- **Estados:** credenciales incorrectas · demasiados intentos · simulación → lleva a `next` o a `/talent/dashboard`.
- **Extra:** reactivar "Iniciar sesión" en `SiteHeader`; `proxy.ts` para `/talent/*`.

### B-04 · Onboarding · `/talent/onboarding`
- **Layout:** `StepNav` lateral en escritorio, barra de progreso textual en móvil.
- **Pasos:** Sobre ti · Formación y experiencia · Intereses (`Tag` seleccionables, navy) · Privacidad (`RadioGroup`, `private` preseleccionado, con explicación).
- **Interacciones:** Siguiente / Atrás / Guardar y salir. Borrador en `sessionStorage` con try/catch.
- **Fin:** "Simulación: tu perfil no se ha guardado" + ir al inicio.

### B-05 · Editor de perfil · `/talent/profile/edit`
- **Secciones:** Datos básicos, Sobre ti, Experiencia (lista con añadir/editar/quitar en `Dialog`), Formación, Intereses, Habilidades.
- **Estados:** sin cambios · cambios sin guardar (aviso al salir) · guardado simulado (`Toast`) · error de validación.
- **Acceso:** owner. Enlace "Ver perfil público" a `/u/[username]`.

### B-06 · Perfil · `/u/[username]`
- **Variantes:** público · privado (`PageState private`, sin nombre) · inexistente (404) · propio (botón "Editar perfil").
- **Componentes:** `Avatar`, `SectionLabel`, `Card`, `Tag`, `Badge` para credenciales con emisor.
- **Meta:** `noindex` en privado; `<title>` genérico si es privado.
- `/talent/profile` → `redirect('/u/' + session.username)`.

### B-07 · Ajustes · `/talent/settings`
- **Secciones:** Cuenta (correo, contraseña), Privacidad (visibilidad + vista previa), Notificaciones (`Switch`), Zona de peligro (baja con `Dialog`).
- **Simulación:** cada guardado muestra `Toast` "Simulación".

### B-08 · Legales y contacto · `/privacy`, `/terms`, `/contact`
- Texto con aviso "Borrador pendiente de revisión legal" (OI-012). Contacto: formulario con envío simulado.
- Enlazar desde `SiteFooter` (`legalLinks`).

### C-02 · Ficha de empresa · `/companies/[slug]` (plan original; implementada arriba, con el título bajo el banner y no sobre la foto)
- **Estructura:** `Breadcrumbs` · cabecera con `Photo overlay="hero"` (logo en chip blanco, nombre, categoría) · botón "Seguir" (C-05) · aviso de desactualización · módulos · fuentes.
- **Seguir (C-05):** `Button variant="outline"` "Seguir" / "Siguiendo"; sin sesión lleva a crear cuenta; resultado simulado con `Toast`. Aviso L-21.
- **Módulos (DEC-020):** Resumen (obligatorio) · Cultura · Programas (enlaza a cursos cuando existan) · Vacantes (sin URLs inventadas) · Sedes · Fuentes.
- **Desactualizada:** última revisión hace más de 180 días.
- **Estados:** completa · con módulos vacíos (no se pintan) · desactualizada (`Alert warning` con fecha) · no publicada/inexistente → 404.
- **Mobile:** módulos en una columna; índice de módulos como `Tabs` con scroll horizontal o lista anclada.
- **Meta:** `generateMetadata` con nombre y descripción; canónica en `/companies/[slug]`.

### D-01 · Dashboard Talent · `/talent/dashboard`
- **Archivo:** `app/talent/dashboard/page.tsx` · **Actor:** Talent · **Bloque/ticket:** A → D-01 (hecho el 2026-10-23).
- **Pregunta y hallazgo:** "¿Qué me falta para que mi perfil sirva?" · "Lo siguiente: añade tu formación." (ver [DESIGN.md](DESIGN.md)).
- **Módulos (plan):** Completa tu perfil (porcentaje + qué falta; primary) · Empresas según tus intereses · (E-09) Encuestas pendientes · (E-09) Cursos abiertos.
- **Módulos (hoy):** cabecera con saludo, hallazgo y el único `primary` · "Qué falta en tu perfil" (barra de cinco apartados y una fila
  por apartado pendiente) · "Empresas de tus intereses" · "Accesos rápidos" (Editar mi perfil, Ver mi perfil, Explorar empresas, Ajustes).
  Encuestas y cursos no se pintan hasta E-09; los accesos a rutas `planned` no existen.
- **Componentes:** `NavButton` (único `primary`), `Icon`, propios `CompletionRail`, `SuggestedCompanies` y `CompanyRow`
  (`components/dashboard/`, `components/company/`). Tarjetas con borde, sin sombra (DESIGN.md).
- **Datos:** `TalentDashboardVM` de `getTalentDashboard(userId)` (`lib/services/dashboard.ts`), compuesto con `getProfileForm`,
  `getAccountSettings`, `getFollowedCompanies` y `getCompaniesByInterests`. Ver [FRONTEND_MODELS.md](FRONTEND_MODELS.md#dashboard-talent).
- **Estados:**
  - **Perfil a medias** (Lucía, 80 %): título con el porcentaje, `primary` con el paso siguiente, módulo "Qué falta".
  - **Perfil completo** (Marcos, 100 %): título "Tu perfil está completo", el módulo "Qué falta" se oculta y no hay `primary`.
    El hallazgo cambia con la visibilidad (privado: "Ahora solo lo ves tú. Puedes hacerlo visible en Ajustes.").
  - **Perfil vacío** (0 %, nueva persona): "Vamos a montar tu perfil", `primary` "Empezar mi perfil" → `/talent/onboarding` (OI-021).
  - **Sin intereses:** "Empresas de tus intereses" muestra el vacío con "Elegir intereses" → `/talent/profile/edit#intereses`.
  - **Sin fichas de esos temas:** "Todavía no hay fichas publicadas de <temas>." con "Ver todas las empresas".
  - **Ya sigues a todas:** "Ya sigues a todas las empresas de tus intereses." (también tras seguir en la sesión).
  - Sin sesión → `/login?next=…` (proxy); sin rol → `forbidden` (layout); sin perfil → 404.
- **Interacciones:** el `primary` y cada "Completar" enlazan al apartado del editor (`#datos-basicos`, `#sobre-ti`, `#experiencia`,
  `#formacion`, `#intereses`). Las sugerencias aplican los seguimientos simulados de la sesión (`follow-store`, C-05).
- **Simulación:** no escribe nada. Seguir se hace en la ficha y sigue siendo simulado (DEC-032).
- **BE:** BE-021 (agregado), con BE-005, BE-008 y BE-025.
- **Autorización:** solo la propia persona; no hay datos de terceros. Ningún dato privado sale a otra pantalla.
- **A11y / mobile:** una columna en móvil, rejilla de 12 desde `md` (7 + 5). Un `h1`, `h2` por módulo. La barra es una `ol` con nombre
  "Apartados de tu perfil"; cada segmento dice "listo" o "falta" a lectores de pantalla y se distingue por forma (relleno o borde),
  no solo por color. En móvil los nombres de la barra pasan a texto ("Ya tienes listo: …"). El `%` va con espacio duro para no
  quedarse solo en una línea. Foco visible heredado de `NavButton` y de los enlaces.
- **Captura:** verificado en Chrome headless a 1280, 768 y 390 px en claro y oscuro (2026-10-23); sin desbordes ni errores de consola.

### E-02 · Encuestas · `/talent/surveys`
- **Archivo:** `app/talent/surveys/page.tsx` · **Actor:** Talent · **Bloque/ticket:** E-02 (hecho el 2026-10-23).
- **Pregunta y hallazgo:** "¿Qué encuestas me esperan y cuál cierra antes?" · "Tienes 2 encuestas para responder. La que antes cierra es la de Datalia, el 30 oct 2026."
- **Componentes:** `KeyboardTabs` (envoltorio de `Tabs` del DS con flechas, Inicio, Fin y panel nombrado), `NavButton`, `StatusBadge`, propios
  `SurveyList` y `SurveyRow` (`components/survey/`). Filas de dos líneas, no tarjetas (patrón *inbox* del skill de estilo).
- **Datos:** `getSurveys(userId)` (`lib/services/surveys.ts`) → `SurveySummaryVM[]` con `participation` y `eligibility` de la persona. Fixture
  `data/fixtures/surveys.ts`. La elegibilidad se calcula: `follows` si sigue a la empresa, `interested` si su categoría está entre los intereses,
  `not-eligible` en otro caso (OI-017).
- **Pestañas:** Disponibles (con contador) · Completadas (con contador). Orden de Disponibles: abiertas por cierre más próximo, próximas, cerradas.
  Las no elegibles van aparte, en "No son para ti por ahora" (máx. 3 filas y "Y N más"), con su motivo y un botón que lleva a la ficha de la empresa.
- **Fila:** logo en chip blanco, título con sello (En curso, Próxima, Cerrada, Completada; las abiertas sin empezar no llevan sello), "Datalia,
  4 preguntas y 4 min", **por qué la ves** ("Sigues a Datalia" / "Te interesa Movilidad"), la fecha que importa y la acción
  (Responder, Continuar, Ver resumen, Ver empresa). Una sola fila lleva el botón `primary`: la primera que se puede responder.
- **Estados:** sin encuestas disponibles (vacío con "Explorar empresas") · sin completadas (vacío con "Ver encuestas disponibles") · cerrada ·
  próxima · no elegible. Con la cuenta de Marcos solo hay una disponible y cinco no elegibles.
- **Interacciones / simulación:** una encuesta enviada en la sesión pasa a Completadas y una con borrador local sale "En curso" (ambos en
  `sessionStorage`, `components/survey/survey-store.ts`). Nada sale del navegador.
- **BE:** BE-010.
- **Autorización:** solo la propia persona.
- **A11y / mobile:** las filas se apilan; acción de ancho fijo en escritorio (9,5 rem); el hallazgo es `aria-live="polite"`; el botón de
  cada fila lleva `aria-label` con el título.
- **Captura:** verificado en Chrome a 1280, 768 y 390 px, claro y oscuro.

### E-03 · Encuesta · `/talent/surveys/[slug]`
- **Archivo:** `app/talent/surveys/[slug]/page.tsx` · **Actor:** Talent · **Bloque/ticket:** E-03 (hecho el 2026-10-23).
- **Pregunta y hallazgo:** "¿Qué me preguntan y quién verá mis respuestas?" · el resumen de la encuesta bajo el título.
- **Componentes:** `Breadcrumbs`, `StepNav` (escritorio, con `percent` y `meta` sobre las secciones reales), `Checkbox`, `RadioGroup`, `Input`,
  `Textarea`, `Alert`, `Button`, propios `SurveyRunner`, `QuestionField`, `SurveyFacts` y `SurveyInfo`. Controles del DS (en v1.1 son nativos).
- **Datos:** `getSurveyPage(slug, userId)` → `SurveyPageVM`: `{ kind: 'answer', survey }` si se puede responder, o `{ kind: 'info', survey, reason }`
  con el resumen **sin preguntas** si no (BE-011). Borrador del servidor (`savedDraft`) y del navegador; el del navegador manda.
- **Flujo (`answer`):** introducción (qué es, quién la publica, cuánto dura, cuántas preguntas, cuándo cierra; "Quién verá tus respuestas";
  casilla de consentimiento obligatoria; "Qué te preguntaremos" con las secciones) → una pantalla por sección → revisión (respuestas por
  sección con "Editar") → envío → pantalla de envío simulado.
- **Tipos de pregunta → componente:** single → `RadioGroup` · multiple → `Checkbox` (con `max`: las demás se deshabilitan y se dice "Elige hasta N")
  · scale → `RadioGroup` en fila con los extremos escritos ("1 = Nada", "5 = Mucho") · short-text → `Input` · long-text → `Textarea` con contador.
- **Validación:** sin consentimiento no se empieza ("Acepta para empezar…"); una obligatoria sin responder bloquea "Siguiente" con el error bajo
  la pregunta (`aria-describedby`), un resumen "Falta una respuesta" y el foco en la primera. Al enviar se revisa todo otra vez.
- **Estados:** sin empezar · en curso (el borrador del servidor o del navegador sitúa a la persona en la primera sección incompleta; "Continuar") ·
  enviada · y, como resumen sin preguntas: **no elegible** (con botón a la ficha de la empresa), **próxima**, **cerrada**, **completada** · 404 dentro del espacio.
- **Interacciones:** progreso como dato ("1 de 3 secciones completadas", sin "Paso 1 de 3", DEC-028), `aria-live="polite"` en móvil, `StepNav` clicable
  hasta lo ya visitado. El borrador se guarda en `sessionStorage` dentro de try/catch.
- **Simulación:** enviar llama a `submitSurveyAnswers` (acción de servidor) que devuelve `{ simulated: true }`. La pantalla de envío dice
  "Simulación: no hemos guardado tus respuestas" y la encuesta figura como completada solo mientras no se cierre la pestaña.
- **BE:** BE-011, BE-012.
- **Autorización:** sesión Talent y elegibilidad por empresa; el servidor repite la comprobación (BE-012).
- **A11y / mobile:** cada pregunta es un `fieldset` con `legend`; teclado completo; foco visible; en móvil la barra de progreso sustituye al `StepNav`
  y los botones se apilan con "Atrás" debajo.
- **Captura:** verificado a 1280, 768 y 390 px, claro y oscuro; flujo completo probado en Chrome (consentimiento, errores, máximo de opciones,
  revisión, envío y lista actualizada).

### E-05 · Cursos · `/talent/courses`
- **Archivo:** `app/talent/courses/page.tsx` · **Actor:** Talent · **Bloque/ticket:** E-05 (hecho el 2026-10-23).
- **Pregunta y hallazgo:** "¿Qué puedo cursar ahora?" · "Hay 3 cursos abiertos. El primero en empezar es SQL para análisis de datos, el 3 nov 2026."
- **Componentes:** `Tag variant="filter"` (formato, una sola fila cyan), `Select` con `Field` (estado), `StatusBadge`, `NavButton`, propios `CourseFilters`
  y `CourseRow` (`components/course/`).
- **Datos:** `getCourses({ format, status })` → `CourseSummaryVM[]`. Fixture `data/fixtures/courses.ts` (7 cursos: los tres formatos, abiertos,
  próximos y cerrados, con y sin credencial). Filtros en la URL (`?format=online&status=open`), resueltos en servidor; un valor desconocido se ignora.
- **Fila:** título con estado, "Datalia, en línea y 8 semanas", una frase, cuándo empieza y, si aplica, "Otorga credencial".
- **Estados:** sin resultados ("No hay cursos con estos filtros." con "Limpiar filtros") · contador "Mostrando N de M cursos" (`aria-live`).
- **BE:** BE-013. **Autorización:** sesión Talent.
- **A11y / mobile:** los `Tag` son botones con foco y `aria-pressed`; la fila se apila; no hay primary (el único cyan es el filtro activo).

### E-06 · Curso · `/talent/courses/[slug]`
- **Archivo:** `app/talent/courses/[slug]/page.tsx` · **Actor:** Talent · **Bloque/ticket:** E-06 (hecho el 2026-10-23).
- **Componentes:** `Breadcrumbs`, `StatusBadge`, `Icon`, propio `CourseInterest`. A la izquierda el contenido (de qué va, qué aprenderás,
  requisitos, temario como `ol`); a la derecha, el panel de datos fijo con el único `primary`. En móvil el panel va primero.
- **Datos:** `getCourseBySlug(slug)` → `CourseDetailVM`; `null` → 404 en el espacio. Todos los cursos usan `enrollment: interest-only`: sin URLs inventadas.
- **Estados:** abierto · próximo · cerrado (botón deshabilitado y la razón escrita al lado) · 404.
- **Simulación:** "Me interesa" llama a `setInterest` (acción de servidor, `{ simulated: true }`), muestra un `Toast` "Simulación" y recuerda el interés
  solo en `sessionStorage`; el botón pasa a "Te interesa" (secundario) y se puede quitar. Texto de credencial provisional (L-33).
- **BE:** BE-014.

### E-07 · Credenciales · `/talent/credentials`
- **Archivo:** `app/talent/credentials/page.tsx` · **Actor:** Talent · **Bloque/ticket:** E-07 (hecho el 2026-10-23).
- **Pregunta y hallazgo:** "¿Qué logros tengo y quién los emitió?" · "Tienes 2 credenciales. La última es Visualización de datos, de Orbital Labs, el 8 may 2026."
- **Datos:** `getCredentials(userId)` (`lib/services/credentials.ts`) → `CredentialVM[]`, más recientes primero, con el título del curso de origen si lo hay.
  Solo se listan: la pantalla nunca emite una (DEC-010) y no hay sello de "verificada" (DEC-021). Lucía tiene 2; Marcos, ninguna.
- **Composición:** a la izquierda "Tus logros"; a la derecha "Cursos que otorgan credencial" (los abiertos), que da el camino a la siguiente y llena la pantalla
  también cuando no hay ninguna.
- **Estados:** con credenciales · sin ninguna (explicación, botón "Ver cursos" y la lista de cursos de la derecha).
- **BE:** BE-015. **Autorización:** solo la propia persona. **L-33** (texto provisional): "BeWay no las emite desde esta pantalla".

### E-09 · Encuestas y cursos en el inicio · `/talent/dashboard`
Ficha completa de la pantalla en [D-01](#d-01--dashboard-talent--talentdashboard). E-09 añade dos módulos en una fila 6 + 6 entre "Qué falta" y
"Empresas de tus intereses": **Encuestas por responder** (`PendingSurveys`, cliente: quita las enviadas en la sesión) y **Cursos abiertos**
(`OpenCourses`). Cada módulo tiene su vacío ("No tienes encuestas por responder…", "No hay cursos abiertos ahora…"), muestra hasta tres filas y
fija su acción ("Ver todas…") al pie de la tarjeta.

### F-02 · Fichas (Admin) · `/admin/companies`
- `Table` (escritorio) / lista de `Card` (móvil): nombre, categoría, `Badge` de estado editorial, última revisión, editor.
- Filtros por estado (`Tabs` con contador) y búsqueda. Fila → editor.

### F-03 · Editor de ficha · `/admin/companies/[id]/edit`
- Columna de módulos (`StepNav` con `onSelect`) + formulario del módulo + vista previa pública.
- Acciones: Guardar borrador (simulado) · Enviar a revisión (`Dialog` de confirmación) · Ver ficha pública.
- Estados: sin cambios · cambios sin guardar · validación · 404 por `id`.

### F-04 · Revisiones · `/admin/reviews`
- Cola con empresa, quién envió, cuándo, módulos cambiados. Detalle con antes/después por módulo.
- Acciones: Aprobar y publicar · Pedir cambios (comentario obligatorio). Ambas con `Dialog` y resultado "Simulación".

### F-05 / F-06 · Encuestas y cursos (Admin)
- Listado con estado, empresa que publica y fechas; editor por secciones/preguntas (encuestas) o por apartados (cursos); vista previa con el mismo componente que ve Talent.
- El editor de encuestas vive en `components/survey/` para reutilizarlo en `/company/surveys` (DEC-016). Admin elige la empresa publicadora (por defecto `cmp-clh`); un representante solo publica para la suya.

---

## Plantilla de ficha de pantalla

```md
### <ID> · <Nombre> · `<ruta>`
- **Archivo:** · **Actor:** · **Bloque/ticket:**
- **Componentes:** (de @ds y propios)
- **Datos:** VM + fixture
- **Campos:** (formularios: nombre, tipo, obligatorio, validación)
- **Estados:** vacío · carga · error · 404 · sin acceso · otros
- **Interacciones:**
- **Simulación:** qué no se guarda y cómo se avisa
- **BE:** BE-XXX
- **Autorización:** quién puede ver y hacer qué
- **A11y / mobile:**
- **Captura:** (ruta a imagen o nota de verificación)
```
