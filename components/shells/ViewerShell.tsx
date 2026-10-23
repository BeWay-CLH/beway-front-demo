import type { ReactNode } from 'react';
import { SiteFooter } from '@/components/SiteFooter';
import { SiteHeader } from '@/components/SiteHeader';
import { getSession } from '@/lib/session';
import { AppShell } from './AppShell';

/* Marco de las pantallas que ven visitantes y miembros con la misma URL (empresas, perfiles).
   Con sesión es el marco de Talent: misma cabecera, misma barra de demo, sin pie. Sin sesión es el
   público, con pie. Así la navegación no cambia al pasar de un espacio a estas pantallas (DEC-030). */
export async function ViewerShell({ children }: { children: ReactNode }) {
  const session = await getSession();
  if (session?.roles.includes('talent')) {
    return (
      <AppShell space="talent" session={session}>
        {children}
      </AppShell>
    );
  }
  return (
    <>
      <SiteHeader session={session} />
      <main>{children}</main>
      <SiteFooter />
    </>
  );
}
