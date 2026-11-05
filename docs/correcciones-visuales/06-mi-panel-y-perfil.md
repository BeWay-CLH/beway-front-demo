# 06 · Mi panel, mi perfil y vista para empresas

Fichas: 21 y 22 (panel), 23, 24, 25 y 26 (perfil), y la parte de perfil de la ficha 38 (móvil).

Nombres, percentiles y métricas (847, Top 5 %, #12, anillo de BEWAY Score) son ejemplos. Copia la forma de cada bloque. No encargues ni inventes un algoritmo nuevo para reproducir esas cifras. Usa datos disponibles o ejemplos identificados.

---

## Ficha 21 · Mi panel: rehacer el primer pantallazo

**Ahora:** `/talent/dashboard`.
**Debe quedar:** `#/panel`.

- [ ] **1. Saludo simple.**
  - Eyebrow "MI PANEL"; "Hola, [nombre]."; introducción breve.
  - Badge discreto si existe un dato real.
- [ ] **2. Una acción dominante.**
  - Bloque navy de ancho completo "Próximo paso".
  - Icono a la izquierda; título de 24 px; empresa; progreso horizontal; botón blanco "Continuar" a la derecha.
- [ ] **3. Dos columnas.**
  - Después del bloque principal: columnas 1.75 fr / 1 fr, gap 23 px.
  - A la izquierda: "Tu semana".
  - A la derecha: "Mejora tu BEWAY Score".
- [ ] **4. Lenguaje visual.**
  - Manrope en títulos; DM Sans en cuerpo.
  - Tarjetas blancas con borde #E4E9EE y radio 13 px.
  - Reserva el teal para progreso y pequeños estados.

**Listo cuando:** saludo, bloque navy y comienzo de las dos columnas coinciden por posición, escala y densidad.

---

## Ficha 22 · Mi panel: ordenar todo lo que viene después

**Ahora:** `/talent/dashboard` (mitad y final del panel).
**Debe quedar:** `#/panel`.

- [ ] **1. Columna principal, en este orden exacto:**
  1. Tu semana
  2. Empresas para ti
  3. Oportunidades para ti
  4. Retos recomendados
  5. Mis certificaciones
  - Filas compactas para empresas y ofertas.
  - Dos tarjetas para retos.
- [ ] **2. Columna derecha, en este orden:**
  1. BEWAY Score, con anillo y barras
  2. Tu ranking de talento
  3. Próximos eventos
  4. Tu voz también cuenta
  - Mantén su alineación vertical y el espaciado entre tarjetas.
- [ ] **3. Actividad conectada.**
  - "Continuar" del curso en marcha abre el aula.
  - "Ver" de una credencial emitida abre el modal de acreditación (ver 04, ficha 15).
  - "Explorar" abre el catálogo.
  - "Seguir" conserva su estado. Los demás accesos llevan a su destino.
- [ ] **4. Métricas de ejemplo.**
  - Copia la forma del anillo, las barras y el ranking.
  - No encargues un algoritmo nuevo para reproducir 847, Top 5 % o #12.

**Listo cuando:** el orden completo de los dos lados coincide con la referencia, no solo el hero, y todos los accesos tienen destino.

---

## Ficha 23 · Mi perfil: edición directa y dos columnas

**Ahora:** `/talent/profile/edit`.
**Debe quedar:** `#/perfil`.

- [ ] **1. Unificar la presentación.**
  - Eyebrow "MI PERFIL Y CV"; H1 "Que tu recorrido hable por ti."
  - "Vista para empresas" arriba a la derecha.
  - La página es editable y reúne todos los bloques en un mismo recorrido.
- [ ] **2. Identidad.**
  - Avatar de 88 px, nombre y estado.
  - Campos Nombre, Titular, Ubicación y Universidad en grid de 2 × 2.
  - Columna principal 1.75 fr; lateral 1 fr; gap 24 px.
- [ ] **3. Lateral.**
  - Recomendación teal arriba.
  - "Mi actividad en BEWAY" con ocho filas debajo.
  - "Visibilidad de mi perfil" con dos checks y previsualización.
  - Mantén disponibles los datos de actividad.
- [ ] **4. Guardado visible.**
  - Barra "Guardar cambios" adherida a 16 px del borde inferior.
  - La barra no tapa el último campo.
  - Conserva la persistencia y las estructuras actuales de experiencia y formación.

**Listo cuando:** identidad, campos y las tres tarjetas laterales se colocan como en la referencia, y se puede guardar sin pérdida de datos.

---

## Ficha 24 · Mi perfil: vídeo pitch y CV

**Ahora:** `/talent/profile/edit`.
**Debe quedar:** `#/perfil`.

- [ ] **1. Pitch antes del CV.**
  - Tarjeta "Mi vídeo pitch." con bloque navy e icono.
  - Estado "Por completar"; texto "Haz que te conozcan en un minuto."; botón "Subir vídeo".
  - Respeta el alto compacto observado.
  - Cuando exista un vídeo, muestra miniatura o reproductor. Conserva la subida o el enlace reales.
- [ ] **2. CV por bloques legibles.**
  - Carrera, Universidad, Especialidad e Idiomas en 2 × 2.
  - Después, Experiencia e Intereses en textarea anchas.
  - Cierra una zona diferenciada: "Adjunta tu CV."
- [ ] **3. Conservar la información actual.**
  - Si el backend guarda varias experiencias o titulaciones, mantenerlas accesibles dentro de este bloque.
  - La simplificación visual no autoriza borrar esos registros.
- [ ] **4. Espaciado de formulario.**
  - Input: 12 px; padding 11 px 12 px; radio 7 px; borde #E0E6EC.
  - Gap de 18 px entre campos.
  - Labels pequeños en mayúsculas; ayuda secundaria en tono tenue.

**Listo cuando:** Pitch y CV siguen a Identidad, los campos se distinguen y el adjunto sigue disponible.

---

## Ficha 25 · Mi perfil: habilidades, certificaciones y evidencias

**Ahora:** `/talent/credentials`.
**Debe quedar:** `#/perfil` (bloques inferiores).

- [ ] **1. Validated Skills.**
  - Bloque con nota de contexto y ocho tarjetas de ejemplo en 2 columnas.
  - Cada tarjeta muestra habilidad, fuente de validación, nivel e indicador teal.
  - **No conviertas habilidades manuales en habilidades verificadas.** Son datos distintos.
- [ ] **2. Certificaciones.**
  - Lista compacta: logo, programa, empresa o estado de emisión, y acción "Ver".
  - Conserva fecha, emisor y acceso al documento real donde existan.
- [ ] **3. Proof of Work.**
  - Tres tarjetas de ejemplo: categoría, título, descripción, estado y "Ver evidencia".
  - Los registros y enlaces finales proceden del usuario.
- [ ] **4. Orden completo de la página.**
  - Identidad → Mi vídeo pitch → Mi CV → Validated Skills → Certificaciones → Proof of Work.
  - Los nombres y cifras de los ejemplos no son requisitos de datos.

**Listo cuando:** los tres bloques cierran el perfil con el mismo orden, anchura y jerarquía, y cada evidencia abre su destino.

---

## Ficha 26 · Vista para empresas: previsualización del perfil

**Ahora:** `/u/lucia-martin` (vista actual).
**Debe quedar:** `#/perfil`, previsualización en modal.

- [ ] **1. Dos accesos, una ventana.**
  - "Vista para empresas" y "Previsualizar perfil" abren la misma ventana centrada, de hasta 740 px.
  - Reutiliza el componente de modal (ver 01, sección D).
- [ ] **2. Resumen legible.**
  - Avatar e identidad; titular, ubicación y formación; resumen; bloques de habilidades y evidencias.
  - Usa el mismo lenguaje de tarjetas, separadores y badges del perfil.
- [ ] **3. Datos coherentes.**
  - La previsualización usa los mismos valores que la edición.
  - Respeta la visibilidad existente.
  - **No publiques un perfil por abrir esta vista.**
- [ ] **4. Ajustes siguen accesibles.**
  - Correo, contraseña, notificaciones, cierre de sesión y eliminación de cuenta mantienen su acceso desde Ajustes.
  - Esta referencia solo reorganiza la presentación principal del perfil.

**Listo cuando:** vista y edición presentan la misma información, y al cerrar la ventana se vuelve al punto del perfil desde el que se abrió.

---

## Ficha 38 · Perfil en móvil (parte de perfil)

**Referencia:** `#/perfil` a 390 px.

- [ ] **1. Perfil a una columna.** Identidad y campos apilados. Avatar, texto y acciones sin solaparse.
- [ ] **2. Bloques del CV a una columna.** Las tarjetas de habilidades mantienen su grid de 2 columnas según la referencia.
- [ ] **3. Guardado accesible.** La barra inferior queda a 16 px del borde, con espacio reservado al final del documento. Ni teclado, ni barra, ni modal deben dejar controles esenciales fuera de alcance.
- [ ] **4. Ventanas.** `calc(100% − 38px)`, máximo 90dvh, scroll interno. La X sigue visible y el cierre funciona con teclado.

**Listo cuando:** en 390 px se puede completar la revisión visual de campos y ventanas sin scroll horizontal de página.
