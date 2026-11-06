import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ProposalForm } from '@/components/challenge/ProposalForm';
import { getChallengeBySlug } from '@/lib/services/challenges';

type Props = { params: Promise<{ slug: string }> };

export const metadata: Metadata = { title: 'Propuesta · BeWay', robots: { index: false } };

/* Propuesta del challenge (guía de correcciones, ficha 18). Formulario de trabajo, en simulación. */
export default async function SubmitPage({ params }: Props) {
  const { slug } = await params;
  const c = await getChallengeBySlug(slug);
  if (!c) notFound();

  return (
    <div className="mx-auto flex w-full max-w-[1100px] flex-col gap-8 px-4 pt-8 pb-16 md:px-8">
      <header className="flex flex-col gap-3">
        <p className="eyebrow m-0 text-fg-muted uppercase">{c.companyName}</p>
        <h1 className="m-0 font-heading text-[30px] leading-[1.2] font-[700] text-fg-heading md:text-[38px] [letter-spacing:var(--tracking-h1)]">
          De la idea a la propuesta.
        </h1>
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-fg-body">{c.title}</span>
          <span className="inline-flex rounded-control border border-line-control px-2 py-1 text-xs font-[650] text-fg-body">Borrador</span>
        </div>
        <Link href={`/talent/challenges/${c.slug}`} className="text-sm font-[650] text-fg-accent">Volver al briefing</Link>
      </header>
      <ProposalForm slug={c.slug} challengeTitle={c.title} />
    </div>
  );
}
