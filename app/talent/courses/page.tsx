import type { Metadata } from 'next';
import Link from 'next/link';
import { Button, Icon } from '@ds';
import { CourseCard } from '@/components/course/CourseCard';
import type { CourseStatus, CourseSummaryVM } from '@/lib/models/course';
import { requireSession } from '@/lib/session';
import { getCourses } from '@/lib/services/courses';

export const metadata: Metadata = { title: 'Certificaciones · BeWay' };

type Search = Record<string, string | string[] | undefined>;
const first = (value: string | string[] | undefined) => (Array.isArray(value) ? value[0] : value);
const STATUSES: CourseStatus[] = ['open', 'upcoming', 'closed'];

const tabs: { label: string; status?: CourseStatus }[] = [
  { label: 'Todas' },
  { label: 'Abiertas', status: 'open' },
  { label: 'Próximas', status: 'upcoming' },
  { label: 'Cerradas', status: 'closed' },
];

/* Catálogo de certificaciones (guía de correcciones, ficha 11 y 12). Filtros en la URL (?q=&empresa=&status=), resueltos
   aquí, en servidor, como hará la API. No hay progreso por usuario todavía: las pestañas "En curso" y "Completadas"
   no se muestran (decisión D5). Un valor que no existe se ignora. */
export default async function CoursesPage({ searchParams }: { searchParams: Promise<Search> }) {
  await requireSession();
  const search = await searchParams;
  const q = (first(search.q) ?? '').trim();
  const status = STATUSES.includes(first(search.status) as CourseStatus) ? (first(search.status) as CourseStatus) : undefined;

  const all = await getCourses();
  const providers = [...new Set(all.map((c) => c.provider))].sort((a, b) => a.localeCompare(b, 'es'));
  const requestedProvider = first(search.empresa);
  const provider = providers.includes(requestedProvider ?? '') ? requestedProvider : undefined;

  const needle = q.toLowerCase();
  const shown: CourseSummaryVM[] = all.filter(
    (c) =>
      (!status || c.status === status) &&
      (!provider || c.provider === provider) &&
      (!needle || `${c.title} ${c.provider} ${c.summary}`.toLowerCase().includes(needle)),
  );

  const hrefWith = (next: Record<string, string | undefined>) => {
    const params = new URLSearchParams();
    const merged = { q: q || undefined, empresa: provider, status, ...next };
    for (const [k, v] of Object.entries(merged)) if (v) params.set(k, v);
    const qs = params.toString();
    return qs ? `/talent/courses?${qs}` : '/talent/courses';
  };

  return (
    <div className="mx-auto flex w-full max-w-site flex-col gap-8 px-4 pt-9 pb-16 md:px-8">
      <header className="flex flex-col gap-3">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="flex flex-col gap-2">
            <p className="eyebrow m-0 text-fg-muted uppercase">Aprende, practica, avanza</p>
            <h1 className="m-0 font-heading text-[30px] leading-[1.2] font-[700] text-fg-heading md:text-[38px] [letter-spacing:var(--tracking-h1)]">
              Aprende de quienes lo hacen.
            </h1>
            <p className="m-0 max-w-2xl text-fg-muted">Certificaciones de las empresas del ecosistema, con su programa, sus bloques y su emisor.</p>
          </div>
          <Link href="/talent/dashboard" className="inline-flex h-[34px] items-center gap-2 rounded-control border border-line-control bg-surface-card px-3 text-xs font-[650] text-fg-body hover:bg-surface-sunken">
            Mi progreso
            <Icon name="arrow-right" size={14} />
          </Link>
        </div>
      </header>

      <div className="flex flex-col gap-4">
        <form action="/talent/courses" method="get" role="search" className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          {status ? <input type="hidden" name="status" value={status} /> : null}
          <div className="flex flex-1 flex-col gap-1 md:max-w-md">
            <label htmlFor="q" className="text-xs font-[650] text-fg-muted">Buscar certificación</label>
            <input
              id="q"
              name="q"
              type="search"
              defaultValue={q}
              placeholder="Título, empresa o tema"
              className="h-[42px] rounded-control border border-line-control bg-surface-card px-3 text-sm text-fg-body"
            />
          </div>
          <div className="flex flex-col gap-1 md:w-64">
            <label htmlFor="empresa" className="text-xs font-[650] text-fg-muted">Empresa</label>
            <select
              id="empresa"
              name="empresa"
              defaultValue={provider ?? ''}
              className="h-[42px] rounded-control border border-line-control bg-surface-card px-3 text-sm text-fg-body"
            >
              <option value="">Todas las empresas</option>
              {providers.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>
          <Button type="submit" variant="secondary" size="md">Aplicar</Button>
        </form>

        <nav aria-label="Estado de las certificaciones" className="flex flex-wrap gap-2">
          {tabs.map((t) => {
            const active = (t.status ?? undefined) === status;
            return (
              <Link
                key={t.label}
                href={hrefWith({ status: t.status })}
                aria-current={active ? 'page' : undefined}
                className={`inline-flex h-[34px] items-center rounded-control px-4 text-xs font-[650] ${active ? 'bg-action-primary text-fg-on-accent' : 'border border-line-control bg-surface-card text-fg-body hover:bg-surface-sunken'}`}
              >
                {t.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <p className="m-0 text-sm text-fg-muted" aria-live="polite">
        {shown.length === 1 ? '1 certificación' : `${shown.length} certificaciones`}
      </p>

      {shown.length > 0 ? (
        <div className="grid gap-[21px] min-[651px]:grid-cols-2 min-[901px]:grid-cols-3">
          {shown.map((c, i) => (
            <CourseCard key={c.id} course={c} index={i} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-start gap-3 rounded-card border border-line-subtle bg-surface-card p-8">
          <Icon name="search" size={24} />
          <h2 className="m-0 font-heading text-[17px] font-[600] text-fg-heading">Tu próximo aprendizaje está por descubrir.</h2>
          <p className="m-0 text-sm text-fg-muted">Prueba otra búsqueda o quita los filtros para ver todas las certificaciones.</p>
          <Button href="/talent/courses" variant="secondary" icon="x">Explorar certificaciones</Button>
        </div>
      )}
    </div>
  );
}
