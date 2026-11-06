'use client';

import { Button } from '@ds';
import { useSaved } from './OpportunityGrid';

/* "Guardar para después" en el detalle de la oportunidad (ficha 28). Simulado y anunciado en la misma línea. */
export function SaveLater({ slug }: { slug: string }) {
  const { saved, toggle } = useSaved();
  const on = saved.includes(slug);
  return (
    <div className="flex flex-col gap-2">
      <Button type="button" variant="ghost" icon="bookmark" aria-pressed={on} onClick={() => toggle(slug)}>
        {on ? 'Guardada para después' : 'Guardar para después'}
      </Button>
      <p className="m-0 text-xs text-fg-muted">Simulación: solo se guarda en esta sesión.</p>
    </div>
  );
}
