/* View Models de empresa del frontend. Cuando exista la API, un adapter traduce sus DTO a estos tipos (ARCHITECTURE §4). */

export type CompanyStatVM = { icon: string; value: number; label: string };

/* Una de las cinco cifras de la tarjeta (ficha 04). value null = "—": el dato no aplica o no existe todavía. */
export type CompanyMetricVM = {
  key: 'certificaciones' | 'challenges' | 'encuestas' | 'miniproyectos' | 'oportunidades';
  label: string;
  value: number | null;
};

/* Tarjeta del catálogo (BE-008). Máximo cinco cifras: es lo que admite `CompanyCard`. */
export type CompanyCardVM = {
  id: string;
  slug: string;
  name: string;
  category: string;
  categoryIcon: string;
  description: string;
  logo?: string;
  cover?: string;
  stats: CompanyStatVM[];
  /* Las cinco cifras de la guía, en orden. Si falta, la tarjeta usa `stats`. */
  metrics?: CompanyMetricVM[];
};

/* Módulos de la ficha (DEC-020). La lista es abierta: un tipo nuevo solo añade una entrada aquí y su vista. */
export type CompanyModuleKind = 'summary' | 'culture' | 'programs' | 'openings' | 'locations';

export type CompanyModuleItemVM = { label: string; value?: string; icon?: string };

export type CompanyModuleVM = {
  kind: CompanyModuleKind;
  title: string;
  body?: string;
  items?: CompanyModuleItemVM[];
  /* Fuentes de lo que dice este módulo (BE-009: "fuentes por módulo si las hay"). */
  sourceIds?: string[];
};

/* `url` solo si es real; nunca inventada. */
export type SourceVM = { id: string; label: string; url?: string; retrievedAt: string };

/* ——— Colecciones del paquete de contenido (DEC-046). Un dato ausente en la fuente no llega (null → campo omitido). ——— */

/* Procedencia de cada oferta. `beway_proposal` es una propuesta de BeWay: nunca un curso ni un reto de la empresa (DEC-052). */
export type OfferOrigin = 'beway_proposal' | 'external_published' | 'external_official' | 'external_historical';

/* Pares "etiqueta: valor" ya formateados por el adaptador. La vista no vuelve a dar formato. */
export type OfferDetailVM = { label: string; value: string };

export type CompanyCollectionKey =
  | 'learning'
  | 'challenges'
  | 'miniprojects'
  | 'ambassadors'
  | 'resources'
  | 'scholarships'
  | 'academicPrograms'
  | 'brands';

export type LearningModuleVM = { number: number; title: string; topics: string[]; outcome?: string };

/* Formación. `certificateVerified` es false en las 25 del paquete: la certificación se muestra como no verificada. */
export type LearningVM = {
  id: string;
  title: string;
  description?: string;
  origin: OfferOrigin;
  /* Estado tal como lo dice la fuente (p. ej. `proposed`). Solo para trazabilidad en Admin. */
  sourceState: string;
  details: OfferDetailVM[];
  curriculum: string[];
  modules: LearningModuleVM[];
  certificateVerified: boolean;
  /* Página del programa en la fuente externa. Nunca es un enlace de inscripción. */
  programUrl?: string;
};

/* Reto o convocatoria. Un reto propuesto no está abierto; sin `applicationUrl` no hay botón de inscripción (DEC-052). */
export type ChallengeVM = {
  id: string;
  title: string;
  description?: string;
  origin: OfferOrigin;
  status: string;
  sourceState: string;
  category?: string;
  details: OfferDetailVM[];
  deliverables: string[];
  steps: string[];
  officialUrl?: string;
  conditionsUrl?: string;
};

export type MiniprojectVM = {
  id: string;
  title: string;
  description?: string;
  origin: OfferOrigin;
  level?: string;
  duration?: string;
  participation?: string;
  skills: string[];
  details: OfferDetailVM[];
  /* Datos ficticios del caso (CSV). Enlace de lectura, no un recurso oficial. */
  caseDataUrl?: string;
};

/* Embajador CLH (DEC-059). `authorized: false` = la persona aún no ha dado su autorización: la ficha lo marca. */
export type AmbassadorVM = { id: string; name: string; organization?: string; country?: string; authorized: boolean };

export type ResourceVM = { id: string; title: string; description?: string; category?: string; url: string };

export type ScholarshipVM = {
  id: string;
  title: string;
  country?: string;
  amount?: string;
  summary?: string;
  /* Estado tal como lo muestra la fuente, en texto. Nunca se presenta como vigente hoy (DEC-053). */
  stateLabel: string;
  dateShown?: string;
  rebecaExtra?: string;
  url?: string;
  sourceAsOf: string;
};

export type AcademicProgramVM = {
  id: string;
  title: string;
  family: string;
  summary?: string;
  duration?: string;
  mode?: string;
  location?: string;
  startLabel?: string;
  url?: string;
};

export type BrandVM = { id: string; name: string; division: string; description?: string; url?: string };

export type CompanyCollectionsVM = {
  learning: LearningVM[];
  challenges: ChallengeVM[];
  miniprojects: MiniprojectVM[];
  ambassadors: AmbassadorVM[];
  resources: ResourceVM[];
  scholarships: ScholarshipVM[];
  academicPrograms: AcademicProgramVM[];
  brands: BrandVM[];
};

/* CTA de la cabecera del paquete: lleva a una pestaña de la ficha. */
export type CompanyHeroActionVM = { label: string; section: CompanyCollectionKey };

/* Lo que el paquete de contenido añade a la ficha (DEC-046). Las fichas de ejemplo lo llevan vacío (`Partial` en el registro). */
export type CompanyPackageVM = {
  /* Sector tal como lo da la fuente (la categoría del catálogo es otra cosa, DEC-049). */
  sector: string;
  heroActions: CompanyHeroActionVM[];
  sectionHeadings: Partial<Record<CompanyCollectionKey | 'about', string>>;
  /* Avisos visibles de la ficha, redactados desde los datos a revisar de la fuente (DEC-058). */
  notices: string[];
  collections: CompanyCollectionsVM;
};

export type CompanyDetailVM = CompanyCardVM & {
  website?: string;
  /* Solo si el backend lo da (BE-025); nunca inventado. */
  followersCount?: number;
  isFollowing: boolean;
  /* En orden. Un módulo sin contenido no llega. */
  modules: CompanyModuleVM[];
  sources: SourceVM[];
  lastReviewedAt: string;
  /* lastReviewedAt con más de 180 días (DEC-020). Lo calcula el servicio. */
  isStale: boolean;
} & CompanyPackageVM;

/* Lo mínimo para citar una empresa desde otro dominio (quién publica una encuesta, por ejemplo). Solo publicadas. */
export type CompanyRefVM = Pick<CompanyCardVM, 'category' | 'id' | 'logo' | 'name' | 'slug'>;

export type CompanyCategoryVM = { slug: string; label: string };

export type CompanyFilter = {
  q?: string;
  /* Slug de categoría (`CompanyCategoryVM.slug`). */
  category?: string;
  page?: number;
  pageSize?: number;
};

export type CompanyPageVM = {
  items: CompanyCardVM[];
  total: number;
  page: number;
  pageCount: number;
};

/* Estado editorial. Solo existe en el fixture y en Admin (F): ningún VM público lo lleva. */
export type CompanyEditorialStatus = 'draft' | 'published';

/* Registro del fixture: todo lo que guarda una ficha, incluido lo que nunca sale en público. */
export type CompanyRecord = Omit<CompanyDetailVM, 'isFollowing' | 'isStale' | 'followersCount' | keyof CompanyPackageVM> &
  Partial<CompanyPackageVM> & {
    status: CompanyEditorialStatus;
  };
