# Beway · 00 · Instrucciones

Consulta el PDF `Beway_correccion_visual_completa.pdf` para todo lo visual: medidas, colores, tipografía, estados, breakpoints y capturas (Ahora / Así debe quedar). Es la fuente de verdad visual.

Los archivos 01 a 07 son las fases de trabajo. Cada uno dice qué cambiar en el repo.

## Orden

01 → 02 → 03 → 04 → 05 → 06 → 07.

Antes de cambiar código: revisa el repo y propón un plan de la fase. Espera confirmación antes de implementar.

## Stack

Next.js App Router + Tailwind v4. Tokens en un bloque `@theme`. Fuentes con `next/font/google` (DM Sans y Manrope).

## Reglas

- No envíes candidaturas, encuestas, altas ni publicaciones durante la revisión.
- No quites autenticación, permisos, validaciones ni consentimientos.
- No uses localStorage para simular servicios.
- Los placeholders (logos, fotos) y los datos de ejemplo llevan `TODO(seed):`. Los datos van en un único archivo de fixtures marcado como ficticio.
- Si no puedes ver una captura o la referencia, dilo. No inventes el resultado.

## Comprobación

Compara con 1440×900, 768×1024 y 390×844. Reporta las pantallas terminadas y las diferencias pendientes con su causa.
