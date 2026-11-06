import type { Metadata } from 'next';
import { OpportunityGrid } from '@/components/opportunity/OpportunityGrid';
import { getOpportunities, opportunityCompanies } from '@/lib/services/opportunities';

export const metadata: Metadata = { title: 'Oportunidades · BeWay' };

type Search = Record<string, string | string[] | undefined>;
const first = (value: string | string[] | undefined) => (Array.isArray(value) ? value[0] : value);

/* Catálogo de oportunidades profesionales (guía de correcciones, ficha 27). Dos columnas, filtros por URL, banda de demo
   y guardado simulado en la sesión. */
export default async function OpportunitiesPage({ searchParams }: { searchParams: Promise<Search> }) {
  const search = await searchParams;
  const q = (first(search.q) ?? '').trim();
  const companies = opportunityCompanies();
  const requested = first(search.empresa);
  const companySlug = companies.some((c) => c.slug === requested) ? requested : undefined;
  const modality = ['Presencial', 'Híbrida', 'Remota'].includes(first(search.modalidad) ?? '') ? first(search.modalidad) : undefined;
  const type = ['Prácticas', 'Junior', 'Proyecto'].includes(first(search.tipo) ?? '') ? first(search.tipo) : undefined;
  const items = await getOpportunities({ q, companySlug, modality, type });

  return (
    <div className="mx-auto flex w-full max-w-[1160px] flex-col gap-8 px-4 pt-9 pb-16 md:px-8">
      <header className="flex flex-col gap-2">
        <p className="eyebrow m-0 text-fg-muted uppercase">Oportunidades profesionales</p>
        <h1 className="m-0 font-heading text-[30px] leading-[1.2] font-[700] text-fg-heading md:text-[38px] [letter-spacing:var(--tracking-h1)]">
          El siguiente paso puede estar aquí.
        </h1>
        <p className="m-0 max-w-2xl text-fg-muted">Ofertas de las empresas del ecosistema. Datos de ejemplo: no son vacantes reales.</p>
      </header>

      <form action="/talent/opportunities" method="get" role="search" className="grid gap-3 md:grid-cols-[1.4fr_1fr_1fr_1fr_auto] md:items-end">
        <div className="flex flex-col gap-1">
          <label htmlFor="q" className="text-xs font-[650] text-fg-muted">Buscar</label>
          <input id="q" name="q" type="search" defaultValue={q} placeholder="Puesto o tema" className="h-[42px] rounded-control border border-line-control bg-surface-card px-3 text-sm text-fg-body" />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="empresa" className="text-xs font-[650] text-fg-muted">Empresa</label>
          <select id="empresa" name="empresa" defaultValue={companySlug ?? ''} className="h-[42px] rounded-control border border-line-control bg-surface-card px-3 text-sm text-fg-body">
            <option value="">Todas</option>
            {companies.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="modalidad" className="text-xs font-[650] text-fg-muted">Modalidad</label>
          <select id="modalidad" name="modalidad" defaultValue={modality ?? ''} className="h-[42px] rounded-control border border-line-control bg-surface-card px-3 text-sm text-fg-body">
            <option value="">Todas</option>
            <option>Presencial</option><option>Híbrida</option><option>Remota</option>
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="tipo" className="text-xs font-[650] text-fg-muted">Tipo</label>
          <select id="tipo" name="tipo" defaultValue={type ?? ''} className="h-[42px] rounded-control border border-line-control bg-surface-card px-3 text-sm text-fg-body">
            <option value="">Todos</option>
            <option>Prácticas</option><option>Junior</option><option>Proyecto</option>
          </select>
        </div>
        <button type="submit" className="inline-flex h-[42px] items-center justify-center rounded-control border border-line-control bg-surface-card px-4 text-xs font-[650] text-fg-body hover:bg-surface-sunken">Aplicar</button>
      </form>

      <OpportunityGrid items={items} />
    </div>
  );
}
