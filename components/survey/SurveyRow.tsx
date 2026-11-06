'use client';

import Link from 'next/link';
import { NavButton } from '@/components/NavButton';
import { StatusBadge } from '@/components/StatusBadge';
import type { SurveySummaryVM } from '@/lib/models/survey';
import { dateNote, metaText, reasonText, rowState, stateAction, stateBadge } from './survey-labels';
import { useHasDraft } from './survey-store';

/* Una encuesta como fila de dos líneas (patrón "inbox" del skill de estilo): logo de quien la publica, título con su sello,
   quién la publica y cuánto lleva, por qué la ves, la fecha que importa y la acción. Las que no son para la persona no
   se atenúan con opacidad (perdería contraste): usan el gris de apoyo y su acción lleva a la empresa. */
export function SurveyRow({
  survey,
  userId,
  completed,
  primary,
}: {
  survey: SurveySummaryVM;
  userId: string;
  completed: boolean;
  /* La acción más frecuente de la pantalla: una sola fila lleva el botón principal. */
  primary: boolean;
}) {
  const hasDraft = useHasDraft(userId, survey.id);
  const state = rowState(survey, { completed, hasDraft });
  const badge = stateBadge[state];
  const action = stateAction[state];
  const href = state === 'not-eligible' ? `/companies/${survey.publisher.slug}` : `/talent/surveys/${survey.slug}`;
  const muted = state === 'not-eligible';

  return (
    <li className="flex h-full flex-col gap-3 rounded-[12px] border border-line-subtle bg-surface-card p-5">
      <span className="flex size-10 flex-none items-center justify-center overflow-hidden rounded-control border border-line-subtle bg-white">
        {survey.publisher.logo ? (
          <img src={survey.publisher.logo} alt="" className="max-h-[78%] max-w-[78%] object-contain" />
        ) : (
          <span aria-hidden="true" className="font-heading text-brand-dark">{survey.publisher.name[0]}</span>
        )}
      </span>

      <div className="flex min-w-0 flex-col gap-1">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <Link
            href={href}
            className={`transition-control font-semibold hover:text-fg-accent ${muted ? 'text-fg-body' : 'text-fg-heading'}`}
          >
            {survey.title}
          </Link>
          {badge ? (
            <StatusBadge tone={badge.tone} icon={badge.icon}>
              {badge.label}
            </StatusBadge>
          ) : null}
        </div>
        <span className="text-sm text-fg-muted">{muted ? reasonText(survey) : metaText(survey)}</span>
        {!muted ? <span className="text-sm text-fg-muted">{reasonText(survey)}</span> : null}
      </div>

      <span className="col-start-2 text-sm tabular-nums text-fg-muted md:col-start-auto md:text-right">
        {muted ? '' : dateNote(survey)}
      </span>

      <NavButton
        href={href}
        variant={primary && (state === 'open' || state === 'in-progress') ? 'primary' : 'outline'}
        iconAfter="arrow-right"
        aria-label={`${action}: ${survey.title}`}
        className="mt-auto w-full"
      >
        {action}
      </NavButton>
    </li>
  );
}
