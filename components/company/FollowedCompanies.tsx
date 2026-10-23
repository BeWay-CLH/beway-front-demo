'use client';

import Link from 'next/link';
import { Icon } from '@ds';
import { NavButton } from '@/components/NavButton';
import type { CompanyCardVM } from '@/lib/models/company';
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
            <Link
              href={`/companies/${c.slug}`}
              className="transition-control group flex items-center gap-4 py-3 text-fg-heading hover:text-fg-accent"
            >
              <span className="flex size-10 flex-none items-center justify-center overflow-hidden rounded-control border border-line-subtle bg-white">
                {c.logo ? (
                  <img src={c.logo} alt="" className="max-h-[78%] max-w-[78%] object-contain" />
                ) : (
                  <span aria-hidden="true" className="font-heading text-brand-dark">{c.name[0]}</span>
                )}
              </span>
              <span className="flex min-w-0 flex-1 flex-col">
                <span className="font-semibold">{c.name}</span>
                <span className="text-sm text-fg-muted">{c.category}</span>
              </span>
              <span className="text-fg-muted"><Icon name="arrow-right" size={16} /></span>
            </Link>
          </li>
        ))}
      </ul>
      <NavButton href="/companies" variant="ghost" iconAfter="arrow-right" className="-ml-4 self-start">
        Ver todas las empresas
      </NavButton>
    </div>
  );
}
