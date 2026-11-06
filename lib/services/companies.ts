import { companyRecords } from '@/data/fixtures/companies';
import { courseRecords } from '@/data/fixtures/courses';
import { followsByUser } from '@/data/fixtures/follows';
import { surveyRecords } from '@/data/fixtures/surveys';
import type { Simulated } from '@/lib/models/common';
import type {
  CompanyCardVM,
  CompanyCategoryVM,
  CompanyDetailVM,
  CompanyFilter,
  CompanyMetricVM,
  CompanyPageVM,
  CompanyRecord,
  CompanyRefVM,
} from '@/lib/models/company';

/* Única puerta a los datos de empresa. Hoy lee fixtures; con la API cambia el cuerpo, no la firma (ARCHITECTURE §4).
   Solo las fichas publicadas salen de aquí: un borrador es como si no existiera (C-04, decisión 13). */

/* Una ficha sin revisar desde hace más de 180 días se marca como desactualizada (DEC-020). */
export const STALE_AFTER_DAYS = 180;
export const CATALOG_PAGE_SIZE = 6;

const DAY_MS = 24 * 60 * 60 * 1000;

const published = () => companyRecords.filter((r) => r.status === 'published');

/* Sin tildes ni mayúsculas: "Datos e IA" → "datos-e-ia", "Educación" → "educacion". */
const slugify = (label: string) =>
  label
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

const normalize = (text: string) =>
  text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase();

function toCard(r: CompanyRecord): CompanyCardVM {
  return {
    id: r.id,
    slug: r.slug,
    name: r.name,
    category: r.category,
    categoryIcon: r.categoryIcon,
    description: r.description,
    logo: r.logo,
    cover: r.cover,
    stats: r.stats,
    metrics: metricsFor(r),
  };
}

/* Las cinco cifras de la tarjeta (guía de correcciones, ficha 04), en su orden. Solo cuentan datos existentes:
   certificaciones = cursos del fixture cuyo proveedor es la empresa; encuestas = encuestas que publica;
   challenges = retos y oportunidades = vacantes de su ficha (cifras ya cargadas en el fixture); miniproyectos
   no tiene fuente todavía y va como "—" (null). Sin fórmulas ni datos nuevos. */
function metricsFor(r: CompanyRecord): CompanyMetricVM[] {
  const stat = (label: string) => r.stats.find((s) => s.label.toLowerCase() === label)?.value ?? null;
  return [
    { key: 'certificaciones', label: 'Certificaciones', value: courseRecords.filter((c) => c.provider === r.name).length },
    { key: 'challenges', label: 'Challenges', value: stat('retos') },
    { key: 'encuestas', label: 'Encuestas', value: surveyRecords.filter((s) => s.publisherId === r.id).length },
    { key: 'miniproyectos', label: 'Miniproyectos', value: null },
    { key: 'oportunidades', label: 'Oportunidades', value: stat('vacantes') },
  ];
}

/* Empresas que sigue una persona. Lectura para la tarjeta del directorio (la escritura sigue siendo simulada). */
export async function getFollowingIds(viewerId?: string): Promise<string[]> {
  return viewerId ? (followsByUser[viewerId] ?? []) : [];
}

/* El módulo sin contenido no llega (criterio de C-02): ni cuerpo ni elementos. */
const hasContent = (m: CompanyRecord['modules'][number]) => Boolean(m.body) || (m.items?.length ?? 0) > 0;

export function isStale(lastReviewedAt: string, now = new Date()): boolean {
  const reviewed = new Date(`${lastReviewedAt}T00:00:00Z`).getTime();
  return (now.getTime() - reviewed) / DAY_MS > STALE_AFTER_DAYS;
}

/* Categorías de las fichas publicadas, en orden de aparición. Una categoría que solo tiene borradores no se ve. */
export async function getCompanyCategories(): Promise<CompanyCategoryVM[]> {
  const seen = new Map<string, CompanyCategoryVM>();
  for (const r of published()) {
    const slug = slugify(r.category);
    if (!seen.has(slug)) seen.set(slug, { slug, label: r.category });
  }
  return [...seen.values()];
}

/* Catálogo público (BE-008): filtra por texto y categoría en servidor y pagina. */
export async function getCompanies(filter: CompanyFilter = {}): Promise<CompanyPageVM> {
  const { q, category, page = 1, pageSize = CATALOG_PAGE_SIZE } = filter;
  const term = normalize(q?.trim() ?? '');
  const matches = published().filter(
    (r) =>
      (!category || slugify(r.category) === category) &&
      (!term || normalize(r.name).includes(term) || normalize(r.description).includes(term)),
  );
  const pageCount = Math.max(1, Math.ceil(matches.length / pageSize));
  const current = Math.min(Math.max(1, Math.floor(page) || 1), pageCount);
  return {
    items: matches.slice((current - 1) * pageSize, current * pageSize).map(toCard),
    total: matches.length,
    page: current,
    pageCount,
  };
}

/* Ficha pública (BE-009). `null` = no existe o no está publicada → notFound() (C-04). */
export async function getCompanyBySlug(slug: string, viewerId?: string, now = new Date()): Promise<CompanyDetailVM | null> {
  const r = published().find((c) => c.slug === slug);
  if (!r) return null;
  return {
    ...toCard(r),
    website: r.website,
    isFollowing: viewerId ? (followsByUser[viewerId] ?? []).includes(r.id) : false,
    modules: r.modules.filter(hasContent),
    sources: r.sources,
    lastReviewedAt: r.lastReviewedAt,
    isStale: isStale(r.lastReviewedAt, now),
  };
}

/* Empresas que sigue una persona (BE-025), solo las publicadas. */
export async function getFollowedCompanies(userId: string): Promise<CompanyCardVM[]> {
  const ids = followsByUser[userId] ?? [];
  return published()
    .filter((r) => ids.includes(r.id))
    .map(toCard);
}

/* Fichas publicadas cuyas categorías coinciden con los intereses de una persona (BE-021). Los intereses son las
   categorías del catálogo. Coincide o no: sin puntuación ni orden por afinidad (decisión 11 del brief). */
export async function getCompaniesByInterests(interests: string[]): Promise<CompanyCardVM[]> {
  const wanted = new Set(interests.map(normalize));
  return published()
    .filter((r) => wanted.has(normalize(r.category)))
    .map(toCard);
}

/* Datos mínimos de las empresas publicadas por id, para citarlas desde encuestas y otros dominios. */
export async function getCompanyRefs(): Promise<Record<string, CompanyRefVM>> {
  return Object.fromEntries(
    published().map(({ id, slug, name, category, logo }) => [id, { id, slug, name, category, logo }]),
  );
}

/* Todas las publicadas en versión corta, para que el navegador recompose "Empresas que sigues" con los cambios
   simulados de la sesión (C-05). */
export async function getCompanyDirectory(): Promise<CompanyCardVM[]> {
  return published().map(toCard);
}

/* Escritura simulada: no cambia ningún dato (DEC-006). El contrato ya es el definitivo. */
export async function setCompanyFollowing(_userId: string, _companyId: string, _following: boolean): Promise<Simulated> {
  return { simulated: true };
}
