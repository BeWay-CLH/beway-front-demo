'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Button, Icon } from '@ds';
import { readDone, writeDone } from './aula-progress';

export type AulaBlock = { title: string; durationLabel?: string };

/* Aula del curso (guía de correcciones, ficha 14): índice de bloques a la izquierda y reproductor a la derecha.
   Marcar un bloque es una simulación de la sesión: se guarda en sessionStorage y se anuncia como tal. No hay vídeo real. */
export function AulaPlayer({
  slug,
  courseTitle,
  provider,
  blocks,
}: {
  slug: string;
  courseTitle: string;
  provider: string;
  blocks: AulaBlock[];
}) {
  const total = blocks.length;
  const [done, setDone] = useState<number[]>([]);
  const [active, setActive] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const saved = readDone(slug);
    setDone(saved);
    setActive(Math.min(saved.length, Math.max(total - 1, 0)));
    setReady(true);
  }, [slug, total]);

  const mark = () => {
    if (!done.includes(active)) {
      const next = [...done, active].sort((a, b) => a - b);
      setDone(next);
      writeDone(slug, next);
    }
    if (active < total - 1) setActive(active + 1);
  };

  const block = blocks[active];
  const allDone = total > 0 && done.length >= total;

  return (
    <div className="mx-auto flex w-full max-w-site flex-col gap-6 px-4 pt-6 pb-16 md:px-8">
      <nav aria-label="Ruta de navegación" className="flex flex-wrap items-center gap-2 text-sm text-fg-muted">
        <Link href="/talent/courses" className="hover:text-fg-heading">Certificaciones</Link>
        <Icon name="chevron-right" size={14} />
        <Link href={`/talent/courses/${slug}`} className="hover:text-fg-heading">{courseTitle}</Link>
        <Icon name="chevron-right" size={14} />
        <span className="text-fg-heading">Aula</span>
      </nav>

      {total === 0 ? (
        <p className="m-0 text-fg-body">Este programa todavía no tiene bloques publicados.</p>
      ) : (
        <div className="grid gap-6 lg:grid-cols-[296px_1fr]">
          <aside className="flex flex-col gap-5 rounded-card border border-line-subtle bg-surface-card p-5">
            <div className="flex flex-col gap-1">
              <p className="eyebrow m-0 text-fg-muted uppercase">{provider}</p>
              <p className="m-0 font-heading text-[17px] font-[600] text-fg-heading">{courseTitle}</p>
            </div>
            <div className="flex flex-col gap-2">
              <p className="m-0 text-xs text-fg-muted" aria-live="polite">
                {ready ? `${done.length} de ${total} bloques` : `${total} bloques`}
              </p>
              <div
                className="h-1.5 w-full overflow-hidden rounded-pill bg-surface-sunken"
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={total}
                aria-valuenow={done.length}
                aria-label="Progreso del curso"
              >
                <div className="h-full bg-accent-teal" style={{ width: `${total ? (done.length / total) * 100 : 0}%` }} />
              </div>
            </div>
            <ol className="flex flex-col gap-1">
              {blocks.map((b, i) => {
                const isDone = done.includes(i);
                const isActive = i === active;
                return (
                  <li key={`${b.title}-${i}`}>
                    <button
                      type="button"
                      onClick={() => setActive(i)}
                      aria-current={isActive ? 'step' : undefined}
                      className={`flex w-full items-center gap-3 rounded-control px-3 py-2 text-left text-sm transition-control ${isActive ? 'bg-accent-teal-subtle text-fg-heading' : 'text-fg-body hover:bg-surface-sunken'}`}
                    >
                      <span className="flex size-6 flex-none items-center justify-center text-fg-accent">
                        <Icon name={isDone ? 'check' : 'play'} size={14} />
                      </span>
                      <span className="flex min-w-0 flex-col">
                        <span className="font-[650]">{`${String(i + 1).padStart(2, '0')} · ${b.title}`}</span>
                        {b.durationLabel ? <span className="text-xs text-fg-muted">{b.durationLabel}</span> : null}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
            <Link href={`/talent/courses/${slug}/evaluacion`} className="inline-flex items-center gap-2 text-sm font-[650] text-fg-accent">
              <Icon name="clipboard-check" size={16} />
              Evaluación y acreditación
            </Link>
          </aside>

          <section className="flex min-w-0 flex-col gap-5">
            <div className="relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-card bg-surface-inverse">
              <span className="flex size-14 items-center justify-center rounded-pill bg-white text-brand-dark">
                <Icon name="play" size={22} />
              </span>
              <span className="absolute inset-x-0 bottom-0 flex items-center justify-between px-4 py-3 text-xs text-white">
                <span>{block.durationLabel ?? '—'}</span>
                <span className="font-heading font-[700]">beway</span>
              </span>
            </div>
            <p className="m-0 text-xs text-fg-muted">Reproductor de demostración: el vídeo real llega con el seed.</p>

            <div className="flex flex-col gap-3">
              <p className="eyebrow m-0 text-fg-accent uppercase">Aprende y aplica</p>
              <h2 className="m-0 font-heading text-[26px] leading-[1.25] font-[600] text-fg-heading">{block.title}</h2>
              <p className="m-0 max-w-2xl text-fg-muted">Contenido de ejemplo. Aquí irá la descripción de la lección cuando el programa esté publicado.</p>
              <div className="flex flex-col gap-2 rounded-card border border-line-subtle bg-surface-card p-5">
                <p className="m-0 font-heading text-[17px] font-[600] text-fg-heading">Recursos de la lección</p>
                <p className="m-0 text-sm text-fg-muted">Sin recursos todavía.</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Button variant="secondary" icon="arrow-left" disabled={active === 0} onClick={() => setActive(Math.max(active - 1, 0))}>
                Lección anterior
              </Button>
              <Button variant="primary" icon="check" onClick={mark} disabled={!ready}>
                Marcar bloque y continuar
              </Button>
            </div>
            <p className="m-0 text-xs text-fg-muted">
              {allDone
                ? 'Has marcado todos los bloques en esta sesión (simulación). La evaluación ya se puede abrir.'
                : 'Marcar un bloque es una simulación: solo se guarda en esta pestaña.'}
            </p>
          </section>
        </div>
      )}
    </div>
  );
}
