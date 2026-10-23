# Roadmap y tablero de ejecución

Sin fechas (decisión 16 del brief): se avanza por dependencias. Cada ticket cumple la
[Definition of Done](README.md#definition-of-done) además de sus criterios propios.

## Dependencias

```text
A  Shells, navegación, 404 ──────────┬──────────────┬───────────────┐
   (hecho)                           │              │               │
                                     ▼              ▼               ▼
B  Auth, onboarding, perfil   C  Empresas      E  Encuestas y cursos (prioridad alta)
   │                             │                │
   └──────────────┬──────────────┘                │
                  ▼                               │
D  Dashboard Talent compuesto ◄───────────────────┘  (E-09 añade sus módulos)
                  │
F  Admin mínimo: F-02…F-04 dependen de C-01 · F-05/F-06 dependen de E-01/E-04
                  │
G  Oportunidades, retos, Company Portal, comunidad, mensajería (al final)
```

**Orden acordado:** A → B → C → D → E → F → G (DEC-014). B y C no dependen entre sí y pueden solaparse.

## Prioridades

| Prioridad | Bloques | Motivo |
|---|---|---|
| P0 | A | Base de todo; hecho |
| P1 | B, C, E | Alta, perfil y empresas son el núcleo; E es prioridad de negocio alta |
| P2 | D, F (F-01…F-04) | Componen o gestionan lo anterior |
| P3 | F-05, F-06 | Gestión CLH de encuestas y cursos, tras sus modelos |
| P4 | G | Explícitamente posterior |

---

## A · Shells, navegación y 404 — hecho salvo A-07/A-08

| ID | Ticket | Estado |
|---|---|---|
| A-01 | Route groups `(public)`, `(auth)`; layout raíz sin cabecera | Hecho |
| A-02 | `TalentShell`, `AdminShell`, `AuthShell`, `ShellNav`, `MobileMenu` | Hecho |
| A-03 | `lib/routes.ts` con `live/planned`; menús solo con rutas vivas | Hecho |
| A-04 | Redirecciones `/talent`, `/admin`, `/talent/companies`, `/empresas`, `/registro` | Hecho |
| A-05 | 404 global, de Talent y de Admin (`[...missing]`); `error.tsx` por espacio | Hecho |
| A-06 | Sesión simulada y guards por rol (`lib/session.ts`) | Hecho |
| A-07 | **Pendiente.** Landing en móvil: el hero (`px-10`) y `StatStrip` (4 columnas) desbordan a 390 px | Abierto |
| A-08 | **Pendiente.** Landing: cifras desde un servicio y copy coherente con la privacidad | Abierto |
| A-09 | Cabecera única en todos los espacios, Admin con navegación superior y `DemoBar` (DEC-013) | Hecho |
| A-10 | La cabecera sigue a quien mira: grupo `(shared)` para `/companies`, `/companies/[slug]` y `/u/[username]` (DEC-030) | Hecho |

**A-07 · criterios:** sin scroll horizontal a 360 px; el StatStrip se apila o pasa a 2×2; si `StatStrip` no lo permite,
petición al design system (DEC-007).

**A-08 · criterios:** las cifras de `homeStats` son inventadas (OI-003). Se crea `getPublicStats()` en `lib/services/`
con `PublicStatsVM` y el fixture marcado como ejemplo; cuando exista BE-024 se conecta. Si una cifra no llega, la tarjeta
no se pinta (nunca un número de relleno). Se revisan "Perfiles verificados" y "Tus cambios ya son visibles para las
empresas", que contradicen el perfil privado por defecto (DEC-012).

---

## B · Auth, onboarding, perfil y settings

**Estado (2026-10-22): hecho en modo demo.** Todos los tickets B-01…B-09 están construidos y verificados en navegador
(escritorio, móvil y oscuro). Las escrituras son simulaciones. Pendiente de backend: BE-001, BE-002, BE-004…BE-007,
BE-022, BE-023. Pendiente de legal: LQ-02, LQ-04, LQ-08 y los textos de `/privacy` y `/terms`.
Diseño y criterios de app screens: [DESIGN.md](DESIGN.md).


| ID | Ticket | Depende | BE |
|---|---|---|---|
| B-01 | `/signup` en pasos: cuenta → verificación de correo (estado). "Busco talento" ya está desactivada (DEC-022) | A | BE-002 |
| B-02 | `/login` + `proxy.ts` con redirección optimista a `/login?next=` | A | BE-001, BE-002 |
| B-03 | Crear `lib/models/`, `lib/services/` y fixtures de usuarios y perfiles | A | — |
| B-04 | `/talent/onboarding` con `StepNav` (4 pasos) | B-01, B-03 | BE-004 |
| B-05 | `/talent/profile/edit` | B-03 | BE-006 |
| B-06 | `/u/[username]` (público, privado, inexistente) + `/talent/profile` → propio | B-03 | BE-005 |
| B-07 | `/talent/settings`: cuenta, privacidad, cerrar sesión | B-03 | BE-007 |
| B-08 | `/privacy`, `/terms`, `/contact` + enlazar en el pie | A | BE-022 |
| B-09 | `/forgot-password` | B-02 | BE-023 |

Criterios comunes:
- Validación en cliente con mensajes en `Field error`; los mismos campos y reglas se listan en BE-XXX.
- Enviar nunca muestra "Cuenta creada": muestra "Simulación" y avanza al siguiente estado visual.
- Visibilidad por defecto `private` en el onboarding y en settings.
- **B-02:** al existir `/login`, se reactiva "Iniciar sesión" en `SiteHeader` y los guards pasan de `signed-out` a redirección.
- **B-06:** el perfil privado no filtra **ningún** dato (ni nombre ni avatar) en HTML, metadatos ni `<title>`; `robots: noindex`.
- **B-07:** cambiar visibilidad muestra una vista previa de lo que verán terceros.

---

## C · Catálogo y ficha de empresa

**Estado (2026-10-22): hecho en modo demo.** C-01…C-05 construidos y verificados en Chrome (escritorio, 768 y 390 px, claro y
oscuro) y en el build de producción. Las escrituras son simulaciones. Pendiente de backend: BE-008, BE-009, BE-025.
Pendiente de legal: L-20, L-21 y LQ-06 (los textos de la ficha son provisionales). Pendiente de producto: OI-019 (ficha de CLH)
y OI-020 (dominio para la URL canónica). Decisiones: DEC-030, DEC-031, DEC-032.

| ID | Ticket | Depende | BE | Estado |
|---|---|---|---|---|
| C-01 | `CompanyCardVM`, `CompanyDetailVM`, servicio y fixture con slug, módulos, fuentes y `lastReviewedAt` | A | BE-008, BE-009 | Hecho |
| C-02 | `/companies/[slug]` modular: cabecera, módulos, fuentes, aviso de desactualización, 404 | C-01 | BE-009 | Hecho |
| C-03 | `/companies`: el CTA de `CompanyCard` navega a la ficha; filtros y búsqueda en la URL | C-02 | BE-008 | Hecho |
| C-04 | Fichas no publicadas devuelven 404 en público (fixture con una ficha en borrador) | C-01 | BE-009 | Hecho |
| C-05 | Seguir / dejar de seguir empresa en la ficha (simulado) y "Empresas que sigues" en el perfil propio | C-02, B-03 | BE-025 | Hecho |

Criterios:
- Los módulos vacíos no se pintan; una ficha sin módulos muestra `PageState empty` dentro de la ficha.
- Aviso de desactualización con `Alert tone="warning"` y fecha concreta si `lastReviewedAt` supera 180 días (DEC-020).
- Cada dato con fuente la muestra; nada de auditoría interna en público (decisión 13).
- Sin cifras inventadas: los números del fixture se marcan como ejemplo en el propio fixture.
- Desviaciones respecto al plan: las fuentes no son un módulo sino una pestaña aparte (DEC-031); `data/mock.ts` ya no contiene
  empresas (X-06 hecho para empresas); `/talent/dashboard` y el panel de Admin leen de `lib/services/companies.ts`.
- Estados de prueba en el fixture: Vialink desactualizada, Trazo sin módulos, Kairos Edu sin Cultura, Brisa Salud en borrador
  (404 en público), CLH como empresa publicadora, Marcos sin empresas seguidas.

---

## D · Dashboard Talent

**Estado (2026-10-23): hecho en modo demo.** D-01 construido y verificado en Chrome (1280, 768 y 390 px, claro y oscuro) y en
el build de producción. Todo se lee de fixtures a través de `lib/services/dashboard.ts`. Pendiente de backend: BE-021 (y
BE-005, BE-008 y BE-025 de los que se compone). Pendiente de producto: OI-021. Decisión: DEC-033.

| ID | Ticket | Depende | BE | Estado |
|---|---|---|---|---|
| D-01 | Dashboard compuesto: completitud de perfil, empresas sugeridas (sin "matching"), accesos rápidos | B-03, C-01 | BE-021 | Hecho |

Criterios: cada módulo tiene estado vacío propio; sin puntuaciones ni "score" (brief); el único `primary` es el siguiente paso del onboarding.
- El botón `primary` nombra el paso concreto ("Añadir formación") y lleva al apartado del editor (`/talent/profile/edit#formacion`).
  Con el perfil vacío (0 %) es "Empezar mi perfil" y lleva a `/talent/onboarding`. Con el perfil completo no hay `primary`.
- "Qué falta en tu perfil" desaparece con el perfil completo. "Empresas de tus intereses" tiene tres vacíos: sin intereses
  (enlaza al editor), sin fichas publicadas de esos temas y "ya sigues a todas".
- Las empresas salen de las fichas publicadas cuya categoría coincide con un interés, sin las que ya sigues. Sin puntuación ni orden
  por afinidad (decisión 11 del brief).
- Desviaciones respecto al plan: se retiran las cuatro tarjetas de cifras y "Tu cuenta" de la versión básica (no pertenecen a D-01);
  la barra de apartados es un elemento propio (DEC-033). Las secciones del editor ganan `id` para poder enlazarlas.

---

## E · Encuestas y cursos — prioridad de negocio alta

| ID | Ticket | Depende | BE |
|---|---|---|---|
| E-01 | Modelos y fixtures de encuestas (abierta, próxima, cerrada, completada, no elegible), publicadas por empresas y por CLH (`cmp-clh`) | A | BE-010, BE-011 |
| E-02 | `/talent/surveys`: pestañas Disponibles / Completadas, vacíos, cerradas | E-01 | BE-010 |
| E-03 | `/talent/surveys/[slug]`: intro + consentimiento, secciones con progreso, tipos de pregunta, borrador local, revisión, envío simulado, estados cerrada / completada / no elegible / 404 | E-01 | BE-011, BE-012 |
| E-04 | Modelos y fixtures de cursos y credenciales | A | BE-013, BE-015 |
| E-05 | `/talent/courses`: filtros por formato y estado, vacío | E-04 | BE-013 |
| E-06 | `/talent/courses/[slug]`: temario, requisitos, si otorga credencial, interés de inscripción simulado | E-04 | BE-014 |
| E-07 | `/talent/credentials`: logros obtenidos, vacío con enlace a cursos | E-04 | BE-015 |
| E-08 | Decidir `/programas` (DEC-009): redirigir o retirar | E-05 | — |
| E-09 | Módulos de encuestas y cursos en el dashboard | D-01, E-02, E-05 | BE-021 |

Criterios:
- **E-03:** navegable solo con teclado; progreso anunciado (`aria-live`); preguntas obligatorias validadas antes de
  avanzar; el borrador se guarda en `sessionStorage` dentro de try/catch; enviar muestra "Simulación: no hemos
  guardado tus respuestas"; al volver, la encuesta aparece como completada solo en esa sesión.
- **E-06:** sin URLs externas inventadas; si el curso no tiene enlace real, el CTA queda en "Me interesa" simulado.
- **E-07:** una credencial nunca se "emite" desde la UI; solo se listan las del fixture.
- Encuestas y cursos activan su ítem en `talentNav` al cerrar E-02 y E-05.

---

## F · Admin CLH mínimo

| ID | Ticket | Depende | BE |
|---|---|---|---|
| F-01 | Dashboard con conteos del fixture y accesos a lo construido | Shell hecho; completar tras F-02 | BE-003 |
| F-02 | `/admin/companies`: `Table` con estado editorial, búsqueda, filtros, vacío | C-01 | BE-016 |
| F-03 | `/admin/companies/[id]/edit`: editor por módulos, borrador, vista previa, enviar a revisión (simulado) | F-02 | BE-016 |
| F-04 | `/admin/reviews`: cola con aprobar / pedir cambios (simulado) | F-03 | BE-017 |
| F-05 | `/admin/surveys`: listado + editor de encuesta. El editor es un componente de dominio que reutilizará el Company Portal (DEC-016) | E-01 | BE-018 |
| F-06 | `/admin/courses`: listado + editor de curso | E-04 | BE-019 |

Criterios: `Table` en escritorio y lista de `Card` en móvil; confirmación con `Dialog` antes de acciones de estado;
publicar nunca dice "Publicado": dice "Simulación"; nada de datos de auditoría en rutas públicas.

---

## G · Posterior

Oportunidades, retos y envío de propuestas, Company Portal (`/company/*`), comunidad, mensajería (la última).
Solo documentación hasta que se prioricen. No crear archivos.

---

## Transversales

| ID | Ticket | Notas |
|---|---|---|
| X-01 | Configurar ESLint (`eslint-config-next`) | No hay lint hoy |
| X-02 | Tests de humo (Playwright): rutas, 404, roles, ambos temas | No hay tests hoy |
| X-03 | Fuentes con `next/font` (Inter, Space Grotesk) | Pendiente desde `MIGRACION.md` |
| X-04 | Peticiones al design system (DEC-007): la v1.1 resolvió 1–11; quedan NavBar responsive, StatStrip en móvil y el punto 12 | Para el equipo del DS |
| X-05 | `CLAUDE.md` cita `docs/brand-guide.md`, `docs/components/*.md` y `types/index.d.ts`, que no existen aquí | Los tipos están en `design-system/index.d.ts` |
| X-06 | Partir `data/mock.ts` en `data/fixtures/<dominio>.ts` | Empresas hecho con C-01; quedan programas, cifras de la landing y retos |
| X-07 | Preparar la migración a `frontend/` del monorepo: actualizar `MIGRACION.md`, `turbopack.root`, variables `BEWAY_*` | Cuando exista el repo (DEC-019) |

### X-04 · Peticiones al design system

| Componente | Problema | Propuesta |
|---|---|---|
| `Button` | La variante `outline` define `border` (shorthand) y en hover añade `borderColor`. Al salir del hover React quita `borderColor` y avisa en desarrollo: *"Removing a style property during rerender (borderColor) when a conflicting property is set (border)"*. Además el borde puede quedarse con el color del texto | En `VARIANTS` usar `borderWidth`, `borderStyle` y `borderColor` por separado (también en `onInverse`), o que `HOVER.outline` use `border: '1px solid var(--brand-gray-400)'` |
| `Radio`, `RadioGroup` | No usan `input` nativo ni `role="radio"`: no se pueden enfocar ni usar con teclado | `input type="radio"` visualmente oculto + `label`; `RadioGroup` con `role="radiogroup"` y flechas. Bloquea la accesibilidad de E-03 |
| `NavBar` | No es responsive (estilos inline, altura fija) y no tiene estado activo para enlaces | Menú móvil, ocultar búsqueda en móvil, enlaces con `aria-current` |
| `StatStrip` | Desborda en móvil con 4 elementos | Rejilla 2×2 o apilado por debajo de `sm` |
| — | No hay barra de navegación de demo/entorno | Valorar si `DemoBar` pasa al DS o se queda local |
