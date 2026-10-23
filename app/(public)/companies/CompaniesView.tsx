'use client';

import { useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Breadcrumbs, Button, CompanyCard, EmptyState, Input, Pagination, SectionLabel, Tag } from '@ds';
import { categories, companies } from '@/data/mock';

const PAGE_SIZE = 6;

export function CompaniesView() {
  const params = useSearchParams();
  const [category, setCategory] = useState('Todas');
  const [q, setQ] = useState(params.get('q') ?? '');
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    return companies.filter(
      (c) =>
        (category === 'Todas' || c.category === category) &&
        (!term || c.name.toLowerCase().includes(term) || c.description.toLowerCase().includes(term)),
    );
  }, [category, q]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const visible = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="mx-auto flex max-w-site flex-col gap-8 px-4 py-8 md:px-6 md:py-10">
      <Breadcrumbs items={[{ label: 'Inicio', href: '/' }, { label: 'Empresas' }]} />

      <header className="flex flex-col gap-3">
        <SectionLabel>Directorio</SectionLabel>
        <h1 className="text-h1 font-heading text-fg-heading">Empresas del ecosistema</h1>
        <p className="max-w-2xl text-fg-muted">Conoce a las empresas que abren retos y vacantes. Filtra por categoría y entra a su perfil.</p>
      </header>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar por categoría">
          {categories.map((c) => (
            <Tag key={c} variant="filter" selected={category === c} onClick={() => { setCategory(c); setPage(1); }}>
              {c}
            </Tag>
          ))}
        </div>
        <div className="w-full md:w-72">
          <Input icon="search" placeholder="Buscar empresa" value={q} onChange={(e) => { setQ(e.target.value); setPage(1); }} aria-label="Buscar empresa" />
        </div>
      </div>

      {visible.length === 0 ? (
        <EmptyState
          icon="search"
          title="Sin resultados"
          description="No hay empresas con esos filtros. Prueba con otra categoría o quita la búsqueda."
          action={<Button variant="secondary" icon="rotate-ccw" onClick={() => { setCategory('Todas'); setQ(''); }}>Limpiar filtros</Button>}
        />
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((c) => (
            <CompanyCard key={c.id} {...c} onView={() => {}} />
          ))}
        </div>
      )}

      {filtered.length > PAGE_SIZE ? (
        <div className="flex justify-center">
          <Pagination page={page} pageCount={pageCount} onChange={setPage} />
        </div>
      ) : null}
    </div>
  );
}
