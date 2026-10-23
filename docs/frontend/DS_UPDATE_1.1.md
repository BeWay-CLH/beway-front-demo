# Actualización del design system a v1.1

Fecha: 2026-10-22. Origen: la carpeta `TEMP - update` (copia idéntica del `design-system.zip` que la acompañaba).
Esta nota recoge todos los movimientos de la actualización. La carpeta `TEMP - update` se borró al terminar,
porque era solo para esta actualización. Lo que queda en el repo es lo que está aquí descrito.

## 1. Qué se movió

Se reemplazó la carpeta `design-system/` entera, tal como pide el `CAMBIOS.md` del paquete
(«borra la anterior y pega esta»). Ningún archivo de la carpeta anterior sobrevive a excepción de los que el paquete trae.

| Tipo | Cantidad | Archivos |
|---|---|---|
| Modificados | 21 | `bundle.css`, `theme.css`, `tokens.css`, `tokens.json`, `index.d.ts`, `src/Button.jsx`, `src/Card.jsx`, `src/Checkbox.jsx`, `src/Dialog.jsx`, `src/EmptyState.jsx`, `src/Field.jsx`, `src/Footer.jsx`, `src/IconButton.jsx`, `src/Input.jsx`, `src/Radio.jsx`, `src/Select.jsx`, `src/StepNav.jsx`, `src/Switch.jsx`, `src/Table.jsx`, `src/Tag.jsx`, `src/Textarea.jsx` |
| Nuevos | 1 | `src/a11y.js` (utilidades de accesibilidad compartidas; no se exporta desde `index.js`) |
| Sin cambios | resto | `index.js`, `src/NavBar.jsx`, `src/Stat.jsx` (incluye `StatStrip`), `src/Logo.jsx`, `src/Photo.jsx`, `src/Tabs.jsx`, y el resto de componentes |
| Eliminados | 0 | Ninguno |

Verificación del origen: `design-system.zip` y la carpeta tienen el mismo contenido (comparación MD5 archivo a archivo).

Copia de seguridad de la versión anterior: fuera del repo, en la carpeta temporal de la sesión. No forma parte del proyecto.

## 2. Cambios en el código del proyecto

El paquete pide revisar tres cosas al pegarlo. Se revisaron en todo el código con `grep`:

| Punto del CAMBIOS | Dónde aplica en el proyecto | Qué se hizo |
|---|---|---|
| `StepNav` mide 100 % por defecto | `app/talent/onboarding/OnboardingFlow.tsx` (único uso) | Se añadió `width={300}` para conservar el riel de 300 px. |
| `Card` ya no tiene sombra por defecto | `app/(public)/page.tsx` (tarjeta de estadísticas), `app/admin/dashboard/page.tsx` (dos tarjetas), `app/(public)/programas/ProgramasView.tsx` | Se añadió `elevation="sm"` en esas cuatro tarjetas para no cambiar el aspecto aprobado. Las tarjetas nuevas del bloque B ya usan bordes y no dependen de la sombra. |
| `surface-sunken` ya no es igual a la página | Ningún uso directo en el proyecto | Nada que cambiar. El panel de vista previa del bloque B usa `surface-sunken` y ahora se distingue del fondo. |

Otros puntos del changelog revisados y que no requieren cambios:

- `Dialog`: `onClose` recibe ahora un evento. Nuestros diálogos (contraseña y eliminar cuenta en ajustes) pasan una función sin argumentos, así que siguen funcionando.
- `Radio` llama a `onChange(value)`. Nuestro `OptionRadio` es local y no usa el de DS.
- `Footer`: todos los enlaces del pie tienen `href`, así que ninguno sale como texto plano.
- `Button` e `IconButton` ahora aceptan `as` y `href`. El proyecto no lo usa todavía.

Los componentes locales `ToggleField`, `CheckField` y `OptionRadio` (DEC-024) **siguen en uso**. El paquete dice que ya no
hacen falta, pero sustituirlos cambia formularios de registro, ajustes, onboarding y contacto. Es un paso aparte
(ver sección 5).

## 3. Los 11 puntos de la petición original

Estado de cada punto de [DS_REQUESTS.md](DS_REQUESTS.md) tras la v1.1:

| # | Componente | Estado |
|---|---|---|
| 1 | `Button` outline: conflicto `border`/`borderColor` | Resuelto. El aviso de `borderColor` ya no sale. Ver el punto 12 (nuevo) sobre `background`. |
| 2 | `Switch` sin input | Resuelto: input nativo con foco y Espacio. |
| 3 | `Checkbox` sin input | Resuelto: input nativo. |
| 4 | `Radio` / `RadioGroup` sin input | Resuelto: input por opción, `role="radiogroup"`, flechas, `disabled` por opción. |
| 5 | `Dialog` sin Escape ni foco atrapado | Resuelto: Escape, foco atrapado, retorno del foco, `aria-labelledby`. |
| 6 | `Field` sin `aria-describedby` ni `aria-invalid` | Resuelto. |
| 7 | `EmptyState` con icono sobre acento | Resuelto con `tone="neutral"`. El valor por defecto sigue siendo `accent`; nuestros usos no cambian. |
| 8 | `StepNav` con degradado y resplandor | Resuelto: marcador cian plano, sin sombra, `width` configurable. |
| 9 | `Card` con sombra por defecto | Resuelto: por defecto `none`. Ajustado en cuatro usos (sección 2). |
| 10 | Falta un escalón de superficie | Resuelto: `surface-raised` nuevo. `surface-sunken` en claro pasa a `#F1F5F9`. |
| 11 | `Footer` con `href="#"` | Resuelto: los enlaces sin `href` son texto plano. |

Fuera de la v1.1 (siguen en X-04 de ROADMAP): la barra de navegación responsive (`NavBar`) y el `StatStrip` en móvil.
Son los dos puntos que el paquete no menciona. Ambos son de `src/NavBar.jsx` y `src/Stat.jsx` (donde vive `StatStrip`), que no cambiaron.

## 4. Verificación

| Comprobación | Resultado |
|---|---|
| `npx tsc --noEmit` (tras reemplazar la carpeta) | Sin errores. |
| `npm run build` (producción) | Compila. 22 rutas, `proxy` detectado. |
| Rutas HTTP: públicas, redirecciones, perfiles, 404, cookie de demo | Igual que antes (todas las respuestas esperadas). |
| Recorrido completo en Chrome, producción (18 pasos: acceso, ajustes, onboarding, registro, perfiles, roles, móvil, oscuro) | 0 problemas: sin errores de consola ni excepciones. |
| Recorrido completo en Chrome, desarrollo (mismos 18 pasos) | Todos los pasos funcionan. Un aviso nuevo de dev (punto 12 abajo). |
| Capturas revisadas: inicio, onboarding (paso 4), acceso, registro con errores, ajustes en móvil, landing, Styleguide | Sin regresiones visibles. El riel del onboarding conserva 300 px; las tarjetas de la landing y del admin conservan su sombra. |

El aviso de `borderColor` que mostraba la demo en dev ya no aparece.

## 5. Pendientes que conviene decidir

1. **Aviso nuevo en dev (punto 12 de DS_REQUESTS): parche local temporal aplicado el 2026-10-22.** `Button` combinaba
   `background` con `backgroundOrigin` y `backgroundClip` en el mismo `style`. React avisa en dev al cambiar el estilo
   al pasar el ratón (*"Updating a style property during rerender (background) when a conflicting property is set (backgroundClip)"*).
   Parche (dos cambios, nada más): se borran las líneas `backgroundOrigin` y `backgroundClip` de `design-system/src/Button.jsx`,
   y la variante `gradient` pasa a `background: 'var(--gradient-action) border-box'` (el `border-box` del shorthand fija
   origen y recorte). Aplicado en `design-system/src/Button.jsx` y en el artefacto de Kp7L (versión 12:
   `src/Button.jsx` y `bundle.js`). Verificado: `tsc`, build, recorrido de desarrollo sin avisos, hover en Styleguide sin
   avisos, y el degradado de Styleguide con origen y recorte `border-box`, igual que antes.
   Sigue pidiéndose la corrección al design system. **Al reemplazar la carpeta con la siguiente versión, el parche se pierde:**
   comprobar que el aviso no vuelve.
2. **Sustituir los controles locales por los del DS.** `ToggleField`, `CheckField` y `OptionRadio` (DEC-024) ya no son
   necesarios. Sustituirlos toca registro, ajustes, onboarding y contacto. Se puede hacer con el mismo recorrido de verificación.
3. **NavBar responsive y StatStrip en móvil** (X-04). Siguen pendientes; no entraron en la v1.1.

## 6. Qué no se verificó

- Safari y Firefox: solo Chrome (headless y con DevTools).
- Dispositivo táctil real: el móvil se probó en el emulador de Chrome (390 px).
