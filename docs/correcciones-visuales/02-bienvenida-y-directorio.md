# 02 · Bienvenida, directorio de empresas y cierre

Zona: inicio público (`#/bienvenida`) y directorio de talento (`#/empresas`).
Fichas: 02, 03, 04, 05, 07 y 40.

Las cifras, porcentajes, nombres y número de empresas de las capturas son ejemplos. Usa datos reales del catálogo.

---

## Ficha 02 · Bienvenida: el acceso público también cambia

**Ahora:** `/` (demo).
**Debe quedar:** `#/bienvenida`.

- [ ] **1. Hero navy.**
  - Bloque con radio 14 px y márgenes laterales de 32 px.
  - Dos columnas en proporción 1.45 : 1.
  - Altura mínima 330 px.
  - Título: "Conecta con las empresas que construyen tu futuro." La última frase va en teal.
- [ ] **2. Tipografía y acciones.**
  - Título en Manrope 50 px / 56 px, peso 700, letter-spacing −2.75 px en escritorio. Móvil: 35 px.
  - Texto: "Aprende cómo trabajan, demuestra lo que puedes aportar y encuentra tu próxima oportunidad."
  - Botones: "Explorar empresas" (baja al directorio) y "Construir mi perfil".
- [ ] **3. Mosaico de marcas.**
  - Seis tiles en 3 columnas, de unos 85 px de alto, con giro de −6°.
  - Usa los logos de los fixtures o placeholders (ver 00).
  - Debajo empieza el directorio real (filtros y tarjetas). "Explorar empresas" hace scroll a ese bloque.
- [ ] **4. Acceso visible.**
  - Primera fila pública: Iniciar sesión y Crear cuenta.
  - Navegación con las seis áreas de exploración.
  - Los accesos personales aparecen según la sesión.

**Listo cuando:** el primer pantallazo reproduce el hero, el mosaico y el comienzo del directorio de la referencia.

---

## Ficha 03 · Empresas debe ser la entrada principal

**Ahora:** `/companies`.
**Debe quedar:** `#/empresas`.

- [ ] **1. Entrada.** La entrada del espacio de talento lleva a Empresas. Mi panel queda como sección personal independiente. El logo vuelve al directorio.
- [ ] **2. Encabezado compacto.**
  - Quitar el bloque grande "DIRECTORIO" y el breadcrumb de la demo en esta pantalla.
  - H1: "Encuentra tu lugar." con 30 px / 1.2. No uses el H1 general de 43 px.
  - Subtítulo pequeño.
  - Mi panel a la derecha.
- [ ] **3. Controles.**
  - Primera línea: número de empresas a la izquierda; buscador a la derecha.
  - Segunda línea: sectores como botones que pueden envolver.
  - Después, grid de 3 columnas con gap 24 px y márgenes de 32 px.
- [ ] **4. Protagonismo de las empresas.**
  - Usa portadas y logos distintos por marca (ver 03).
  - El objetivo muestra 17 ejemplos. El volumen real depende del catálogo.
  - No fabriques registros para igualar ese número.

**Listo cuando:** en 1440 px se ve la primera fila completa de tarjetas, incluida su CTA, con la misma densidad que la referencia.

---

## Ficha 04 · Tarjeta de empresa: cambiar los datos y la jerarquía

**Ahora:** `/companies`.
**Debe quedar:** `#/empresas`.

- [ ] **1. Portada y logo.**
  - Portada de 174 px de alto.
  - Logo sobre placa blanca de 58 × 54 px; radio 10 px; padding 9 px; solape de −26 px sobre la portada.
  - Logos con `object-fit: contain`. Fotos con `cover`.
  - Cuerpo con padding 0 20 px 19 px.
- [ ] **2. Texto y seguimiento.**
  - Nombre: Manrope 18 px.
  - Sector: 10 px, gris (muted).
  - Descripción: 12 px / 1.6; altura mínima 57 px.
  - A la derecha del nombre: botón "+" para seguir, o check teal si ya está seguida.
  - Badge de match discreto sobre la portada, solo si hay ese dato o un ejemplo identificado.
- [ ] **3. Cinco datos, en este orden.**
  - Certificaciones, Challenges, Encuestas, Miniproyectos, Oportunidades.
  - Sustituyen a Vacantes, Retos, Equipo y Sedes de la tarjeta actual.
  - Cinco celdas iguales; gap 5 px; altura mínima 62 px; fondo #F6F8FA.
  - Número: 14 px. Etiqueta: 7 px.
  - Si un dato no aplica a la empresa, muestra "—".
- [ ] **4. Cierre igual en todas.**
  - Botón navy a todo el ancho: "Explorar empresa", altura mínima 37 px, texto 11 px, con flecha.
  - Tarjeta: radio 12 px; borde #E2E7ED.
  - Hover: la tarjeta sube 4 px, con sombra suave; la portada escala 1.035.

**Listo cuando:** portada, solape, textos, cinco celdas y CTA se alinean entre tarjetas. Las cifras proceden de datos disponibles o de fixtures explícitos.

---

## Ficha 05 · Filtros y búsqueda: diseñar también los estados

**Ahora:** `/companies`. **Debe quedar:** `#/empresas`.
**Estados de referencia:** filtro Banca; sin resultados.

- [ ] **1. Sectores.**
  - Orden observado: Todas, Banca, Editorial, Consultoría, Tecnología, Consumo, Entretenimiento, Retail, Seguros.
  - Botón activo: navy con texto blanco.
  - Resto: fondo blanco con borde tenue.
  - Adapta las categorías al catálogo real conservando esta presentación.
- [ ] **2. Estado vacío útil.**
  - Panel blanco amplio con icono.
  - Texto: "No hay empresas con esos filtros." y "Prueba otro sector o cambia tu búsqueda."
  - Botón "Ver empresas": limpia los filtros.
- [ ] **3. Búsqueda global.**
  - El campo de la cabecera permite escribir.
  - Al pulsar Enter, lleva a Empresas con esa consulta en el buscador del directorio.
  - La referencia no muestra desplegable de sugerencias al teclear. No lo añadas.
- [ ] **4. Controles coherentes.**
  - Actualiza el contador de resultados.
  - Conserva el texto introducido.
  - Muestra claramente el filtro activo.
  - No dejes huecos vacíos donde estaban las tarjetas.

**Listo cuando:** se comprueban "Todas", un sector, texto sin coincidencias y restablecer. Enter en la búsqueda global lleva al resultado filtrado.

---

## Ficha 07 · Empresas en móvil: copiar esta adaptación

**Ahora:** `/companies`. **Debe quedar:** `#/empresas` a 390 px.

- [ ] **1. Una sola columna.** A 390 px: márgenes de 15 px; gap de 20 px; tarjetas en una columna.
  - Mantén los cinco indicadores en una misma fila. No los conviertas en 3 + 2.
- [ ] **2. Cabecera compacta.**
  - Cabecera de directorio: 60 px.
  - Logo: 101 × 36 px.
  - Navegación: 44 px.
  - H1: 25 px. Subtítulo: 11 px / 1.6.
  - Mi panel: 32 px de alto.
- [ ] **3. Navegación horizontal.**
  - Las secciones siguen en una fila desplazable lateralmente, con texto de 10 px.
  - No sustituyas las pestañas por un menú hamburguesa.
- [ ] **4. Sin desbordamiento de página.**
  - Buscador, filtros y CTA caben en el ancho disponible.
  - Los logos mantienen proporción.
  - La banda y los controles superiores se compactan según el CSS de la referencia.

**Listo cuando:** a 390 × 844 px se lee la primera tarjeta, y solo la navegación se desplaza horizontalmente cuando hace falta.

---

## Ficha 40 · Bienvenida: cierre editorial y footer claro

**Ahora:** `/`. **Debe quedar:** `#/bienvenida`, bloques finales.

- [ ] **1. Último bloque antes del footer.** Eyebrow "DE LA CURIOSIDAD A LA EXPERIENCIA"; H2 "Elige cómo empezar."; tres tarjetas blancas con enlaces.
- [ ] **2. Tres caminos.**
  - "Aprende con certificaciones."
  - "Demuestra con proyectos."
  - "Acércate a tu próximo empleo."
  - Cada uno con su texto e icono. Mantén proporción y distancia entre tarjetas.
- [ ] **3. Footer.**
  - Fondo claro.
  - Marca "beway." a la izquierda; frase central; enlaces a la derecha.
  - No continúes el hero navy hasta el final de la página.
- [ ] **4. Destinos.**
  - Las tres tarjetas abren Certificaciones, Miniproyectos y Oportunidades.
  - Privacidad y Ayuda llevan a sus páginas.
  - Las acciones son enlaces reales, no texto decorativo.

**Listo cuando:** el inicio público termina con este bloque de tres caminos y con el mismo footer claro que el resto de la app.
