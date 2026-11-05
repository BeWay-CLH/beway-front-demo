# Building UI with the BeWay design system

Read this before writing or changing any UI in this repo. The brand guide is `docs/brand-guide.md`;
each component's usage is `docs/components/<Name>.md`; prop types are `types/index.d.ts`.

## Use what exists

1. Use a component from `@beway/design-system` when one fits. The set is: Alert, Avatar, Badge,
   Breadcrumbs, Button, Card, Checkbox, CompanyCard, Dialog, EmptyState, FeatureCard, Field,
   Footer, Icon, IconButton, Input, Logo, LogoMarquee, NavBar, Pagination, Photo, Radio,
   RadioGroup, SectionLabel, Select, Skeleton, Stat, StatStrip, StepNav, Switch, Table, Tabs,
   Tag, Textarea, Toast, Tooltip.
2. Do not add a Hero component. Compose `<Photo overlay="hero" height={360}>` with a heading and a
   `<Button>`.
3. If nothing fits, build it from tokens (below), then tell the user it is a new pattern that
   belongs in the design system.

## Tokens, never literals

- Colours, spacing, radii, shadows, durations come from CSS variables: `var(--surface-card)`,
  `var(--space-4)`, `var(--radius-md)`. No hex, no rgb, no px colours in components.
- Use the semantic tokens (`surface-*`, `text-*`, `border-*`, `action-*`, `status-*`), not the
  `brand-*` palette, so dark theme works for free. `brand-*` is for artwork and gradients.
- Text: `text-heading`, `text-body`, `text-muted`. Teal words (accent): `text-accent` / `link`. Words in a
  status colour: `status-*-text`. Never `brand-*` for text on a light surface.
- Control borders: `border-control`. Hairlines: `border-subtle`.
- Radius: 7px (`--radius-md`) on controls, 13px (`--radius-lg`) on cards, 14px (`--radius-dialog`) on modals, pill only on `Tag`.
- Headings and figures: `var(--font-display)` (Manrope). Everything else: `var(--font-body)` (DM Sans).
- Shadows are `--shadow-*`. No custom box-shadows, no inner shadows.

## Brand rules that are easy to break

- Navy is the primary action: one navy `primary` Button per view, text white. Teal is for progress,
  states and active marks only (`accent-teal`); as text or icon use `accent-teal-strong`. Text on
  navy is white (`text-on-accent`). Cyan is brand artwork only, never an action, focus or link.
  (Decision D2, 2026-11-05: the founders' reference replaces the cyan accent rule.)
- Selected state: `<Tag variant="filter" selected>` is navy (category filters). Every other selected
  Tag, and the current page in `Pagination`, is navy. Do not invent a third look.
- One gradient: 135deg, `--gradient-brand`. At most one gradient element per viewport. No purple,
  no radial glows, no other gradients.
- Motion: 120ms control feedback, 200ms base, `--ease-standard`. No bounce, spring or scale. Nothing
  loops. The only opt-in loops are `Skeleton animate` and `LogoMarquee animate`; both already respect
  `prefers-reduced-motion`.
- Icons are Lucide through `<Icon name="…">`, `currentColor`, never filled, never emoji.
- Logos are the PNGs in `assets/` via `<Logo>`. Never redraw or recolour them. Use
  `variant="auto"` where the page can switch theme.

## Photography

Wrap every photo in `<Photo src alt overlay>`. Cool-toned architecture and office imagery, subject on
the right, navy overlay (`hero` for heroes, `card` for covers). No `src` or a broken one falls back to
the brand gradient; never use another placeholder colour. Text on a photo must reach 4.5:1 against the
overlaid pixels. Company logos go in a white chip (`CompanyCard`) or in `LogoMarquee`, not loose on a
photo. Give every photo real `alt`, or `alt=""` if decorative.

## Copy

Spanish (Spain), "tú" to the reader, "nosotros" for the brand. Verbs first, sentence case. Buttons are
bare imperatives (`Crear perfil`, `Ver perfil`). ALL CAPS only for eyebrows and labels. Concrete
numbers with a period thousands separator (`1.240`). No emoji.

## Accessibility

- Contrast: 4.5:1 for text, 3:1 for control borders, focus rings and meaningful marks, in both themes.
  The tokens already meet this; literals and `brand-*` colours might not.
- Every `IconButton` needs `label`. Every input needs a `Field label` or an `aria-label`.
- Do not remove focus rings. Interactive `Tag`s are focusable and expose `aria-pressed`.

## Theme

`data-theme="dark"` on `<html>` or any container switches that subtree. Test every screen in both
themes before saying it is done.

## Before you finish

- [ ] No hex/rgb literals, no hard-coded `px` colours, no new fonts.
- [ ] Only components from this package, or tokens for anything new.
- [ ] One navy primary action; selected states follow the rule above.
- [ ] Looked at it in light and dark.
- [ ] Spanish copy, no emoji, concrete numbers.

## En este proyecto: Next + Tailwind

- Stack: Next.js App Router, TypeScript, Tailwind v4. Los componentes se importan de `@ds`.
- Tailwind es para layout y espaciado. Los colores, radios, sombras y tipografía salen de las claves del sistema
  (`bg-surface-card`, `text-fg-body`, `border-line-control`, `rounded-card`, `shadow-card`, `text-h1`, `font-heading`);
  ver tabla en `README.md`. No uses la paleta por defecto de Tailwind ni valores arbitrarios de color (`bg-[#123456]`).
- Los componentes de `@ds` son de cliente. En páginas de servidor no pases `onClick`: usa `NavButton` o haz la página de cliente.
- Datos en `data/mock.ts`. Páginas solo con estructura y estilo; nada de lógica de negocio.
- `design-system/` se edita solo con autorización del usuario (D1, 2026-11-05). Cada cambio va a `docs/correcciones-visuales/DS_CAMBIOS.md`. Si falta un componente o token, avísale al usuario para agregarlo al design system.

## Arquitectura, plan y documentación del frontend

Antes de crear o mover rutas, lee `docs/frontend/README.md`: orden de lectura, estado de los bloques A–G,
Definition of Done y qué documentos actualizar al terminar. Resumen:

- Cuatro espacios: `app/(public)`, `app/(auth)`, `app/talent`, `app/admin` (Company llega en el bloque G), más `app/(shared)` para
  pantallas que ven visitantes y miembros con la misma URL (`/companies`, `/u/[username]`). Todos usan la misma
  cabecera (`components/shells/AppHeader.tsx` + `DemoBar`); no crees cabeceras propias por espacio. **La navegación sigue a
  quien mira, no a la URL** (DEC-030): si una pantalla se abre desde dos espacios, va en `(shared)`, nunca duplicada.
- Rutas en inglés. Mapa completo y estado en `docs/frontend/ROUTES.md`. Tickets y dependencias en `docs/frontend/ROADMAP.md`.
- Los menús salen de `lib/routes.ts`; un ítem `planned` no se muestra. Al terminar una pantalla, pásalo a `live`.
- Sesión simulada en `lib/session.ts` (`BEWAY_MOCK_ROLES` para probar roles). No es seguridad.
- Estados de página con `components/PageState.tsx`. Ninguna escritura muestra éxito real: siempre "Simulación".
- Pantallas nuevas leen datos vía `lib/services/` con View Models (`docs/frontend/FRONTEND_MODELS.md`) y registran sus necesidades en `docs/frontend/BACKEND_HANDOFF.md`.
- Los tipos de los componentes están en `design-system/index.d.ts` (no existen `docs/brand-guide.md` ni `docs/components/` en este repo).
- Pantallas de trabajo (ajustes, perfil, onboarding): lee `docs/frontend/DESIGN.md` antes de tocarlas. Usan el estilo
  dealt con el skill `taste-skill`; si choca con estas reglas, gana esta marca.
- Los controles con input nativo (`components/forms/`) son temporales hasta que el design system los arregle. Las peticiones
  al design system están en `docs/frontend/DS_REQUESTS.md`. Salvo lo autorizado en D1, no edites `design-system/`.

