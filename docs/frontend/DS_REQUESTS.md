# Peticiones al design system

Lista para pasar al equipo del design system (Claude Design). El proyecto **no edita** `design-system/`:
la carpeta se reemplaza entera cuando cambia el origen, y un parche local se perdería o divergería.
Estado a 2026-10-22: la v1.1 del design system resolvió los puntos 1 a 11 (detalle en [DS_UPDATE_1.1.md](DS_UPDATE_1.1.md)).
Quedan NavBar responsive y StatStrip en móvil (X-04 de ROADMAP), y un defecto nuevo en `Button` (punto 12), que tiene
un parche local temporal aplicado a petición del equipo (ver punto 12).

Cada punto dice archivo y línea del design system tal como está en este repo (`design-system/src/`).

## Estado tras la v1.1 (2026-10-22)

| # | Punto | Estado |
|---|---|---|
| 1 | `Button` outline: `border` + `borderColor` | Resuelto en v1.1 |
| 2 | `Switch` sin input | Resuelto en v1.1 |
| 3 | `Checkbox` sin input | Resuelto en v1.1 |
| 4 | `Radio` / `RadioGroup` sin input | Resuelto en v1.1 |
| 5 | `Dialog`: Escape, foco atrapado, `aria-labelledby` | Resuelto en v1.1 |
| 6 | `Field`: `aria-describedby` y `aria-invalid` | Resuelto en v1.1 |
| 7 | `EmptyState` con variante neutra | Resuelto en v1.1 (`tone="neutral"`) |
| 8 | `StepNav` con degradado y resplandor | Resuelto en v1.1 |
| 9 | `Card` con sombra por defecto | Resuelto en v1.1 |
| 10 | Falta escalón de superficie | Resuelto en v1.1 (`surface-raised`) |
| 11 | `Footer` con `href="#"` | Resuelto en v1.1 |
| 12 | `Button`: `background` con `backgroundOrigin` y `backgroundClip` en el mismo estilo | **Parche local** el 2026-10-22; pendiente de que lo corrija el DS (ver abajo) |
| X-04 | `NavBar` responsive y `StatStrip` en móvil | Pendiente (no entró en v1.1) |

## Punto 12 (nuevo): conflicto de `background` en `Button`

`Button.jsx` (línea 90 de la v1.1) pone `backgroundOrigin` y `backgroundClip` en el mismo `style` que la variante
con `background` (shorthand). React avisa en dev al cambiar el estilo al pasar el ratón:
*"Updating a style property during rerender (background) when a conflicting property is set (backgroundClip)"*.
Es el mismo tipo de defecto que el punto 1, en el mismo componente. No afecta a producción.
**Qué pedir:** usar `backgroundColor` y `backgroundImage` por separado en las variantes, o quitar los longhands.

**Parche local temporal (2026-10-22, pedido por el equipo).** Dos cambios puntuales, sin tocar nada más:
1. `design-system/src/Button.jsx`: se borran las líneas `backgroundOrigin` y `backgroundClip` del `style`.
2. Variante `gradient`: `background: 'var(--gradient-action) border-box'`. El `border-box` del shorthand fija
   `background-origin` y `background-clip` a la vez; el degradado se ve igual (comprobado en Styleguide).

Se aplicó en el repo y en el artefacto de Kp7L (versión 12, `src/Button.jsx` y `bundle.js`). Verificado: `tsc`,
build, recorrido de desarrollo sin avisos, y prueba de hover en Styleguide sin avisos. **Cuando llegue la siguiente
versión del design system, la carpeta se reemplaza y el parche desaparece:** hay que comprobar que el aviso no vuelve.
Detalle en [DS_UPDATE_1.1.md](DS_UPDATE_1.1.md), sección 5.

## Puntos de origen (histórico)

## Prioridad alta (histórico)

| # | Componente | Problema | Dónde | Qué pedir | Workaround en el proyecto |
|---|---|---|---|---|---|
| 1 | `Button` (`outline`) | Mezcla `border` (shorthand) con `borderColor` en el hover. Al salir del hover React avisa en desarrollo: *"Removing a style property during rerender (borderColor) when a conflicting property is set (border)"*. El borde puede quedarse con el color del texto. | `Button.jsx` líneas 14 y 22 (`VARIANTS.outline`, `HOVER.outline`) | Usar `borderColor` como propiedad separada en todas las variantes (y en `onInverse`), o un `border` completo en el hover. | Nuevas pantallas usan `secondary` y `ghost`. Los `outline` de la landing y de Styleguide siguen avisando al pasar el ratón. |
| 2 | `Switch` | Es un `<label role="switch" onClick>` sin input: no recibe foco ni responde a teclado. | `Switch.jsx` línea 14 | `<input type="checkbox" role="switch">` visualmente oculto, con anillo de foco y Espacio. | Local: `components/forms/ToggleField.tsx` (DEC-024). |
| 3 | `Checkbox` | Mismo patrón: `<label onClick>` sin input. Los términos del registro no se pueden marcar con teclado. | `Checkbox.jsx` línea 16 | Input nativo con foco y Espacio. | Local: `components/forms/CheckField.tsx`. |
| 4 | `Radio` / `RadioGroup` | Mismo patrón. `RadioGroup` no tiene `role="radiogroup"` ni flechas. | `Radio.jsx` línea 7; `RadioGroup` en la línea 28 | Input nativo `type="radio"` por opción, grupo con `role="radiogroup"`, opciones deshabilitadas por opción. | Local: `components/forms/OptionRadio.tsx`. |
| 5 | `Dialog` | Sin cierre con Escape, sin atrapar el foco dentro, sin devolverlo al botón que abrió el diálogo, y el título no está unido con `aria-labelledby`. | `Dialog.jsx` líneas 5-21 | Esos cuatro comportamientos. | Se usa tal cual; se cierra con el botón "Cerrar" y los botones del pie. |

## Prioridad media

| # | Componente | Problema | Dónde | Qué pedir |
|---|---|---|---|---|
| 6 | `Field` | El texto de ayuda y el de error no se unen al control (`aria-describedby`), y el control no recibe `aria-invalid`. | `Field.jsx` líneas 5-27 | Unir hint/error al control con `aria-describedby` y marcar `aria-invalid` en error. |
| 7 | `EmptyState` | El icono va en un cuadro con color de acento (`surface-accent-subtle`). Las reglas de app piden contenedores neutros. | `EmptyState.jsx` línea 8 | Variante `tone="neutral"` (cuadro en `surface-sunken`). |
| 8 | `StepNav` | El paso actual usa `--gradient-mark` con `--shadow-glow`: un degradado y un resplandor. El ancho es fijo (300 px). | `StepNav.jsx` líneas 26 y 59 | Marcador plano en acento sólido, sin sombra, y ancho fluido (`width` como prop o `100%`). |
| 9 | `Card` | `elevation` por defecto es `sm`: sombra en reposo en todas las tarjetas. | `Card.jsx` línea 11 | Por defecto `none`; la sombra solo en `elevation="md"`. |
| 10 | Tokens (`tokens.css`) | `--surface-sunken` vale lo mismo que `--surface-page` en claro (#f8fafc). Sin escalón de superficie, un panel "tonal" se distingue solo por el borde. | `tokens.css` líneas 19-21 | Un token `surface-raised` (paneles sobre la página) con escalón visible en claro y oscuro. |
| 11 | `Footer` | Un enlace sin `href` se pinta con `href="#"`: enlaces muertos. | `Footer.jsx` líneas 17 y 24 | Renderizar texto sin `<a>` cuando no hay `href`. |

## Prioridad ya cubierta (no pedir)

- `NavBar` no es responsive ni marca el enlace activo: ya está en X-04 de ROADMAP. El proyecto usa `AppHeader`.
- `StatStrip` desborda a 390 px: X-04.
- `Tag` es correcto: foco, `aria-pressed` y `role="button"` cuando es interactivo (`Tag.jsx` líneas 9-15).
- `Alert` es correcto: `role="alert"` en `warning` y `danger`, `role="status"` en el resto.
- `Avatar` y `IconButton` son correctos: texto alternativo y `aria-label` obligatorio.

## Cómo llegarán los cambios

Los cambios van en el origen del design system (Claude Design). Cuando el origen se actualice, la carpeta
`design-system/` se reemplaza. Entonces: quitar los workarounds marcados (DEC-024) y comprobar que la demo
sigue igual. Si Claude Design usa el flujo `/design-sync`, sus escrituras se confirman con un plan revisado antes.
