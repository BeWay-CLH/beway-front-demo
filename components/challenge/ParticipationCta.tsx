'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Button } from '@ds';
import type { ChallengeKind, ParticipationState } from '@/data/fixtures/challenges';
import { readPart, writePart } from './participation';

/* Acción de participación (guía de correcciones, 05; fichas 16, 17 y 20). Estados: sin participación, borrador o
   participación iniciada. "Unirse" es una inscripción simulada: se anuncia y no se envía a ningún servicio.
   variant "card" para el catálogo y "sidebar" para el detalle. */
export function ParticipationCta({
  slug,
  kind,
  fallback,
  variant,
}: {
  slug: string;
  kind: ChallengeKind;
  fallback: ParticipationState;
  variant: 'card' | 'sidebar';
}) {
  const [state, setState] = useState<ParticipationState>(fallback);
  const [notice, setNotice] = useState<string>();

  useEffect(() => {
    setState(readPart(slug, fallback));
  }, [slug, fallback]);

  const join = () => {
    writePart(slug, 'joined');
    setState('joined');
    setNotice(
      kind === 'miniproject'
        ? 'Simulación: no hemos guardado que comienzas el proyecto. Solo dura esta sesión.'
        : 'Simulación: no hemos guardado tu inscripción. Solo dura esta sesión.',
    );
  };

  /* El challenge tiene pantalla de propuesta; el miniproyecto no: su continuación es su ficha. */
  const toDetail = kind === 'miniproject' ? `/talent/miniprojects/${slug}` : `/talent/challenges/${slug}`;
  const toSubmit = kind === 'miniproject' ? toDetail : `/talent/challenges/${slug}/submit`;

  if (variant === 'card') {
    const engaged = state !== 'none';
    return (
      <Button href={engaged ? toSubmit : toDetail} variant="primary" fullWidth iconAfter="arrow-right" style={{ height: 42 }}>
        {engaged ? 'Continuar mi propuesta' : kind === 'miniproject' ? 'Explorar proyecto' : 'Conocer el challenge'}
      </Button>
    );
  }

  const label = kind === 'miniproject' ? 'Comenzar proyecto' : 'Unirme al challenge';
  return (
    <div className="flex flex-col gap-3">
      {state === 'none' ? (
        <Button variant="primary" fullWidth onClick={join}>{label}</Button>
      ) : state === 'draft' ? (
        <Link href={toSubmit} className="inline-flex h-[42px] items-center justify-center rounded-control bg-action-primary px-4 text-xs font-[650] text-fg-on-accent">
          Continuar borrador
        </Link>
      ) : (
        <Link href={toSubmit} className="inline-flex h-[42px] items-center justify-center rounded-control bg-action-primary px-4 text-xs font-[650] text-fg-on-accent">
          Continuar mi propuesta
        </Link>
      )}
      {notice ? <p role="status" className="m-0 text-xs text-fg-muted">{notice}</p> : null}
    </div>
  );
}
