# Frontend BEWAY · Documentación de trabajo

Punto de entrada para cualquier persona o agente que vaya a tocar el frontend. Léelo entero antes de empezar un bloque.

## Orden de lectura

1. [`/CLAUDE.md`](../../CLAUDE.md): reglas del design system (tokens, cyan, copy, accesibilidad). Obligatorio.
2. [AGENT_BRIEF.md](AGENT_BRIEF.md): alcance, 16 decisiones cerradas y normas. Fuente de verdad.
3. [ARCHITECTURE.md](ARCHITECTURE.md): cómo está montado el frontend y por qué.
4. [ROADMAP.md](ROADMAP.md): bloques A–G, dependencias y tickets con criterios de aceptación. **Aquí eliges qué hacer.**
5. [ROUTES.md](ROUTES.md): mapa de URLs, estado de cada una y redirecciones.
6. Según el ticket: [SCREENS.md](SCREENS.md), [FRONTEND_MODELS.md](FRONTEND_MODELS.md), [BACKEND_HANDOFF.md](BACKEND_HANDOFF.md).
7. Antes de decidir algo nuevo: [DECISIONS.md](DECISIONS.md) y [OPEN_ISSUES.md](OPEN_ISSUES.md).

Referencia: [EXISTING_UI_AUDIT.md](EXISTING_UI_AUDIT.md) (estado del repo el 2026-10-22), [CHANGELOG.md](CHANGELOG.md)
y [LEGAL_REQUESTS.md](LEGAL_REQUESTS.md) (textos y preguntas para legal).

## Estado actual (2026-10-23)

| Bloque | Estado |
|---|---|
| A · Shells, navegación, 404, cabecera única y barra de demo | **Hecho** (salvo A-07 y A-08, ver ROADMAP) |
| B · Auth, onboarding, perfil, settings | **Hecho en modo demo** (B-01…B-09; ver CHANGELOG) |
| C · Catálogo y ficha de empresa | **Hecho en modo demo** (C-01…C-05; ver CHANGELOG) |
| D · Dashboard Talent | **Hecho en modo demo** (D-01, 2026-10-23; ver CHANGELOG). Los módulos de encuestas y cursos llegan con E-09 |
| E · Encuestas y cursos (**prioridad alta**) | **Hecho en modo demo** (E-01…E-09, 2026-10-23; ver CHANGELOG). Encuestas, cursos, credenciales y sus módulos en el inicio |
| F · Admin mínimo | **Siguiente** (F-02, `/admin/companies`; F-05 y F-06 ya tienen modelos). Shell hecho; pantallas planificadas |
| G · Oportunidades, retos, Company, comunidad | Solo en documentación |

## Cómo trabajar un ticket

1. Toma un ticket de [ROADMAP.md](ROADMAP.md) cuyas dependencias estén hechas.
2. Revisa su pantalla en SCREENS, sus modelos en FRONTEND_MODELS y sus `BE-XXX`.
3. Construye con componentes de `@ds` y tokens. Si falta un patrón, constrúyelo con tokens y regístralo en DECISIONS como petición al design system. **No edites `design-system/`.**
4. Datos: fixtures en `data/`, leídos a través de `lib/services/` (ver ARCHITECTURE). Nada de lógica de negocio en páginas.
5. Cuando la pantalla funcione: cambia su ítem de navegación a `status: 'live'` en [`lib/routes.ts`](../../lib/routes.ts).
6. Actualiza la documentación (abajo) y reporta con el formato del brief.

## Documentación obligatoria al cerrar un bloque

| Archivo | Qué actualizar |
|---|---|
| ROUTES.md | Estado de la ruta (`NOW/NEXT/LATER` → `Hecha`), redirecciones nuevas |
| SCREENS.md | Ficha completa de la pantalla (plantilla al final del archivo) |
| FRONTEND_MODELS.md | View Models y fixtures nuevos o modificados |
| BACKEND_HANDOFF.md | Operaciones nuevas con ID `BE-XXX`; nunca inventar endpoints |
| DECISIONS.md | Cualquier desvío del plan o patrón nuevo (`DEC-XXX`) |
| CHANGELOG.md | Qué cambió y fecha |
| OPEN_ISSUES.md | Dudas que no puedes resolver sin el equipo (`OI-XXX`); al resolverse pasan a "Resueltas" y a DECISIONS |
| LEGAL_REQUESTS.md | Textos legales nuevos que necesite la pantalla (`L-XX`) o preguntas para legal (`LQ-XX`) |

## Definition of Done

Un ticket está terminado cuando:

- [ ] `npm run typecheck` y `npm run build` pasan.
- [ ] Probado a 360–390 px, 768 px y 1280 px sin scroll horizontal.
- [ ] Probado en tema claro y oscuro.
- [ ] Tiene sus estados: vacío, carga (si aplica), error, 404/sin acceso cuando corresponda.
- [ ] Ningún enlace ni CTA lleva a una página inexistente (los ítems `planned` no se muestran).
- [ ] Nada simula un éxito real: registro, envío, publicación o credencial muestran "Simulación".
- [ ] Ningún dato privado aparece en pantallas públicas.
- [ ] Sin literales de color, sin paleta por defecto de Tailwind, sin fuentes nuevas, sin emoji.
- [ ] Copy en español de España, tuteo, verbos primero, cifras concretas que salgan del dataset.
- [ ] Foco visible, `label` en IconButton, `Field label` o `aria-label` en cada input.
- [ ] Documentación actualizada según la tabla anterior.

## Comandos

```bash
npm run dev          # http://localhost:3000
npm run typecheck
npm run build
BEWAY_MOCK_ROLES=talent npm run dev   # /admin muestra "sin acceso"
BEWAY_MOCK_ROLES=none npm run dev     # /talent y /admin piden iniciar sesión
NEXT_PUBLIC_BEWAY_DEMO_BAR=off npm run dev   # sin la barra de demo
```

## Cuentas de demostración

| Cuenta | Espacios | Notas |
|---|---|---|
| Lucía Martín (`lucia-martin`) | Talent y Admin CLH | Perfil público, completo al 80 %. Entra por defecto con cualquier correo y contraseña. |
| Marcos Gil (`marcos-gil`) | Talent | Perfil privado. Admin muestra "sin acceso". |

La sesión es una cookie de la demo (`bw_demo`), no un acceso real (DEC-023). Para cerrarla: Ajustes > Cerrar sesión.

## Presentar la demo

La barra oscura superior ("DEMO · Público · Talent · Admin CLH") salta entre espacios desde cualquier página.
Recorrido sugerido: `/` → Empresas → Crear cuenta (muestra "Simulación") → Talent → Empresas → una ficha (pestañas,
"Seguir") → Perfil ("Empresas que sigues") → Admin CLH → una URL inexistente (404 dentro del espacio) → tema oscuro con
el botón de la luna.

Con sesión, la navegación es siempre la de Talent, también en `/`, `/companies` y los perfiles (DEC-030). Para enseñar la
web como la ve un visitante, cierra sesión (icono de salida de la cabecera). Fichas para probar estados: `vialink`
(desactualizada), `trazo` (sin contenido), `kairos` (sin Cultura) y `brisa-salud` (borrador, da 404).

Inicio Talent (`/talent/dashboard`) cambia según la cuenta: Lucía está al 80 % (le falta la formación; botón principal
"Añadir formación") y Marcos al 100 % (el módulo "Qué falta" desaparece y no hay botón principal). "Empresas de tus
intereses" no muestra las que ya sigues, y se actualiza al seguir una desde su ficha. Un perfil vacío (0 %) y uno sin
intereses se prueban vaciando esos campos en `data/fixtures/profiles.ts`.

Encuestas, cursos y credenciales (bloque E) también dependen de la cuenta. **Lucía** sigue a Metrovía, Datalia y CLH: tiene una encuesta en curso
(Datalia, con respuestas guardadas), una abierta sin empezar (CLH, con las cinco clases de pregunta), una próxima, una cerrada, una completada y una
que no es para ella (Nexora); además dos credenciales. **Marcos** (interés en Energía, sin seguidas) solo puede responder la de Nexora, ve las
demás como "No son para ti por ahora" y no tiene credenciales (estado vacío). Para probar el envío: responde `primer-paso-profesional`; al enviar
(simulado) pasa a Completadas y desaparece de "Encuestas por responder" en el inicio mientras no cierres la pestaña. "Me interesa" en un curso
también solo dura la sesión. Cursos: prueba `/talent/courses?format=online&status=open` y un curso cerrado (`logistica-y-ultima-milla`). `/programas`
redirige a `/companies`.

No hay lint de proyecto ni tests todavía (ver X-01 y X-02 en ROADMAP). Para pantallas de trabajo se usa el `lint` y el `inspect` del skill de estilo
(ver [DESIGN.md](DESIGN.md)).

## Versión documental (graphify)

`graphify-out/` contiene un grafo de conocimiento del repo y esta documentación. Para preguntas de arquitectura o
relaciones entre archivos, consúltalo primero; regenéralo con `/graphify` al cerrar cada bloque.
