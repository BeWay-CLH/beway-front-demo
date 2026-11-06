# 07 · Oportunidades, candidatura, encuestas, acceso, registro y ayuda

Fichas: 27 a 37. Incluye la parte de encuestas de la ficha 38 (móvil).

**Regla general para candidaturas y encuestas:** no envíes nada real durante la revisión visual. Ninguna candidatura, respuesta, alta ni publicación. El consentimiento y el envío siguen siendo los reales.

---

## Ficha 27 · Oportunidades: catálogo de dos columnas

**Pantalla objetivo.** Sin contraparte verificada en el menú actual.
**Debe quedar:** `#/oportunidades`.

- [ ] **1. Ancho contenido.** Contenedor máximo de 1160 px. Eyebrow "OPORTUNIDADES PROFESIONALES"; H1 "El siguiente paso puede estar aquí."; introducción y "Mi progreso".
- [ ] **2. Filtros y resultados.** Buscador; selectores Empresa, Modalidad y Tipo. Debajo: banda informativa del contexto de demo y línea de resultados con "Ver guardadas".
- [ ] **3. Dos columnas.**
  - Gap 18 px.
  - Tarjetas blancas con radio 12 px y padding 24 px.
  - Altura observada cercana a 232 px.
  - Logo y bookmark arriba; título de 17 px; metadatos; pills; "Ver oportunidad" al pie.
- [ ] **4. Guardado.**
  - El bookmark cambia de estado.
  - "Ver guardadas" muestra la selección, o un estado vacío con acción para explorar.
  - Respeta los datos y la persistencia actuales. No crees 51 vacantes para copiar el ejemplo.

**Listo cuando:** filtros y guardado conservan la identidad del catálogo, y la tarjeta lleva al detalle correcto.

---

## Ficha 28 · Oportunidad: explicar el puesto y preparar la candidatura

**Referencia:** `#/oportunidad/santander-0`.

- [ ] **1. Hero de la empresa.** Breadcrumb; contenedor máximo 1160 px; columna principal y lateral. Hero rojo Santander con logo, empresa, H1 de 34 px, metadatos y badge de ejemplo.
- [ ] **2. Tres bloques de contenido.**
  - "Tu papel en el equipo." con párrafo y tres bullets.
  - "Lo que buscamos." con tres bullets.
  - "Cómo sería el proceso." con tres pasos.
  - Ajusta la longitud a la oferta real sin cambiar la jerarquía.
- [ ] **3. Lateral destacado.**
  - "TU PRÓXIMO PASO".
  - "Muéstrales lo que puedes aportar."
  - Cuatro datos.
  - Botón navy "Preparar candidatura".
  - "Guardar para después" como acción secundaria.
- [ ] **4. Continuidad.**
  - El botón conserva empresa y oportunidad al abrir la candidatura.
  - En móvil: contenido primero y tarjeta lateral después, sin recortes.

**Listo cuando:** hero y lateral aparecen juntos en escritorio, y la candidatura mantiene el contexto de la oferta.

---

## Ficha 29 · Candidatura: paso 1, el perfil

**Referencia:** `#/candidatura/santander-0`.

- [ ] **1. Contenedor centrado.** Ancho aproximado de 760 px. Breadcrumb; empresa; H1 "Tu candidatura."; título de la oportunidad; stepper horizontal: Perfil / Motivación / Revisión.
- [ ] **2. Tarjeta de perfil.**
  - "Empieza con lo que ya cuenta tu perfil."
  - Cuatro datos en 2 × 2.
  - Selector de CV.
  - Texto de ayuda.
  - Botón "Revisar mi perfil".
- [ ] **3. Acciones claras.** "Volver a oportunidad" a la izquierda; "Continuar" navy a la derecha. El paso activo tiene el tratamiento de la referencia. Los pasos completados muestran check.
- [ ] **4. Conservar el contexto.** El flujo cambia de paso dentro de la candidatura, sin perder la oportunidad, el CV elegido ni los datos al retroceder.

**Listo cuando:** el primer paso reproduce la tarjeta y el stepper, y los datos están vinculados al perfil actual.

---

## Ficha 30 · Candidatura: motivación y revisión antes de enviar

**Referencia:** `#/candidatura/santander-0`. Pasos 2 y 3.

- [ ] **1. Motivación.**
  - H2: "Lo que te gustaría aportar."
  - Textarea "Tu motivación" obligatoria.
  - Campo "Portfolio" opcional.
  - Pie: Anterior / Continuar.
  - Un campo obligatorio vacío impide avanzar.
- [ ] **2. Revisión.**
  - H2: "Revisa antes de dar el siguiente paso."
  - Resumen: PUESTO, EMPRESA, PERFIL y CV, seguido del texto de motivación.
  - En el stepper, Perfil y Motivación se marcan como completados.
- [ ] **3. Confirmación explícita.**
  - Checkbox sin marcar y acción principal final.
  - El prototipo usa "Simular envío de candidatura" y explica que es demo. **La app conserva su envío y su consentimiento reales**, con esta jerarquía visual.
- [ ] **4. Volver sin pérdida.**
  - "Anterior" permite corregir la motivación y volver a revisión sin vaciar campos.
  - El estado de envío y los errores reales tienen un tratamiento visual consistente.

**Listo cuando:** los tres pasos son coherentes y el resumen coincide con lo escrito. Avanzar de paso no se confunde con enviar.

**Nota:** el paso 3 se observó con texto ficticio, sin marcar el consentimiento y sin enviar. La confirmación posterior al envío no se verificó.

---

## Ficha 31 · Encuestas: convertir la lista en una galería

**Ahora:** `/talent/surveys`.
**Debe quedar:** `#/encuestas`.

- [ ] **1. Encabezado.** Eyebrow "ESCUCHAR PARA CONSTRUIR"; H1 "Tu opinión también construye."; párrafo y "Mi progreso".
- [ ] **2. Filtros y grid.** Buscador a la izquierda; selector de empresa a la derecha. Tres columnas con gap 21 px. Una columna a 390 px.
- [ ] **3. Tarjeta blanca.**
  - Radio 12 px; borde fino; altura aproximada de 282 px.
  - Logo o empresa y badge arriba.
  - Título de 17 px; descripción; duración y número de preguntas.
  - CTA "Participar" a todo el ancho.
- [ ] **4. Estado de cada encuesta.**
  - Mantén disponibilidad, elegibilidad, borradores y completadas.
  - Puedes expresarlo con pill y CTA "Continuar" o "Ver resumen", dentro de la misma tarjeta.
  - El número de ejemplos de la referencia no obliga a crear encuestas nuevas.

**Listo cuando:** la lista se transforma en galería y cada encuesta conserva su estado y su acción.

---

## Ficha 32 · Encuesta: pregunta de selección

**Ahora:** `/talent/surveys/primer-paso-profesional`.
**Debe quedar:** `#/encuesta/santander-0`.

- [ ] **1. Contenedor de 750 px.** Breadcrumb; empresa a la izquierda; duración a la derecha. Cuatro segmentos de progreso en el ejemplo, con los activos y completados en teal.
- [ ] **2. Tarjeta de pregunta.**
  - "PREGUNTA 1 DE 4".
  - H2 de 25 px.
  - Ayuda.
  - Opciones de radio en rectángulos completos con borde. Toda la etiqueta permite seleccionar la respuesta.
- [ ] **3. Navegación.**
  - En la primera pregunta: "Salir" a la izquierda y "Siguiente" navy a la derecha.
  - En las siguientes: "Anterior" y "Siguiente".
  - La validación mantiene al usuario en la pregunta si falta una respuesta obligatoria.
- [ ] **4. Pasos previos reales.**
  - La demo tiene una introducción y un consentimiento. Mantén su comportamiento y dales los mismos estilos.
  - El número real de preguntas y secciones procede de la encuesta. Cuatro es solo el ejemplo visual.

**Listo cuando:** opciones, progreso y acciones tienen la misma composición en todas las preguntas, y funcionan con teclado.

---

## Ficha 33 · Encuesta: escala y respuesta abierta

**Referencia:** `#/encuesta/santander-0`. Estados: "Escala 1–5" y "Texto y cierre".

- [ ] **1. Escala numérica.**
  - Pregunta: "¿Cuánto conoces a esta empresa?"
  - Ayuda explicativa.
  - Cinco radios del 1 al 5 en fila.
  - Extremos: "Muy poco" y "La conozco bien".
  - Estado seleccionado con el tratamiento teal de la referencia.
- [ ] **2. Respuesta abierta.**
  - Pregunta: "¿Qué mejorarías para conectar con tu generación?"
  - Ayuda que indica que es opcional.
  - Label "Tu idea" y textarea amplia.
- [ ] **3. Último paso.**
  - Checkbox de participación sin marcar, "Anterior" y botón de envío.
  - Mantén la privacidad, la obligatoriedad y la lógica reales.
  - El texto "respuestas de ejemplo" solo corresponde al entorno demo.
- [ ] **4. Persistencia y errores.**
  - Retroceder conserva las respuestas.
  - La barra de progreso refleja el total real.
  - Da estilo a la validación y a los errores sin crear un envío ficticio que sustituya al servicio actual.

**Listo cuando:** los tipos radio, escala y texto usan la misma tarjeta, el mismo ritmo vertical y el mismo pie de acciones.

**Nota:** se recorrieron las preguntas 1 a 4 sin enviar respuestas. El agradecimiento posterior no se verificó.

---

## Ficha 34 · Acceso: pasar a una tarjeta de dos mitades

**Ahora:** `/login`.
**Debe quedar:** `#/acceso`.

- [ ] **1. Composición.**
  - Tarjeta de máximo 1000 px, dos columnas iguales.
  - Margen vertical de 50 px; radio 15 px; borde #E4E9EE.
  - Panel izquierdo: navy #0B1B30; padding 50 px; alto mínimo 500 px.
  - Panel derecho: blanco; padding 45 px.
- [ ] **2. Mensajes.**
  - Izquierda: "Conecta tu potencial con lo que viene." de 36 px / 43.2; copy y marca al pie.
  - Derecha: "BIENVENIDO" y "Qué bueno verte por aquí." de 27 px.
- [ ] **3. Formulario.**
  - Inputs de 12 px, unos 42 px de alto, radio 7 px.
  - CTA navy de ancho completo.
  - Recuperación de contraseña y enlace a registro debajo.
- [ ] **4. Conservar la autenticación.**
  - La referencia permite entrar a un perfil ficticio con email. **No elimines la contraseña ni te saltes la autenticación actual** para copiar ese atajo.
  - Aplica el contenedor, la tipografía y los estilos a los campos reales.

**Listo cuando:** la tarjeta reproduce las dos mitades, y el formulario real sigue autenticando y mostrando errores.

---

## Ficha 35 · Registro: comenzar con una cuenta

**Ahora:** `/signup`.
**Debe quedar:** `#/registro`.

- [ ] **1. Misma familia que acceso.** Tarjeta de 1000 px de dos columnas; panel navy editorial a la izquierda; formulario blanco a la derecha. Mismos márgenes, radio, tipografías y botones.
- [ ] **2. Tres pasos visibles.** "Cuenta / Formación / Intereses". El paso activo se destaca; los completados llevan check. Primer título: "Tu próximo paso." con Nombre y Email en el ejemplo.
- [ ] **3. Campos reales.** Conserva contraseña, confirmación y cualquier otro campo que exija el registro actual, integrados en este diseño. **No sustituyas la creación de cuenta por la edición de perfil de ejemplo del prototipo.**
- [ ] **4. Validación.** Ayuda y errores junto al campo. "Continuar" al final. Los datos escritos se mantienen al cambiar de paso y al volver.

**Listo cuando:** el registro tiene la composición objetivo sin perder los requisitos reales para crear cuenta.

---

## Ficha 36 · Registro: formación e intereses

**Ahora:** `/signup`.
**Debe quedar:** `#/registro` (pasos 2 y 3).

- [ ] **1. Formación.**
  - "Lo que estás construyendo."
  - Campos Universidad, Estudios y Ubicación, requeridos en el prototipo.
  - "Anterior" y "Continuar" comparten el pie.
- [ ] **2. Intereses.**
  - "Lo que te mueve."
  - Selector de área: Banca, Editorial, Consultoría, Tecnología, Consumo, Entretenimiento, Retail y Seguros.
  - Selector de objetivo.
- [ ] **3. Objetivos.** Ejemplos de la referencia: "Certificaciones y aprendizaje", "Challenges y miniproyectos", "Mi primera oportunidad profesional". Muestra las opciones reales disponibles con esta misma presentación.
- [ ] **4. Cierre.**
  - En la referencia hay un reconocimiento de demo y un botón "Explorar mi espacio".
  - En la app, conserva los consentimientos y el proceso de alta reales.
  - La apariencia no debe crear una sesión sin completar ese proceso.

**Listo cuando:** los tres pasos conservan datos y estados, con validación legible y sin desbordes en móvil.

---

## Ficha 37 · Ayuda y privacidad: mantener el mismo lenguaje visual

**Referencia:** `#/ayuda` y `#/privacidad`.

- [ ] **1. Ayuda.**
  - H1: "Aquí para ayudarte."
  - Cuatro preguntas frecuentes en tarjetas o acordeones.
  - Acción "Ver canal de ayuda" y acceso a "Mi progreso".
  - Ancho contenido y el mismo patrón de iconos.
- [ ] **2. Privacidad.**
  - H1: "Tu información, con claridad."
  - Tarjeta de texto legible, con la jerarquía y el espaciado de la referencia.
- [ ] **3. Texto válido para la app.**
  - El prototipo contiene avisos y acciones de datos locales de ejemplo.
  - Usa el contenido de privacidad real y los canales de ayuda reales.
  - Aplica la composición de estas capturas.
- [ ] **4. Pie de página.**
  - Fondo claro; marca "beway."; frase breve; enlaces Privacidad y Ayuda.
  - "Tecnología" es un acceso de la demostración. No es una sección nueva obligatoria para usuarios finales.

**Listo cuando:** las páginas auxiliares y el footer comparten tipografía, márgenes y componentes con el resto de la interfaz.

---

## Ficha 38 · Encuestas en móvil (parte de encuestas)

**Referencia:** `#/encuesta/santander-0` a 390 px.

- [ ] **1. Contenedor fluido** con 15 px de margen.
- [ ] **2. Opciones de ancho completo.** Las preguntas envuelven de forma natural.
- [ ] **3. Navegación.** "Anterior / Salir" y "Siguiente" siguen identificables.
- [ ] **4. Ventanas.** Si una encuesta usa modal, aplica `calc(100% − 38px)`, máximo 90dvh y scroll interno.

**Listo cuando:** en 390 px una encuesta completa su revisión visual sin scroll horizontal de página.

---

## Ficha 39 · Catálogos y detalles en móvil (encuestas y oportunidades)

Esta ficha se cubre también en 04 y 05 para certificaciones, challenges y miniproyectos. Aquí se aplica a oportunidades y encuestas:

- [ ] Catálogo de una columna con márgenes de 15 px.
- [ ] Buscador y selector se apilan. Los botones de estado pueden envolver sin cortar texto.
- [ ] Detalle de oportunidad: contenido primero; tarjeta lateral después.
- [ ] Al cambiar de ancho se conserva el filtro, el guardado y el estado de cada elemento.

**Listo cuando:** oportunidades y encuestas en móvil son equivalentes a las capturas y ninguna tarjeta obliga a ampliar la pantalla.
