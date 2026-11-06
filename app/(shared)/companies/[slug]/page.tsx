import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BrandPage } from '@/components/brand/BrandPage';
import { CompanyProfile } from '@/components/company/CompanyProfile';
import { brandBySlug } from '@/data/fixtures/brands';
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
  /* Las 17 marcas corporativas tienen su composición propia (guía, 03); el resto usa la ficha común. */
  const brand = brandBySlug(slug);
  if (brand) return <BrandPage brand={brand} />;
  const session = await getSession();
  const company = await getCompanyBySlug(slug, session?.userId);
  if (!company) notFound();

  return <CompanyProfile company={company} userId={session?.userId} homeHref={homeFor(Boolean(session))} initialTab={tab} />;
}
