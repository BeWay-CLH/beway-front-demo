import type { ReactNode } from 'react';
import type { Session } from '@/lib/models/session';
import { adminNav, talentNav, type NavItem } from '@/lib/routes';
import { AppHeader } from './AppHeader';

/* Espacios con sesión (Talent y Admin CLH; Company en G). Misma cabecera que el sitio público, con la
   navegación del espacio y la cuenta. Sin pie. */
const config: Record<'talent' | 'admin', { items: NavItem[]; homeHref: string; homeLabel: string; badge?: string }> = {
  talent: { items: talentNav, homeHref: '/talent/dashboard', homeLabel: 'BeWay, inicio de tu espacio' },
  admin: { items: adminNav, homeHref: '/admin/dashboard', homeLabel: 'BeWay, inicio de Admin CLH', badge: 'Admin CLH' },
};

export function AppShell({ space, session, children }: { space: 'talent' | 'admin'; session: Session; children: ReactNode }) {
  const c = config[space];
  return (
    <div className="flex min-h-screen flex-col">
      {/* Buscador global para miembros (ficha 05): Enter lleva al directorio con la consulta. */}
      <AppHeader space={space} homeHref={c.homeHref} homeLabel={c.homeLabel} items={c.items} badge={c.badge} session={session} search={space === 'talent'} />
      <main className="flex-1">{children}</main>
    </div>
  );
}
