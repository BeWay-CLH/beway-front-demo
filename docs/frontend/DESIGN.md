# Diseño de las pantallas de app (Talent y bloque B)

Cómo se decide el aspecto de las pantallas de trabajo de BeWay: ajustes, perfil, onboarding. Las reglas de marca
están en [`/CLAUDE.md`](../../CLAUDE.md) y mandan siempre. Este documento dice qué más se aplica encima.

## Qué se aplica y qué no

| Fuente | Qué aporta | Qué pasa cuando choca con la marca |
|---|---|---|
| `CLAUDE.md` (design system) | Tokens, colores, tipografía, un solo acento cyan, copy en español | **Manda.** |
| Skill `taste-skill` (`design-taste-frontend`), guía de app screens | Estilo de pantalla, hoja de diseño, reglas de jerarquía, control de calidad | Se usa en lo que no contradice la marca. |
| Skill `frontend-design` | Plan antes de construir, revisión contra lo genérico, copy directo | Se usa para el plan y el copy. |

## Estilo elegido: `editorial-greeting`

Dealt con `draw.mjs --app --kind workspace --screens settings,detail,home --keep palette,type --style editorial-greeting`.
La hoja completa se guardó en `.taste-skill/direction.json` (carpeta de trabajo, no del producto).

- **Por qué este y no `achromatic-ledger`:** BeWay es un espacio personal. El movimiento de `editorial-greeting`
  (un h1 tipográfico, cifras en peso regular sobre paneles tonales) encaja con perfil y ajustes. `achromatic-ledger`
  pide un primario casi negro y ningún color de marca en el chrome, y eso choca con el cyan de marca.
- **Lo que se conserva del estilo:** el h1 como saludo con el hallazgo del día, las cifras en peso regular, las
  secciones como filas con línea fina, sin tarjeta dentro de tarjeta, sin iconos en cuadros de color, sin sombras
  en reposo, sin movimiento de entrada.
- **Lo que se cambia por la marca:** la cabecera es el `NavBar` del design system (no barra lateral); los controles
  son del design system (radio 8 px, altura 40 px); el acento es el cyan de marca, solo en el botón principal de cada vista.

## Cara del producto (`Its face`)

- **Tipografía:** Space Grotesk en títulos y cifras (la ya fijada por la marca), con su carácter geométrico. Inter
  para el texto. Las cifras que cambian van con `tabular-nums`.
- **Superficies:** página `surface-page` (#f8fafc), tarjetas y paneles `surface-card` (blanco) con línea `border-subtle`.
  Un panel "tonal" no puede ser más claro que la página en la marca, así que el escalón lo da la línea de 1 px.
- **Elemento propio:** la **vista previa de visibilidad** ("así lo ve alguien con el enlace"). Aparece en ajustes y en el
  paso de privacidad del onboarding y cambia en vivo al cambiar el interruptor. Es la decisión que BeWay hace
  por defecto (perfil privado) hecha visible.

- **Elemento propio del inicio (D-01):** la **barra de cinco apartados** (titular, presentación, experiencia, formación, intereses).
  Un segmento por apartado: relleno `fg-heading` si está listo, solo borde `line-control` si falta. Sin degradado, sin animación y
  sin números extra: el porcentaje vive en el título. Es la única pieza "memorable" de la pantalla; el resto es lista con línea fina.

## Pregunta y hallazgo de cada pantalla

Cada pantalla responde una pregunta con su bloque más grande y dice un hallazgo en una línea debajo del título.

| Pantalla | Pregunta | Hallazgo (línea gris) |
|---|---|---|
| Inicio Talent | ¿Qué me falta para que mi perfil sirva? | "Lo siguiente: añade tu formación." (perfil vacío: "Son cuatro pasos y puedes dejarlo cuando quieras."; completo: "Revísalo como lo ve otra persona.") |
| Onboarding | ¿Qué necesito para empezar y qué verá alguien? | "Solo hace falta tu nombre. Lo demás puedes completarlo después." |
| Editar perfil | ¿Qué ven los demás y qué les falta? | "Lo que más le falta: formación." |
| Ajustes | ¿Quién puede ver mi perfil? | "Tu perfil empieza en privado: solo lo ves tú." |
| Perfil `/u/[username]` | ¿Quién es esta persona y qué ha hecho? | Titular del perfil |
| Acceso | ¿Cómo entro? | "En la demo, cualquier correo y contraseña entran como Lucía Martín." |
| Registro | ¿Qué pasa después de crear la cuenta? | "Tu perfil empieza en privado: solo lo ves tú." |

## Composición

- **Rejilla:** 12 columnas de 77 px con 16 px de hueco, en un contenedor de 1100 px (`max-w-[1100px]`). Comprobación:
  12 × 77 + 11 × 16 = 1100. En ajustes y edición: título y explicación en 4 columnas (356 px), campos en 8 (728 px).
- **Secciones:** filas con línea superior de 1 px y 32 px arriba y abajo. Título (20 px) y explicación a la izquierda.
- **Alturas:** controles de 40 px (`control-height-md`); botón principal en 48 px (`lg`) en formularios y en móvil.
- **Móvil:** márgenes de 16 px; las secciones se apilan (título arriba, campos debajo); la navegación va al menú desplegable.
- **Sin estado de carga animado:** la demo lee fixtures. Cuando haya API, el esqueleto será gris plano (sin brillo).

## Copy

- Español de España, tuteo, frases cortas, verbos primero, sentence case.
- Botones con el mismo nombre en todo el flujo: "Guardar cambios" produce un aviso que dice "Simulación: no hemos guardado tus cambios".
- Sin emoji, sin rayas largas, sin "·" entre palabras en la interfaz, sin "Paso 2 de 4" (la lista de pasos ya muestra el progreso).
- Errores que dicen cómo arreglarlo: "Escribe un correo válido, por ejemplo nombre@dominio.com."
- Cifras con separador de miles y espacio antes del %: "80 %", "1.240". Rangos con raya corta: "sept 2025 – actualidad".

## Estados

- **Vacío:** el apartado sigue visible con una frase y una acción ("Añade tu primera experiencia"). En el perfil de otra persona
  los apartados vacíos no aparecen.
- **Privado (visitante):** solo el nombre de usuario y "Este perfil es privado". Ningún dato personal, ni en el HTML ni en el título.
- **Simulación:** cada escritura sin backend termina en un aviso "Simulación". Nunca dice "guardado".
- **Error de campo:** texto bajo el campo, en rojo de estado, con `aria-invalid`.

## Accesibilidad

- Interruptores, casillas y opciones de radio con input nativo (ver [DS_REQUESTS.md](DS_REQUESTS.md)): reciben foco y responden a Espacio.
- Foco visible con el anillo de la marca. Ningún control depende solo del color.
- Un solo `h1` por pantalla; secciones con `h2`.

## Qué comprobar antes de dar algo por hecho

1. `npm run typecheck` y `npm run build`.
2. `node <skill>/scripts/lint.mjs --app app components lib` sin fallos.
3. `node <skill>/scripts/inspect.mjs --app <url>` a 1440, 768 y 390 px. Las páginas privadas se inspeccionan desde un HTML
   guardado con la cookie de demo (`curl -b bw_demo=lucia`), porque el inspector no admite cookies.
4. Mirar cada captura en claro y en oscuro.
