# Correcciones visuales Beway · Plan de implementación

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reproducir la nueva referencia visual (fichas 01 a 40, 17 fichas corporativas y puntos de cambio 1650/1150/900/650) sobre la demo actual, sin cambiar autenticación, permisos, guardado, progreso, envíos ni consentimientos.

**Architecture:** Una rama por fase, encadenadas: cada rama parte de la anterior y se integra en `main` por PR al cerrarse. Primero fuentes, tokens y componentes compartidos del design system (cabecera, botones, tarjetas, formularios, modal, footer); después las pantallas por zona. Los componentes de `design-system/src` usan estilos en línea, así que el aspecto se cambia en el DS y en sus tokens, y Tailwind queda para layout y espaciado.

**Tech Stack:** Next.js 16.4.2 (App Router), React 19.3.1, TypeScript 5.9.3 estricto, Tailwind 4.3.3, `next/font/google` (DM Sans y Manrope), `@ds` = `design-system/` (JSX con estilos en línea), Lucide 0.469.0. Verificación: `npm run typecheck`, `npm run build`, comparación visual manual y skill impeccable.

**Spec:** `docs/correcciones-visuales/00-instrucciones-generales.md`, `01` a `07`, y `Beway_correccion_visual_completa.pdf` (92 páginas: fichas en pp. 39–78, anexo de empresas en pp. 79–89, valores compartidos en pp. 37–38, lista final en p. 92). Referencia viva: `https://beway-front-tecnologia.lush-plum-4141.chatgpt.site/#/empresas` (CSS en `/style.css`). Demo: `https://beway-front-demo.vercel.app/`.

**Ubicación de este plan:** `docs/correcciones-visuales/PLAN.md`. Sustituye a `docs/superpowers/plans/` por preferencia del usuario: todo lo de esta tarea vive junto.

---

## Estado

| Paso | Estado |
|---|---|
| Instrucciones 00 a 07 y PDF leídos (texto de pp. 2–5, 31–38, 46, 92; índice de las 92 páginas) | Hecho |
| Referencia abierta: `style.css` y `app.js`; fuentes DM Sans y Manrope; `:root` coincide con 01 A2 (`--navy #0b172c`, `--teal #04b8b6`, `--teal-light #e7f6f5`, `--muted #788496`, `--line #e4e9ee`, `--paper #f5f7f9`) | Hecho |
| PDF renderizable con PyMuPDF (`import pymupdf`). Las capturas del PDF son de baja resolución: la fidelidad se mide contra la referencia viva | Hecho |
| Inventario de solo lectura: un agente de infraestructura y uno por fase (01–07). Sin errores | Hecho |
| Typecheck de línea base (`npm run typecheck`) | OK, sin errores |
| Build de línea base (`npm run build`) | OK, código de salida 0 |
| Rama de partida `correcciones/00-base` y commit de la fase 00 (`a30e21f`) | Hecho |
| Confirmación del usuario de este plan y de las decisiones D1–D10 | Pendiente |

**Regla de la fase 00 (de 00-instrucciones):** no se implementa ninguna fase hasta que el usuario confirme el plan.

---

## Reglas globales (de 00 y 01, valores exactos)

- Viewports de comprobación: 1440×900, 768×1024, 390×844. Saltos: 1650, 1150, 900 y 650 px.
- Fuentes: DM Sans para UI y cuerpo; Manrope para titulares (700; 750 en L'Oréal; 800 en plantillas). Con `next/font/google`. Arial solo en McGraw Hill y SILBON, por ficha.
- Colores de la referencia: navy `#0B172C`, ink `#14223A`, muted `#788496`, line `#E4E9EE`, paper `#F5F7F9`, teal `#04B8B6`, teal claro `#E7F6F5`, teal texto `#072A35`, navy hover `#183552`, surface `#F6F8FA`, input line `#E0E6EC`, card line directorio `#E2E7ED`, scrim `rgba(8,27,50,.42)` con blur 5 px.
- Radios: botones y campos 7 px; buscador 8 px; tarjeta genérica 13 px; directorio 12 px; modal 14 px; acceso/registro 15 px; pill solo en `Tag`.
- Modal: `max-width 740px`, `width calc(100% − 38px)`, `max-height 90dvh` con scroll interno; cabecera `18px 26px`; cuerpo `30px`.
- Contenedor: escritorio `max-width 1510px`, padding `36px 32px 65px`; narrow `1160px`; móvil `25px 15px 38px`.
- Grids: catálogos 3 columnas gap 21 px; empresas 3 columnas gap 24 px; detalle main + sidebar 335 px gap 25 px; panel 1.75:1 gap 23 px; perfil 1.75:1 gap 24 px; oportunidades 2 columnas gap 18 px.
- Cinco métricas de empresa, en este orden: Certificaciones, Challenges, Encuestas, Miniproyectos, Oportunidades. Sin dato, "—".
- Sin atajos de demo: no cambiar servicios por `localStorage`; no quitar contraseña, consentimientos ni validaciones; no enviar candidaturas, encuestas, altas ni publicaciones durante la revisión.
- Datos ficticios: fixtures marcados `TODO(seed):` y con cabecera "ficticio". Sin fórmulas nuevas (BEWAY Score, ranking, Top 5 %) para igualar cifras.
- Copy en español de España, tuteo, verbos primero, sin emoji.
- Definición de hecho (`docs/frontend/README.md`): `typecheck` y `build` pasan; 360–390, 768 y 1280 px sin scroll horizontal; tema claro y oscuro; estados vacío, carga, error y sin acceso; ningún enlace a página inexistente; nada simula éxito real (todo muestra "Simulación").

---

## Review Focus

Cinco entradas que la especificación implica y que ninguna tarea de la versión inicial comprueba. Cada una tiene su prueba en la tarea que es dueña del código.

1. **Empresa sin datos** (sin cursos, sin encuestas, sin logo, sin portada). La tarjeta muestra "—" y el placeholder, sin romperse ni inventar cifras. → prueba en **F02-T5** (paso 5) y **F03-T1**.
2. **Filtro sin resultados y texto largo.** El estado vacío aparece con su botón "Ver empresas" que limpia los filtros; un nombre de 60 caracteres se parte sin desbordar la tarjeta de altura fija. → prueba en **F02-T4** (paso 4).
3. **Estados extremos de progreso** (0 %, 100 %, sin progreso guardado, sin credencial). El CTA cambia según el estado real y ningún lateral muestra progreso que no exista. → prueba en **F04-T2** (paso 2) y **F06-T1** (paso 3).
4. **Formulario con error y datos escritos.** El error aparece junto al campo y el texto escrito no se borra al cambiar de paso ni al volver. → prueba en **F07-T4** (paso 4) y **F06-T3** (paso 2).
5. **Anchura extrema.** A 390 px, solo la navegación se desplaza en horizontal; a 1650 px el directorio tiene 4 columnas y no se estira una tarjeta sola. → prueba en **F02-T1** (paso 3) y en la puerta de fase de cada rama.

**Limitación:** el proyecto no tiene lint ni tests (ROADMAP X-01 y X-02). Las pruebas son `typecheck`, `build`, la comparación visual de la puerta de fase y el checklist de estados. Propuesta en D8: añadir Playwright para capturas y comparación, en una rama aparte.

---

## Ramas y flujo

| Rama | Parte de | Fase | PR contra |
|---|---|---|---|
| `correcciones/00-base` | `main` | 00 · Preparación: plan, fichas y punto de partida | `main` |
| `correcciones/01-base` | `correcciones/00-base` | 01 · Fuentes, tokens, DS, cabecera, modal, footer | `correcciones/00-base` |
| `correcciones/02-directorio` | `correcciones/01-base` | 02 · Bienvenida, directorio, tablet, cierre | `correcciones/01-base` |
| `correcciones/03-fichas-empresa` | `correcciones/02-directorio` | 03 · 17 fichas corporativas | `correcciones/02-directorio` |
| `correcciones/04-aprendizaje` | `correcciones/03-fichas-empresa` | 04 · Certificaciones, detalle, aula, evaluación | `correcciones/03-fichas-empresa` |
| `correcciones/05-challenges-miniproyectos` | `correcciones/04-aprendizaje` | 05 · Challenges y miniproyectos | `correcciones/04-aprendizaje` |
| `correcciones/06-panel-perfil` | `correcciones/05-challenges-miniproyectos` | 06 · Mi panel, perfil, vista para empresas | `correcciones/05-challenges-miniproyectos` |
| `correcciones/07-oportunidades-acceso` | `correcciones/06-panel-perfil` | 07 · Oportunidades, candidatura, encuestas, acceso, registro, ayuda | `correcciones/06-panel-perfil` |

- **Integración:** al cerrar una fase se abre su PR contra la rama anterior. Al final, `main` recibe la cadena en orden (00, 01 … 07). Si `main` cambia, cada rama se pone al día con `main` antes de su PR.
- **Commits:** `correcciones(fase-NN): <tarea>` en español, con una tarea por commit. Cada commit termina con `Co-Authored-By: Claude Haiku 5.5 <noreply@anthropic.com>`.
- **Git:** no se hace push ni se abre PR sin pedirlo. No se incluyen en ningún commit el cambio sin commitear de `.gitignore` (añade `.vercel` y `.env*`, ajeno a esta tarea) ni `Beway_correccion_visual_completa.pdf` (9 MB, decisión D8). Cada commit se hace con rutas explícitas, nunca con `git add -A`.
- **DS fuera de la rama de fase:** cada cambio en `design-system/` queda registrado en `docs/correcciones-visuales/DS_CAMBIOS.md` (archivo, valor anterior, valor nuevo, motivo) para reaplicarlo si el DS se reemplaza al actualizar su origen (`docs/frontend/DS_REQUESTS.md`).

### Puerta de fase (obligatoria antes de cerrar cada rama)

1. `npm run typecheck` y `npm run build` pasan.
2. Capturas comparables: referencia (Browser pane, `#/…`) y resultado local (`npm run dev`), mismo viewport, mismo estado, en 1440×900, 768×1024 y 390×844, en claro y oscuro. Superposición o diff para localizar desplazamientos, anchos y alturas.
3. En 390 px, sin scroll horizontal de página (solo la fila de navegación se desplaza).
4. Estados de la fase revisados con teclado (Tab, Enter, Escape) con foco visible.
5. Impeccable: leer `reference/craft-floor.md` antes de editar UI; al terminar, `impeccable.cmd detect --json <archivos cambiados>` sin hallazgos bloqueantes. Pasada final con `polish` si la fase toca UI visible.
6. Documentación de cierre (`docs/frontend/README.md`): ROUTES, SCREENS, DECISIONS, CHANGELOG, DS_CAMBIOS, y pendientes en `docs/correcciones-visuales/PENDIENTES.md` con su causa.
7. Lo que no se pudo verificar se dice tal cual: "no verificado" con la razón.

**Impeccable (ruta de la herramienta):** `C:\Users\chris\.claude\plugins\marketplaces\impeccable\.claude\skills\impeccable\scripts\impeccable.cmd`. Ya ejecutado `context` (sin `PRODUCT.md`; ver D10).

---

## Decisiones que necesito del usuario

Cada una tiene una recomendación. Sin confirmación no empieza la fase 01.

- **D1 · Design system.** ¿Autorizas editar `design-system/src/*.jsx` y sus tokens (`tokens.json`, `tokens.css`, `theme.css` regenerado con `scripts/mk_theme.py`) cuando el choque sea de componente o de token? **Recomendado: sí**, registrando cada cambio en `DS_CAMBIOS.md`. Los overrides locales en `components/` solo como puente temporal.
- **D2 · Acento.** La referencia usa navy para el primario y reserva el teal para progreso y estados pequeños. Hoy el DS tiene cian `#00D4FF` como acento y primario. **Recomendado: adoptar la referencia**: el cian sale de `action-primary`, `focus-ring`, enlaces y filtros. Esto deja obsoletas reglas de `CLAUDE.md` (cian como único acento, un primario cian por vista, un gradiente) y hay que actualizarlo con un DEC.
- **D3 · Contraste.** Con los valores de la referencia, muted `#788496` da 3,8:1 sobre blanco; el teal como texto da 2,5:1; el borde de campo `#E0E6EC` da 1,3:1. `CLAUDE.md` exige 4,5:1 para texto y 3:1 para bordes de control. **Recomendado:** valores de la referencia para superficies y decoración, y un token más oscuro solo para texto y bordes que deben cumplir. Es decisión de los fundadores si quieren fidelidad exacta.
- **D4 · Modo oscuro.** La referencia no define tema oscuro. **Recomendado:** derivar valores oscuros de los tokens nuevos (navy, teal, paper, ink, muted) y revisar cada ficha en los dos temas.
- **D5 · Pantallas del bloque G.** Aula, evaluación, challenges, miniproyectos, oportunidades, candidatura y ayuda no existen en el código, y `DEC-004` prohíbe crear rutas sin construir. Opciones: (a) construir la interfaz verificable con fixtures `TODO(seed)`, escrituras simuladas y etiqueta "Simulación", sin backend (regla 8 de 00); (b) diferirlas al bloque G y mantener la navegación solo con rutas vivas. **Recomendado: (a) en las fases 04, 05 y 07**, con un DEC que levante `DEC-004` solo para esas rutas.
- **D6 · Rutas y etiquetas.** **Recomendado:** mantener las URLs en inglés (`DEC-002`, `ROUTES.md`) y cambiar solo las etiquetas a las de la referencia: Certificaciones (apunta a `/talent/courses`), Challenges, Miniproyectos, Encuestas, Oportunidades, Mi panel, Mi perfil. Sin rutas con `#`.
- **D7 · Marcas reales.** Las 17 fichas usan nombres, logos y colores de marcas reales (Google, Netflix, Santander, IBM…). En una demo pública pueden sugerir asociaciones. **Recomendado:** usar esos nombres solo si legal lo aprueba (`LEGAL_REQUESTS.md`); si no, nombres ficticios con la misma composición. Los logos son placeholders `TODO(seed)`; nunca se dibujan a mano.
- **D8 · Dónde viven las capturas y el PDF.** **Recomendado:** capturas de comparación en `docs/correcciones-visuales/capturas/` sin commitear PNG hasta la puerta de fase; el PDF de 9 MB fuera de git. Además, ¿quieres Playwright para comparar capturas automáticamente? Añadiría una dependencia de desarrollo; **recomendado: sí, en una rama aparte antes de la fase 02**.
- **D9 · Copy pendiente.** Frase central del pie (ficha 40), sectores de la ficha 05, preguntas de ejemplo de encuestas (ficha 33), texto de la casilla de autoría y del botón de entrega (ficha 18). **Recomendado:** pedirlo a los fundadores antes de la fase correspondiente; mientras, `TODO(seed)`.
- **D10 · PRODUCT.md de impeccable.** El skill no encontró `PRODUCT.md`. Puede seguir con refinamiento sin él, pero `init` ayuda a fijar el producto. **Recomendado:** una entrevista corta con `/impeccable init` antes de la fase 01.
- **D11 · Datos sin modelo en panel, perfil y acceso.** BEWAY Score, ranking, "Tu semana" y "Tu voz también cuenta" no tienen modelo; Universidad no tiene campo; las habilidades validadas no tienen fuente; el botón "Entrar como…" y el alta simulada inician sesión como Lucía. **Recomendado:** todo dato sin modelo se rotula como "Ejemplo" o se oculta; no se crean modelos de puntuación ni de validación; "Entrar como…" se mantiene agrupado y etiquetado como demo, sin tocar `signInAs`; el alta simulada no crea sesión sin completar el proceso.

---

## Correcciones al material (discrepancias encontradas)

- **Ficha 08 (tablet y puntos de cambio) no tiene `.md`.** Solo existe en el PDF (p. 46). Se incluye en la fase 02.
- **Ficha 36 dice "Ahora: /signup"**, pero formación e intereses viven en `/talent/onboarding` (cuatro pasos: Sobre ti, Formación y experiencia, Intereses, Privacidad). Hay que corregir la lista antes de tocarla.
- **00 pide "un único archivo de fixtures"** (`src/fixtures/companies.ts`). El repo tiene `data/mock.ts` y ocho archivos en `data/fixtures/`. Se mantiene la estructura del repo y se añade un archivo de marcas `data/fixtures/brands.ts`.
- **Fichas corporativas:** el `.md` 03 solo trae el menú local de siete marcas. Las otras diez están en el PDF (p. 79–80). Ninguna de las 17 existe hoy en los datos.
- **Plantillas HTML de la referencia** (`/empresas/<slug>.html`) no son accesibles desde el agente. Se usan el anexo y el CSS de `style.css`, que sí se pudo leer.
- **`.taste-skill/direction.json`** define otro estilo (Instrument Sans y Instrument Serif, acento `#1b6e66`). `CLAUDE.md` dice que ajustes, perfil y onboarding siguen ese estilo y que, si choca con la marca, gana la marca. Por eso gana la referencia; hay que confirmarlo en D2.
- **Documentación que no coincide con el código:** `BEWAY_MOCK_ROLES` (README L74–75) no se lee en ningún archivo; `index.d.ts` cita `components/bundle.js`, que no existe; `python3` en esta máquina es un alias de la Store (usar `python`).
- **Ficha 06:** la referencia pide menú personal y notificaciones como modal. Notificaciones no tiene modelo, servicio ni fixture.
- **Ficha 10:** la referencia recorre la ficha de arriba abajo; `DEC-031` usa pestañas con `?tab=`. Cambiarlo exige un DEC.
- **Hero de empresa con título sobre la foto:** la referencia lo hace; `DEC-031` y la regla 4,5:1 de `CLAUDE.md` lo impiden. Requiere DEC.

---

## Fase 00 · Preparación (tarea actual)

**Files:** solo documentación. `docs/correcciones-visuales/PLAN.md` (nuevo), `docs/correcciones-visuales/00-…` a `07-…` (ya existentes, sin tracking).

- [x] **Step 1: Leer instrucciones 00–07 y el PDF** (texto y páginas clave). Hecho.
- [x] **Step 2: Inventario de solo lectura** por fase (8 agentes, sin errores). Hecho.
- [x] **Step 3: Typecheck de línea base.** Hecho. Resultado: `tsc --noEmit` sin errores.
- [x] **Step 4: Build de línea base.** Hecho. Resultado: `next build` con código 0. Rutas que existen hoy: `/`, `/companies`, `/companies/[slug]`, `/talent/dashboard`, `/talent/courses`, `/talent/courses/[slug]`, `/talent/credentials`, `/talent/profile/edit`, `/talent/surveys/[slug]`, `/u/[username]`, `/login`, `/signup`, `/privacy`, `/terms`, `/contact`, `/styleguide`, `/admin/dashboard`. No existen: `/challenges`, `/miniproyectos`, `/oportunidades`, `/aula`, `/ayuda`, `/panel`, `/perfil`.
- [x] **Step 5: Referencia abierta** y CSS `:root` confirmado. Hecho.
- [x] **Step 6: PDF renderizable.** `pymupdf` abre las 92 páginas y las pp. 39, 46 y 78 se leen. Comando para renderizar (no se commitea):

```bash
python -W ignore -c "import pymupdf,os; d=pymupdf.open('docs/correcciones-visuales/Beway_correccion_visual_completa.pdf'); os.makedirs('<carpeta-temporal>',exist_ok=True); [d[n].get_pixmap(dpi=110).save(f'<carpeta-temporal>/ref_p{n+1:02d}.png') for n in range(d.page_count)]"
```

- [x] **Step 7: Crear la rama de partida y commitear la fase 00.** Hecho: `a30e21f`.

```bash
git checkout -b correcciones/00-base
git add docs/correcciones-visuales/PLAN.md docs/correcciones-visuales/00-instrucciones-generales.md docs/correcciones-visuales/01-base-tokens-cabecera-modales.md docs/correcciones-visuales/02-bienvenida-y-directorio.md docs/correcciones-visuales/03-fichas-de-empresa.md docs/correcciones-visuales/04-certificaciones-aula-evaluacion.md docs/correcciones-visuales/05-challenges-y-miniproyectos.md docs/correcciones-visuales/06-mi-panel-y-perfil.md docs/correcciones-visuales/07-oportunidades-encuestas-acceso.md
git commit -m "docs(correcciones): plan y fichas de la fase 00" -m "Co-Authored-By: Claude Haiku 5.5 <noreply@anthropic.com>"
```

- [x] **Step 8: Verificar** `git log --oneline -2` y `git status --short`: quedan sin seguimiento el PDF y el cambio de `.gitignore`, como se planeó. Hecho.
- [ ] **Step 9: Confirmación del usuario** de este plan y de D1–D10. Hasta entonces no se toca código.

---

## Fase 01 · Base: fuentes, tokens, DS, cabecera, modal, footer

**Rama:** `correcciones/01-base` desde `correcciones/00-base`.
**Fichas:** 01 (cabecera y navegación, A1–A11, C), 06 (menú personal y notificaciones, D), 40 (footer, paso 3), y el tratamiento base de la ficha 01 (sección A).
**Tablas de referencia:** `01-base-tokens-cabecera-modales.md` secciones A, B, C y D; `PDF pp. 37–38` (valores compartidos).

### Task 01.1 · Fuentes y tokens

**Files:**
- Modify: `app/layout.tsx` (L17–23: quitar el `<link>` de Google Fonts; cargar DM Sans y Manrope con `next/font/google`, exponer `--font-body` y `--font-display`).
- Modify: `design-system/tokens.json` (`type.families`, colores, radios).
- Modify: `design-system/tokens.css` (L5 `--brand-cyan`, L40 `--action-primary`, L43 `--action-secondary`, L62–63 `--shadow-glow` y `--ring-focus`, L156–157 familias, L131–134 pesos del logo).
- Regenerate: `design-system/theme.css` con `python scripts/mk_theme.py design-system/tokens.json design-system/theme.css` (solo si cambian nombres de token).
- Create: `docs/correcciones-visuales/DS_CAMBIOS.md`.
- Modify: `docs/correcciones-visuales/01-base-tokens-cabecera-modales.md` (sección B, registro de tokens: archivo, antes, después, motivo).

**Interfaces:**
- Produces: `--font-body: 'DM Sans'`, `--font-display: 'Manrope'`; `--action-primary: #0B172C` con texto `#FFFFFF`; `--accent-teal: #04B8B6`, `--accent-teal-text: #072A35`, `--accent-teal-subtle: #E7F6F5`; `--text-muted: #788496` (ver D3); `--surface-page: #F5F7F9`; `--border-subtle: #E4E9EE`; `--border-control: #E0E6EC` (ver D3).

- [ ] **Step 1:** Anotar en la sección B de 01 cada token que cambia (valor anterior, valor nuevo, motivo). Esta tabla es el registro que pide 00.
- [ ] **Step 2:** Cambiar las fuentes en `app/layout.tsx` con `next/font/google`. Mantener el peso 800 solo donde lo pide la plantilla.
- [ ] **Step 3:** Cambiar los tokens de color en `tokens.json` y `tokens.css` a los valores de la tabla A2 de 01. Mantener los nombres semánticos; el cambio es de valor.
- [ ] **Step 4:** Si cambian nombres, regenerar `theme.css` con `mk_theme.py`. Si no, no tocarlo.
- [ ] **Step 5:** `npm run typecheck` y `npm run build`. Comprobar en el navegador que `/companies` carga con DM Sans y Manrope.

**Done when:** las fuentes son las de la referencia en todo el proyecto, sin nombres de fuente en componentes, y el registro de tokens está completo.

### Task 01.2 · Botones y radios (`design-system/src/Button.jsx`)

**Files:** Modify: `design-system/src/Button.jsx` (L8 tamaños, L15–16 variantes primary y secondary, L24 hover con glow, L35–51 fondos sobre foto); `design-system/src/Badge.jsx` (L7, rgba cian); `design-system/src/SectionLabel.jsx` (L13, var directo a cian).

- [ ] **Step 1:** Primario: fondo `--action-primary` (navy), texto blanco, radio 7 px, `min-height 42px`, padding `10px 17px`, 12 px / 650, icono 16 px. Hover: fondo `#183552` y `translateY(-1px)`, sin glow.
- [ ] **Step 2:** Secundario: fondo blanco, borde `#DFE5EA`.
- [ ] **Step 3:** Variante teal (solo progreso o confirmación puntual): fondo `#04B8B6`, texto `#072A35`.
- [ ] **Step 4:** Tamaños reducidos: small 34 px de alto y 11 px; empresa 37 px y 11 px.
- [ ] **Step 5:** Quitar el rgba cian de `Badge.jsx` L7 y `SectionLabel.jsx` L13; registrar en `DS_CAMBIOS.md`.

**Done when:** un primario navy por vista, el resto secundario; sin literales cian en `design-system/src`.

### Task 01.3 · Tarjetas, formularios y superficies

**Files:** `design-system/src/Card.jsx` (L5–7 borde, L20 radio); `design-system/src/Input.jsx`, `design-system/src/Field.jsx`; `components/forms/CheckField.tsx`, `OptionRadio.tsx`, `ToggleField.tsx`, `FormSection.tsx` (temporales hasta que el DS los cubra, según CLAUDE.md).

- [ ] **Step 1:** Tarjeta genérica: fondo blanco, borde `#E4E9EE`, radio 13 px, padding 25 px, sombra `0 2px 5px #102A3C03`. Directorio: radio 12 px, borde `#E2E7ED`.
- [ ] **Step 2:** Formularios: input 12 px, padding `11px 12px`, radio 7 px, borde `#E0E6EC` (ver D3), alto ~42 px; grid 2 columnas gap 18 px; a 650 px, una columna. Label visible siempre; foco visible; ayuda debajo, tenue; errores junto al campo sin borrar lo escrito.
- [ ] **Step 3:** Pantallas afectadas (comprobar que no cambian sus reglas): `/login`, `/signup`, `/talent/settings`, `/talent/profile/edit`, `/talent/onboarding`, `/talent/surveys/[slug]`.

**Done when:** los campos de las seis pantallas tienen label, foco y error visibles, y los valores escritos se mantienen.

### Task 01.4 · Cabecera en dos filas (ficha 01)

**Files:** `components/shells/AppHeader.tsx` (L82 sticky, L84 NavBar, L88–95 logo, L96 NavList, L44–47 modificadores `!`); `components/shells/DemoBar.tsx` (L12 alto 40 px); `components/shells/ShellNav.tsx`; `components/SiteHeader.tsx`; `design-system/src/NavBar.jsx` (L19 alto 76 px, L32 buscador 520 px, L38 alto de control). Lista de navegación en `lib/routes.ts` (L24–48).

- [ ] **Step 1:** Estructura de dos filas: fila 1 con logo a la izquierda y buscador centro-derecha (máximo 515 px, radio 8 px, fondo `#F6F8FA`), y a la derecha guardadas, notificaciones y avatar con nombre y estado. Fila 2 con la navegación: a la izquierda Empresas, Certificaciones, Challenges, Miniproyectos, Encuestas, Oportunidades; a la derecha Mi panel y Mi perfil.
- [ ] **Step 2:** Alturas por contexto: directorio 66 px (logo 117×40, navegación 46 px); general 83 px (navegación 57 px); ficha de empresa 58 px (cabecera exterior compacta). Esto cambia `DEC-013` (una sola altura): hace falta DEC.
- [ ] **Step 3:** Elemento activo: subrayado teal de 2 px, texto oscuro, sin pastilla turquesa. El activo cambia con la ruta.
- [ ] **Step 4:** Banda de demo de 28 px. Si el entorno sigue siendo demo, con su aspecto. Los accesos Demo, Público, Talent y Admin no van en la navegación final de talento.
- [ ] **Step 5:** Solo se muestran rutas vivas (`DEC-004`). Las que no existen aún (Certificaciones con su nombre propio, Challenges, Miniproyectos, Encuestas, Oportunidades) se añaden cuando su fase esté lista (D5/D6). Hasta entonces la fila 2 muestra solo lo vivo.
- [ ] **Step 6:** Verificar `/companies` a 1440 px (dos filas, alturas, posiciones, iconos), la pestaña activa al cambiar de ruta, y el menú móvil.

**Done when:** a 1440 px las dos filas coinciden con la referencia en posición y altura, y la pestaña activa cambia con la ruta.

### Task 01.5 · Modal centrado (ficha 06 y base de 15)

**Files:** `design-system/src/Dialog.jsx` (L61 scrim y blur; L70 radio fijo `var(--radius-lg)`; padding); `components/shells/AppHeader.tsx`; `components/shells/MobileMenu.tsx` (hoy es un desplegable, no modal: `MobileMenu` no atrapa el foco). Modal de ajustes en `app/talent/settings/AccountSettingsForm.tsx` (dos `Dialog`).

- [ ] **Step 1:** `Dialog` del DS: max-width 740 px, `width calc(100% − 38px)`, `max-height 90dvh` con scroll interno, radio 14 px (cambio en `Dialog.jsx` L70), backdrop `rgba(8,27,50,.42)` con blur 5 px, cabecera `18px 26px`, cuerpo 30 px.
- [ ] **Step 2:** Cierre: X visible; Escape cierra; el foco queda dentro mientras está abierto; al cerrar, el foco vuelve al botón que abrió la ventana.
- [ ] **Step 3:** Menú personal y notificaciones como modal centrado (ficha 06): encabezado "MI ESPACIO", avatar, nombre y tipo de perfil; filas Explorar empresas, Mi panel, Mi perfil y CV, Ayuda, Cerrar sesión. Notificaciones: título "Lo que pasa en tu recorrido." y tres filas con icono, texto y destino (panel, perfil u oportunidades). **Sin modelo de notificaciones:** se usa un fixture `TODO(seed)` leído por un servicio. Esto es un gap que se registra, no se inventa.
- [ ] **Step 4:** Cerrar sesión dentro del modal: mismo formulario `signOut`, un clic, con teclado. No cambiar `lib/auth-actions.ts`.
- [ ] **Step 5:** Verificar escritorio y 390 px: la página de fondo se ve, y el modal no recorta texto.

**Done when:** las dos ventanas se abren centradas, cierran con X y Escape, devuelven el foco, y en 390 px tienen margen y acceso a todas las filas.

### Task 01.6 · Footer claro (ficha 40, paso 3)

**Files:** `design-system/src/Footer.jsx` (L8 comentario, L12 `background: var(--surface-inverse)`, L23–25 texto 13 px); `components/SiteFooter.tsx`; `app/(public)/layout.tsx`; `design-system/bundle.css` L11 (`--gradient-footer`).

- [ ] **Step 1:** Footer con fondo claro: marca "beway." a la izquierda, frase central, enlaces a la derecha. El fondo `--gradient-footer` (cian a navy) no se usa: contaría como segundo degradado (CLAUDE.md).
- [ ] **Step 2:** Enlaces reales: Privacidad y Términos (existen), Ayuda (no existe: D5), Contacto. Sin enlaces decorativos. La frase central necesita copy (D9): `TODO(seed)` hasta entonces.
- [ ] **Step 3:** Verificar en `/`, `/contact`, `/privacy`, `/companies` sin sesión.

**Done when:** el mismo footer claro aparece en todas las páginas públicas y no hay enlaces a páginas inexistentes.

### Task 01.7 · Cierre de la fase 01

- [ ] **Step 1:** `npm run typecheck` y `npm run build`.
- [ ] **Step 2:** Puerta de fase (capturas en 1440, 768 y 390; claro y oscuro; estados de botón, foco, modal abierto y cerrado).
- [ ] **Step 3:** `impeccable.cmd detect --json` sobre los archivos cambiados.
- [ ] **Step 4:** Documentación de cierre y `PENDIENTES.md` con las diferencias pendientes y su causa.
- [ ] **Step 5:** Commit por tarea y PR a `correcciones/00-base`. Sin push sin confirmación.

---

## Fase 02 · Bienvenida, directorio, tablet y cierre

**Rama:** `correcciones/02-directorio` desde `correcciones/01-base`.
**Fichas:** 02 (bienvenida), 03 (entrada Empresas), 04 (tarjeta), 05 (filtros y búsqueda), 07 (móvil), 08 (tablet, solo en PDF p. 46), 40 (cierre editorial).

### Task 02.1 · Contenedor y puntos de cambio (ficha 08)

**Files:** `design-system/theme.css` L110 (`--container-site` 1200 px → 1510 px); `design-system/tokens.css` L111 (`--container-lg`); `app/(shared)/companies/CompaniesView.tsx` L114 (grid).

- [ ] **Step 1:** Ampliar el contenedor a 1510 px (cambio global, en DS_CAMBIOS).
- [ ] **Step 2:** Directorio: desde 1650 px, 4 columnas; escritorio habitual, 3; ≤1150 px, gap 17 px y portada 150 px; ≤900 px, 2 columnas; ≤650 px, 1 columna.
- [ ] **Step 3:** Catálogos (en esta fase, solo el directorio): 3 columnas pasan a 2 a 900 px y a 1 a 650 px. Comprobación de anchura extrema del Review Focus (punto 5).

**Done when:** las cuatro anchuras del directorio coinciden en 1650, 1150, 900 y 650 px, sin scroll horizontal.

### Task 02.2 · Bienvenida: hero navy y mosaico (ficha 02)

**Files:** `app/(public)/page.tsx` (L13–14 `text-white`, L45–55 CTA con degradado); `data/mock.ts` (`partnerLogos`); `lib/routes.ts`.

- [ ] **Step 1:** Hero navy: radio 14 px, márgenes laterales 32 px, dos columnas 1.45:1, altura mínima 330 px. Título "Conecta con las empresas que construyen tu futuro." con la última frase en teal.
- [ ] **Step 2:** Título en Manrope 50/56 px, 700, letter-spacing −2.75 px en escritorio; móvil 35 px. Texto: "Aprende cómo trabajan, demuestra lo que puedes aportar y encuentra tu próxima oportunidad." Botones "Explorar empresas" (scroll al directorio, con `scroll-margin-top`) y "Construir mi perfil".
- [ ] **Step 3:** Mosaico de seis tiles en 3 columnas, ~85 px de alto, giro −6°. Logos como placeholders `TODO(seed)`; sin logos reales (D7).
- [ ] **Step 4:** Acceso visible: primera fila con Iniciar sesión y Crear cuenta. Los accesos personales aparecen según la sesión.

**Done when:** el primer pantallazo reproduce el hero, el mosaico y el comienzo del directorio.

**Riesgo:** el mosaico y las cifras de portada muestran marcas y datos ficticios en una página pública. Se etiquetan como ejemplo.

### Task 02.3 · Encabezado compacto del directorio (ficha 03)

**Files:** `app/(shared)/companies/CompaniesView.tsx`; `app/(shared)/layout.tsx`; `components/shells/ViewerShell.tsx`; `components/shells/AppShell.tsx`.

- [ ] **Step 1:** Quitar el bloque grande "DIRECTORIO" y el breadcrumb de la demo en esta pantalla.
- [ ] **Step 2:** H1 "Encuentra tu lugar.", 30 px / 1.2 en escritorio y 25 px en móvil. Subtítulo pequeño. "Mi panel" a la derecha.
- [ ] **Step 3:** Entrada de talento: la entrada del espacio de talento lleva a Empresas, y el logo vuelve al directorio.
- [ ] **Step 4:** "Mi panel" sin sesión no tiene destino: se oculta (decisión D5). Riesgo: sin cambio de permisos; el acceso sigue protegido por el layout de talento y por `proxy.ts`.

**Done when:** la cabecera del directorio tiene el H1 de 30 px y la entrada de talento abre Empresas.

### Task 02.4 · Filtros, búsqueda y estados (ficha 05)

**Files:** `app/(shared)/companies/CompaniesView.tsx`; `app/(shared)/companies/page.tsx`; `lib/services/companies.ts` (`getCompanyCategories`, `getCompanies`); `components/shells/AppHeader.tsx` (`onSearch` a `/companies?q=`); `design-system/src/Tag.jsx` (variante `filter`, selección cian → navy por D2).

- [ ] **Step 1:** Primera línea: número de empresas a la izquierda; buscador a la derecha. Segunda línea: sectores como botones que envuelven. Activo navy con texto blanco; el resto con fondo blanco y borde tenue.
- [ ] **Step 2:** Sectores: el catálogo real no tiene Banca, Editorial, Consultoría, Consumo, Entretenimiento, Retail, Seguros ni Tecnología. Se adaptan las categorías al catálogo real manteniendo esta presentación (ficha 05, punto 1).
- [ ] **Step 3:** Estado vacío: panel blanco amplio con icono; "No hay empresas con esos filtros." y "Prueba otro sector o cambia tu búsqueda."; botón "Ver empresas" que limpia los filtros.
- [ ] **Step 4:** Búsqueda global: Enter en la cabecera lleva a Empresas con la consulta en el buscador del directorio. Sin desplegable de sugerencias.
- [ ] **Step 5:** Controles coherentes: el contador se actualiza; el texto escrito se conserva; el filtro activo se ve; no quedan huecos donde estaban las tarjetas.
- [ ] **Step 6 (prueba del Review Focus 2):** nombre de 60 caracteres en una tarjeta de altura fija: se parte en líneas sin desbordar.

**Done when:** "Todas", un sector, texto sin coincidencias y restablecer funcionan, y Enter en la búsqueda global lleva al resultado filtrado.

**Riesgo:** el texto de búsqueda viaja en `?q=` y queda en el historial. No escribir datos personales en la búsqueda.

### Task 02.5 · Tarjeta de empresa (ficha 04)

**Files:** `design-system/src/CompanyCard.jsx` (inline; `DS_REQUESTS.md` punto 15: la tarjeta del DS solo navega desde el botón); `design-system/index.d.ts` (`CompanyCardProps`, L98–115); `lib/models/company.ts` (`CompanyCardVM`, `CompanyStatVM`); `lib/services/companies.ts` (`toCard`); `app/(shared)/companies/CompaniesView.tsx` (L115–126); `data/fixtures/companies.ts`.

**Interfaces:**
- Consumes: `CompanyCardVM` actual.
- Produces: `CompanyCardVM` con `stats` en el orden fijo de cinco métricas: `[{key:'certificaciones'},{key:'challenges'},{key:'encuestas'},{key:'miniproyectos'},{key:'oportunidades'}]`, cada una con `value: number | null` (null → "—").

- [ ] **Step 1 (Test primero):** test de `toCard` con una empresa sin cursos, sin encuestas y sin retos: las cinco métricas existen y dos son "—". Comprobarlo con `npm run typecheck` y, si no hay test runner, con la comprobación visual de la puerta de fase.
- [ ] **Step 2:** Portada de 174 px; logo sobre placa blanca 58×54 px, radio 10 px, padding 9 px, solape −26 px sobre la portada. Logos `object-fit: contain`; fotos `cover`.
- [ ] **Step 3:** Nombre en Manrope 18 px; sector 10 px muted; descripción 12 px / 1.6, altura mínima 57 px; botón "+" para seguir o check teal si ya se sigue (estado de `FollowButton`, sin cambiar la lógica).
- [ ] **Step 4:** Cinco celdas iguales, gap 5 px, altura mínima 62 px, fondo `#F6F8FA`; número 14 px, etiqueta 7 px. Orden: Certificaciones, Challenges, Encuestas, Miniproyectos, Oportunidades. Dato real o "—". Sin algoritmo nuevo.
- [ ] **Step 5:** CTA "Explorar empresa" navy a todo el ancho, altura mínima 37 px, 11 px, con flecha. Radio 12 px, borde `#E2E7ED`. Hover: sube 4 px y sombra suave. La escala 1.035 de la portada se omite por la regla de motion de CLAUDE.md ("no scale"): solo elevación, y queda anotado en PENDIENTES.
- [ ] **Step 6 (prueba del Review Focus 1):** empresa sin datos muestra "—" y placeholder, sin romperse.

**Done when:** portada, solape, textos, cinco celdas y CTA se alinean entre tarjetas, y las cifras proceden de datos disponibles o de fixtures explícitos.

**Riesgo:** cifras de ejemplo en una tarjeta pública sin etiqueta pueden leerse como datos reales. Se etiquetan como "Ejemplo" en fixtures.

### Task 02.6 · Móvil 390 px (ficha 07)

**Files:** `app/(shared)/companies/CompaniesView.tsx`; `components/shells/AppHeader.tsx` (`bp.bar`, `bp.menu`); `components/shells/MobileMenu.tsx`; `components/shells/ShellNav.tsx`; `design-system/src/NavBar.jsx` (no responsive, X-04).

- [ ] **Step 1:** Una columna; márgenes de 15 px; gap 20 px; cabecera de directorio 60 px; logo 101×36 px; navegación 44 px; H1 25 px; subtítulo 11 px / 1.6; "Mi panel" 32 px de alto.
- [ ] **Step 2:** Navegación horizontal desplazable con texto 10 px. **Cambia `DEC-007`** (hamburguesa): sin esto no se cumple la ficha 07, punto 3. Hace falta DEC.
- [ ] **Step 3:** Los cinco indicadores de empresa se mantienen en una sola fila (no 3 + 2).
- [ ] **Step 4:** Sin desbordamiento de página: buscador, filtros y CTA caben; solo la navegación se desplaza. Prueba de anchura extrema (Review Focus 5).

**Done when:** a 390 × 844 se lee la primera tarjeta, y solo la navegación se desplaza en horizontal.

### Task 02.7 · Cierre editorial de la bienvenida (ficha 40, bloques finales)

**Files:** `app/(public)/page.tsx` (último bloque, L45–55); `lib/routes.ts`.

- [ ] **Step 1:** Eyebrow "DE LA CURIOSIDAD A LA EXPERIENCIA"; H2 "Elige cómo empezar."; tres tarjetas blancas con enlace: "Aprende con certificaciones." (→ `/talent/courses`), "Demuestra con proyectos." (→ Miniproyectos: D5), "Acércate a tu próximo empleo." (→ Oportunidades: D5). Mientras D5 no esté resuelto, los destinos no construidos se omiten y se anota en PENDIENTES.
- [ ] **Step 2:** Cada tarjeta con su texto e icono Lucide; proporción y distancia entre tarjetas.
- [ ] **Step 3:** Las acciones son enlaces reales. Sin degradado de fondo (ver 01.6).

**Done when:** la bienvenida termina con los tres caminos y el footer claro de la fase 01.

### Cierre de la fase 02

- [ ] Puerta de fase (1440, 768, 390 en claro y oscuro; directorio en 1650, 1150, 900 y 650).
- [ ] `impeccable.cmd detect --json` sobre los archivos cambiados.
- [ ] Documentación y PENDIENTES.
- [ ] Commits por tarea; PR a `correcciones/01-base`.

---

## Fase 03 · 17 fichas corporativas

**Rama:** `correcciones/03-fichas-empresa` desde `correcciones/02-directorio`.
**Fichas:** 09 (identidad y cabecera exterior), 10 (secciones completas), anexo (17 variantes, `PDF pp. 79–89`).
**Regla principal:** no usar una ficha genérica con logo y color cambiados. Cada empresa tiene composición, fondo, tipografía y orden propios.

**Estado actual:** ninguna de las 17 marcas existe en `data/fixtures/companies.ts`. Las rutas `/companies/<slug>` de las 17 devuelven 404. Hay 11 registros (diez publicadas, una borrador).

### Task 03.1 · Datos de las 17 marcas (solo datos y rutas)

**Files:** Create: `data/fixtures/brands.ts` (ficticio, `TODO(seed)`); Modify: `lib/models/company.ts` (`CompanyRecord`: añadir `brandLayout`, `palette` y `sections`); `lib/services/companies.ts`; `app/(shared)/companies/[slug]/page.tsx`.

**Interfaces:**
- Produces: `BrandRecord = { slug: string; layout: 'photo-left' | 'plate-right' | 'split-tilted' | 'color-field' | 'editorial' | 'corporate-photo'; palette: { base: string; cta: string; ctaText: string; accent?: string }; font?: 'arial' | 'manrope'; sections: SectionKind[]; localMenu: string[]; coverAsset: string | null; logoAsset: string | null }`.

- [ ] **Step 1:** Registrar las 17 marcas con slugs del nombre del archivo de plantilla (`instituto-bme`, `mcgraw-hill`, `garrigues`, `google`, `ibm`, `auren`, `pwc`, `deloitte`, `santander`, `revolut`, `loreal`, `mckinsey`, `netflix`, `silbon`, `atresmedia`, `heineken`, `mapfre`) con sus valores del anexo.
- [ ] **Step 2:** Fichas actuales (metrovia, datalia, cargo-norte, nexora, orbital, kairos, vialink, sunbeam, trazo, clh, brisa-salud): decisión D5/D7. Recomendado: quedan genéricas para pruebas y `brisa-salud` sigue como borrador.
- [ ] **Step 3:** Paletas por marca como variables CSS dentro de la ficha, desde datos. Excepción explícita en `CLAUDE.md` (17 paletas de marca, sin tokens nuevos en el DS). Recomendado: opción A (datos en fixtures, como `logo.ts`).

**Done when:** `/companies/<slug>` existe para las 17 y devuelve su composición (aún sin contenido completo).

### Task 03.2 · Composiciones de hero (siete arquetipos)

**Files:** `app/(shared)/companies/[slug]/page.tsx`; `components/company/CompanyProfile.tsx`; `design-system/src/Photo.jsx` (overlay `hero`/`card`/`none`; sin `src` cae al degradado de marca: con los assets ausentes la ficha se ve igual que la demo, por eso se usa una composición propia).

- [ ] **Step 1:** Implementar los siete arquetipos del anexo como componentes de layout: foto a sangre con overlay navy (BME); fondo negro con logo rojo a la derecha y sombra (McGraw Hill, Auren, PwC, Netflix); foto con franja oscura y acción beige (Garrigues); degradado con gran marca semitransparente (IBM, Deloitte, Revolut); tarjeta inclinada sin foto (Santander); foto con overlay y placa (L'Oréal, McKinsey, Mapfre, SILBON); bloque de color con cerveza (HEINEKEN, Atresmedia).
- [ ] **Step 2:** Alturas de hero por marca desde el anexo (592 px BME, 550 px McGraw Hill, 599 px Garrigues, 560 px Google, etc.). H1 por marca (tamaño, interlineado, peso).
- [ ] **Step 3:** Sin halo radial, sin sombra desplazada, sin gradiente multicolor: son prohibiciones de `CLAUDE.md`. Las composiciones de la referencia que las usan se traducen a su equivalente permitido y se anota en PENDIENTES.
- [ ] **Step 4:** Titular sobre la foto (como en la referencia): requiere DEC (`DEC-031`, regla 4,5:1). Hasta resolverlo, el título va debajo de la foto.
- [ ] **Step 5:** Assets: `public/brand/` con placeholders `TODO(seed)` (color base de la ficha, iniciales en blanco, mismo tamaño y ajuste). No se descargan ni se dibujan logos (D7).

**Done when:** las 17 fichas tienen su hero, colores y recursos propios, y ninguna se ve como la plantilla genérica de la demo.

### Task 03.3 · Secciones y orden real

**Files:** `components/company/CompanyModules.tsx` (`CompanyModuleKind` solo admite summary, culture, programs, openings y locations); `components/company/CompanyTabs.tsx`; `design-system/src/Tabs.jsx`.

- [ ] **Step 1:** Orden real de cada marca según el anexo (p. 79–80 para las diez que solo aparecen en el PDF). Tabla en PENDIENTES cuando el menú local no coincide con el orden real (Garrigues, Google, PwC, McKinsey…).
- [ ] **Step 2:** Anclas en lugar de pestañas (`DEC-031`, con cambio de DEC): ficha continua, todas las secciones en orden real; `scroll-margin-top` según la altura de la cabecera exterior (58 px).
- [ ] **Step 3:** Secciones sin dato (Curso, Challenge, Miniproyecto, Embajadores, Becas, Herramientas, Ecommerce, Servicios, Tienda, Cierre): se muestran como bloque con "Próximamente" y sin enlace, o se omiten, según decisión D5. Nunca se inventa contenido.
- [ ] **Step 4:** Ecommerce y tiendas de terceros (BME, Netflix Shop, Tienda SILBON): sin compra ni pago; el CTA va a "Próximamente" o a una URL que venga del dato.

**Done when:** cada ancla llega al bloque correcto y las secciones bajo el primer pantallazo mantienen la composición de su marca.

### Task 03.4 · Variantes de Santander y SILBON (ficha 10)

**Files:** `data/fixtures/brands.ts`; `components/company/CompanyModules.tsx`.

- [ ] **Step 1:** Santander: sin foto; hero con tokens o asset de marca; sin miniproyectos (ficha 10, punto 2).
- [ ] **Step 2:** SILBON: fuente Arial, CTA blanca como secundaria `onInverse` (el DS solo la saca así).
- [ ] **Step 3:** Garrigues: sin miniproyectos; grados y másteres con enlace externo solo si el dato trae URL real.

**Done when:** Santander y SILBON recorren todas sus secciones y las anclas funcionan.

### Task 03.5 · Cierre de la fase 03

- [ ] Puerta de fase (17 fichas en 1440 px; la ficha de móvil en 390 px; claro y oscuro).
- [ ] Revisión que cubra el contenido bajo el primer pantallazo.
- [ ] `impeccable.cmd detect --json`; documentación; PENDIENTES.
- [ ] Commits; PR a `correcciones/02-directorio`.

---

## Fase 04 · Certificaciones, detalle, aula y evaluación

**Rama:** `correcciones/04-aprendizaje` desde `correcciones/03-fichas-empresa`.
**Fichas:** 11 (catálogo), 12 (estado, progreso y vacío), 13 (detalle), 14 (aula, **no existe**), 15 (evaluación y acreditación, **no existe**).
**Estado:** `/talent/courses` y `/talent/courses/[slug]` existen. No hay progreso por usuario, lecciones, evaluación ni acreditación emitida. `Me interesa` es un interés simulado; las credenciales están en `/talent/credentials`.

### Task 04.1 · Catálogo de certificaciones (ficha 11)

**Files:** `app/talent/courses/page.tsx`; `components/course/CourseFilters.tsx`; `components/course/CourseRow.tsx`; `components/course/course-labels.ts`; `components/StatusBadge.tsx`; `lib/services/courses.ts`; `lib/models/course.ts`; `data/fixtures/courses.ts`.

**Interfaces:**
- Produces: `CourseSummaryVM` con `companySlug: string | null` (hoy `provider` es texto: "Datalia", "Metrovía", "Orbital Labs", "Nexora", "Cargo Norte", "CLH"). El selector "Todas las empresas" filtra por `companySlug`. Búsqueda: `getCourses({format, status, q})`.

- [ ] **Step 1:** Encabezado: eyebrow "APRENDE, PRACTICA, AVANZA"; H1 "Aprende de quienes lo hacen."; introducción y "Mi progreso" a la derecha.
- [ ] **Step 2:** Buscador a la izquierda; selector "Todas las empresas" a la derecha. Debajo: Todas / En curso / Completadas (activo navy). **Sin progreso en el modelo:** En curso y Completadas se ocultan hasta que exista (D5: pregunta abierta de la fase).
- [ ] **Step 3:** Grid de 3 columnas gap 21 px. Tarjeta: portada de color de marca 156 px con logo, título blanco 23 px y marca de agua con iniciales; cuerpo padding 22 px; título 17 px; descripción 12 px / 19.2; metadatos 10 px.
- [ ] **Step 4:** Botón navy de ancho completo, 42 px. Estado y progreso antes del botón. No convertir la tarjeta en lista de texto.
- [ ] **Step 5 (Review Focus 3):** la tarjeta no muestra progreso ni "Completada" sin dato real.

**Done when:** el catálogo tiene portadas corporativas, filtros y tarjetas con la jerarquía de la referencia.

**Riesgo:** "Completada" y "Ver certificación" pueden leerse como credencial emitida (`DEC-010`, `DEC-021` separan programa y credencial).

### Task 04.2 · Estados de la certificación (ficha 12)

**Files:** `components/course/CourseRow.tsx`; `components/course/course-labels.ts`; `app/talent/courses/page.tsx` (vacío).

- [ ] **Step 1:** Tres acciones según estado: sin iniciar "Explorar certificación"; en curso "Continuar aprendizaje"; completada "Ver certificación". Sin progreso real, solo "Explorar certificación".
- [ ] **Step 2:** Barra teal, porcentaje y estado: solo si hay progreso real (no existe hoy: gap registrado).
- [ ] **Step 3:** Vacío de búsqueda: icono de lupa; "Tu próximo aprendizaje está por descubrir."; texto explicativo; botón "Explorar certificaciones" que limpia la consulta.
- [ ] **Step 4:** Las tarjetas filtradas conservan su ancho de columna; no cambia el tamaño del título al filtrar.

**Done when:** Todas, En curso (cuando exista), Completadas (cuando exista) y una consulta vacía mantienen estructura y CTA.

### Task 04.3 · Detalle de certificación (ficha 13)

**Files:** `app/talent/courses/[slug]/page.tsx`; `components/course/CourseInterest.tsx`; `lib/actions/courses.ts`.

- [ ] **Step 1:** Breadcrumb; columna principal flexible; sidebar de 335 px; gap 25 px. Hero con color corporativo, radio 12 px, padding 38 px, logo y etiqueta "Certificaciones en Beway".
- [ ] **Step 2:** Después del hero: "Lo que te llevas.", "Tu recorrido de aprendizaje." (módulos numerados con acordeón), "Cómo se refleja en tu perfil."
- [ ] **Step 3:** Lateral de decisión: institución, duración, modalidad, evaluación y progreso. **La evaluación y el progreso no existen en `CourseDetailVM`:** se muestran como "—" o se omiten. Precio solo si el programa lo tiene (el de 80 € de BME es del prototipo).
- [ ] **Step 4:** CTA según estado y enlace "Ver la ficha y el programa". Móvil: contenido principal primero; lateral después; sin CTA fija al pie.

**Done when:** hero y lateral aparecen juntos en escritorio y los módulos se expanden sin mover el lateral.

**Riesgo:** un lateral con progreso o evaluación no reales haría creer que el usuario va avanzado.

### Task 04.4 · Aula (ficha 14, pantalla nueva)

**Files (nuevos):** `app/talent/courses/[slug]/aula/page.tsx` (ruta propuesta, D6); `components/course/aula/*` (índice, reproductor, panel de lección); `data/fixtures/lessons.ts` (`TODO(seed)`, ficticio); `lib/models/lesson.ts`; `lib/services/lessons.ts`.

**Interfaces:**
- Produces: `LessonVM = { id; moduleId; title; kind: 'video' | 'text'; durationMin; status: 'pending' | 'done' | 'active' }`. Estado de bloques: sin persistencia real → se lee del servicio y se marca "Simulación" (D5).

- [ ] **Step 1:** Distribución: breadcrumb; sidebar de unos 296 px a la izquierda con el índice (empresa, programa, progreso y bloques numerados); reproductor navy grande a la derecha.
- [ ] **Step 2:** Estados de módulo: completados con check teal; activo con fondo teal claro; pendientes con icono de play.
- [ ] **Step 3:** Reproductor: título del bloque; play central; barra inferior; tiempo; marca "beway". Debajo: "APRENDE Y APLICA", estado, título, descripción, "Recursos de la lección" y "Ver recurso".
- [ ] **Step 4:** Continuidad: "Lección anterior" y "Marcar bloque y continuar"; "Evaluación y acreditación" aparece en el índice. Cambiar de módulo actualiza el bloque activo.
- [ ] **Step 5:** No hay vídeo real: el reproductor muestra placeholder `TODO(seed)`. No se conecta ni se simula una reproducción real.

**Done when:** cambiar de módulo actualiza bloque y contenido, y la distribución del aula se conserva. **Pendiente de D5.**

**Riesgo:** el acceso al contenido debe autorizarse en servidor por inscripción. Hoy `requireSession` solo lee la cookie demo (`lib/session.ts`). No se cambia ese control; se anota.

### Task 04.5 · Evaluación y acreditación (ficha 15)

**Files:** `components/course/aula/EvaluationGate.tsx` (nuevo); `components/course/aula/AccreditationDialog.tsx` (nuevo, usa `Dialog` de la fase 01); `app/talent/credentials/page.tsx`; `lib/services/credentials.ts`; `data/fixtures/credentials.ts`.

- [ ] **Step 1:** Bloqueo de evaluación: mientras falten bloques, ventana con "Un paso antes de la evaluación.", una explicación y el botón "Continuar en el aula". **La lógica de bloqueo es la real** (regla por bloques completados) aunque no haya progreso guardado: sin progreso, la evaluación queda bloqueada.
- [ ] **Step 2:** Acreditación completada: modal blanco con programa, empresa, identidad y estado; acciones "Ver en Mi perfil" y "Cerrar". Solo para credenciales que existan en el servicio. **No se renderiza para cursos no completados** (riesgo alto).
- [ ] **Step 3:** Semántica: emisor, fecha y estado reales. Etiquetas de ejemplo solo cuando lo sean. Sin validez académica declarada.
- [ ] **Step 4 (Review Focus 3 y 4):** ventana de bloqueo con progreso 0 % y con progreso 100 %; cerrar devuelve el foco.

**Done when:** la ventana corresponde al estado del curso y los enlaces llevan al aula o al perfil.

### Cierre de la fase 04

- [ ] Puerta de fase (1440, 768, 390; claro y oscuro; estados de la ficha 12).
- [ ] `impeccable.cmd detect --json`; documentación; PENDIENTES (D5 y D9 abiertos).
- [ ] Commits; PR a `correcciones/03-fichas-empresa`.

---

## Fase 05 · Challenges y miniproyectos

**Rama:** `correcciones/05-challenges-miniproyectos` desde `correcciones/04-aprendizaje`.
**Fichas:** 16 (catálogo de challenges), 17 (detalle), 18 (propuesta), 19 (catálogo de miniproyectos), 20 (detalle de miniproyecto).
**Estado:** no existen en código, en rutas ni en modelos. `ROADMAP.md` los marca como bloque G ("solo documentación"). Esta fase **depende de D5**.

### Task 05.1 · Modelo y fixtures de challenges y miniproyectos

**Files (nuevos):** `data/fixtures/challenges.ts` (`TODO(seed)`, ficticio); `lib/models/challenge.ts`; `lib/services/challenges.ts`; `lib/actions/challenges.ts` (escrituras simuladas con "Simulación").

**Interfaces:**
- Produces: `ChallengeVM = { slug; companySlug; kind: 'challenge' | 'miniproject'; title; sector; status: 'open' | 'closed' | 'soon'; format; deadline: string | null; participation: 'none' | 'draft' | 'submitted' }` y `getChallenges({ q, companySlug, kind })`.

- [ ] **Step 1 (Test):** test del servicio: filtro por empresa y por tipo devuelve el subconjunto esperado; sin participación, `participation === 'none'`.
- [ ] **Step 2:** Un único fixture con cabecera "ficticio" y ejemplos marcados. Sin cifras que parezcan reales.

**Done when:** el servicio devuelve datos ficticios y el tipo distingue challenge de miniproyecto.

### Task 05.2 · Catálogo de challenges (ficha 16)

**Files (nuevos):** `app/talent/challenges/page.tsx` (ruta propuesta, D6); `components/challenge/ChallengeCard.tsx`.

- [ ] **Step 1:** H1 "Tu talento se demuestra."; buscador y selector de empresa; tres columnas gap 21 px; banda de contexto bajo los filtros. Sin pestañas de progreso de Certificaciones.
- [ ] **Step 2:** Portada de marca con logo, título y marca de agua "01" sobre el fondo corporativo; cuerpo con sector, estado, descripción, "Briefing y entregables" y "Según convocatoria".
- [ ] **Step 3:** Sin participación: "Conocer el challenge". Con participación: "Continuar mi propuesta". El estado va junto al sector.
- [ ] **Step 4:** Mantener la plantilla con uno, varios o ningún resultado.

**Done when:** tarjetas, filtros y CTA coinciden con el catálogo objetivo y conservan la participación.

**Riesgo:** `CompanyCard` del DS no sirve para esta tarjeta (`DS_REQUESTS` 15): se hace una tarjeta propia con tokens.

### Task 05.3 · Detalle del challenge (ficha 17)

**Files (nuevos):** `app/talent/challenges/[slug]/page.tsx`.

- [ ] **Step 1:** Dos columnas; hero con color corporativo, logo, eyebrow y título. Bloques: "El punto de partida.", "Lo que vas a entregar." y "Cómo se revisa.".
- [ ] **Step 2:** Lateral "Tu participación.": empresa, formato, plazo y estado. CTA "Unirme al challenge" sin participación; "Continuar borrador" con borrador. "Ver briefing en la ficha".
- [ ] **Step 3:** "Unirme" es una inscripción: **explícita y simulada** (`DEC-006`), nunca al entrar ni al renderizar. Entrar no crea participación.
- [ ] **Step 4:** Móvil: contenido primero; lateral después.

**Done when:** el estado de participación determina el CTA y todo el briefing es accesible.

### Task 05.4 · Propuesta del challenge (ficha 18)

**Files (nuevos):** `app/talent/challenges/[slug]/submit/page.tsx`; `components/challenge/ProposalForm.tsx`.

- [ ] **Step 1:** Contenedor de unos 1100 px; empresa; H1 "De la idea a la propuesta."; nombre del challenge; badge "Borrador".
- [ ] **Step 2:** Campos en una tarjeta: título, problema y evidencia, propuesta, enlace al trabajo, documento de apoyo. Labels pequeños; textarea más altos que inputs.
- [ ] **Step 3:** Pie: casilla de autoría; "Guardar borrador" secundario; botón principal de entrega. **El envío es simulado** y dice "Simulación" (D9: texto del botón y de la casilla); nunca un mensaje local que parezca un envío real.
- [ ] **Step 4 (Review Focus 4):** obligatoriedad, formatos y límites existentes; error junto al campo sin perder lo escrito; el guardado de borrador sobrevive a un cambio de paso.

**Done when:** la propuesta se edita y se guarda con todos sus datos; la apariencia coincide antes de cualquier envío real.

**Riesgo ALTO:** la entrega. No hay backend para retos (ROADMAP G). No se envía nada durante la revisión visual.

### Task 05.5 · Catálogo y detalle de miniproyectos (fichas 19 y 20)

**Files (nuevos):** `app/talent/miniprojects/page.tsx` y `app/talent/miniprojects/[slug]/page.tsx` (ruta propuesta, D6); `components/challenge/MiniprojectCard.tsx`.

- [ ] **Step 1:** H1 "Pequeños proyectos. Evidencias reales."; buscador; selector de empresa; "Mi progreso"; tres columnas.
- [ ] **Step 2:** Tarjeta blanca **sin franja de color de 156 px**. Logo pequeño arriba a la izquierda; badge "Práctica guiada" arriba a la derecha; título y descripción; metadato "Evidencia para el portfolio"; CTA navy de ancho completo "Explorar proyecto".
- [ ] **Step 3:** Detalle: breadcrumb; hero corporativo; columna principal; lateral de 335 px con "Práctica individual" y CTA "Comenzar proyecto". "Comenzar" crea una participación: **simulada** y sin duplicar si ya existe (ficha 20, punto 4).
- [ ] **Step 4 (Review Focus 3):** con participación iniciada, el CTA cambia a continuar; nunca se crea una participación para mostrar "sin empezar".
- [ ] **Step 5:** Se distingue un miniproyecto de un challenge de un vistazo aunque sea de la misma empresa.

**Done when:** el detalle conserva su carácter de práctica individual y en móvil el lateral aparece después del contenido.

### Cierre de la fase 05

- [ ] Puerta de fase; `impeccable.cmd detect --json`; documentación (ROUTES y ROADMAP: estado de G); PENDIENTES.
- [ ] Commits; PR a `correcciones/04-aprendizaje`.

---

## Fase 06 · Mi panel, perfil y vista para empresas

**Rama:** `correcciones/06-panel-perfil` desde `correcciones/05-challenges-miniproyectos`.
**Fichas:** 21 y 22 (panel), 23, 24, 25 y 26 (perfil), y la parte de perfil de la ficha 38 (móvil).
**Mapeo de rutas:** `#/panel` → `/talent/dashboard`; `#/perfil` → `/talent/profile/edit`; `/talent/credentials` (ficha 25); `/u/lucia-martin` (vista pública actual).

### Task 06.1 · Primer pantallazo del panel (ficha 21)

**Files:** `app/talent/dashboard/page.tsx`; `lib/services/dashboard.ts`; `lib/models/dashboard.ts`; `components/dashboard/CompletionRail.tsx`; `components/NavButton.tsx`.

- [ ] **Step 1:** Saludo: eyebrow "MI PANEL"; "Hola, [nombre]."; introducción breve; badge discreto si hay un dato real.
- [ ] **Step 2:** Bloque navy de ancho completo "Próximo paso": icono a la izquierda; título 24 px; empresa; progreso horizontal; botón blanco "Continuar" a la derecha.
- [ ] **Step 3 (Review Focus 3):** "Continuar" no sugiere progreso guardado (hoy los únicos estados de progreso viven en `sessionStorage`). Con 0 % o 100 %, el bloque cambia según el estado real.
- [ ] **Step 4:** Dos columnas 1.75 fr / 1 fr gap 23 px: "Tu semana" a la izquierda, "Mejora tu BEWAY Score" a la derecha. Manrope en títulos, DM Sans en cuerpo; teal solo para progreso.

**Done when:** saludo, bloque navy y comienzo de las dos columnas coinciden por posición y escala.

**Gap:** BEWAY Score no existe (sin modelo ni servicio). Se muestra como ejemplo rotulado, sin algoritmo (D11: decisión de la fase).

### Task 06.2 · Resto del panel en orden exacto (ficha 22)

**Files:** `app/talent/dashboard/page.tsx`; `components/dashboard/PendingSurveys.tsx`; `components/dashboard/OpenCourses.tsx`; `components/dashboard/SuggestedCompanies.tsx`.

- [ ] **Step 1:** Columna principal: 1 Tu semana, 2 Empresas para ti, 3 Oportunidades para ti, 4 Retos recomendados, 5 Mis certificaciones. Filas compactas para empresas y ofertas; dos tarjetas para retos.
- [ ] **Step 2:** Columna derecha: 1 BEWAY Score con anillo y barras, 2 Tu ranking de talento, 3 Próximos eventos, 4 Tu voz también cuenta.
- [ ] **Step 3:** Actividad conectada: "Continuar" del curso abre el aula (`04-aprendizaje`, T04.4); "Ver" de credencial abre el modal de acreditación (T04.5); "Explorar" abre el catálogo; "Seguir" conserva su estado.
- [ ] **Step 4:** "Oportunidades para ti" y "Retos recomendados" no tienen destino hasta sus fases: se ocultan o se muestran vacíos sin enlace (D5). Nunca enlace a página inexistente.
- [ ] **Step 5:** Métricas de ejemplo: forma del anillo, barras y ranking copiadas, rotuladas como ejemplo. Sin 847, Top 5 % ni #12 como datos reales.

**Done when:** el orden completo de los dos lados coincide con la referencia y todos los accesos tienen destino.

### Task 06.3 · Mi perfil editable (ficha 23)

**Files:** `app/talent/profile/edit/page.tsx`; `app/talent/profile/edit/ProfileEditor.tsx`; `components/forms/FormSection.tsx`; `components/forms/ToggleField.tsx`; `lib/actions/profile.ts`; `lib/models/profile.ts`.

- [ ] **Step 1:** Eyebrow "MI PERFIL Y CV"; H1 "Que tu recorrido hable por ti."; "Vista para empresas" arriba a la derecha.
- [ ] **Step 2:** Avatar 88 px, nombre y estado. Campos Nombre, Titular, Ubicación y Universidad en 2 × 2. Columna principal 1.75 fr; lateral 1 fr; gap 24 px. **Universidad no tiene campo** (`EducationVM` tiene `institution`): se mapea a `education[0].institution` o se crea campo (D11).
- [ ] **Step 3:** Lateral: recomendación teal arriba; "Mi actividad en BEWAY" con ocho filas; "Visibilidad de mi perfil" con dos checks y previsualización.
- [ ] **Step 4:** Barra "Guardar cambios" adherida a 16 px del borde inferior; no tapa el último campo. Mantener persistencia y estructuras de experiencia y formación.
- [ ] **Step 5 (Review Focus 4):** el botón sticky sigue siendo el `submit` del formulario (`onSubmit`, `noValidate`, validación de nombre `NAME_MIN`/`NAME_MAX`); error junto al campo y texto conservado.

**Done when:** identidad, campos y las tres tarjetas laterales se colocan como en la referencia, y guardar no pierde datos.

### Task 06.4 · Vídeo pitch y CV (ficha 24)

**Files:** `app/talent/profile/edit/ProfileEditor.tsx`; `lib/models/profile.ts`; `lib/services/profiles.ts`; `data/fixtures/profiles.ts`.

- [ ] **Step 1:** Tarjeta "Mi vídeo pitch." con bloque navy e icono; estado "Por completar"; "Haz que te conozcan en un minuto."; botón "Subir vídeo".
- [ ] **Step 2:** **No hay campo, almacenamiento ni endpoint para vídeo** (sin BE en `BACKEND_HANDOFF.md`). La presentación se hace; la subida queda deshabilitada con "Próximamente" y un gap registrado. No se finge una subida.
- [ ] **Step 3:** CV por bloques: Carrera, Universidad, Especialidad e Idiomas en 2 × 2; Experiencia e Intereses en textarea anchas; zona "Adjunta tu CV." con el adjunto real.
- [ ] **Step 4:** Mantener experiencias y titulaciones accesibles. La simplificación visual no autoriza borrar registros.

**Done when:** pitch y CV siguen a identidad; los campos se distinguen y el adjunto sigue disponible.

**Riesgo:** un vídeo de la persona es dato personal y de imagen: requiere consentimiento y reglas de conservación (fuera de esta fase).

### Task 06.5 · Habilidades, certificaciones y evidencias (ficha 25)

**Files:** `app/talent/credentials/page.tsx`; `lib/services/credentials.ts`; `lib/models/course.ts`; `data/fixtures/credentials.ts`; `components/course/course-labels.ts`.

- [ ] **Step 1:** Validated Skills: bloque con nota de contexto y ocho tarjetas de ejemplo en 2 columnas. **Habilidades declaradas y validadas son datos distintos** (regla de la ficha; `DEC-021`, `OI-009`). Sin modelo de validación: el bloque se rotula "Ejemplo" y no se mezcla con las habilidades manuales.
- [ ] **Step 2:** Certificaciones: lista compacta con logo, programa, empresa o estado de emisión, y "Ver". Fecha, emisor y acceso al documento real donde existan.
- [ ] **Step 3:** Proof of Work: tres tarjetas de ejemplo con categoría, título, descripción, estado y "Ver evidencia"; los registros y enlaces finales vienen del usuario.
- [ ] **Step 4:** Orden de la página: Identidad → Mi vídeo pitch → Mi CV → Validated Skills → Certificaciones → Proof of Work.

**Done when:** los tres bloques cierran el perfil con el mismo orden, anchura y jerarquía, y cada evidencia abre su destino.

### Task 06.6 · Vista para empresas (ficha 26)

**Files:** `app/(shared)/u/[username]/page.tsx`; `components/profile/PublicProfileView.tsx`; `components/profile/ProfilePreview.tsx` (nuevo modal); `app/talent/profile/edit/ProfileEditor.tsx`.

- [ ] **Step 1:** "Vista para empresas" y "Previsualizar perfil" abren la misma ventana centrada de hasta 740 px, con el `Dialog` de la fase 01.
- [ ] **Step 2:** Resumen legible: avatar e identidad; titular, ubicación y formación; resumen; bloques de habilidades y evidencias; mismo lenguaje de tarjetas y badges.
- [ ] **Step 3:** La previsualización usa los mismos valores que la edición y respeta la visibilidad existente. **No publica un perfil por abrir la vista.** Riesgo ALTO: no reutilizar `PublicProfileView` con `isOwner=true` si muestra "Solo tú ves esto" o empresas seguidas.
- [ ] **Step 4:** Ajustes accesibles: correo, contraseña, notificaciones, cierre de sesión y eliminación de cuenta siguen en Ajustes.
- [ ] **Step 5:** Al cerrar la ventana, el foco vuelve a "Vista para empresas".

**Done when:** vista y edición muestran la misma información y cerrar la ventana devuelve el foco.

### Task 06.7 · Perfil en móvil (ficha 38, parte de perfil)

- [ ] **Step 1:** Perfil a una columna: identidad y campos apilados; avatar, texto y acciones sin solaparse.
- [ ] **Step 2:** Tarjetas de habilidades con su grid de 2 columnas según la referencia.
- [ ] **Step 3:** Guardado accesible: barra inferior a 16 px del borde, con espacio reservado al final del documento. Riesgo: el sticky sobre el teclado en iOS y Android puede tapar el botón o el campo activo; se prueba a 390 px con el teclado (o con el foco en un campo).
- [ ] **Step 4:** Ventanas: `calc(100% − 38px)`, máximo 90dvh, scroll interno; la X sigue visible y el cierre funciona con teclado.

**Done when:** en 390 px se completa la revisión visual de campos y ventanas sin scroll horizontal.

### Cierre de la fase 06

- [ ] Puerta de fase; `impeccable.cmd detect --json`; documentación; PENDIENTES (BEWAY Score, vídeo, validación de habilidades, D11).
- [ ] Commits; PR a `correcciones/05-challenges-miniproyectos`.

---

## Fase 07 · Oportunidades, candidatura, encuestas, acceso, registro y ayuda

**Rama:** `correcciones/07-oportunidades-acceso` desde `correcciones/06-panel-perfil`.
**Fichas:** 27–37, y 38 (encuestas en móvil), 39 (catálogos móviles de encuestas y oportunidades).
**Regla general:** no enviar nada real durante la revisión. El consentimiento y el envío siguen siendo los reales.

### Task 07.1 · Oportunidades: catálogo (ficha 27, pantalla nueva)

**Files (nuevos):** `app/talent/opportunities/page.tsx` (ruta propuesta, D6); `data/fixtures/opportunities.ts` (`TODO(seed)`, ficticio); `lib/models/opportunity.ts`; `lib/services/opportunities.ts`.

- [ ] **Step 1:** Contenedor máximo de 1160 px; eyebrow "OPORTUNIDADES PROFESIONALES"; H1 "El siguiente paso puede estar aquí."; introducción y "Mi progreso".
- [ ] **Step 2:** Buscador; selectores Empresa, Modalidad y Tipo. Debajo, banda informativa de demo y línea de resultados con "Ver guardadas".
- [ ] **Step 3:** Dos columnas gap 18 px; tarjetas blancas radio 12 px, padding 24 px, altura cercana a 232 px. Logo y bookmark arriba; título 17 px; metadatos; pills; "Ver oportunidad" al pie.
- [ ] **Step 4:** Guardado: el bookmark cambia de estado; "Ver guardadas" muestra la selección o un estado vacío con acción para explorar. **No crear 51 vacantes para copiar el ejemplo.**

**Done when:** filtros y guardado conservan la identidad del catálogo y la tarjeta lleva al detalle correcto.

**Riesgo:** usar el logo de una empresa real en una demo puede implicar branding de tercero (D7).

### Task 07.2 · Detalle de oportunidad (ficha 28)

**Files (nuevos):** `app/talent/opportunities/[slug]/page.tsx`.

- [ ] **Step 1:** Breadcrumb; contenedor 1160 px; columna principal y lateral. Hero de empresa con logo, H1 de 34 px, metadatos y badge "Ejemplo".
- [ ] **Step 2:** Tres bloques: "Tu papel en el equipo.", "Lo que buscamos.", "Cómo sería el proceso.".
- [ ] **Step 3:** Lateral "TU PRÓXIMO PASO": "Muéstrales lo que puedes aportar."; cuatro datos; botón navy "Preparar candidatura"; "Guardar para después" secundario.
- [ ] **Step 4:** El botón conserva empresa y oportunidad al abrir la candidatura. Móvil: contenido primero; lateral después.

**Done when:** hero y lateral aparecen juntos en escritorio, y la candidatura mantiene el contexto.

### Task 07.3 · Candidatura, paso 1: perfil (ficha 29)

**Files (nuevos):** `app/talent/opportunities/[slug]/apply/page.tsx`; `components/apply/ApplyStepper.tsx`.

- [ ] **Step 1:** Contenedor de ~760 px; breadcrumb; empresa; H1 "Tu candidatura."; título de la oportunidad; stepper horizontal Perfil / Motivación / Revisión.
- [ ] **Step 2:** Tarjeta de perfil: "Empieza con lo que ya cuenta tu perfil."; cuatro datos en 2 × 2 **leídos del perfil actual**; selector de CV (**no existe CV en el código**: gap, D5); texto de ayuda; "Revisar mi perfil".
- [ ] **Step 3:** Acciones: "Volver a oportunidad" a la izquierda; "Continuar" navy a la derecha. Pasos completados con check.
- [ ] **Step 4 (Review Focus 4):** el paso conserva oportunidad, CV elegido y datos al retroceder.
- [ ] **Step 5:** Visibilidad: el perfil privado por defecto se avisa antes de mostrarlo a una empresa.

**Done when:** el primer paso reproduce la tarjeta y el stepper, y los datos están ligados al perfil actual.

### Task 07.4 · Candidatura, pasos 2 y 3: motivación y revisión (ficha 30)

**Files:** `app/talent/opportunities/[slug]/apply/` (pasos); `lib/actions/applications.ts` (nuevo, simulado).

- [ ] **Step 1:** Motivación: H2 "Lo que te gustaría aportar."; textarea "Tu motivación" obligatoria; "Portfolio" opcional; "Anterior / Continuar". Un campo obligatorio vacío impide avanzar.
- [ ] **Step 2:** Revisión: H2 "Revisa antes de dar el siguiente paso."; resumen PUESTO, EMPRESA, PERFIL y CV, seguido de la motivación. Perfil y Motivación marcados como completados.
- [ ] **Step 3:** Confirmación explícita: casilla sin marcar y botón final. **El botón final queda deshabilitado o dice "Simulación"** (riesgo ALTO: no existe endpoint de envío ni consentimiento de candidatura). No se envía nada.
- [ ] **Step 4 (Review Focus 4):** "Anterior" permite corregir la motivación y volver a revisión sin vaciar campos; errores reales con tratamiento visual consistente.

**Done when:** los tres pasos son coherentes, el resumen coincide con lo escrito, y avanzar de paso no se confunde con enviar.

**Nota:** el paso 3 se verifica con texto ficticio, sin marcar el consentimiento y sin enviar. La confirmación posterior no se verifica.

### Task 07.5 · Encuestas: galería (ficha 31)

**Files:** `app/talent/surveys/page.tsx`; `components/survey/SurveyList.tsx`; `components/survey/SurveyRow.tsx` (fila de dos líneas → tarjeta); `lib/services/surveys.ts`.

- [ ] **Step 1:** Eyebrow "ESCUCHAR PARA CONSTRUIR"; H1 "Tu opinión también construye."; párrafo y "Mi progreso".
- [ ] **Step 2:** Buscador a la izquierda; selector de empresa a la derecha (**no existe en servicio ni UI**: gap). Tres columnas gap 21 px; una a 390 px.
- [ ] **Step 3:** Tarjeta blanca radio 12 px, borde fino; logo o empresa y badge arriba; título 17 px; descripción; duración y número de preguntas; CTA "Participar" a todo el ancho.
- [ ] **Step 4:** Mantener disponibilidad, elegibilidad, borradores y completadas. Pill y CTA "Continuar" o "Ver resumen" dentro de la tarjeta. El filtro no puede ocultar encuestas elegibles ni cambiar un estado (`DEC-016`).

**Done when:** la lista se transforma en galería y cada encuesta conserva su estado y su acción.

### Task 07.6 · Encuesta: pregunta de selección y escala (fichas 32 y 33)

**Files:** `app/talent/surveys/[slug]/page.tsx`; `components/survey/SurveyRunner.tsx`; `components/survey/QuestionField.tsx`; `components/survey/SurveyInfo.tsx`; `data/fixtures/surveys.ts`.

- [ ] **Step 1 (ficha 32):** Contenedor 750 px; breadcrumb; empresa a la izquierda; duración a la derecha; cuatro segmentos de progreso (activos y completados en teal).
- [ ] **Step 2:** Tarjeta de pregunta: "PREGUNTA 1 DE 4"; H2 de 25 px; ayuda; opciones de radio en rectángulos con borde; toda la etiqueta selecciona. **El modelo de pregunta no tiene campo de ayuda:** se añade en `data/fixtures/surveys.ts`.
- [ ] **Step 3:** Navegación: primera pregunta "Salir" y "Siguiente" navy; siguientes "Anterior" y "Siguiente". Validación mantiene al usuario en la pregunta si falta una respuesta obligatoria.
- [ ] **Step 4 (ficha 33):** escala 1–5 en fila con extremos "Muy poco" y "La conozco bien"; estado seleccionado teal; respuesta abierta con ayuda de opcional, label "Tu idea" y textarea amplia; último paso con casilla de participación sin marcar.
- [ ] **Step 5:** Retroceder conserva respuestas; la barra refleja el total real del servicio (no cuatro).
- [ ] **Step 6 (Review Focus 4):** respuesta obligatoria vacía con error junto al campo; respuestas previas intactas.
- [ ] **Step 7:** **No se envía ninguna encuesta durante la revisión.** La casilla de consentimiento y su bloqueo se mantienen tal como están.

**Done when:** opciones, escala y texto usan la misma tarjeta, el mismo ritmo y el mismo pie de acciones.

### Task 07.7 · Acceso y registro (fichas 34, 35 y 36)

**Files:** `app/(auth)/login/page.tsx`; `app/(auth)/signup/page.tsx`; `app/(auth)/signup/SignupFlow.tsx`; `app/(auth)/layout.tsx`; `components/shells/AuthShell.tsx`; `app/talent/onboarding/OnboardingFlow.tsx`.

- [ ] **Step 1 (ficha 34):** Tarjeta de máximo 1000 px, dos columnas iguales, margen vertical 50 px, radio 15 px, borde `#E4E9EE`. Panel izquierdo navy `#0B1B30`, padding 50 px, alto mínimo 500 px; "Conecta tu potencial con lo que viene." 36 px / 43.2. Panel derecho blanco, padding 45 px; "BIENVENIDO" y "Qué bueno verte por aquí." 27 px.
- [ ] **Step 2:** Formulario real: campos con `name`, `autocomplete`, label visible, error junto al campo. CTA navy de ancho completo. Recuperación y enlace a registro debajo.
- [ ] **Step 3 (riesgo CRÍTICO):** **no tocar `signInAs` ni `lib/auth-actions.ts`.** El botón "Entrar como…" y el campo `hidden account` se mantienen agrupados y etiquetados como demo (D11 de acceso). No se quita la contraseña.
- [ ] **Step 4 (ficha 35):** registro con la misma composición; tres pasos visibles Cuenta / Formación / Intereses (**pendiente de decisión**: `B-01` no está hecho y choca con el alta actual). Campos reales: contraseña, confirmación y los obligatorios actuales.
- [ ] **Step 5 (ficha 36):** formación e intereses **viven en `/talent/onboarding`** (ficha corregida: no `/signup`). Áreas de la ficha (Banca, Editorial…) no existen en el dataset: se adaptan al catálogo; el cambio afecta a elegibilidad de encuestas y sugerencias (riesgo ALTO).
- [ ] **Step 6 (Review Focus 4):** datos escritos se mantienen al cambiar de paso y al volver; error junto al campo.
- [ ] **Step 7 (riesgo ALTO):** el registro simulado inicia sesión como Lucía. La apariencia **no** crea sesión sin completar el proceso. Decidir si "Continuar con la demo" se mantiene (D11).

**Done when:** acceso y registro tienen la composición objetivo sin perder los requisitos reales de cuenta, y el formulario sigue autenticando y mostrando errores.

### Task 07.8 · Ayuda y privacidad (ficha 37)

**Files:** `app/(public)/privacy/page.tsx`; `app/(public)/contact/page.tsx`; `app/(public)/terms/page.tsx`; `app/(public)/ayuda/page.tsx` (nuevo, si D5 lo aprueba); `lib/routes.ts`.

- [ ] **Step 1:** Ayuda: H1 "Aquí para ayudarte."; cuatro preguntas frecuentes en tarjetas o acordeones; "Ver canal de ayuda" y acceso a "Mi progreso". **`/ayuda` no existe** (`DEC-004`: no crear rutas sin construir): decisión D5.
- [ ] **Step 2:** Privacidad: H1 "Tu información, con claridad."; tarjeta de texto legible con la jerarquía de la referencia. Contenido **real** de privacidad (hoy: borrador pendiente de revisión legal; no se publica como definitivo).
- [ ] **Step 3:** "Ver canal de ayuda" lleva al formulario de contacto, que **no envía nada**: se mantiene el aviso de simulación.
- [ ] **Step 4:** Pie: fondo claro; marca "beway."; frase breve; enlaces Privacidad y Ayuda. "Tecnología" no es una sección obligatoria para usuarios finales.

**Done when:** las páginas auxiliares y el footer comparten tipografía, márgenes y componentes con el resto.

### Task 07.9 · Móvil de encuestas y oportunidades (fichas 38 y 39)

- [ ] **Step 1:** Catálogo de una columna con márgenes de 15 px; buscador y selector apilados; botones de estado que envuelven sin cortar texto.
- [ ] **Step 2:** Detalle de oportunidad: contenido primero; tarjeta lateral después.
- [ ] **Step 3:** Encuesta a una columna; "Anterior / Salir" y "Siguiente" identificables; modal con `calc(100% − 38px)`, máximo 90dvh y scroll interno.
- [ ] **Step 4:** Al cambiar de ancho se conservan el filtro, el guardado y el estado de cada elemento.

**Done when:** oportunidades y encuestas en 390 px son equivalentes a las capturas y ninguna tarjeta obliga a ampliar la pantalla.

### Cierre de la fase 07

- [ ] Puerta de fase (todas las pantallas de la fase en 1440, 768 y 390; claro y oscuro; formularios con error y con datos; ventanas cierran y devuelven el foco).
- [ ] Comprobación final de `PDF p. 92`: lista completa, con capturas comparables y diferencias pendientes.
- [ ] `impeccable.cmd detect --json`; documentación; PENDIENTES.
- [ ] Commits; PR a `correcciones/06-panel-perfil`. Después, PR de la cadena a `main` en orden.

---

## Cobertura de fichas (autorrevisión)

| Ficha | Pantalla | Fase · tarea | Estado de datos |
|---|---|---|---|
| 01 | Cabecera y navegación | 01 · 01.4 | Vivo (parcial: solo rutas vivas) |
| 02 | Bienvenida | 02 · 02.2 | Vivo |
| 03 | Empresas como entrada | 02 · 02.3 | Vivo |
| 04 | Tarjeta de empresa | 02 · 02.5 | Vivo con "—" |
| 05 | Filtros y búsqueda | 02 · 02.4 | Vivo (categorías adaptadas) |
| 06 | Menú personal y notificaciones | 01 · 01.5 | Notificaciones sin modelo (fixture) |
| 07 | Empresas en móvil | 02 · 02.6 | Vivo (DEC-007 a cambiar) |
| 08 | Tablet y puntos de cambio | 02 · 02.1 | Vivo (solo PDF) |
| 09 | Ficha de empresa | 03 · 03.1, 03.2 | 17 marcas sin datos (fixtures) |
| 10 | Dentro de la empresa | 03 · 03.3, 03.4 | Parcial (secciones sin dato) |
| 11 | Certificaciones catálogo | 04 · 04.1 | Vivo; progreso sin modelo |
| 12 | Estados y vacío | 04 · 04.2 | Vivo; progreso sin modelo |
| 13 | Detalle de certificación | 04 · 04.3 | Vivo; evaluación sin modelo |
| 14 | Aula | 04 · 04.4 | **No existe** (D5) |
| 15 | Evaluación y acreditación | 04 · 04.5 | **No existe** (D5) |
| 16 | Challenges catálogo | 05 · 05.1, 05.2 | **No existe** (D5) |
| 17 | Detalle de challenge | 05 · 05.3 | **No existe** (D5) |
| 18 | Propuesta de challenge | 05 · 05.4 | **No existe**; envío simulado (D5, D9) |
| 19 | Miniproyectos catálogo | 05 · 05.5 | **No existe** (D5) |
| 20 | Detalle de miniproyecto | 05 · 05.5 | **No existe** (D5) |
| 21 | Mi panel: primer pantallazo | 06 · 06.1 | Parcial (BEWAY Score sin modelo) |
| 22 | Mi panel: resto | 06 · 06.2 | Parcial (ejemplos rotulados) |
| 23 | Mi perfil: edición | 06 · 06.3 | Vivo; Universidad sin campo |
| 24 | Vídeo pitch y CV | 06 · 06.4 | Vídeo sin backend (deshabilitado) |
| 25 | Habilidades, certificaciones, evidencias | 06 · 06.5 | Validated Skills sin modelo (rotulado) |
| 26 | Vista para empresas | 06 · 06.6 | Vivo; ventana nueva |
| 27 | Oportunidades catálogo | 07 · 07.1 | **No existe** (D5) |
| 28 | Oportunidad detalle | 07 · 07.2 | **No existe** (D5) |
| 29 | Candidatura paso 1 | 07 · 07.3 | **No existe**; CV sin modelo |
| 30 | Candidatura motivación y revisión | 07 · 07.4 | **No existe**; envío deshabilitado |
| 31 | Encuestas galería | 07 · 07.5 | Vivo; sin filtro de empresa |
| 32 | Encuesta selección | 07 · 07.6 | Vivo; sin campo de ayuda |
| 33 | Encuesta escala y abierta | 07 · 07.6 | Vivo; preguntas de ejemplo (D9) |
| 34 | Acceso | 07 · 07.7 | Vivo; autenticación demo intacta |
| 35 | Registro | 07 · 07.7 | Vivo; pasos (decisión) |
| 36 | Registro formación e intereses | 07 · 07.7 | Vivo en `/talent/onboarding`; áreas distintas |
| 37 | Ayuda y privacidad | 07 · 07.8 | `/ayuda` no existe (D5) |
| 38 | Perfil y encuestas en móvil | 06 · 06.7; 07 · 07.9 | Vivo |
| 39 | Catálogos y detalles en móvil | 04, 05 (puerta) y 07 · 07.9 | Depende de sus fichas |
| 40 | Bienvenida cierre y footer | 01 · 01.6; 02 · 02.7 | Footer vivo; frase central (D9) |
| Anexo (17) | Fichas corporativas | 03 · 03.1–03.4 | **17 sin datos** (D7) |

**Comprobación de cobertura:** las 40 fichas, el anexo de 17 variantes y la lista final (p. 92) tienen tarea. La ficha 08 se toma del PDF porque no tiene `.md`.

**Comprobación de tipos y nombres:** `CompanyCardVM` (02.5) y `BrandRecord` (03.1) son las únicas interfaces nuevas compartidas entre fases; `ChallengeVM` (05.1) y `LessonVM` (04.4) son independientes. Ninguna tarea usa un nombre que otra no defina.

---

## Ejecución

Dos opciones. Ninguna empieza hasta que el usuario elija y confirme D1–D11.

- **Native (recomendada):** implemento cada tarea en esta sesión, sin subagentes por tarea, con puerta de fase en cada rama y una revisión final de la rama por un revisor independiente. Es más barata y rápida. Las tareas dependen de los tokens y del DS (fase 01 antes que todo), y la fase 00 ya dejó el inventario hecho.
- **Subagent-driven:** un subagente fresco por tarea y un revisor por tarea antes de la siguiente. Es la más exhaustiva, pero cuesta un contexto por tarea y por revisión; con ~70 tareas y dependencias fuertes, sale cara sin ganar mucho.

Siguiente paso tras la confirmación: crear `correcciones/00-base` (Step 7 de la fase 00) y empezar la fase 01 en `correcciones/01-base`.
