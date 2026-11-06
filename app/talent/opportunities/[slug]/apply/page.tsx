import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ApplyFlow } from '@/components/opportunity/ApplyFlow';
import { requireSession } from '@/lib/session';
import { getProfileForm } from '@/lib/services/profiles';
import { getOpportunityBySlug } from '@/lib/services/opportunities';

type Props = { params: Promise<{ slug: string }> };

export const metadata: Metadata = { title: 'Candidatura · BeWay', robots: { index: false } };

/* Candidatura (guía de correcciones, fichas 29 y 30). Los datos del perfil se leen de la sesión; no se envía nada. */
export default async function ApplyPage({ params }: Props) {
  const { slug } = await params;
  const session = await requireSession();
  const [o, form] = await Promise.all([getOpportunityBySlug(slug), getProfileForm(session.userId)]);
  if (!o || !form) notFound();

  return (
    <ApplyFlow
      slug={o.slug}
      title={o.title}
      company={o.companyName}
      profile={{
        displayName: form.displayName,
        headline: form.headline ?? '',
        location: form.location ?? '',
        education: form.education[0] ? [form.education[0].title, form.education[0].institution].filter(Boolean).join(', ') : '',
      }}
    />
  );
}
