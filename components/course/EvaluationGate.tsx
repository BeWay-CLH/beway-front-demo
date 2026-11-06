'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Button, Icon } from '@ds';
import { readDone } from './aula-progress';

/* Evaluación y acreditación (guía de correcciones, ficha 15). La puerta es real: la evaluación no se abre hasta marcar
   todos los bloques del aula. Hoy no existe modelo de evaluación ni de acreditación emitida: cuando los bloques están
   completos, se dice así y no se simula una nota ni una credencial. */
export function EvaluationGate({ slug, courseTitle, total }: { slug: string; courseTitle: string; total: number }) {
  const [done, setDone] = useState<number | null>(null);

  useEffect(() => {
    setDone(readDone(slug).length);
  }, [slug]);

  if (done === null) {
    return <p className="m-0 text-fg-muted">Comprobando tu progreso…</p>;
  }

  const locked = done < total;
  return (
    <section aria-labelledby="gate-title" className="flex flex-col gap-4 rounded-card border border-line-subtle bg-surface-card p-8">
      <span className="flex size-12 items-center justify-center rounded-control bg-accent-teal-subtle text-fg-accent">
        <Icon name={locked ? 'lock' : 'clipboard-check'} size={22} />
      </span>
      {locked ? (
        <>
          <h2 id="gate-title" className="m-0 font-heading text-[26px] leading-[1.25] font-[600] text-fg-heading">Un paso antes de la evaluación.</h2>
          <p className="m-0 max-w-xl text-fg-muted">
            Te faltan {total - done} de {total} bloques de {courseTitle}. Cuando los completes en el aula, se abrirá la evaluación.
          </p>
          <div>
            <Button href={`/talent/courses/${slug}/aula`} variant="primary" iconAfter="arrow-right">Continuar en el aula</Button>
          </div>
        </>
      ) : (
        <>
          <h2 id="gate-title" className="m-0 font-heading text-[26px] leading-[1.25] font-[600] text-fg-heading">La evaluación todavía no está disponible.</h2>
          <p className="m-0 max-w-xl text-fg-muted">
            Has marcado los {total} bloques en esta sesión (simulación). La evaluación y la acreditación de {courseTitle} llegan con el backend: no se
            muestra ninguna nota ni ninguna credencial hasta entonces.
          </p>
          <Link href={`/talent/courses/${slug}/aula`} className="inline-flex items-center gap-2 text-sm font-[650] text-fg-accent">
            Volver al aula
            <Icon name="arrow-right" size={14} />
          </Link>
        </>
      )}
    </section>
  );
}
