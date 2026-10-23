import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CompanyProfile } from '@/components/company/CompanyProfile';
import { homeFor } from '@/lib/routes';
import { getSession } from '@/lib/session';
import { getCompanyBySlug } from '@/lib/services/companies';

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ tab?: string }>;
};

/* Ficha pública de una empresa publicada. Un borrador o un slug que no existe da 404 sin distinguirse (C-04). */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const company = await getCompanyBySlug(slug);
  if (!company) return { title: 'Empresa no encontrada · BeWay', robots: { index: false } };
  return { title: `${company.name} · BeWay`, description: company.description };
}

export default async function CompanyPage({ params, searchParams }: Props) {
  const [{ slug }, { tab }] = await Promise.all([params, searchParams]);
  const session = await getSession();
  const company = await getCompanyBySlug(slug, session?.userId);
  if (!company) notFound();

  return <CompanyProfile company={company} userId={session?.userId} homeHref={homeFor(Boolean(session))} initialTab={tab} />;
}
