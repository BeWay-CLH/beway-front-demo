'use client';

import { useEffect, useRef, useState, useTransition } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Button, EmptyState, Icon, Input, Pagination, Tag } from '@ds';
import { CompanyGrid } from '@/components/company/CompanyGrid';
import { formatCount } from '@/lib/format';
import type { CompanyCategoryVM, CompanyPageVM } from '@/lib/models/company';

type Query = { q: string; category?: string };

/* Pantalla del directorio (guía de correcciones, ficha 03 y 05). Los filtros no se filtran aquí: cada cambio
   actualiza la URL y el servidor devuelve la página (C-03). El texto espera 300 ms tras la última tecla. */
export function CompaniesView({
  result,
  categories,
  query,
  showPanel,
  userId,
  followingIds,
}: {
  result: CompanyPageVM;
  categories: CompanyCategoryVM[];
  query: Query;
  /* Con sesión, "Mi panel" a la derecha del encabezado. Sin sesión no hay destino: no se muestra. */
  showPanel: boolean;
  userId?: string;
  followingIds: string[];
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
  const summary = result.total === 1 ? '1 empresa' : `${formatCount(result.total)} empresas`;

  return (
    <div className="mx-auto flex w-full max-w-site flex-col gap-7 px-4 pt-9 pb-16 md:px-8">
      <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="font-heading text-[25px] leading-[1.2] font-[700] text-fg-heading [letter-spacing:var(--tracking-h1)] md:text-[30px]">Encuentra tu lugar.</h1>
          <p className="m-0 text-[11px] leading-[1.6] text-fg-muted md:text-sm">
            Empresas para descubrir. Experiencias para aprender. Oportunidades para avanzar.
          </p>
        </div>
        {showPanel ? (
          <Link
            href="/talent/dashboard"
            className="inline-flex h-8 flex-none items-center gap-2 self-start rounded-control border border-line-control bg-surface-card px-3 text-xs font-[650] text-fg-body transition-control hover:bg-surface-sunken md:self-auto"
          >
            <Icon name="layout-dashboard" size={14} />
            Mi panel
          </Link>
        ) : null}
      </header>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <p aria-live="polite" className="m-0 text-sm text-fg-muted">
            {summary}
            {active ? ` en ${active.label}` : ''}
            {query.q ? ` para “${query.q}”` : ''}
          </p>
          <div className="w-full md:w-80">
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
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar por sector">
          <Tag variant="filter" selected={!query.category} onClick={() => go({ category: undefined })}>
            Todas
          </Tag>
          {categories.map((c) => (
            <Tag key={c.slug} variant="filter" selected={query.category === c.slug} onClick={() => go({ category: c.slug })}>
              {c.label}
            </Tag>
          ))}
        </div>
      </div>

      {result.items.length === 0 ? (
        <EmptyState
          icon="search"
          title="No hay empresas con esos filtros."
          description="Prueba otro sector o cambia tu búsqueda."
          action={<Button variant="secondary" icon="rotate-ccw" onClick={clear}>Ver empresas</Button>}
        />
      ) : (
        <div aria-busy={pending}>
          <CompanyGrid items={result.items} followingIds={followingIds} userId={userId} />
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
