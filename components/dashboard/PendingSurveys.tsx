'use client';

import Link from 'next/link';
import { Icon } from '@ds';
import { NavButton } from '@/components/NavButton';
import { useCompletedSurveys } from '@/components/survey/survey-store';
import { formatDate } from '@/lib/format';
import type { DashboardSurveyVM } from '@/lib/models/dashboard';

const SHOWN = 3;

/* Encuestas por responder en el inicio (E-09): abiertas, para esta persona y sin enviar, las que cierran antes primero.
   Parte de lo que trae el servidor y quita las enviadas (simuladas) en esta sesión del navegador. */
export function PendingSurveys({ userId, surveys }: { userId: string; surveys: DashboardSurveyVM[] }) {
  const completedIds = useCompletedSurveys(userId);
  const pending = surveys.filter((s) => !completedIds.includes(s.id));

  if (pending.length === 0) {
    return (
      <div className="flex flex-col items-start gap-3">
        <p className="text-fg-body">
          No tienes encuestas por responder. Cuando una empresa que sigues publique una, la verás aquí.
        </p>
        <NavButton href="/talent/surveys" variant="ghost" iconAfter="arrow-right" className="-ml-4">
          Ver encuestas
        </NavButton>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-3">
      <ul className="flex flex-col">
        {pending.slice(0, SHOWN).map((s) => (
          <li key={s.id} className="border-t border-line-subtle first:border-t-0">
            <Link
              href={`/talent/surveys/${s.slug}`}
              className="transition-control flex items-center gap-4 py-3 text-fg-heading hover:text-fg-accent"
            >
              <span className="flex min-w-0 flex-1 flex-col">
                <span className="font-semibold">{s.title}</span>
                <span className="text-sm text-fg-muted">
                  {[s.publisher.name, `${s.estimatedMinutes} min`, s.closesAt ? `cierra el ${formatDate(s.closesAt)}` : ''].filter(Boolean).join(', ')}
                </span>
              </span>
              <span className="text-fg-muted"><Icon name="arrow-right" size={16} /></span>
            </Link>
          </li>
        ))}
      </ul>
      {pending.length > SHOWN ? <p className="text-sm text-fg-muted">{`Y ${pending.length - SHOWN} más.`}</p> : null}
      <NavButton href="/talent/surveys" variant="ghost" iconAfter="arrow-right" className="-ml-4 mt-auto self-start">
        Ver todas las encuestas
      </NavButton>
    </div>
  );
}
