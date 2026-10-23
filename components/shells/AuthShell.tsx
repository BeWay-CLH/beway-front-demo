import type { ReactNode } from 'react';
import type { Session } from '@/lib/models/session';
import type { Space } from '@/lib/routes';
import { AppHeader } from './AppHeader';

/* Acceso, registro, recuperación y estados sin acceso: la misma cabecera, sin navegación ni pie. */
export function AuthShell({
  space = 'public',
  session = null,
  quiet = false,
  children,
}: {
  space?: Space;
  session?: Session | null;
  quiet?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader space={space} homeHref="/" homeLabel="BeWay, ir al inicio" session={session} quiet={quiet} />
      <main className="flex-1">{children}</main>
    </div>
  );
}
