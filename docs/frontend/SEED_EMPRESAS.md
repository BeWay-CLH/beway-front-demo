# Seed de las 17 fichas de empresa (Tarea 2)

Plan, correspondencias y decisiones para alimentar las 17 fichas corporativas con el paquete
`BEWAY_Tarea2_SEED_E_IMPLEMENTACION_SIN_CAMBIOS_DE_DISENO`. Decisiones `DEC-046` a `DEC-063` en
[DECISIONS.md](DECISIONS.md).

## 1. Estado de partida

- La fase 03 (`origin/main`) ya tiene las 17 fichas corporativas: composiciones en `data/fixtures/brands.ts` (arquetipo,
  colores, altura, fuentes y orden de bloques) y el componente `components/brand/BrandPage.tsx`. Se sirven por
  `/companies/<slug>` antes que la ficha genérica. Sus textos y cifras son de ejemplo (DEC-060).
- El catálogo de ejemplo (`data/fixtures/companies.ts`) tiene 11 fichas, de las que 10 están publicadas. Las 11 se conservan.
- No hay base de datos ni API: los datos son fixtures tipados (`lib/models/company.ts`) servidos por servicios.
- El design system no se toca. Los cambios de esta tarea están en el repo, en `lib/`, `components/` y `app/`.
- El `PROMPT_IMPLEMENTACION.md` solo está dentro del ZIP en `Downloads`. Se leyó desde el ZIP.

## 2. Tabla de correspondencia

`slug del paquete` → `slug y ID en el repo` → `ruta` → `composición (fase 03)` → `origen de datos`.

El slug del repo es el que ya usa la fase 03. Cuando difiere del paquete, manda el repo (prompt, Fase 1, punto 3).

| Slug del paquete | Nombre mostrado | Slug en el repo | ID | Ruta | Categoría (catálogo) |
|---|---|---|---|---|---|
| InstitutoBMExBeway | Instituto BME | `instituto-bme` | `cmp-instituto-bme` | `/companies/instituto-bme` | Finanzas |
| McGrawHillxBeway | McGraw Hill | `mcgraw-hill` | `cmp-mcgraw-hill` | `/companies/mcgraw-hill` | Educación |
| CentroGarriguesxBeway | Centro de Estudios Garrigues | `garrigues` | `cmp-garrigues` | `/companies/garrigues` | Educación |
| GooglexBeway | Google | `google` | `cmp-google` | `/companies/google` | Tecnología |
| IBMxBeway | IBM | `ibm` | `cmp-ibm` | `/companies/ibm` | Tecnología |
| AurenxBeway | Auren | `auren` | `cmp-auren` | `/companies/auren` | Consultoría |
| PwCxBeway | PwC | `pwc` | `cmp-pwc` | `/companies/pwc` | Consultoría |
| SantanderxBeway | Banco Santander | `santander` | `cmp-santander` | `/companies/santander` | Finanzas |
| LorealxBeway | L'Oréal | `loreal` | `cmp-loreal` | `/companies/loreal` | Consumo |
| NetflixxBeway | Netflix | `netflix` | `cmp-netflix` | `/companies/netflix` | Medios |
| DeloittexBeway | Deloitte | `deloitte` | `cmp-deloitte` | `/companies/deloitte` | Consultoría |
| McKinseyxBeway | McKinsey & Company | `mckinsey` | `cmp-mckinsey` | `/companies/mckinsey` | Consultoría |
| RevolutxBeway | Revolut | `revolut` | `cmp-revolut` | `/companies/revolut` | Finanzas |
| AtresmediaxBeway | Atresmedia | `atresmedia` | `cmp-atresmedia` | `/companies/atresmedia` | Medios |
| SilbonxBeway | SILBON | `silbon` | `cmp-silbon` | `/companies/silbon` | Consumo |
| MapfrexBeway | Mapfre | `mapfre` | `cmp-mapfre` | `/companies/mapfre` | Seguros |
| HeinekenxBeway | HEINEKEN | `heineken` | `cmp-heineken` | `/companies/heineken` | Consumo |

Cadena de datos: `data/seed/companies.content.v2.json` (copia íntegra) → `lib/seed/companies-adapter.ts` (función pura)
→ `lib/seed/companies.ts` (carga) → `lib/services/companies.ts` (fusión sin duplicados) → `app/(shared)/companies/[slug]/page.tsx`,
que pinta `BrandPage` con la composición de `brands.ts` y los datos de la empresa.

## 3. Decisiones (resumen; el detalle está en DECISIONS.md)

- **DEC-046 · Fuente y adaptador.** Copia íntegra del JSON en `data/seed/` (SHA-256 `c4a7dd52…940ad`). Adaptador puro. No se
  importa desde `docs/`.
- **DEC-047 · Idempotencia sin base de datos.** Seed determinista. La fusión por `slug` e `id` descarta repeticiones.
- **DEC-048 · Las fichas de ejemplo se conservan.** Ninguna se borra ni se modifica.
- **DEC-049 · Categorías desde el sector.** Tabla explícita en el adaptador.
- **DEC-050 · Sin imágenes remotas.** Placeholders `TODO(seed)`. El CSV del caso de Netflix se enlaza (excepción pedida).
- **DEC-051 · Embajadores CLH.** Superada por DEC-059.
- **DEC-052 · Estados sin falsas convocatorias.** Propuesta BeWay, catálogo externo o iniciativa oficial externa. Certificaciones
  no verificadas. Sin botones de inscripción. Los retos externos muestran "Consultar convocatoria".
- **DEC-053 · Becas con fecha de la fuente.** Estados "según la fuente", con su fecha.
- **DEC-054 · Bloques de la ficha.** Ver DEC-062 para el mapa actual de bloques de fase 03.
- **DEC-055 · Recursos de marca fuera de Recursos.** Los 12 de L'Oréal aparecen en Marcas.
- **DEC-056 · Destino de los CTA.** Cada CTA de la cabecera lleva a su bloque. Excepción de Garrigues: "Ver grados y másteres".
- **DEC-057 · Cifras de la tarjeta.** Miniproyectos cuenta los del paquete. Retos y oportunidades quedan en "—".
- **DEC-058 · Avisos visibles.** "Datos a confirmar" con la fecha de revisión y la lista de datos a revisar en la fuente.
- **DEC-059 · Embajadores con nombre.** Todos los embajadores se muestran, con la etiqueta "Pendiente de autorización".
  Supera en parte a DEC-051 por decisión de producto.
- **DEC-060 · Fuente única para las 17.** Las composiciones de fase 03 siguen siendo el diseño. Los datos salen del paquete.
- **DEC-061 · Slug y nombre.** Slug `garrigues`. Nombres de la guía para McKinsey, SILBON, HEINEKEN y L'Oréal.
- **DEC-062 · Mapa de bloques.** Recursos en los bloques de recursos; bloque `recursos` cuando la composición no tiene ninguno.
- **DEC-063 · Bloques sin datos.** "Próximamente." sin enlace. Menú local filtrado contra los bloques existentes.

## 4. Qué no se hace

- No se edita `design-system/`, tokens, CSS global, Tailwind, `tsconfig` ni `next.config.ts`.
- No se cambian arquetipos, colores, alturas, fuentes ni orden de bloques de la fase 03.
- No se descargan imágenes, PDF ni CSV. Las URLs externas no se han verificado una a una.
- Ninguna convocatoria, beca ni precio se presenta como vigente hoy.
- La ficha de fase 03 no tiene botón de seguir: sigue como la diseñó la guía.

## 5. Validaciones

- `npm run seed:check`: conteos del paquete, slugs e IDs únicos, sin colisión con las fichas de ejemplo, idempotencia,
  cobertura (QA.md), reglas de contenido y coincidencia con las 17 composiciones de fase 03 (slug y nombre).
- `npm run typecheck` y `npm run build`. No hay lint ni tests del proyecto (X-01, X-02).
- Navegador (servidor de desarrollo): las 17 fichas responden 200, con su h1 y sus bloques. A 375 px no hay desbordamiento
  horizontal en ninguna. Revisión visual de Instituto BME (sobre), Google (herramientas) y Santander (becas, arquetipo tilt).

## 6. Pendiente de validar editorialmente

Ver [OPEN_ISSUES.md](OPEN_ISSUES.md) (OI-025 a OI-027) y [LEGAL_REQUESTS.md](LEGAL_REQUESTS.md) (L-34 a L-36, LQ-11 y LQ-12):
logotipos y portadas oficiales, consentimiento de embajadores CLH, vigencia de convocatorias, becas y precios, avisos de la
ficha, y enlaces externos sin verificar.

## 7. Resultado

Las 17 fichas de fase 03 muestran datos del paquete en sus bloques. Ninguna está bloqueada. Logotipos y portadas siguen como
placeholders (DEC-050). Los embajadores aparecen con su nombre y la etiqueta de autorización pendiente (DEC-059).

**Cobertura por bloque** (ya verificada con `seed:check` y con el HTML de cada ficha):

| Empresa | Bloques con datos del paquete | Bloques "Próximamente." |
|---|---|---|
| Instituto BME | Sobre, Formación, Retos, Miniproyectos, Embajadores, Recursos | Ecommerce |
| McGraw Hill | Sobre, Formación, Retos, Miniproyectos, Embajadores, Recursos | Ecommerce |
| Garrigues | Sobre, Formación, Retos, Embajadores, Grados y másteres, Recursos | Ninguno |
| Google | Sobre, Formación, Retos, Miniproyectos, Embajadores, Herramientas (40) | Ninguno |
| IBM | Sobre, Formación, Retos, Miniproyectos, Embajadores, Recursos | Cierre |
| Auren | Sobre, Formación, Retos, Miniproyectos, Embajadores, Servicios | Ninguno |
| PwC | Sobre, Formación, Retos, Miniproyectos, Embajadores, Servicios | Ninguno |
| Santander | Sobre, Formación, Retos, Embajadores, Becas (6), Recursos | Ninguno |
| L'Oréal | Sobre, Formación, Brandstorm, Miniproyectos, Embajadores, Marcas (12) | Ninguno |
| Netflix | Sobre, Formación, Retos, Miniproyectos, Embajadores, Recursos | Ecommerce |
| Deloitte | Sobre, Formación, Retos, Miniproyectos, Embajadores, Servicios | Ninguno |
| McKinsey & Company | Sobre, Formación, Retos, Miniproyectos, Embajadores, Ecosistema | Ninguno |
| Revolut | Sobre, Formación, Retos, Miniproyectos, Embajadores, Servicios | Ninguno |
| Atresmedia | Sobre, Formación, Retos, Miniproyectos, Embajadores, Ecosistema | Ninguno |
| SILBON | Sobre, Formación, Retos, Miniproyectos, Embajadores, Tienda | Ninguno |
| Mapfre | Sobre, Formación, Retos, Miniproyectos, Embajadores, Servicios | Ninguno |
| HEINEKEN | Sobre, Formación, Retos, Miniproyectos, Embajadores, Servicios | Cierre |

Oportunidades y Encuestas enlazan a Beway en las 17, como antes.

**Archivos de esta tarea.** Modificados: `app/(shared)/companies/[slug]/page.tsx`, `components/brand/BrandPage.tsx`,
`components/company/CompanyModules.tsx`, `CompanyProfile.tsx`, `CompanyTabs.tsx`, `data/fixtures/brands.ts`,
`data/fixtures/companies.ts`, `lib/models/company.ts`, `lib/services/companies.ts`, `package.json` y `docs/frontend/`.
Nuevos: `components/company/CompanyCollections.tsx`, `ExternalLink.tsx`, `ScholarshipTable.tsx`, `lib/seed/`,
`data/seed/companies.content.v2.json`, `scripts/check-company-seed.mjs` y `docs/frontend/SEED_EMPRESAS.md`.

**Design system.** Sin cambios: `design-system/` y la configuración de estilos son idénticos a `origin/main`.
