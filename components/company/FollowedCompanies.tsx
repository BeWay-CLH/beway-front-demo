'use client';

import { NavButton } from '@/components/NavButton';
import type { CompanyCardVM } from '@/lib/models/company';
import { CompanyRow } from './CompanyRow';
import { useFollowOverrides } from './follow-store';

/* "Empresas que sigues" en el perfil propio (C-05). Parte de lo que trae el fixture y le aplica los cambios
   simulados de esta sesión, para que seguir o dejar de seguir en una ficha se vea aquí. Solo la ve su titular. */
export function FollowedCompanies({
  userId,
  initialIds,
  directory,
}: {
  userId: string;
  initialIds: string[];
  directory: Pick<CompanyCardVM, 'id' | 'slug' | 'name' | 'category' | 'logo'>[];
}) {
  const overrides = useFollowOverrides(userId);
  const followed = directory.filter((c) => overrides[c.id] ?? initialIds.includes(c.id));

  if (followed.length === 0) {
    return (
      <div className="flex flex-col items-start gap-3">
        <p className="text-fg-body">Todavía no sigues a ninguna empresa. Las que sigas aparecerán aquí.</p>
        <NavButton href="/companies" variant="ghost" icon="plus" className="-ml-4">
          Explora las empresas
        </NavButton>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <ul className="flex flex-col">
        {followed.map((c) => (
          <li key={c.id} className="border-t border-line-subtle first:border-t-0">
            <CompanyRow company={c} />
          </li>
        ))}
      </ul>
      <NavButton href="/companies" variant="ghost" iconAfter="arrow-right" className="-ml-4 self-start">
        Ver todas las empresas
      </NavButton>
    </div>
  );
}
