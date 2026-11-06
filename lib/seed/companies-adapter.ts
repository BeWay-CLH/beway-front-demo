/* Adaptador del paquete de contenido de las 17 fichas (Tarea 2; DEC-046 a DEC-058; docs/frontend/SEED_EMPRESAS.md).

   Función pura: el mismo JSON produce siempre el mismo resultado, así que volver a ejecutar el seed no duplica nada (DEC-047).
   No lee disco ni red. El JSON llega por parámetro, de modo que `scripts/check-company-seed.mjs` la puede ejecutar sin el
   alias `@/`. Solo importa tipos. Un dato ausente en la fuente (`null`, `[]`) no genera campo ni texto inventado. */

import type {
  AcademicProgramVM,
  AmbassadorVM,
  BrandVM,
  ChallengeVM,
  CompanyCollectionKey,
  CompanyCollectionsVM,
  CompanyHeroActionVM,
  CompanyModuleItemVM,
  CompanyModuleVM,
  CompanyRecord,
  LearningVM,
  MiniprojectVM,
  OfferDetailVM,
  OfferOrigin,
  ResourceVM,
  ScholarshipVM,
  SourceVM,
} from '@/lib/models/company';

/* Correspondencia del paquete con el repo (SEED_EMPRESAS.md §2). Un slug del paquete que no esté aquí hace fallar el seed.
   La categoría no viene en el paquete: se deriva del sector (DEC-049). */
/* `name` solo cuando el nombre mostrado difiere del paquete: el de la guía de fase 03 (DEC-061). */
export const PACKAGE_COMPANIES: Record<string, { slug: string; category: string; categoryIcon: string; name?: string }> = {
  InstitutoBMExBeway: { slug: 'instituto-bme', category: 'Finanzas', categoryIcon: 'landmark' },
  McGrawHillxBeway: { slug: 'mcgraw-hill', category: 'Educación', categoryIcon: 'graduation-cap' },
  CentroGarriguesxBeway: { slug: 'garrigues', category: 'Educación', categoryIcon: 'graduation-cap' },
  GooglexBeway: { slug: 'google', category: 'Tecnología', categoryIcon: 'cpu' },
  IBMxBeway: { slug: 'ibm', category: 'Tecnología', categoryIcon: 'cpu' },
  AurenxBeway: { slug: 'auren', category: 'Consultoría', categoryIcon: 'building-2' },
  PwCxBeway: { slug: 'pwc', category: 'Consultoría', categoryIcon: 'building-2' },
  SantanderxBeway: { slug: 'santander', category: 'Finanzas', categoryIcon: 'landmark' },
  LorealxBeway: { slug: 'loreal', category: 'Consumo', categoryIcon: 'shopping-bag', name: "L'Oréal" },
  NetflixxBeway: { slug: 'netflix', category: 'Medios', categoryIcon: 'tv' },
  DeloittexBeway: { slug: 'deloitte', category: 'Consultoría', categoryIcon: 'building-2' },
  McKinseyxBeway: { slug: 'mckinsey', category: 'Consultoría', categoryIcon: 'building-2', name: 'McKinsey & Company' },
  RevolutxBeway: { slug: 'revolut', category: 'Finanzas', categoryIcon: 'landmark' },
  AtresmediaxBeway: { slug: 'atresmedia', category: 'Medios', categoryIcon: 'tv' },
  SilbonxBeway: { slug: 'silbon', category: 'Consumo', categoryIcon: 'shopping-bag', name: 'SILBON' },
  MapfrexBeway: { slug: 'mapfre', category: 'Seguros', categoryIcon: 'shield' },
  HeinekenxBeway: { slug: 'heineken', category: 'Consumo', categoryIcon: 'shopping-bag', name: 'HEINEKEN' },
};

/* Forma del JSON consolidado (`data/seed/companies.content.v2.json`). Solo lo que el adaptador lee. */
type Money = { amount?: number | null; currency?: string | null; qualifier?: string | null };
type Fact = { label: string; value: string; qualification?: string | null };

export type SeedCompany = {
  company: {
    id: string;
    slug: string;
    name: string;
    sector: string;
    companyWebsiteUrl: string | null;
    heroSubtitle: string | null;
    overview: string | null;
    tags: string[];
    facts: Fact[];
    heroActions: { label: string; destinationSection: string }[];
  };
  learning: {
    id: string; title: string; description: string | null; state: string; price: Money | null; deliveryMode: string | null;
    curriculumSummary: string[] | null; certificateClaim: string | null; certificateVerified: boolean;
    durationHours: number | null; durationYears: number | null; durationText: string | null; durationSchedule: string | null;
    moduleCount: number | null; videoCount: number | null; videoMinutesEach: number | null; location: string | null;
    url: string | null; programUrl: string | null; programDownloadUrl: string | null; contentOrigin: string;
    availabilityStatus: string; modules: { number: number; title: string; topics: string[]; learningDecision?: string | null }[] | null;
  }[];
  challenges: {
    id: string; title: string; description: string | null; state: string; category: string | null;
    participation: string | null; deliverables: string[] | null; eligibility: string | null;
    teamSizeMin: number | null; teamSizeMax: number | null; durationDays: number | null; durationWeeks: number | null;
    durationHours: number | null; videoDurationSeconds: number | null; geography: string | null; edition: string | null;
    prize: Money | null; additionalAward: string | null; possibleAward: string | null; budgetCase: Money | null;
    pilotClaim: string | null; finalistsCountClaim: number | null; startDateFromSource: string | null;
    endDateFromSource: string | null; availability: string | null; subjectExamples: string[] | null; steps: string[] | null;
    officialReferenceUrl: string | null; url: string | null; conditionsUrl: string | null; contentOrigin: string;
    availabilityStatus: string;
  }[];
  miniprojects: {
    id: string; title: string; description: string | null; level: string | null; skills: string[] | null;
    participation: string | null; durationMinutes: number | null; durationText: string | null; durationHours: number | null;
    deliverable: string | null; markets: string[] | null; caseDataUrl: string | null; contentOrigin: string;
  }[];
  ambassadors: { id: string; name: string; organization: string | null; country: string | null; authorization: unknown }[];
  resources: { id: string; title: string; description: string | null; category: string | null; url: string | null; state: string }[];
  scholarships: {
    id: string; title: string; country: string | null; amount: number | null; currency: string | null; amountQualifier: string | null;
    summary: string | null; stateShown: string; dateShown: string | null; rebecaExtraGross: number | null; url: string | null;
    sourceAsOf: string;
  }[];
  academicPrograms: {
    id: string; title: string; category: string; summary: string | null; durationYears: number | null; mode: string | null;
    location: string | null; publishedStart: string | null; url: string | null;
  }[];
  brands: { id: string; title: string; division: string; description: string | null; url: string | null }[];
  sectionHeadings: Record<string, string | null>;
  metadata: { extractedAt: string; importantNotices: string[] | null; requiresLiveReview: string[] | null };
};

/* ——— Formato ——— */

/* Separador de miles con punto, sin depender de ICU del entorno (CLAUDE.md: 1.240). */
const groupThousands = (n: number) => String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, '.');

const MONTHS = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

/* "2026-10-21" → "21 de octubre de 2026"; "2027-09" → "septiembre de 2027". Otra forma se devuelve tal cual. */
export function formatDateEs(iso: string): string {
  const full = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (full) return `${Number(full[3])} de ${MONTHS[Number(full[2]) - 1]} de ${full[1]}`;
  const month = /^(\d{4})-(\d{2})$/.exec(iso);
  if (month) return `${MONTHS[Number(month[2]) - 1]} de ${month[1]}`;
  return iso;
}

const money = (m: Money): string | undefined => {
  if (typeof m.amount !== 'number') return undefined;
  const symbol = m.currency === 'EUR' ? '€' : m.currency ?? '';
  const value = `${groupThousands(m.amount)}${symbol ? ` ${symbol}` : ''}`;
  return m.qualifier ? `${value} (${m.qualifier})` : value;
};

/* Texto de un valor de la fuente. null, vacío o desconocido → undefined (el campo no se muestra). */
function text(v: unknown): string | undefined {
  if (v === null || v === undefined) return undefined;
  if (typeof v === 'string') return v.trim() || undefined;
  if (typeof v === 'number') return String(v);
  if (Array.isArray(v)) return v.map(text).filter((x): x is string => Boolean(x)).join(', ') || undefined;
  if (typeof v === 'object') return money(v as Money);
  return undefined;
}

/* Una fila "etiqueta: valor" si el valor existe. Así los campos ausentes no ocupan sitio. */
const detail = (label: string, value: unknown): OfferDetailVM[] => {
  const v = text(value);
  return v ? [{ label, value: v }] : [];
};

const plural = (n: number, one: string, many: string) => `${n} ${n === 1 ? one : many}`;

/* Origen de la oferta. Un valor desconocido falla: no debe tratarse como oferta oficial por defecto. */
function origin(v: string): OfferOrigin {
  if (v === 'beway_proposal' || v === 'external_published' || v === 'external_official' || v === 'external_historical') return v;
  throw new Error(`Origen de oferta desconocido en el paquete: ${v}`);
}

/* Estados tal como los resume la ficha. Ninguno afirma que una convocatoria esté abierta hoy (DEC-052, DEC-053). */
const LEARNING_AVAILABILITY: Record<string, string> = {
  not_offered_by_beway: 'Sin inscripción desde BeWay todavía',
  check_external_call: 'Consultar disponibilidad en la fuente externa',
};
const CHALLENGE_STATUS: Record<string, string> = {
  not_open: 'Sin convocatoria abierta',
  closed: 'Cerrado',
  not_announced: 'Convocatoria no anunciada',
  check_external_call: 'Consultar convocatoria', // corto: la insignia no debe desbordar en móvil
};
const SCHOLARSHIP_STATE: Record<string, string> = {
  closed: 'Cerrada según la fuente',
  check_call: 'Consultar el plazo en la convocatoria',
  open_as_of_source: 'Abierta según la fuente; comprobar hoy',
};
const LEVEL: Record<string, string> = { initial: 'Inicial', intermediate: 'Intermedio' };
const LIVE_REVIEW: Record<string, string> = {
  activeCalls: 'convocatorias activas',
  deadline: 'plazos',
  price: 'precios',
  certification: 'certificaciones',
  assetLicense: 'licencias de imágenes',
};

/* Destino de los CTA de la cabecera. Excepción documentada (DEC-056): Garrigues. */
const HERO_SECTIONS: Record<string, CompanyCollectionKey> = {
  learning: 'learning',
  challenges: 'challenges',
  miniprojects: 'miniprojects',
  ambassadors: 'ambassadors',
  resources: 'resources',
  scholarships: 'scholarships',
  academicPrograms: 'academicPrograms',
  brands: 'brands',
};
const HERO_OVERRIDES: Record<string, Partial<Record<string, CompanyCollectionKey>>> = {
  garrigues: { resources: 'academicPrograms' },
};

/* ——— Colecciones ——— */

function toLearning(l: SeedCompany['learning'][number]): LearningVM {
  return {
    id: l.id,
    title: l.title,
    description: text(l.description),
    origin: origin(l.contentOrigin),
    sourceState: l.state,
    details: [
      ...detail('Modalidad', l.deliveryMode),
      ...detail('Duración', l.durationHours != null ? `${l.durationHours} h` : l.durationYears != null ? plural(l.durationYears, 'año', 'años') : l.durationText),
      ...detail('Calendario', l.durationSchedule),
      ...detail('Módulos', l.moduleCount != null ? plural(l.moduleCount, 'módulo', 'módulos') : null),
      ...detail('Vídeos', l.videoCount != null ? `${plural(l.videoCount, 'vídeo', 'vídeos')}${l.videoMinutesEach ? ` de ${l.videoMinutesEach} min` : ''}` : null),
      ...detail('Lugar', l.location),
      ...detail('Precio', l.price),
      ...detail('Disponibilidad', LEARNING_AVAILABILITY[l.availabilityStatus] ?? l.availabilityStatus),
      ...detail('Certificación (no verificada)', l.certificateClaim),
    ],
    curriculum: l.curriculumSummary ?? [],
    modules: (l.modules ?? []).map((m) => ({ number: m.number, title: m.title, topics: m.topics, outcome: text(m.learningDecision) })),
    certificateVerified: l.certificateVerified === true,
    // `programDownloadUrl` (PDF/TXT alojados en el prototipo) no se expone: DEC-050.
    programUrl: text(l.url ?? l.programUrl),
  };
}

function toChallenge(c: SeedCompany['challenges'][number]): ChallengeVM {
  const team =
    c.teamSizeMin != null && c.teamSizeMax != null
      ? `${c.teamSizeMin}–${c.teamSizeMax} personas`
      : c.teamSizeMin != null
        ? `${c.teamSizeMin} personas`
        : c.teamSizeMax != null
          ? `hasta ${c.teamSizeMax} personas`
          : undefined;
  return {
    id: c.id,
    title: c.title,
    description: text(c.description),
    origin: origin(c.contentOrigin),
    status: CHALLENGE_STATUS[c.availabilityStatus] ?? c.availabilityStatus,
    sourceState: c.state,
    category: text(c.category),
    details: [
      ...detail('Edición', c.edition),
      ...detail('Participación', c.participation),
      ...detail('Elegibilidad', c.eligibility),
      ...detail('Equipo', team),
      ...detail('Duración', c.durationDays != null ? plural(c.durationDays, 'día', 'días') : c.durationWeeks != null ? plural(c.durationWeeks, 'semana', 'semanas') : c.durationHours != null ? `${c.durationHours} h` : null),
      ...detail('Vídeo', c.videoDurationSeconds != null ? `${c.videoDurationSeconds} s` : null),
      ...detail('Ámbito', c.geography),
      ...detail('Premio', c.prize),
      ...detail('Premio adicional', c.additionalAward),
      ...detail('Posible premio (propuesto)', c.possibleAward),
      ...detail('Presupuesto del caso (no es premio)', c.budgetCase),
      ...detail('Piloto', c.pilotClaim),
      ...detail('Finalistas', c.finalistsCountClaim),
      ...detail('Inicio según la fuente', c.startDateFromSource ? formatDateEs(c.startDateFromSource) : null),
      ...detail('Cierre según la fuente', c.endDateFromSource ? formatDateEs(c.endDateFromSource) : null),
      ...detail('Plazo según la fuente', c.availability),
      ...detail('Temas de ejemplo', c.subjectExamples),
    ],
    deliverables: c.deliverables ?? [],
    steps: c.steps ?? [],
    officialUrl: text(c.officialReferenceUrl ?? c.url),
    conditionsUrl: text(c.conditionsUrl),
  };
}

function toMiniproject(m: SeedCompany['miniprojects'][number]): MiniprojectVM {
  return {
    id: m.id,
    title: m.title,
    description: text(m.description),
    origin: origin(m.contentOrigin),
    level: m.level ? LEVEL[m.level] ?? m.level : undefined,
    duration: m.durationMinutes != null ? `${m.durationMinutes} min` : m.durationText ?? (m.durationHours != null ? `${m.durationHours} h` : undefined),
    participation: text(m.participation),
    skills: m.skills ?? [],
    details: [...detail('Entregable', m.deliverable), ...detail('Mercados', m.markets)],
    caseDataUrl: text(m.caseDataUrl),
  };
}

/* Todos los embajadores se muestran con su nombre (DEC-059). `authorized` sale de `authorization`: hoy es null en las 85
   apariciones, así que todas llevan la etiqueta de pendiente. El formato de `authorization` aún no está definido:
   cualquier valor no nulo cuenta como autorizado. Revisar al definirlo (OI-026, LQ-11). */
function toAmbassador(a: SeedCompany['ambassadors'][number]): AmbassadorVM {
  return {
    id: a.id,
    name: a.name,
    organization: text(a.organization),
    country: text(a.country),
    authorized: Boolean(a.authorization),
  };
}

function toResource(r: SeedCompany['resources'][number]): ResourceVM | null {
  const url = text(r.url);
  if (!url) return null;
  return { id: r.id, title: r.title, description: text(r.description), category: text(r.category), url };
}

function toScholarship(s: SeedCompany['scholarships'][number]): ScholarshipVM {
  const value = s.amount != null ? money({ amount: s.amount, currency: s.currency, qualifier: null }) : undefined;
  return {
    id: s.id,
    title: s.title,
    country: text(s.country),
    amount: value && s.amountQualifier ? `${s.amountQualifier} ${value}` : value,
    summary: text(s.summary),
    stateLabel: SCHOLARSHIP_STATE[s.stateShown] ?? s.stateShown,
    dateShown: text(s.dateShown),
    rebecaExtra: s.rebecaExtraGross != null ? `${groupThousands(s.rebecaExtraGross)} € brutos` : undefined,
    url: text(s.url),
    sourceAsOf: formatDateEs(s.sourceAsOf),
  };
}

function toAcademicProgram(p: SeedCompany['academicPrograms'][number]): AcademicProgramVM {
  return {
    id: p.id,
    title: p.title,
    family: p.category,
    summary: text(p.summary),
    duration: p.durationYears != null ? plural(p.durationYears, 'año', 'años') : undefined,
    mode: text(p.mode),
    location: text(p.location),
    startLabel: p.publishedStart ? formatDateEs(p.publishedStart) : undefined,
    url: text(p.url),
  };
}

function toBrand(b: SeedCompany['brands'][number]): BrandVM {
  return { id: b.id, name: b.title, division: b.division, description: text(b.description), url: text(b.url) };
}

function toCollections(c: SeedCompany): CompanyCollectionsVM {
  return {
    learning: c.learning.map(toLearning),
    challenges: c.challenges.map(toChallenge),
    miniprojects: c.miniprojects.map(toMiniproject),
    ambassadors: c.ambassadors.map(toAmbassador),
    // Los 12 recursos `brand` de L'Oréal repiten sus marcas: se muestran en Marcas, no en Recursos (DEC-055).
    resources: c.resources.filter((r) => r.state !== 'brand').map(toResource).filter((r): r is ResourceVM => r !== null),
    scholarships: c.scholarships.map(toScholarship),
    academicPrograms: c.academicPrograms.map(toAcademicProgram),
    brands: c.brands.map(toBrand),
  };
}

/* ——— Ficha ——— */

function toCompanyRecord(c: SeedCompany): CompanyRecord {
  const mapping = PACKAGE_COMPANIES[c.company.slug];
  if (!mapping) throw new Error(`Empresa del paquete sin correspondencia en el repo: ${c.company.slug}`);
  const { slug } = mapping;
  const { company: co, metadata: meta } = c;

  const sources: SourceVM[] = [
    { id: 'paquete', label: 'Ficha de contenido de BeWay', retrievedAt: meta.extractedAt },
    ...(co.companyWebsiteUrl ? [{ id: 'web', label: `Sitio web oficial de ${co.name}`, url: co.companyWebsiteUrl, retrievedAt: meta.extractedAt }] : []),
  ];

  const summaryItems: CompanyModuleItemVM[] = [
    { label: 'Sector', value: co.sector },
    ...(co.tags.length > 0 ? [{ label: 'Áreas', value: co.tags.join(', ') }] : []),
    ...co.facts.map((f) => ({ label: f.label, value: f.qualification ? `${f.value} (${f.qualification})` : f.value })),
  ];
  const summary: CompanyModuleVM = {
    kind: 'summary',
    title: 'Resumen',
    body: text(co.overview),
    items: summaryItems,
    sourceIds: sources.map((s) => s.id),
  };

  const heroActions: CompanyHeroActionVM[] = co.heroActions.flatMap((a) => {
    const section = HERO_OVERRIDES[slug]?.[a.destinationSection] ?? HERO_SECTIONS[a.destinationSection];
    return section ? [{ label: a.label, section }] : [];
  });

  const headingKeys = ['about', 'learning', 'challenges', 'miniprojects', 'ambassadors', 'resources'] as const;
  const sectionHeadings: NonNullable<CompanyRecord['sectionHeadings']> = {};
  for (const key of headingKeys) {
    const v = text(c.sectionHeadings[key]);
    if (v) sectionHeadings[key] = v;
  }

  /* Los `importantNotices` del paquete son notas de revisión para el equipo (DEC-058): se quedan en data/seed/ y no se
     muestran tal cual. Lo que el visitante necesita saber sale de los campos estructurados (estado, procedencia, precio). */
  const reviewItems = (meta.requiresLiveReview ?? []).map((k) => LIVE_REVIEW[k] ?? k);
  const notices =
    reviewItems.length > 0
      ? [
          `Algunas fechas, convocatorias y condiciones pueden haber cambiado desde la revisión del ${formatDateEs(meta.extractedAt)}. Antes de darlas por vigentes, confírmalas en la fuente: ${reviewItems.join(', ')}.`,
        ]
      : [];

  return {
    id: `cmp-${slug}`,
    slug,
    name: mapping.name ?? co.name,
    category: mapping.category,
    categoryIcon: mapping.categoryIcon,
    /* TODO(seed): logotipo y portada oficiales pendientes de permiso (DEC-043, DEC-050). Sin `logo` ni `cover`, la ficha
       muestra la inicial y el degradado de marca. Las URLs del paquete se conservan en data/seed/. */
    description: text(co.heroSubtitle) ?? text(co.overview) ?? '',
    sector: co.sector,
    stats: [],
    status: 'published',
    lastReviewedAt: meta.extractedAt,
    website: text(co.companyWebsiteUrl),
    modules: [summary],
    sources,
    heroActions,
    sectionHeadings,
    notices,
    collections: toCollections(c),
  };
}

/* Registros de empresa del paquete, en el mismo orden que el JSON. Puro: llamarla dos veces da el mismo resultado. */
export function toCompanyRecords(source: SeedCompany[]): CompanyRecord[] {
  return source.map(toCompanyRecord);
}

/* Combina registros existentes con los del seed. Gana el primero: un slug o id repetido se descarta y se devuelve
   en `conflicts` (DEC-047). Así repetir el seed nunca duplica una empresa. */
export function mergeCompanyRecords(
  base: CompanyRecord[],
  extra: CompanyRecord[],
): { records: CompanyRecord[]; conflicts: string[] } {
  const slugs = new Set(base.map((r) => r.slug));
  const ids = new Set(base.map((r) => r.id));
  const records = [...base];
  const conflicts: string[] = [];
  for (const r of extra) {
    if (slugs.has(r.slug) || ids.has(r.id)) {
      conflicts.push(r.slug);
      continue;
    }
    slugs.add(r.slug);
    ids.add(r.id);
    records.push(r);
  }
  return { records, conflicts };
}
