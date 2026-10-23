'use client';

import { useEffect, useRef, useState, useTransition } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Breadcrumbs, Button, CompanyCard, EmptyState, Input, Pagination, SectionLabel, Tag } from '@ds';
import { formatCount } from '@/lib/format';
import type { CompanyCategoryVM, CompanyPageVM } from '@/lib/models/company';

type Query = { q: string; category?: string };

/* Pantalla del catálogo. Los filtros no se filtran aquí: cada cambio actualiza la URL y el servidor devuelve la
   página (C-03). El texto espera 300 ms tras la última tecla para no pedir una página por letra. */
export function CompaniesView({
  result,
  categories,
  query,
  homeHref,
}: {
  result: CompanyPageVM;
  categories: CompanyCategoryVM[];
  query: Query;
  homeHref: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [pending, startTransition] = useTransition();
  const [text, setText] = useState(query.q);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  /* Al volver atrás o adelante el texto sigue a la URL, salvo mientras se está escribiendo o cargando. */
  useEffect(() => {
    if (!timer.current && !pending) setText(query.q);
  }, [query.q, pending]);

  useEffect(() => () => clearTimeout(timer.current), []);

  const go = (next: Partial<Query> & { page?: number }, mode: 'replace' | 'push' = 'replace') => {
    const merged = { ...query, ...next };
    const params = new URLSearchParams();
    if (merged.q) params.set('q', merged.q);
    if (merged.category) params.set('category', merged.category);
    if (next.page && next.page > 1) params.set('page', String(next.page));
    const url = params.size > 0 ? `${pathname}?${params}` : pathname;
    startTransition(() => (mode === 'push' ? router.push(url) : router.replace(url, { scroll: false })));
  };

  const onText = (value: string) => {
    setText(value);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      timer.current = undefined;
      go({ q: value.trim() });
    }, 300);
  };

  const clear = () => {
    clearTimeout(timer.current);
    timer.current = undefined;
    setText('');
    go({ q: '', category: undefined });
  };

  const active = categories.find((c) => c.slug === query.category);
  const summary =
    result.total === 1 ? '1 empresa' : `${formatCount(result.total)} empresas`;

  return (
    <div className="mx-auto flex max-w-site flex-col gap-8 px-4 py-8 md:px-6 md:py-10">
      <Breadcrumbs aria-label="Ruta de navegación" items={[{ label: 'Inicio', href: homeHref }, { label: 'Empresas' }]} />

      <header className="flex flex-col gap-3">
        <SectionLabel>Directorio</SectionLabel>
        <h1 className="text-h2 font-heading text-fg-heading md:text-h1">Empresas del ecosistema</h1>
        <p className="max-w-2xl text-fg-muted">Conoce a las empresas que abren retos y vacantes. Filtra por categoría y entra a su ficha.</p>
      </header>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar por categoría">
          <Tag variant="filter" selected={!query.category} onClick={() => go({ category: undefined })}>
            Todas
          </Tag>
          {categories.map((c) => (
            <Tag key={c.slug} variant="filter" selected={query.category === c.slug} onClick={() => go({ category: c.slug })}>
              {c.label}
            </Tag>
          ))}
        </div>
        <div className="w-full md:w-72">
          <Input
            icon="search"
            type="search"
            placeholder="Buscar empresa"
            value={text}
            onChange={(e) => onText(e.target.value)}
            aria-label="Buscar empresa"
          />
        </div>
      </div>

      <p aria-live="polite" className="-mt-4 text-sm text-fg-muted">
        {summary}
        {active ? ` en ${active.label}` : ''}
        {query.q ? ` para “${query.q}”` : ''}
      </p>

      {result.items.length === 0 ? (
        <EmptyState
          icon="search"
          title="Sin resultados"
          description="No hay empresas con esos filtros. Prueba con otra categoría o quita la búsqueda."
          action={<Button variant="secondary" icon="rotate-ccw" onClick={clear}>Limpiar filtros</Button>}
        />
      ) : (
        <div aria-busy={pending} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {result.items.map((c) => (
            <CompanyCard
              key={c.id}
              name={c.name}
              category={c.category}
              categoryIcon={c.categoryIcon}
              description={c.description}
              logo={c.logo}
              cover={c.cover}
              stats={c.stats}
              onView={() => router.push(`/companies/${c.slug}`)}
            />
          ))}
        </div>
      )}

      {result.pageCount > 1 ? (
        <div className="flex justify-center">
          <Pagination page={result.page} pageCount={result.pageCount} onChange={(page) => go({ page }, 'push')} />
        </div>
      ) : null}
    </div>
  );
}
