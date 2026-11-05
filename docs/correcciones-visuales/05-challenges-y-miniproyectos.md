# 05 · Challenges y miniproyectos

Fichas: 16 (catálogo de challenges), 17 (detalle del challenge), 18 (propuesta), 19 (catálogo de miniproyectos) y 20 (detalle de miniproyecto).

Challenges y miniproyectos pueden compartir componentes y filtros, pero **cada uno conserva su propia cabecera de tarjeta**. Un miniproyecto debe distinguirse de un challenge de un vistazo, aunque sean de la misma empresa.

Challenges y miniproyectos no tienen navegación verificada en la demo. Añade los enlaces en la navegación (ver 01).

---

## Ficha 16 · Challenges: catálogo con identidad de empresa

**Pantalla objetivo.** Requiere enlace en la navegación.
**Debe quedar:** `#/challenges`.

- [ ] **1. Misma familia de catálogo.**
  - H1: "Tu talento se demuestra."
  - Buscador y selector de empresa.
  - Tres columnas, gap 21 px.
  - Banda de contexto bajo los filtros.
  - No añadas las pestañas de progreso de Certificaciones.
- [ ] **2. Portada de marca.**
  - Logo, título y marca de agua "01" sobre el fondo corporativo.
  - En el cuerpo: sector, estado, descripción, "Briefing y entregables" y "Según convocatoria".
- [ ] **3. Estado y acción.**
  - Sin participación: "Conocer el challenge".
  - Con participación: "Continuar mi propuesta".
  - El estado va junto al sector, no como un bloque grande aparte.
- [ ] **4. Datos variables.**
  - El número de retos y sus nombres son ejemplos.
  - Mantén la plantilla con uno, varios o ningún resultado.
  - Conecta cada tarjeta con el challenge real.

**Listo cuando:** tarjetas, filtros y CTAs coinciden con el catálogo objetivo y conservan la participación del usuario.

---

## Ficha 17 · Detalle del challenge: briefing claro y acción lateral

**Referencia:** `#/challenge/santander`. Estados: "Sin empezar" y "Borrador existente".

- [ ] **1. Hero y estructura.**
  - Patrón de detalle de dos columnas.
  - Hero con color corporativo, logo, eyebrow del challenge y título.
  - Debajo, tres bloques: "El punto de partida.", "Lo que vas a entregar." y "Cómo se revisa."
- [ ] **2. Participación en el lateral.**
  - Tarjeta "Tu participación." con empresa, formato, plazo y estado.
  - CTA "Unirme al challenge" cuando no hay participación.
  - CTA "Continuar borrador" cuando existe.
  - Enlace "Ver briefing en la ficha".
- [ ] **3. Conservar los estados reales.**
  - Unirse, continuar, guardar y entregar son acciones distintas.
  - El diseño no debe borrar un borrador ni volver a inscribir al usuario al entrar.
- [ ] **4. Móvil.**
  - Primero la columna de contenido; después el lateral.
  - Mismos colores, títulos y acciones.
  - No ocultes requisitos ni entregables para acortar la pantalla.

**Listo cuando:** el estado de participación determina la CTA, y toda la información del briefing queda accesible.

---

## Ficha 18 · Propuesta del challenge: un formulario de trabajo

**Referencia:** `#/trabajo/challenge%3Asantander`. Estado: "Formulario objetivo".

- [ ] **1. Encabezado centrado.**
  - Contenedor de unos 1100 px.
  - Empresa; H1 "De la idea a la propuesta."; nombre del challenge; badge "Borrador".
- [ ] **2. Campos en una tarjeta.**
  - Título de tu propuesta.
  - Problema y evidencia.
  - Tu propuesta.
  - Enlace al trabajo o prototipo.
  - Documento de apoyo.
  - Labels pequeños, espaciado amplio. Los textarea son más altos que los inputs.
- [ ] **3. Pie del formulario.**
  - Checkbox de autoría.
  - Botón "Guardar borrador" secundario.
  - Botón principal de entrega.
  - El objetivo dice "Simular entrega" porque es demo. Conecta el envío real. No lo sustituyas por un mensaje local.
- [ ] **4. Validación y archivos.**
  - Conserva la obligatoriedad, los formatos y los límites existentes.
  - Mensajes de error junto al campo, sin perder lo escrito.
  - La subida de archivos y el guardado siguen funcionando tras el cambio visual.

**Listo cuando:** la propuesta se puede editar y guardar con todos sus datos. La apariencia coincide antes de cualquier envío real.

**Nota:** se revisó un borrador existente. No se hizo inscripción nueva ni guardado ni entrega.

---

## Ficha 19 · Miniproyectos: tarjetas limpias sin portada corporativa

**Referencia:** `#/miniproyectos`.

- [ ] **1. Título y filtros.**
  - H1: "Pequeños proyectos. Evidencias reales."
  - Buscador; selector de empresa; "Mi progreso".
  - Grid de 3 columnas como los catálogos.
- [ ] **2. Diferencia visual clave.**
  - Tarjeta blanca **sin franja de color de 156 px**.
  - Logo pequeño arriba a la izquierda.
  - Badge "Práctica guiada" arriba a la derecha.
  - Después, título y descripción.
- [ ] **3. Pie coherente.**
  - Metadato "Evidencia para el portfolio".
  - CTA navy de ancho completo: "Explorar proyecto".
  - Borde fino, radio 12 px y espacio interior de la referencia.
- [ ] **4. No reciclar sin ajustar.**
  - Puede compartir componentes y filtros con Challenges.
  - Debe conservar su propia cabecera de tarjeta y su limpieza visual.

**Listo cuando:** se distingue un miniproyecto de un challenge de un vistazo, incluso cuando pertenecen a la misma empresa.

---

## Ficha 20 · Detalle de miniproyecto: una práctica individual

**Referencia:** `#/proyecto/instituto-bme~0`.

Nota: la pantalla que aparece tras iniciar un proyecto nuevo no se abrió para evitar crear actividad. No fijes su diseño como si estuviera observado.

- [ ] **1. Patrón correcto.**
  - Breadcrumb; hero corporativo; columna principal flexible; lateral de 335 px.
  - Etiqueta "MINIPROYECTO EN BEWAY"; descripción; bloques del briefing.
- [ ] **2. Contenido.**
  - "El punto de partida.", "Lo que vas a entregar." y "Cómo se revisa."
  - Conserva el texto y el orden observados en la ficha del proyecto.
- [ ] **3. Lateral.**
  - Formato "Práctica individual".
  - CTA "Comenzar proyecto".
  - Mantén empresa, estado y demás metadatos disponibles.
  - Vincula con la actividad que exista.
- [ ] **4. Continuidad.**
  - Si ya hay trabajo iniciado, muestra la acción adecuada a ese estado.
  - No crees otra participación para obtener una apariencia de "sin empezar".

**Listo cuando:** el detalle conserva su carácter de práctica individual, y en móvil el lateral aparece después del contenido.
