/* View Models de empresa del frontend. Cuando exista la API, un adapter traduce sus DTO a estos tipos (ARCHITECTURE §4). */

export type CompanyStatVM = { icon: string; value: number; label: string };

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
};

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
export type CompanyRecord = Omit<CompanyDetailVM, 'isFollowing' | 'isStale' | 'followersCount'> & {
  status: CompanyEditorialStatus;
};
