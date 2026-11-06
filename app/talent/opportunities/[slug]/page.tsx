import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Button, Icon } from '@ds';
import { SaveLater } from '@/components/opportunity/SaveLater';
import { getOpportunityBySlug } from '@/lib/services/opportunities';

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const o = await getOpportunityBySlug(slug);
  return o ? { title: `${o.title} · BeWay` } : { title: 'Oportunidad no encontrada · BeWay', robots: { index: false } };
}

/* Detalle de oportunidad (guía de correcciones, ficha 28): hero de la empresa, tres bloques y un lateral "Tu próximo paso". */
export default async function OpportunityPage({ params }: Props) {
  const { slug } = await params;
  const o = await getOpportunityBySlug(slug);
  if (!o) notFound();

  const blocks: { title: string; items: string[] }[] = [
    { title: 'Tu papel en el equipo.', items: o.role },
    { title: 'Lo que buscamos.', items: o.looking },
    { title: 'Cómo sería el proceso.', items: o.process },
  ];

  return (
    <div className="mx-auto grid w-full max-w-[1160px] gap-8 px-4 pt-6 pb-16 md:px-8 lg:grid-cols-[1fr_335px] lg:gap-[25px]">
      <div className="flex min-w-0 flex-col gap-8">
        <nav aria-label="Ruta de navegación" className="flex flex-wrap items-center gap-2 text-sm text-fg-muted">
          <Link href="/talent/opportunities" className="hover:text-fg-heading">Oportunidades</Link>
          <Icon name="chevron-right" size={14} />
          <span className="text-fg-heading">{o.title}</span>
        </nav>

        <section className="flex flex-col gap-4 rounded-[12px] p-8 text-white md:p-10" style={{ background: o.base }}>
          <p className="eyebrow m-0 uppercase opacity-80">{o.companyName} · Ejemplo</p>
          <h1 className="m-0 font-heading text-[30px] leading-[1.2] font-[700] md:text-[34px]">{o.title}</h1>
          <p className="m-0 max-w-2xl opacity-90">{o.summary}</p>
          <div className="flex flex-wrap gap-2 text-xs">
            <span className="rounded-pill bg-white/15 px-3 py-1">{o.modality}</span>
            <span className="rounded-pill bg-white/15 px-3 py-1">{o.type}</span>
            <span className="rounded-pill bg-white/15 px-3 py-1">{o.location}</span>
          </div>
        </section>

        {blocks.map((b) => (
          <section key={b.title} className="flex flex-col gap-3 rounded-card border border-line-subtle bg-surface-card p-6">
            <h2 className="m-0 font-heading text-[17px] font-[600] text-fg-heading">{b.title}</h2>
            <ul className="m-0 flex list-disc flex-col gap-2 pl-5 text-fg-body">
              {b.items.map((i) => <li key={i}>{i}</li>)}
            </ul>
          </section>
        ))}
      </div>

      <aside aria-labelledby="next" className="flex flex-col gap-5 self-start rounded-card border border-line-subtle bg-surface-card p-6 lg:sticky lg:top-40">
        <div className="flex flex-col gap-2">
          <p className="eyebrow m-0 text-fg-accent uppercase">Tu próximo paso</p>
          <h2 id="next" className="m-0 font-heading text-[17px] font-[600] text-fg-heading">Muéstrales lo que puedes aportar.</h2>
        </div>
        <dl className="m-0 flex flex-col gap-3 text-sm">
          <div className="flex justify-between gap-4"><dt className="text-fg-muted">Empresa</dt><dd className="m-0 text-fg-body">{o.companyName}</dd></div>
          <div className="flex justify-between gap-4"><dt className="text-fg-muted">Modalidad</dt><dd className="m-0 text-fg-body">{o.modality}</dd></div>
          <div className="flex justify-between gap-4"><dt className="text-fg-muted">Tipo</dt><dd className="m-0 text-fg-body">{o.type}</dd></div>
          <div className="flex justify-between gap-4"><dt className="text-fg-muted">Cierre</dt><dd className="m-0 text-fg-body">{o.closes}</dd></div>
        </dl>
        <Button href={`/talent/opportunities/${o.slug}/apply`} variant="primary" fullWidth iconAfter="arrow-right">Preparar candidatura</Button>
        <SaveLater slug={o.slug} />
      </aside>
    </div>
  );
}
