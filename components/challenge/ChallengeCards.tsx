import Link from 'next/link';
import { Icon } from '@ds';
import { ParticipationCta } from './ParticipationCta';
import type { ChallengeVM } from '@/lib/services/challenges';

/* Tarjetas de challenges y miniproyectos (guía de correcciones, 16 y 19). El challenge lleva portada de la marca con
   marca de agua "01"; el miniproyecto no tiene franja de color: logo pequeño arriba, sello "Práctica guiada" y pie con
   "Evidencia para el portfolio". Cada uno conserva su propia cabecera de tarjeta. */

const statusLabel = { open: 'Abierto', soon: 'Próximamente', closed: 'Cerrado' } as const;

export function ChallengeCard({ c, index }: { c: ChallengeVM; index: number }) {
  const mark = String(index + 1).padStart(2, '0');
  return (
    <article className="flex flex-col overflow-hidden rounded-card border border-line-subtle bg-surface-card">
      <div className="relative flex h-[156px] flex-none flex-col justify-between overflow-hidden p-5" style={{ background: c.base }}>
        <span className="relative z-[1] inline-flex w-fit rounded-[7px] bg-white px-2 py-1 text-xs font-[650] text-brand-dark">{c.companyName}</span>
        <span className="relative z-[1] font-heading text-[23px] leading-[1.2] font-[700] text-white">{c.title}</span>
        <span aria-hidden="true" className="pointer-events-none absolute -right-2 -bottom-8 font-heading text-[120px] leading-none font-[800] text-white opacity-10 select-none">
          {mark}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-[22px]">
        <div className="flex flex-wrap items-center gap-2 text-xs text-fg-muted">
          <span>{c.sector}</span>
          <span aria-hidden="true">·</span>
          <span className="font-[650] text-fg-body">{statusLabel[c.status]}</span>
        </div>
        <h2 className="m-0 font-heading text-[17px] leading-[1.3] font-[600] text-fg-heading">{c.title}</h2>
        <p className="m-0 text-xs leading-[1.6] text-fg-body">{c.summary}</p>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-fg-muted">
          <Link href={`/talent/challenges/${c.slug}`} className="font-[650] text-fg-accent">Briefing y entregables</Link>
          <span>{c.status === 'open' ? `Hasta el ${c.deadline}` : c.deadline === 'Cerrado' ? 'Cerrado' : 'Según convocatoria'}</span>
        </div>
        <div className="mt-auto pt-2">
          <ParticipationCta slug={c.slug} kind="challenge" fallback={c.sampleParticipation} variant="card" />
        </div>
      </div>
    </article>
  );
}

export function MiniprojectCard({ c }: { c: ChallengeVM }) {
  const initial = c.companyName[0];
  return (
    <article className="flex flex-col gap-4 rounded-card border border-line-subtle bg-surface-card p-6">
      <div className="flex items-center justify-between gap-3">
        <span className="inline-flex size-9 items-center justify-center rounded-control text-sm font-[800] text-white" style={{ background: c.base }} aria-hidden="true">
          {initial}
        </span>
        <span className="inline-flex items-center gap-1 rounded-control border border-line-control px-2 py-1 text-xs font-[650] text-fg-body">
          <Icon name="graduation-cap" size={12} />
          Práctica guiada
        </span>
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-xs text-fg-muted">{c.companyName} · {c.sector}</span>
        <h2 className="m-0 font-heading text-[17px] leading-[1.3] font-[600] text-fg-heading">{c.title}</h2>
        <p className="m-0 text-xs leading-[1.6] text-fg-body">{c.summary}</p>
      </div>
      <div className="mt-auto flex flex-col gap-3 pt-2">
        <span className="text-xs text-fg-muted">Evidencia para el portfolio</span>
        <Link href={`/talent/miniprojects/${c.slug}`} className="sr-only">Ver el miniproyecto: {c.title}</Link>
        <ParticipationCta slug={c.slug} kind="miniproject" fallback={c.sampleParticipation} variant="card" />
      </div>
    </article>
  );
}
