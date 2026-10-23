# Textos y decisiones para el equipo legal

Lista de todo lo que el producto necesita de legal. Mientras no llegue, cada texto aparece en la demo como
**"Borrador pendiente de revisión legal"** (OI-012). Prioridad según el bloque que lo necesita
([ROADMAP.md](ROADMAP.md)).

## 1. Preguntas previas (bloquean varios textos)

| ID | Pregunta | Por qué importa | Bloque |
|---|---|---|---|
| LQ-01 | ¿Qué legislación aplica? ¿En qué países opera BeWay y dónde se alojan los datos? | Define base legal, derechos del usuario y avisos (RGPD u otra) | Todos |
| LQ-02 | ¿Hay edad mínima para registrarse? ¿Pueden darse de alta menores con consentimiento de sus tutores? | El público son jóvenes; cambia el registro y el consentimiento | B |
| LQ-03 | ¿Quién es el responsable del tratamiento (CLH, BeWay, ambos)? ¿Y las empresas que publican encuestas son corresponsables o encargadas? | Aparece en privacidad, registro y encuestas | B, E |
| LQ-04 | Perfil público: ¿qué datos se pueden mostrar sin consentimiento expreso adicional? ¿Pueden las empresas ver perfiles privados? | Decide qué pinta `/u/[username]` y la vista previa de ajustes | B |
| LQ-05 | Respuestas de encuestas: ¿anónimas, seudónimas o nominales? ¿Qué ve la empresa que la publica? ¿Cuánto tiempo se conservan? | Consentimiento de cada encuesta (OI-016) | E |
| LQ-06 | Fichas de empresa creadas por CLH con datos públicos: ¿hace falta aviso a la empresa o derecho de rectificación / reclamación de la ficha? | Aviso en la ficha y futura solicitud de "claiming" | C, G |
| LQ-07 | Credenciales: ¿qué responsabilidad asume BeWay sobre una credencial emitida por terceros? | Texto junto a cada credencial | E |
| LQ-08 | ¿Cookies o analítica en el lanzamiento? ¿Hace falta banner de consentimiento? | Define si existe el banner | B |
| LQ-09 | Sugerir empresas según los intereses que la persona eligió en su perfil: ¿es personalización que necesita aviso o consentimiento aparte? ¿Basta con decirlo en la propia lista ("Por los temas de tu perfil: …") y en la política de privacidad? | "Empresas de tus intereses" del inicio y la audiencia de encuestas (OI-017) | D, E |
| LQ-10 | "Me interesa" en un curso: ¿qué datos recibe el proveedor (nombre, correo, perfil)? ¿Hace falta consentimiento aparte o un aviso junto al botón? ¿Y si luego se enlaza una inscripción externa? | Texto junto al botón de `/talent/courses/[slug]` (OI-023) | E |

## 2. Documentos legales

| ID | Documento | Dónde se muestra | Bloque |
|---|---|---|---|
| L-01 | Política de privacidad | `/privacy`, pie, registro, encuestas | B |
| L-02 | Términos y condiciones de uso | `/terms`, pie, registro | B |
| L-03 | Política de cookies (y banner si LQ-08 lo pide) | Pie, banner | B |
| L-04 | Condiciones para empresas que publican (fichas, encuestas, cursos) | Company Portal | G |

## 3. Textos dentro del producto

| ID | Texto | Pantalla | Bloque |
|---|---|---|---|
| L-10 | Casilla de aceptación de términos y privacidad en el registro (y versión aceptada) | `/signup` | B |
| L-11 | Aviso de verificación de correo y correo de bienvenida (pie legal del email) | `/signup`, correos | B |
| L-12 | Explicación de "privado" y "público" al elegir visibilidad | Onboarding, `/talent/settings` | B |
| L-13 | Aviso de baja de cuenta: qué se borra, qué se conserva y durante cuánto | `/talent/settings` | B |
| L-14 | Cómo ejercer derechos (acceso, rectificación, supresión, portabilidad, oposición) | `/privacy`, `/talent/settings` | B |
| L-15 | Aviso del formulario de contacto (finalidad y conservación) | `/contact` | B |
| L-16 | Correo de recuperación de contraseña (pie legal) | `/forgot-password` | B |
| L-20 | Aviso en fichas de empresa: origen de los datos y cómo pedir una corrección | `/companies/[slug]` | C |
| L-21 | Texto al seguir a una empresa: qué verá la empresa y qué recibirás tú | `/companies/[slug]` | C |
| L-30 | Consentimiento de cada encuesta: quién la publica, finalidad, quién ve las respuestas, conservación | `/talent/surveys/[slug]` | E |
| L-31 | Aviso al enviar una encuesta (no se puede editar después, si se confirma así) | `/talent/surveys/[slug]` | E |
| L-32 | Aviso de enlaces a cursos de terceros | `/talent/courses/[slug]` | E |
| L-33 | Nota sobre la emisión de credenciales | `/talent/credentials` | E |

## 4. Textos provisionales ya en la demo (bloque C)

| ID | Dónde está | Texto provisional |
|---|---|---|
| L-20 | Pie de `/companies/[slug]` | "Reunimos esta información de fuentes públicas. Si algo no es correcto, escríbenos" (enlaza a `/contact`) |
| L-21 | Pie de `/companies/[slug]` | "Si sigues a una empresa, verás sus encuestas en tu espacio" |

Ambos llevan debajo "Textos provisionales, pendientes de revisión legal". No afirman qué ve la empresa de quien la sigue (LQ-03, LQ-05).

## 5. Textos provisionales ya en la demo (bloque E)

| ID | Dónde | Texto actual |
|---|---|---|
| L-30 | Introducción de cada encuesta | Casilla: "Entiendo quién verá mis respuestas y acepto contestar esta encuesta." Antes, "Quién verá tus respuestas": "BeWay y la empresa que la publica verán tus respuestas junto a tu nombre. Las demás empresas solo verán resultados agregados." (el supuesto de OI-016) |
| L-31 | Revisión y resumen de una encuesta enviada | "Al enviar no podrás cambiarlas." · "No se puede editar después de enviarla." (OI-016) |
| L-32 | Cursos con enlace de terceros | No aplica todavía: ningún curso trae URL externa. Se necesitará si se añade una (LQ-10) |
| L-33 | `/talent/credentials` y detalle de curso | "Cada credencial dice quién la emitió y cuándo. BeWay no las emite desde esta pantalla." · "Otorga una credencial que emite {proveedor}. Cuando la tengas, aparecerá en Credenciales." (LQ-07) |

Todos llevan "Textos provisionales, pendientes de revisión legal" en esta lista, no en pantalla. Ninguno promete que se haya guardado nada: las
pantallas dicen "Simulación" cuando una acción no tiene backend.

## Formato de entrega que nos sirve

Para cada ID: texto final en español, versión y fecha, y si el usuario debe aceptarlo explícitamente (casilla) o basta con informarle.
