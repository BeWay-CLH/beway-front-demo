import type { Metadata } from 'next';
import { homeFor } from '@/lib/routes';
import { getSession } from '@/lib/session';
import { getCompanies, getCompanyCategories } from '@/lib/services/companies';
import { CompaniesView } from './CompaniesView';

export const metadata: Metadata = {
  title: 'Empresas · BeWay',
  description: 'Directorio de empresas del ecosistema BeWay.',
};

type Search = Record<string, string | string[] | undefined>;
const first = (value: string | string[] | undefined) => (Array.isArray(value) ? value[0] : value);

/* Catálogo público. La búsqueda, la categoría y la página viven en la URL (?q=&category=&page=) y se resuelven
   aquí, en servidor, como lo hará la API (C-03). Un valor que no existe se ignora. */
export default async function CompaniesPage({ searchParams }: { searchParams: Promise<Search> }) {
  const search = await searchParams;
  const [session, categories] = await Promise.all([getSession(), getCompanyCategories()]);

  const q = first(search.q)?.trim() ?? '';
  const requested = first(search.category);
  const category = categories.some((c) => c.slug === requested) ? requested : undefined;
  const result = await getCompanies({ q, category, page: Number(first(search.page)) || 1 });

  return (
    <CompaniesView
      result={result}
      categories={categories}
      query={{ q, category }}
      homeHref={homeFor(Boolean(session))}
    />
  );
}
