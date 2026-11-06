# 04 · Certificaciones, detalle, aula y evaluación

Fichas: 11 (catálogo), 12 (estado, progreso y vacío), 13 (detalle), 14 (aula), 15 (evaluación y acreditación).

Los datos de progreso (Santander 75 %, BME y McGraw Hill 100 %) son fixtures del prototipo. Alimenta estos elementos con el estado real.

---

## Ficha 11 · Certificaciones: de lista a catálogo visual

**Ahora:** `/talent/courses`.
**Debe quedar:** `#/certificaciones`.

- [ ] **1. Encabezado.**
  - Eyebrow: "APRENDE, PRACTICA, AVANZA".
  - H1: "Aprende de quienes lo hacen."
  - Introducción y acceso "Mi progreso" a la derecha.
- [ ] **2. Filtrar antes del grid.**
  - Buscador a la izquierda; selector "Todas las empresas" a la derecha.
  - Debajo: Todas / En curso / Completadas. El activo va en navy.
  - Grid de 3 columnas, gap 21 px.
- [ ] **3. Tarjeta con identidad corporativa.**
  - Portada de color de marca de 156 px de alto, con logo, título en blanco de 23 px y marca de agua con las iniciales.
  - Cuerpo: padding 22 px; título 17 px; descripción 12 px / 19.2; metadatos 10 px.
- [ ] **4. Acción al pie.**
  - Botón navy de ancho completo y 42 px de alto.
  - Estado y progreso se ven antes del botón. No conviertas toda la tarjeta en una lista de texto.

**Listo cuando:** el catálogo tiene portadas corporativas, filtros y tarjetas con la misma jerarquía y densidad que la referencia.

---

## Ficha 12 · Certificaciones: estado, progreso y vacío

**Ahora:** `/talent/courses`.
**Debe quedar:** `#/certificaciones`. Estados: En curso; Sin coincidencias.

- [ ] **1. Tres acciones distintas.**
  - Sin iniciar: "Explorar certificación".
  - En curso: "Continuar aprendizaje".
  - Completada: "Ver certificación".
  - Mantén la diferencia entre completar un programa y tener una credencial emitida.
- [ ] **2. Barra y etiqueta.**
  - En curso o completada: barra teal, porcentaje y estado.
  - Alimenta estos elementos con el progreso real del curso.
- [ ] **3. Vacío de búsqueda.**
  - Icono de lupa.
  - Texto: "Tu próximo aprendizaje está por descubrir."
  - Texto explicativo y botón "Explorar certificaciones" que limpia la consulta.
- [ ] **4. Mismo ancho aunque haya pocos resultados.**
  - Las tarjetas filtradas conservan el ancho de su columna.
  - No las estires a toda la página ni cambies el tamaño del título al filtrar.

**Listo cuando:** Todas, En curso, Completadas y una consulta vacía mantienen estructura y CTA adecuados.

---

## Ficha 13 · Detalle de certificación: hero y lateral

**Ahora:** `/talent/courses/sql-para-analisis-de-datos`.
**Debe quedar:** `#/certificacion/instituto-bme`.

- [ ] **1. Dos columnas.**
  - Breadcrumb arriba.
  - Columna principal flexible; sidebar de 335 px; gap 25 px.
  - Hero con color corporativo, radio 12 px, padding 38 px, logo y etiqueta "Certificaciones en Beway".
- [ ] **2. Contenido por tarjetas.** Después del hero:
  - "Lo que te llevas."
  - "Tu recorrido de aprendizaje." con módulos numerados y acordeón.
  - "Cómo se refleja en tu perfil."
- [ ] **3. Lateral de decisión.**
  - Muestra institución, duración, modalidad, evaluación y progreso.
  - Precio solo si corresponde al programa. El precio de 80 € de BME es un ejemplo del prototipo.
  - CTA según estado, y enlace "Ver la ficha y el programa".
- [ ] **4. Móvil.**
  - Primero el contenido principal; después el lateral.
  - No añadas una CTA fija al borde inferior. No se observó en la referencia.

**Listo cuando:** hero y lateral aparecen juntos en escritorio, y los módulos se expanden sin mover el lateral a otra página.

---

## Ficha 14 · Aula: módulos a la izquierda y contenido a la derecha

**Pantalla objetivo.** Sin equivalente verificado en el menú actual.
**Referencia:** `#/aula/santander`.

- [ ] **1. Distribución.**
  - Breadcrumb.
  - Sidebar de unos 296 px a la izquierda, con el índice: empresa, programa, progreso y bloques numerados.
  - Reproductor navy grande a la derecha.
- [ ] **2. Estados de los módulos.**
  - Completados: check teal.
  - Activo: fondo teal claro.
  - Pendientes: icono de play.
  - Mantén el progreso y el acceso real a los módulos del curso.
- [ ] **3. Reproductor y lección.**
  - Título del bloque; play central; barra inferior; tiempo; marca "beway".
  - Debajo: "APRENDE Y APLICA", estado, título, descripción, "Recursos de la lección" y "Ver recurso".
- [ ] **4. Continuidad.**
  - Acciones: "Lección anterior" y "Marcar bloque y continuar".
  - "Evaluación y acreditación" aparece en el índice.
  - Conecta con el reproductor y la evaluación existentes. No los sustituyas por simulaciones.

**Listo cuando:** cambiar de módulo actualiza el bloque activo y su contenido, conservando la distribución del aula.

---

## Ficha 15 · Evaluación y acreditación: dos ventanas distintas

**Referencia:** `#/aula/santander`. Estados: "Evaluación pendiente" y "Acreditación de ejemplo".

- [ ] **1. Bloqueo de evaluación.**
  - Mientras falten bloques, muestra una ventana con "Un paso antes de la evaluación.", una explicación y el botón "Continuar en el aula".
  - No permitas una acreditación por el mero cambio visual. La lógica de bloqueo es la real.
- [ ] **2. Acreditación completada.**
  - Modal blanco con programa, empresa, identidad y estado de acreditación.
  - Acciones: "Ver en Mi perfil" y "Cerrar".
  - Reproduce la composición de la muestra y sus márgenes.
- [ ] **3. Semántica de los datos.**
  - El prototipo indica emisión simulada y ausencia de validez académica.
  - En la app, muestra el emisor, la fecha y el estado reales.
  - Conserva las etiquetas de ejemplo solo cuando lo sean.
- [ ] **4. Modal compartido.**
  - Usa las dimensiones, el fondo desenfocado, el cierre y el foco de la ficha 06 (ver 01, sección D).
  - No uses una alerta básica del navegador para estos contenidos.

**Listo cuando:** la ventana que aparece corresponde al estado del curso, y los enlaces llevan al aula o al perfil correctos.

---

## Vista móvil de esta zona (ficha 39, parte de catálogos y detalles)

- [ ] Catálogo de una columna con márgenes de 15 px. Portada corporativa y cuerpo mantienen su forma.
- [ ] Buscador y selector se apilan. Los botones de estado pueden envolver sin cortar texto.
- [ ] Detalle: hero y bloques del programa ocupan todo el ancho disponible. La tarjeta lateral aparece después de todos los bloques principales.
- [ ] Al cambiar de ancho se conservan filtro, progreso y estado del curso. Logos proporcionales y fotos con recorte coherente.

**Listo cuando:** catálogo y detalle son equivalentes a las capturas móviles y ninguna tarjeta obliga a ampliar la pantalla.
