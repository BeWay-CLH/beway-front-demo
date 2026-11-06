import { brandBySlug } from '@/data/fixtures/brands';
import { opportunityBySlug, opportunityFixtures, type OpportunityFixture } from '@/data/fixtures/opportunities';

/* Lectura de oportunidades (guía de correcciones, 07). Hoy fixtures ficticios; al conectar el backend cambia solo este
   archivo. Guardar y candidatarse son simulaciones de la sesión: ningún servicio las recibe (DEC-006). */

export type OpportunityVM = Omit<OpportunityFixture, 'companySlug'> & {
  companySlug: string;
  companyName: string;
  base: string;
  cta: string;
  ctaText: string;
};

const toVM = (o: OpportunityFixture): OpportunityVM => {
  const brand = brandBySlug(o.companySlug);
  return {
    ...o,
    companyName: brand?.name ?? o.companySlug,
    base: brand?.palette.base ?? 'var(--brand-dark)',
    cta: brand?.palette.cta ?? 'var(--action-primary)',
    ctaText: brand?.palette.ctaText ?? 'var(--text-on-accent)',
  };
};

export async function getOpportunities(filter: { q?: string; companySlug?: string; modality?: string; type?: string } = {}): Promise<OpportunityVM[]> {
  const needle = (filter.q ?? '').trim().toLowerCase();
  return opportunityFixtures
    .filter((o) => !filter.companySlug || o.companySlug === filter.companySlug)
    .filter((o) => !filter.modality || o.modality === filter.modality)
    .filter((o) => !filter.type || o.type === filter.type)
    .filter((o) => !needle || `${o.title} ${o.summary}`.toLowerCase().includes(needle))
    .map(toVM);
}

export async function getOpportunityBySlug(slug: string): Promise<OpportunityVM | null> {
  const o = opportunityBySlug(slug);
  return o ? toVM(o) : null;
}

export const opportunityCompanies = () => {
  const slugs = [...new Set(opportunityFixtures.map((o) => o.companySlug))];
  return slugs.map((slug) => ({ slug, name: brandBySlug(slug)?.name ?? slug }));
};
