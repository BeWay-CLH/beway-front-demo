import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Icon } from '@ds';
import { ParticipationCta } from '@/components/challenge/ParticipationCta';
import { getChallengeBySlug } from '@/lib/services/challenges';

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const c = await getChallengeBySlug(slug);
  return c ? { title: `${c.title} · BeWay` } : { title: 'Challenge no encontrado · BeWay', robots: { index: false } };
}

/* Detalle del challenge (guía de correcciones, ficha 17): hero con el color de la marca, tres bloques y un lateral
   "Tu participación." con la acción según el estado. Entrar aquí no inscribe a nadie. */
export default async function ChallengePage({ params }: Props) {
  const { slug } = await params;
  const c = await getChallengeBySlug(slug);
  if (!c) notFound();

  return (
    <div className="mx-auto grid w-full max-w-site gap-8 px-4 pt-6 pb-16 md:px-8 lg:grid-cols-[1fr_335px] lg:gap-[25px]">
      <div className="flex min-w-0 flex-col gap-8">
        <nav aria-label="Ruta de navegación" className="flex flex-wrap items-center gap-2 text-sm text-fg-muted">
          <Link href="/talent/challenges" className="hover:text-fg-heading">Challenges</Link>
          <Icon name="chevron-right" size={14} />
          <span className="text-fg-heading">{c.title}</span>
        </nav>

        <section className="flex flex-col gap-4 rounded-[12px] p-8 text-white md:p-10" style={{ background: c.base }}>
          <p className="eyebrow m-0 uppercase opacity-80">{c.companyName} · Challenge</p>
          <h1 className="m-0 font-heading text-[30px] leading-[1.2] font-[700] md:text-[38px]">{c.title}</h1>
          <p className="m-0 max-w-2xl opacity-90">{c.summary}</p>
        </section>

        <section aria-labelledby="start" className="flex flex-col gap-3 rounded-card border border-line-subtle bg-surface-card p-6">
          <h2 id="start" className="m-0 font-heading text-[17px] font-[600] text-fg-heading">El punto de partida.</h2>
          <p className="m-0 text-fg-body">{c.start}</p>
        </section>
        <section aria-labelledby="deliver" className="flex flex-col gap-3 rounded-card border border-line-subtle bg-surface-card p-6">
          <h2 id="deliver" className="m-0 font-heading text-[17px] font-[600] text-fg-heading">Lo que vas a entregar.</h2>
          <ul className="m-0 flex list-disc flex-col gap-2 pl-5 text-fg-body">
            {c.deliverables.map((d) => <li key={d}>{d}</li>)}
          </ul>
        </section>
        <section aria-labelledby="review" className="flex flex-col gap-3 rounded-card border border-line-subtle bg-surface-card p-6">
          <h2 id="review" className="m-0 font-heading text-[17px] font-[600] text-fg-heading">Cómo se revisa.</h2>
          <ul className="m-0 flex list-disc flex-col gap-2 pl-5 text-fg-body">
            {c.review.map((r) => <li key={r}>{r}</li>)}
          </ul>
        </section>
      </div>

      <aside aria-labelledby="participation" className="flex flex-col gap-5 self-start rounded-card border border-line-subtle bg-surface-card p-6 lg:sticky lg:top-40">
        <h2 id="participation" className="m-0 font-heading text-[17px] font-[600] text-fg-heading">Tu participación.</h2>
        <dl className="m-0 flex flex-col gap-3 text-sm">
          <div className="flex justify-between gap-4"><dt className="text-fg-muted">Empresa</dt><dd className="m-0 text-fg-body">{c.companyName}</dd></div>
          <div className="flex justify-between gap-4"><dt className="text-fg-muted">Formato</dt><dd className="m-0 text-fg-body">{c.format}</dd></div>
          <div className="flex justify-between gap-4"><dt className="text-fg-muted">Plazo</dt><dd className="m-0 text-fg-body">{c.deadline}</dd></div>
        </dl>
        <ParticipationCta slug={c.slug} kind="challenge" fallback={c.sampleParticipation} variant="sidebar" />
        <Link href={`/companies/${c.companySlug}`} className="text-sm font-[650] text-fg-accent">Ver briefing en la ficha</Link>
      </aside>
    </div>
  );
}
