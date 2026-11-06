# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Principal (confirmado):** talento. Estudiantes o profesionales que buscan empleo y quieren demostrar lo que saben con certificaciones, challenges y miniproyectos.
- **Secundarios (del brief, no confirmados en la entrevista):** empresas que buscan talento (espacio Company, bloque G) y el equipo CLH que gestiona el catálogo, las encuestas y la cola editorial (espacio Admin CLH, mínimo por ahora).

## Product Purpose

Conectar talento con empresas a través de programas reales: certificaciones, challenges, miniproyectos, encuestas y oportunidades. Cada empresa tiene su ficha pública, y el talento construye un perfil con evidencias.

**Éxito:** no confirmado. Decisión abierta para los fundadores: qué medirán para decir que la demo funciona.

## Positioning

Aprender y demostrar dentro de programas reales de empresas, con evidencias, no con títulos ni con declaraciones (confirmado en la entrevista).

## Operating Context

- Demo en modo simulado: datos ficticios, sesión de demostración, escrituras simuladas y sin backend todavía. El backend y la infraestructura AWS se trabajan en paralelo.
- Los fundadores quieren ver el producto en vivo (despliegue de la demo). Se está sembrando con datos de ejemplo para eso.
- El copy es español de España, con tuteo al lector y «nosotros» para la marca.
- Mobile-first: todas las pantallas, estados empty, loading, error, forbidden y 404 funcionan desde 390 px.

## Capabilities and Constraints

- Next.js App Router, TypeScript estricto, Tailwind v4. Componentes del design system en `design-system/` (`@ds`).
- Rutas en inglés (`docs/frontend/ROUTES.md`). Las etiquetas pueden seguir la referencia en español.
- Cursos y credenciales son dominios separados: `/talent/courses` (programas) y `/talent/credentials` (credenciales obtenidas). No se tratan como sinónimos.
- Ningún dato de score real, habilidades verificadas, cifras de negocio, beneficios empresariales ni URLs de empleo reales. Lo que sea de ejemplo se marca como ejemplo.
- Ninguna escritura muestra éxito real: registro, envío, inscripción o publicación dicen «Simulación».
- Sin lint ni tests todavía (ROADMAP X-01 y X-02). Comprobaciones: `npm run typecheck` y `npm run build`.

## Brand Commitments

- La referencia visual entregada por los fundadores (guía «Beway así queremos que se vea», 29 de octubre de 2026) es vinculante: es la autoridad visual. Confirmado en la conversación.
- Nombres de 17 empresas: se usan con permiso de las empresas, confirmado por el equipo. Logos y portadas: todavía no hay archivos oficiales en el repo; se usan placeholders `TODO(seed)`.

## Evidence on Hand

- Guía visual completa: `docs/correcciones-visuales/Beway_correccion_visual_completa.pdf` (92 páginas) y los archivos `00` a `07`.
- Alcance y decisiones: `docs/frontend/AGENT_BRIEF.md`, `DECISIONS.md`, `ROADMAP.md`.
- Ausente (no inventar): testimonios, casos de estudio, métricas de uso, cifras de empleo, logos oficiales, fotos de personas reales y vídeos de talento.

## Product Principles

1. Evidencia antes que declaración: lo que el talento muestra pesa más que lo que dice de sí mismo. Lo declarado nunca se presenta como verificado.
2. Nada parece enviado si no lo está: cada acción simulada se etiqueta como tal.
3. Datos de ejemplo visibles: ninguna cifra ficticia se lee como dato real de una persona o de una empresa.
4. Dominios separados: cursos, credenciales, encuestas, challenges, miniproyectos y oportunidades no se mezclan en una misma lista.

## Accessibility & Inclusion

- Contraste: 4,5:1 para texto y 3:1 para bordes de control y marcas significativas. Donde la referencia no lo cumple, el valor usado se elige para cumplirlo y la diferencia se reporta a los fundadores (decisión D3).
- Foco visible, teclado completo, `label` en cada control, errores junto al campo.
