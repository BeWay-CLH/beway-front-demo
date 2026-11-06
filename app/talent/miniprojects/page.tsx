import type { Metadata } from 'next';
import { Button } from '@ds';
import { MiniprojectCard } from '@/components/challenge/ChallengeCards';
import { getChallenges, challengeCompanies } from '@/lib/services/challenges';

export const metadata: Metadata = { title: 'Miniproyectos · BeWay' };

type Search = Record<string, string | string[] | undefined>;
const first = (value: string | string[] | undefined) => (Array.isArray(value) ? value[0] : value);

/* Catálogo de miniproyectos (guía de correcciones, ficha 19). Tarjetas limpias, sin franja de color de 156 px. */
export default async function MiniprojectsPage({ searchParams }: { searchParams: Promise<Search> }) {
  const search = await searchParams;
  const q = (first(search.q) ?? '').trim();
  const companies = challengeCompanies('miniproject');
  const requested = first(search.empresa);
  const companySlug = companies.some((c) => c.slug === requested) ? requested : undefined;
  const items = await getChallenges({ kind: 'miniproject', q, companySlug });

  return (
    <div className="mx-auto flex w-full max-w-site flex-col gap-8 px-4 pt-9 pb-16 md:px-8">
      <header className="flex flex-col gap-2">
        <p className="eyebrow m-0 text-fg-muted uppercase">Miniproyectos</p>
        <h1 className="m-0 font-heading text-[30px] leading-[1.2] font-[700] text-fg-heading md:text-[38px] [letter-spacing:var(--tracking-h1)]">
          Pequeños proyectos. Evidencias reales.
        </h1>
        <p className="m-0 max-w-2xl text-fg-muted">Prácticas guiadas de las empresas del ecosistema que se pueden llevar al portfolio. Datos de ejemplo.</p>
      </header>

      <form action="/talent/miniprojects" method="get" role="search" className="flex flex-col gap-3 md:flex-row md:items-end">
        <div className="flex flex-1 flex-col gap-1">
          <label htmlFor="q" className="text-xs font-[650] text-fg-muted">Buscar miniproyecto</label>
          <input id="q" name="q" type="search" defaultValue={q} placeholder="Título, sector o tema" className="h-[42px] rounded-control border border-line-control bg-surface-card px-3 text-sm text-fg-body" />
        </div>
        <div className="flex flex-col gap-1 md:w-64">
          <label htmlFor="empresa" className="text-xs font-[650] text-fg-muted">Empresa</label>
          <select id="empresa" name="empresa" defaultValue={companySlug ?? ''} className="h-[42px] rounded-control border border-line-control bg-surface-card px-3 text-sm text-fg-body">
            <option value="">Todas las empresas</option>
            {companies.map((c) => (
              <option key={c.slug} value={c.slug}>{c.name}</option>
            ))}
          </select>
        </div>
        <Button type="submit" variant="secondary">Aplicar</Button>
      </form>

      <p className="m-0 text-sm text-fg-muted" aria-live="polite">{items.length === 1 ? '1 miniproyecto' : `${items.length} miniproyectos`}</p>

      {items.length > 0 ? (
        <div className="grid gap-[21px] min-[651px]:grid-cols-2 min-[901px]:grid-cols-3">
          {items.map((c) => (
            <MiniprojectCard key={c.slug} c={c} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-start gap-3 rounded-card border border-line-subtle bg-surface-card p-8">
          <h2 className="m-0 font-heading text-[17px] font-[600] text-fg-heading">No hay miniproyectos con esos filtros.</h2>
          <Button href="/talent/miniprojects" variant="secondary" icon="x">Ver todos los miniproyectos</Button>
        </div>
      )}
    </div>
  );
}
