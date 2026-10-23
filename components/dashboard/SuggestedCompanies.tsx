'use client';

import { NavButton } from '@/components/NavButton';
import { CompanyRow } from '@/components/company/CompanyRow';
import { useFollowOverrides } from '@/components/company/follow-store';
import { formatList } from '@/lib/format';
import type { SuggestedCompanyVM } from '@/lib/models/dashboard';

const SHOWN = 3;

/* Empresas de las categorías que le interesan a la persona, sin las que ya sigue (D-01). Parte de lo que trae el
   servidor y le aplica los seguimientos simulados de esta sesión (C-05), igual que "Empresas que sigues". Solo
   lista: no hay puntuación ni orden por afinidad. */
export function SuggestedCompanies({
  userId,
  interests,
  candidates,
  followedIds,
}: {
  userId: string;
  interests: string[];
  candidates: SuggestedCompanyVM[];
  followedIds: string[];
}) {
  const overrides = useFollowOverrides(userId);
  const suggestions = candidates.filter((c) => !(overrides[c.id] ?? followedIds.includes(c.id)));

  if (suggestions.length === 0) {
    return (
      <div className="flex flex-col items-start gap-3">
        <p className="text-fg-body">
          {candidates.length === 0
            ? `Todavía no hay fichas publicadas de ${formatList(interests)}.`
            : 'Ya sigues a todas las empresas de tus intereses.'}
        </p>
        <NavButton href="/companies" variant="ghost" iconAfter="arrow-right" className="-ml-4">
          Ver todas las empresas
        </NavButton>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-3">
      <ul className="flex flex-col">
        {suggestions.slice(0, SHOWN).map((c) => (
          <li key={c.id} className="border-t border-line-subtle first:border-t-0">
            <CompanyRow company={c} note={`Te interesa ${c.category}`} />
          </li>
        ))}
      </ul>
      <NavButton href="/companies" variant="ghost" iconAfter="arrow-right" className="-ml-4 mt-auto self-start">
        Ver todas las empresas
      </NavButton>
    </div>
  );
}
