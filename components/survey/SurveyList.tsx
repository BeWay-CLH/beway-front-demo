'use client';

import { useState } from 'react';
import { Button } from '@ds';
import { NavButton } from '@/components/NavButton';
import { KeyboardTabs } from '@/components/tabs/KeyboardTabs';
import { formatDate } from '@/lib/format';
import type { SurveySummaryVM } from '@/lib/models/survey';
import { SurveyRow } from './SurveyRow';
import { useCompletedSurveys } from './survey-store';

const MAX_NOT_ELIGIBLE = 3;

const byClosing = (a: SurveySummaryVM, b: SurveySummaryVM) => (a.closesAt ?? '').localeCompare(b.closesAt ?? '');

/* Orden de lectura: lo que se puede responder, por quién cierra antes; luego las próximas y al final las cerradas. */
function sortAvailable(items: SurveySummaryVM[]): SurveySummaryVM[] {
  const group = (s: SurveySummaryVM) => (s.status === 'open' ? 0 : s.status === 'upcoming' ? 1 : 2);
  return [...items].sort((a, b) => group(a) - group(b) || (group(a) === 2 ? byClosing(b, a) : byClosing(a, b)));
}

/* Encuestas (E-02). Parte de lo que trae el servidor y le aplica lo que pasó en esta sesión del navegador: una encuesta
   enviada (simulada) pasa a "Completadas", y las que tienen borrador salen "En curso". Todo ese estado vive en sessionStorage. */
export function SurveyList({ userId, surveys }: { userId: string; surveys: SurveySummaryVM[] }) {
  const completedIds = useCompletedSurveys(userId);
  const [tab, setTab] = useState<'available' | 'completed'>('available');

  const isDone = (s: SurveySummaryVM) => s.participation === 'completed' || completedIds.includes(s.id);
  const done = surveys.filter(isDone);
  const mine = surveys.filter((s) => !isDone(s) && s.eligibility !== 'not-eligible');
  const others = surveys.filter((s) => !isDone(s) && s.eligibility === 'not-eligible').sort(byClosing);
  const available = sortAvailable(mine);

  const pending = available.filter((s) => s.status === 'open');
  const firstPending = pending[0];
  const finding = firstPending
    ? `Tienes ${pending.length} ${pending.length === 1 ? 'encuesta' : 'encuestas'} para responder. La que antes cierra es la de ${firstPending.publisher.name}, el ${formatDate(firstPending.closesAt ?? '')}.`
    : 'No tienes encuestas para responder ahora.';

  return (
    <div className="mx-auto flex w-full max-w-275 flex-col gap-8 px-4 py-8 md:px-6 md:py-10">
      <header className="flex flex-col gap-3">
        <h1 className="text-h2 font-heading text-fg-heading md:text-h1">Encuestas</h1>
        <p className="text-fg-muted" aria-live="polite">{finding}</p>
      </header>

      <div className="rounded-card border border-line-subtle bg-surface-card p-6">
        <KeyboardTabs
          label="Tus encuestas"
          value={tab}
          onChange={(v) => setTab(v as 'available' | 'completed')}
          items={[
            { value: 'available', label: 'Disponibles', count: available.length },
            { value: 'completed', label: 'Completadas', count: done.length },
          ]}
        >
          {tab === 'available' ? (
            <div className="flex flex-col gap-8">
              {available.length > 0 ? (
                <ul className="flex flex-col">
                  {available.map((s) => (
                    <SurveyRow key={s.id} survey={s} userId={userId} completed={false} primary={s.id === firstPending?.id} />
                  ))}
                </ul>
              ) : (
                <div className="flex flex-col items-start gap-3">
                  <p className="text-fg-body">
                    {others.length > 0
                      ? 'Todavía no hay encuestas para ti. Sigue a las empresas de abajo y las verás aquí.'
                      : 'Todavía no hay encuestas para ti. Sigue a empresas y las verás aquí.'}
                  </p>
                  <NavButton href="/companies" variant="ghost" iconAfter="arrow-right" className="-ml-4">
                    Explorar empresas
                  </NavButton>
                </div>
              )}

              {others.length > 0 ? (
                <section aria-labelledby="not-for-you" className="flex flex-col gap-2 border-t border-line-subtle pt-6">
                  <h2 id="not-for-you" className="text-h3 font-heading text-fg-heading">No son para ti por ahora</h2>
                  <p className="text-sm text-fg-muted">
                    Siguiendo a la empresa, o añadiendo su tema a tus intereses, las verás en Disponibles.
                  </p>
                  <ul className="mt-2 flex flex-col">
                    {others.slice(0, MAX_NOT_ELIGIBLE).map((s) => (
                      <SurveyRow key={s.id} survey={s} userId={userId} completed={false} primary={false} />
                    ))}
                  </ul>
                  {others.length > MAX_NOT_ELIGIBLE ? (
                    <p className="text-sm text-fg-muted">
                      {`Y ${others.length - MAX_NOT_ELIGIBLE} más de otras empresas.`}
                    </p>
                  ) : null}
                </section>
              ) : null}
            </div>
          ) : done.length > 0 ? (
            <ul className="flex flex-col">
              {done.map((s) => (
                <SurveyRow key={s.id} survey={s} userId={userId} completed primary={false} />
              ))}
            </ul>
          ) : (
            <div className="flex flex-col items-start gap-3">
              <p className="text-fg-body">Todavía no has completado ninguna encuesta. Las que envíes aparecerán aquí.</p>
              <Button variant="ghost" onClick={() => setTab('available')} className="-ml-4">
                Ver encuestas disponibles
              </Button>
            </div>
          )}
        </KeyboardTabs>
      </div>
    </div>
  );
}
