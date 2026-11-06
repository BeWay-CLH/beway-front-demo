# 01 · Base: tokens, cabecera y ventanas

Afecta a todo el sistema. Los valores de esta sección son los de la nueva referencia, leídos del CSS y de los elementos visibles. Son píxeles CSS.

Ubicación de los tokens: un único bloque `@theme` en el CSS global (Tailwind v4). Todas las medidas y colores de esta ficha se definen ahí, y los componentes usan esos tokens.

---

## A. Tokens globales

### A1. Fuentes

- **Objetivo:** DM Sans para UI y cuerpo; Manrope para titulares.
- **Ahora:** la demo usa Inter y Space Grotesk.
- **Hacer:**
  - [ ] Sustituir Inter y Space Grotesk por DM Sans y Manrope en todo el proyecto.
  - [ ] Cargar DM Sans y Manrope con `next/font/google`. No usar los woff2 de la referencia (no están en el repo).
  - [ ] Pesos usados: Manrope 700 (general), 750 (L'Oréal), 800 (titulares de plantillas).
  - [ ] Las plantillas corporativas con fuente propia (Arial en McGraw Hill; DM Sans/Arial en SILBON) usan Arial del sistema, tal como indica 03.

### A2. Colores

| Token | Valor | Uso |
|---|---|---|
| navy | #0B172C | Botones primarios, bloques oscuros, texto principal de acción |
| ink | #14223A | Texto principal |
| muted | #788496 | Texto secundario, sectores, ayudas |
| line | #E4E9EE | Bordes de tarjetas y separadores |
| paper | #F5F7F9 | Fondo de página |
| teal | #04B8B6 | Progreso, estados seguidos, activo de navegación |
| teal claro | #E7F6F5 | Fondos de estado activo (aula) |
| teal texto | #072A35 | Texto sobre botón teal |
| navy hover | #183552 | Hover de botón navy |
| surface | #F6F8FA | Buscador, celdas de métricas |
| input line | #E0E6EC | Bordes de formularios |
| card line (directorio) | #E2E7ED | Bordes de tarjetas del directorio |
| backdrop | rgba(8, 27, 50, .42) | Fondo de modales, con blur 5 px |

- [ ] No uses el cian brillante de la demo. Teal es #04B8B6.
- [ ] Teal no es el color de todas las acciones. Solo progreso y estados pequeños.

### A3. Contenedor y márgenes

- **Escritorio general:** max-width 1510 px; margin auto; padding 36 px 32 px 65 px.
- **Narrow:** 1160 px.
- **Móvil:** padding 25 px 15 px 38 px.
- **Directorio:** encabezado más compacto (ver 02).

### A4. Tipografía de encabezados

- **H1 general:** Manrope 700; `clamp(31px, 3vw, 43px)`; line-height 1.17; letter-spacing −0.05em. Móvil 29 px.
- **H1 excepciones:** Empresas 30 px / 1.2 (móvil 25); acceso 36; oferta 34; hero público 50 (móvil 35).
- **H2:** 26 px / 1.25; letter-spacing −0.035em.
- **H3:** 18 px / 1.35; letter-spacing −0.025em.
- **Excepciones de H2/H3:** títulos de sección de panel y perfil 17 px / 21.25; "Próximo paso" 24 px / 32.4; pregunta de encuesta 25 px / 31.25; títulos de tarjeta de catálogo 17 px.

### A5. Botones

- **Primario:** fondo #0B172C; texto blanco; radio 7 px; min-height 42 px; padding 10 px 17 px; 12 px / 650; icono 16 px.
- **Hover primario:** fondo #183552; `translateY(−1px)`.
- **Secundario:** fondo blanco; borde #DFE5EA.
- **Teal:** fondo #04B8B6; texto #072A35. Solo para acciones de progreso o confirmación puntual.
- **Tamaños reducidos:**
  - Small: 34 px de alto; 11 px de texto.
  - Empresa (tarjeta): 37 px de alto; 11 px de texto.

### A6. Tarjetas

- **Genérica:** fondo blanco; borde #E4E9EE; radio 13 px; padding 25 px; sombra `0 2px 5px #102A3C03`.
- **Directorio:** radio 12 px; borde #E2E7ED.
- [ ] No añadas sombras fuertes.

### A7. Formularios

- Input: 12 px de texto; padding 11 px 12 px; radio 7 px; borde #E0E6EC; alto aproximado 42 px.
- Grid: 2 columnas con gap 18 px. A 650 px, una columna.
- Labels visibles siempre. Foco visible. Ayuda debajo del campo, en tono tenue.
- Labels pequeños en mayúsculas (perfil y CV).
- Errores junto al campo, sin borrar lo escrito.

### A8. Grids generales

| Zona | Columnas y gap |
|---|---|
| Catálogo (certificaciones, challenges, miniproyectos, encuestas) | 3 columnas, gap 21 px |
| Empresas | 3 columnas, gap 24 px |
| Detalle | main flexible + sidebar 335 px, gap 25 px |
| Panel | 1.75 : 1, gap 23 px |
| Perfil | 1.75 : 1, gap 24 px |
| Oportunidades | 2 columnas, gap 18 px |

### A9. Modal

- Max-width 740 px; `width: calc(100% − 38px)`; `max-height: 90dvh` con scroll interno; radio 14 px.
- Backdrop rgba(8, 27, 50, .42) con blur 5 px.
- Cabecera: padding 18 px 26 px. Cuerpo: padding 30 px.
- Ver sección B para el comportamiento.

### A10. Navegación general

- Altura 57 px; sticky; top 0; z-index 50; padding 0 32 px.
- Texto 12 px / peso 550.
- Activo: 12 px / peso 750, con línea inferior teal de 2 px.
- Directorio: min-height 46 px. Móvil: 44 px.

### A11. Directorio (valores base)

- Portada 174 px; placa de logo 58 × 54 px; cuerpo padding 0 20 px 19 px; 5 métricas.
- Ajustes por ancho: ver breakpoints en el PDF.

---

## B. Registro de cambios en tokens

Registra aquí cada token cambiado durante la implementación: archivo, valor anterior, valor nuevo y motivo.

| Archivo | Antes | Después | Motivo |
|---|---|---|---|
| `design-system/tokens.json` y `tokens.css` | `brand-cyan` como `action-primary` | navy `#0B172C` (primario); `accent-teal` y `accent-teal-strong` para progreso y texto | D2: la referencia sustituye el cian (DEC-037) |
| `design-system/tokens.json` y `tokens.css` | `text-muted` `#566377` | `#5F6B7D` (oscuro `#B3BDCC`) | D3: la referencia (`#788496`) da 3,8:1 |
| `design-system/tokens.json` y `tokens.css` | `border-control` `#7B8BA1` | sin cambio | D3: la referencia (`#E0E6EC`) da 1,3:1 |
| `design-system/tokens.json` y `tokens.css` | `radius-md` 8px, `radius-lg` 16px | 7px, 13px; nuevos `radius-dialog` 14px, `radius-directory` 12px, `radius-search` 8px | 01 A5, A6, A7, A9 |
| `design-system/tokens.json` y `tokens.css` | `font-display` Space Grotesk, `font-body` Inter | Manrope, DM Sans (`next/font`) | 01 A1 |
| `design-system/tokens.json` y `tokens.css` | `h1` 32px, `h2` 24px, `h3` 20px | `clamp(31px,3vw,43px)`, 26px, 18px, con tracking por nivel | 01 A4 |
| `design-system/tokens.json` y `tokens.css` | `control-height-md` 40px, `container-lg` 1200px | 42px, 1510px | 01 A3, A5 |
| `design-system/tokens.json` y `tokens.css` | `blur-panel` 12px, `surface-scrim` `rgba(11,19,43,.62)` | 5px, `rgba(8,27,50,.42)` | 01 A9 |

Lista completa, con todos los tokens y componentes, en [DS_CAMBIOS.md](DS_CAMBIOS.md).

---

## C. Ficha 01 · Cabecera y navegación: una misma estructura

**Ahora:** demo en `/companies`.
**Debe quedar:** `#/empresas`, con la cabecera de la referencia.

### Cambios

- [ ] **1. Dos filas.**
  - Fila 1: logo a la izquierda y buscador en el centro-derecha.
  - Fila 2: navegación.
  - Navegación a la izquierda, en este orden: Empresas, Certificaciones, Challenges, Miniproyectos, Encuestas, Oportunidades.
  - Navegación a la derecha: Mi panel, Mi perfil.
- [ ] **2. Alturas por contexto.**
  - Directorio (Empresas): cabecera 66 px; logo 117 × 40 px; navegación mínima 46 px.
  - Pantallas generales: cabecera 83 px; navegación 57 px.
  - Fichas de empresa: cabecera exterior compacta de 58 px.
- [ ] **3. Identidad de la barra.**
  - Buscador: máximo 515 px de ancho; radio 8 px; fondo #F6F8FA.
  - A la derecha del buscador: guardadas, notificaciones y avatar con nombre y estado.
  - Elemento activo: subrayado teal de 2 px; texto oscuro; sin pastilla turquesa.
- [ ] **4. Separar la herramienta de demo.**
  - La banda superior del objetivo mide 28 px.
  - Si el entorno sigue siendo demostración, usa su aspecto.
  - Los accesos internos Demo / Público / Talent / Admin no deben estar en la navegación final de talento.

**Listo cuando:** las dos filas, alturas, posiciones e iconos coinciden a 1440 px, y la pestaña activa cambia con la ruta.

---

## D. Ficha 06 · Menú personal y notificaciones: ventanas centradas

**Debe quedar:** ambas se abren como modal centrado, no como menú pequeño.
**Referencia:** `#/empresas` (menú personal y notificaciones).

### Cambios

- [ ] **1. Modal, no menú.**
  - Caja blanca hasta 740 px; ancho `calc(100% − 38px)`; radio 14 px; alto máximo 90dvh con scroll interno.
  - Fondo rgba(8, 27, 50, .42) con blur 5 px.
  - Cabecera 18 px 26 px; cuerpo 30 px.
- [ ] **2. Menú personal.**
  - Encabezado "MI ESPACIO", avatar, nombre y tipo de perfil.
  - Filas: Explorar empresas, Mi panel, Mi perfil y CV, Ayuda, Cerrar sesión.
  - Las etiquetas de demostración del prototipo no se copian. Usa las del producto real.
- [ ] **3. Notificaciones.**
  - Título: "Lo que pasa en tu recorrido."
  - Tres filas con icono, texto y destino (panel, perfil u oportunidades).
  - El contenido real puede variar. Conserva la jerarquía.
- [ ] **4. Cierre.**
  - X visible.
  - Tecla Escape cierra.
  - El foco queda dentro del modal mientras está abierto.
  - Al cerrar, el foco vuelve al botón que lo abrió.
  - En móvil, mantén los márgenes y el acceso a todos los elementos.

**Listo cuando:** ambas ventanas conservan la página de fondo y se leen sin recortes en escritorio y móvil.

**Nota:** el modal de acreditación (ficha 15) usa este mismo componente. Ver 04.
