# Dudas abiertas

Preguntas que el frontend no puede resolver sin producto, legal o backend. No se inventan respuestas: mientras siga
abierta, la pantalla usa el supuesto indicado y lo marca en el código con `OI-XXX`.

No todas son para la misma persona: la columna **Quién decide** dice a quién preguntar. Las de legal están agrupadas
en [LEGAL_REQUESTS.md](LEGAL_REQUESTS.md).

## Abiertas

| ID | Pregunta | Afecta | Supuesto mientras tanto | Quién decide |
|---|---|---|---|---|
| OI-012 | Textos legales (privacidad, términos, cookies, consentimientos) | B-08 y avisos de B, C, E | Borrador marcado "pendiente de revisión legal" | Legal · ver [LEGAL_REQUESTS.md](LEGAL_REQUESTS.md) |
| OI-016 | Encuestas: ¿respuestas anónimas, seudónimas o nominales? ¿Qué ve la empresa? ¿Se pueden editar tras enviar? | E-03, F-05 | Nominal para BeWay, agregadas para la empresa; no editables tras enviar | Producto / legal (LQ-05) |
| OI-017 | ¿Qué es un joven "interesado" en una empresa (audiencia de sus encuestas)? | E-01, BE-010 | Sigue a la empresa **o** tiene su categoría entre sus intereses | Producto |
| OI-018 | Edad mínima y menores de edad | B-01, B-04 | Sin control de edad en la demo | Legal (LQ-02) |
| OI-019 | Ficha de CLH: nombre completo, descripción y qué publica (hoy "Equipo que impulsa BeWay. Publica encuestas como una empresa más") | C-02, E-01 | Texto provisional en el fixture `cmp-clh`; categoría "Ecosistema" | Producto |
| OI-020 | Dominio de producción para la URL canónica (`metadataBase`) y compartir fichas | C-02 | Sin canónica ni imágenes sociales; solo título y descripción | Producto / infraestructura |
| OI-021 | ¿Cómo sabe el frontend que alguien es nuevo y debe pasar por el onboarding? Hoy se deduce de que no tiene ningún apartado del perfil | D-01, B-04, BE-005 | Perfil al 0 % → "Empezar mi perfil" lleva al onboarding. Quien terminó el onboarding con solo su nombre ve lo mismo | Producto / backend |
| OI-022 | Encuestas: ¿puede la persona ver sus respuestas después de enviarlas? | E-03, BE-011 | No: una encuesta completada muestra el resumen sin preguntas ni respuestas ("No se puede editar después de enviarla") | Producto / legal (LQ-05) |
| OI-023 | Cursos: ¿qué significa "Me interesa"? ¿Lo ve el proveedor, abre una lista de espera, o hay inscripción real con enlace? | E-06, BE-014 | Solo interés interno, sin que lo vea nadie; ningún curso trae URL externa | Producto / legal (LQ-10) |
| OI-024 | Encuestas de empresas que la persona no sigue y que no le interesan: ¿se listan con su motivo o solo se llega por enlace? | E-02, BE-010 | Se listan aparte, "No son para ti por ahora", máximo 3 y con camino a la ficha de la empresa para animar a seguirla. Si producto prefiere ocultarlas, se quita esa sección | Producto |
| OI-025 | Logotipos y portadas de las 17 fichas del paquete: ¿qué fuente oficial y qué permiso? Las URLs del paquete apuntan a un prototipo (GitHub Pages), y el CSV del caso de Netflix también | Ficha de las 17 empresas | Inicial sobre el color base y degradado de marca, sin imágenes remotas. El CSV de Netflix se enlaza tal cual (DEC-050) | Producto y legal |
| OI-026 | Embajadores CLH: ¿cómo se pide y se registra la autorización de cada persona, y qué formato tiene `authorization`? | Pestaña Embajadores (85 apariciones) | Nombres visibles con la etiqueta «Pendiente de autorización» (DEC-059). Falta el consentimiento antes de producción | Producto y legal |
| OI-027 | Convocatorias, becas, plazos y precios del paquete: ¿quién los revalida, y cada cuánto? Son datos de la fuente del 21 de octubre y del 5 de noviembre de 2026 | Retos, Becas y Formación de las 17 fichas | Aviso "Datos a confirmar" y estados "según la fuente"; nunca "abierta" a secas (DEC-052, DEC-053, DEC-058) | Producto |

## Estado tras el bloque E (2026-10-23)

- OI-022, OI-023 y OI-024 son nuevas. OI-016 (anónimas, seudónimas o nominales; editables tras enviar) y OI-017 (audiencia) se aplican tal cual: la
  encuesta es nominal para BeWay y agregada para la empresa, y no se edita tras enviar. Los textos que lo dicen están en LEGAL_REQUESTS (L-30, L-31).
- LQ-10 pregunta qué recibe el proveedor al marcar "Me interesa". LQ-07 sigue abierta: el texto de credenciales es provisional (L-33).
- El resto sigue igual que tras el bloque D.

## Estado tras el bloque D (2026-10-23)

- OI-021 es nueva. OI-017 se aplica también al dashboard: "Empresas de tus intereses" usa el mismo supuesto (categoría entre sus
  intereses, y no la sigue ya). LQ-09 pregunta si sugerir por intereses necesita aviso.
- El resto sigue igual que tras el bloque C.

## Estado tras el bloque C (2026-10-22)

- OI-019 y OI-020 son nuevas. LQ-06 (aviso a la empresa y derecho de rectificación de una ficha) sigue abierta: la ficha lleva un
  texto provisional (L-20) y un enlace a Contacto para pedir correcciones.
- El resto sigue igual que tras el bloque B.

## Estado tras el bloque B (2026-10-22)

- OI-005, OI-012, OI-016, OI-017, OI-018: siguen abiertas. El bloque B usa el supuesto indicado y lo refleja en el texto
  de borrador (privacidad, términos, ajustes).
- OI-013: implementada la demo con correo y contraseña (DEC-018).

## Resueltas el 2026-10-22

| ID | Pregunta | Respuesta | Registrada en |
|---|---|---|---|
| OI-001 | Documentos 01–10 y requisitos RF | Los documentos del paquete quedan cubiertos por `docs/frontend/`. Si aparece una lista RF formal, se añade la trazabilidad | AGENT_BRIEF |
| OI-002 | ¿Adelantar el bloque E? | No: orden normal A → B → C → D → E → F mientras avanza backend | DEC-014 |
| OI-003 | Cifras y copy de la landing | Son datos inventados. Hay que planear de dónde salen y cómo se consumen | A-08, BE-024 |
| OI-004 | Umbral de ficha desactualizada | 180 días | DEC-020 |
| OI-005 | Niveles de visibilidad del perfil | Solo `private` y `public` por ahora; legal sin respuesta todavía | DEC-015, LQ-04 |
| OI-006 | `/talent/certifications` del demo antiguo | Equivale a `/talent/credentials` | DEC-021, ROUTES |
| OI-007 | Opción "Busco talento" en el registro | Se queda visible pero desactivada | DEC-022 |
| OI-008 | ¿Quién publica encuestas? | Las empresas, para los jóvenes que las siguen o están interesados. CLH también publica, como una empresa más | DEC-016 |
| OI-009 | Credenciales | Emisor y fecha, sin sello de verificación | DEC-021 |
| OI-010 | ¿Mentoría = curso? | No: son dominios distintos y no se mezclan | DEC-009 |
| OI-011 | Usernames | Se pueden cambiar; el anterior deja de funcionar (404), sin redirección | DEC-017 |
| OI-013 | Métodos de acceso | Correo y contraseña. Google y otros proveedores, más adelante | DEC-018 |
| OI-014 | Repo real | Repo nuevo con carpeta `frontend/`; el backend vive en el mismo repo | DEC-019 |
| OI-015 | Módulos de la ficha de empresa | Resumen, Cultura, Programas, Vacantes, Sedes y Fuentes; solo Resumen obligatorio. Habrá más | DEC-020 |
