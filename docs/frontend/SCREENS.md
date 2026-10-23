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
- **Archivo:** `app/(public)/companies/` (`CompaniesView` de cliente) · **Actor:** cualquiera · **Bloque:** starter → C-03.
- **Componentes:** `Breadcrumbs`, `SectionLabel`, `Tag variant="filter"`, `Input`, `CompanyCard`, `EmptyState`, `Pagination`.
- **Datos:** `companies`, `categories`. Búsqueda inicial desde `?q=` (barra de búsqueda del header).
- **Estados:** lista, sin resultados (con "Limpiar filtros"). Sin carga ni error (fixture).
- **Pendiente:** `CompanyCard` no navega (C-03); filtros en URL (C-03).
- **BE:** BE-008.

### Registro (semilla) · `/signup`
- **Archivo:** `app/(auth)/signup/page.tsx` · **Actor:** visitante · **Bloque:** starter → B-01.
- **Componentes:** `Field`, `RadioGroup`, `Input`, `Select`, `Textarea`, `Checkbox`, `Button`, `Alert`.
- **Simulación:** al enviar muestra `Alert` "Simulación: no hemos creado ninguna cuenta" (DEC-006).
- **Intención:** "Busco oportunidades" marcada; "Busco talento" visible pero desactivada con "Próximamente: alta de empresas" (DEC-022).
  Usa `Radio` en un `role="radiogroup"`; el `Radio` del DS no es accesible con teclado (X-04).
- **Pendiente:** validación, pasos, contraseña, verificación (B-01). "Cancelar" no hace nada.
- **BE:** BE-002.

### Inicio Talent (shell) · `/talent/dashboard`
- **Archivo:** `app/talent/dashboard/page.tsx` · **Actor:** Talent · **Bloque:** A → D-01.
- **Componentes:** `SectionLabel`, `Alert info`, `Card`, `Icon`, `NavButton` (único primary).
- **Datos:** `getMockSession().displayName`, `companies.length`.
- **Estados:** sin sesión → `PageState signed-out`; sin rol → `forbidden` (desde el layout).
- **A11y/mobile:** una columna en móvil, dos desde `md`.

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
| Public | `components/SiteHeader.tsx`, `SiteFooter.tsx` | Empresas + búsqueda | Tema, Crear cuenta | Sí |
| Auth | `components/shells/AuthShell.tsx` | — | Tema | No |
| Talent | `components/shells/AppShell.tsx` (`space="talent"`) | Inicio, Empresas | Tema, avatar | No |
| Admin | `components/shells/AppShell.tsx` (`space="admin"`) | Inicio · `Badge navy` "Admin CLH" junto al logo | Tema, avatar | No |

- **DemoBar** (`components/shells/DemoBar.tsx`): franja oscura con "DEMO", enlaces a Público (`/`), Talent
  (`/talent/dashboard`) y Admin CLH (`/admin/dashboard`), el espacio actual subrayado (`aria-current`) y "Datos de
  ejemplo". En móvil se puede desplazar en horizontal. Se apaga con `NEXT_PUBLIC_BEWAY_DEMO_BAR=off`.
- **Móvil:** por debajo de `md` los enlaces y la búsqueda pasan al menú desplegable (`MobileMenu`, con
  `aria-expanded`/`aria-controls`, se cierra al navegar y con Escape).
- "Iniciar sesión" sigue oculto hasta B-02.

### Estados globales
| Estado | Dónde | Acción |
|---|---|---|
| 404 público | `app/not-found.tsx` | "Ir al inicio" |
| 404 Talent | `app/talent/not-found.tsx` + `[...missing]` | "Volver a tu inicio" |
| 404 Admin | `app/admin/not-found.tsx` + `[...missing]` | "Volver al panel" |
| Error | `error.tsx` en `(public)`, `talent`, `admin` → `RouteError` | "Reintentar" (`retry()`) |
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

### C-02 · Ficha de empresa · `/companies/[slug]`
- **Estructura:** `Breadcrumbs` · cabecera con `Photo overlay="hero"` (logo en chip blanco, nombre, categoría) · botón "Seguir" (C-05) · aviso de desactualización · módulos · fuentes.
- **Seguir (C-05):** `Button variant="outline"` "Seguir" / "Siguiendo"; sin sesión lleva a crear cuenta; resultado simulado con `Toast`. Aviso L-21.
- **Módulos (DEC-020):** Resumen (obligatorio) · Cultura · Programas (enlaza a cursos cuando existan) · Vacantes (sin URLs inventadas) · Sedes · Fuentes.
- **Desactualizada:** última revisión hace más de 180 días.
- **Estados:** completa · con módulos vacíos (no se pintan) · desactualizada (`Alert warning` con fecha) · no publicada/inexistente → 404.
- **Mobile:** módulos en una columna; índice de módulos como `Tabs` con scroll horizontal o lista anclada.
- **Meta:** `generateMetadata` con nombre y descripción; canónica en `/companies/[slug]`.

### D-01 · Dashboard Talent · `/talent/dashboard`
- **Módulos:** Completa tu perfil (porcentaje + qué falta; primary) · Empresas según tus intereses · (E-09) Encuestas pendientes · (E-09) Cursos abiertos.
- **Estados:** perfil completo (oculta el módulo) · sin intereses (vacío con enlace a editar) · nuevos usuarios → onboarding.

### E-02 · Encuestas · `/talent/surveys`
- **Pestañas (`Tabs`):** Disponibles · Completadas, con contador.
- **Tarjeta:** título, empresa que la publica (logo + nombre; CLH aparece como una empresa más), minutos estimados, nº de preguntas, `Badge` de estado (Abierta/Próxima/Cerrada/Completada), cierre, CTA "Responder" / "Continuar" / "Ver resumen".
- **Por qué la ves:** "Sigues a <empresa>" o "Por tus intereses" (DEC-016, OI-017).
- **Estados:** sin encuestas (vacío con "Explorar empresas" para seguir alguna) · no elegible (tarjeta atenuada con motivo).

### E-03 · Encuesta · `/talent/surveys/[slug]`
- **Flujo:** Intro (propósito, tiempo, privacidad, consentimiento obligatorio) → Secciones con progreso (`StepNav` en escritorio, "Sección 2 de 4" en móvil) → Revisión → Envío simulado → Gracias.
- **Tipos de pregunta → componente:** single → `RadioGroup` · multiple → `Checkbox` · scale → `RadioGroup direction="row"` con etiquetas de extremos · short-text → `Input` · long-text → `Textarea` con contador.
- **Estados:** sin empezar · en curso (reanuda borrador) · obligatoria sin responder (error en `Field`) · cerrada · próxima · completada · no elegible · 404.
- **A11y:** cada pregunta en `fieldset`/`legend`; progreso en `aria-live="polite"`; foco al primer error.

### E-05 · Cursos · `/talent/courses`
- **Filtros:** `Tag variant="filter"` por formato (una sola fila cyan) y `Select` por estado.
- **Tarjeta:** título, proveedor, formato, duración, inicio, `Badge` de estado, indicador "Otorga credencial".
- **Estados:** sin resultados con "Limpiar filtros".

### E-06 · Curso · `/talent/courses/[slug]`
- Resumen, qué aprenderás, requisitos, temario, proveedor, credencial asociada, CTA "Me interesa" (simulado) o enlace externo real.
- Estados: abierto · próximo · cerrado (CTA deshabilitado con motivo) · 404.

### E-07 · Credenciales · `/talent/credentials`
- Lista de `Card`: título, emisor, fecha, curso de origen si existe. Sin sellos de verificación (DEC-021).
- Vacío: "Aún no tienes credenciales" + "Ver cursos".

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
