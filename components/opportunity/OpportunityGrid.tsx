'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Button, Icon } from '@ds';
import type { OpportunityVM } from '@/lib/services/opportunities';

/* Oportunidades guardadas en la sesión del navegador (escritura simulada, DEC-006). Nunca localStorage. */
const KEY = 'bw-saved-opps';

export function readSaved(): string[] {
  try {
    const raw = window.sessionStorage.getItem(KEY);
    const value: unknown = raw ? JSON.parse(raw) : [];
    return Array.isArray(value) ? value.filter((v): v is string => typeof v === 'string') : [];
  } catch {
    return [];
  }
}

function writeSaved(list: string[]) {
  try {
    window.sessionStorage.setItem(KEY, JSON.stringify(list));
  } catch {
    /* sin almacenamiento: el guardado dura lo que la pantalla */
  }
}

export function useSaved() {
  const [saved, setSaved] = useState<string[]>([]);
  useEffect(() => setSaved(readSaved()), []);
  const toggle = (slug: string) => {
    const next = saved.includes(slug) ? saved.filter((s) => s !== slug) : [...saved, slug];
    setSaved(next);
    writeSaved(next);
  };
  return { saved, toggle };
}

/* Marca de guardado: un icono de marcador que cambia de estado. Simulado y anunciado. */
export function SaveMark({ slug, title, saved, toggle }: { slug: string; title: string; saved: boolean; toggle: (s: string) => void }) {
  return (
    <button
      type="button"
      onClick={() => toggle(slug)}
      aria-pressed={saved}
      aria-label={saved ? `Quitar de guardadas: ${title}` : `Guardar: ${title}`}
      className={`inline-flex size-8 items-center justify-center rounded-control border border-line-control bg-surface-card transition-control hover:bg-surface-sunken ${saved ? 'text-fg-accent' : 'text-fg-body'}`}
    >
      <Icon name="bookmark" size={16} />
    </button>
  );
}

export function OpportunityGrid({ items }: { items: OpportunityVM[] }) {
  const { saved, toggle } = useSaved();
  const [onlySaved, setOnlySaved] = useState(false);
  const shown = onlySaved ? items.filter((o) => saved.includes(o.slug)) : items;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="m-0 text-sm text-fg-muted" aria-live="polite">
          {onlySaved
            ? `${shown.length} ${shown.length === 1 ? 'guardada' : 'guardadas'}`
            : `${items.length} ${items.length === 1 ? 'oportunidad' : 'oportunidades'}`}
        </p>
        <Button type="button" variant="ghost" icon="bookmark" onClick={() => setOnlySaved(!onlySaved)} aria-pressed={onlySaved}>
          {onlySaved ? 'Ver todas' : 'Ver guardadas'}
        </Button>
      </div>

      {shown.length > 0 ? (
        <div className="grid gap-[18px] md:grid-cols-2">
          {shown.map((o) => (
            <article key={o.slug} className="flex flex-col gap-3 rounded-[12px] border border-line-subtle bg-surface-card p-6">
              <div className="flex items-start justify-between gap-3">
                <span className="inline-flex size-9 items-center justify-center rounded-control text-sm font-[800] text-white" style={{ background: o.base }} aria-hidden="true">
                  {o.companyName[0]}
                </span>
                <SaveMark slug={o.slug} title={o.title} saved={saved.includes(o.slug)} toggle={toggle} />
              </div>
              <span className="text-xs text-fg-muted">{o.companyName} · {o.location}</span>
              <h2 className="m-0 font-heading text-[17px] leading-[1.3] font-[600] text-fg-heading">{o.title}</h2>
              <p className="m-0 text-sm text-fg-body">{o.summary}</p>
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="rounded-pill border border-line-control px-3 py-1 text-fg-body">{o.modality}</span>
                <span className="rounded-pill border border-line-control px-3 py-1 text-fg-body">{o.type}</span>
              </div>
              <div className="mt-auto flex items-center justify-between gap-3 pt-2">
                <span className="text-xs text-fg-muted">{o.closes}</span>
                <Link href={`/talent/opportunities/${o.slug}`} className="inline-flex items-center gap-2 text-sm font-[650] text-fg-accent">
                  Ver oportunidad
                  <Icon name="arrow-right" size={14} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-start gap-3 rounded-card border border-line-subtle bg-surface-card p-8">
          <h2 className="m-0 font-heading text-[17px] font-[600] text-fg-heading">Todavía no has guardado ninguna oportunidad.</h2>
          <p className="m-0 text-sm text-fg-muted">Guarda las que te interesen y las verás aquí.</p>
          <Button type="button" variant="secondary" onClick={() => setOnlySaved(false)}>Explorar oportunidades</Button>
        </div>
      )}
    </div>
  );
}
