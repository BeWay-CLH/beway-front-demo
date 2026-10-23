# Mover este proyecto al repo real (reemplazando la versión antigua)

Hazlo en una rama nueva.

1. **Dependencias.** `npm i lucide@0.469.0`. Confirma que el repo usa Next con App Router y Tailwind v4.
2. **Design system.** Copia la carpeta `design-system/` entera a la raíz (o a `src/`, y ajusta el alias `@ds` en `tsconfig.json`).
3. **Alias.** En `tsconfig.json`: `"paths": { "@ds": ["./design-system"] }` (y `@/*` si no existe).
4. **CSS global.** En el CSS global que importa Tailwind, deja estas cuatro líneas y borra los colores, fuentes y variables antiguas:
   ```css
   @import "tailwindcss";
   @import "../design-system/tokens.css";
   @import "../design-system/bundle.css";
   @import "../design-system/theme.css";
   ```
5. **Estilos antiguos.** Busca en el repo clases de la paleta anterior (`bg-blue-`, `text-gray-`, `rounded-lg`, etc.) y cámbialas por las claves del sistema (tabla en `README.md`). `theme.css` borra los valores por defecto de Tailwind, así que lo que quede sin migrar dejará de pintar. Para una migración gradual, comenta temporalmente las líneas `--color-*: initial;`, `--radius-*: initial;` y `--shadow-*: initial;` de `theme.css`, y vuelve a ponerlas al terminar.
6. **Fuentes.** Cambia los `<link>` de Google Fonts del layout por `next/font` (Inter y Space Grotesk) y asigna sus variables a `--font-body` y `--font-display`.
7. **Layout y tema.** Copia `components/ThemeToggle.tsx`, `SiteHeader.tsx`, `SiteFooter.tsx`, `NavButton.tsx` y el `<script>` del tema de `app/layout.tsx`.
8. **Logos.** Copia `public/assets/`.
9. **Páginas.** Copia las carpetas de `app/` que quieras conservar y sustituye `data/mock.ts` por la API real, manteniendo la forma de los datos.
10. **CLAUDE.md.** Si el repo ya tiene uno, une las reglas de este (colores, selected, fotos, copy) con las del repo.
11. **Verifica.** `npm run typecheck`, `npm run build`, y mira cada pantalla en claro y oscuro.
