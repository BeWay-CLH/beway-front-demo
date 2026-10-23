import { NavButton } from '@/components/NavButton';
import { PageState } from '@/components/PageState';
import { AppShell } from '@/components/shells/AppShell';
import { AuthShell } from '@/components/shells/AuthShell';
import { hasRole, requireSession } from '@/lib/session';

/* Backoffice Admin CLH. Sin rol admin se muestra "sin acceso": el ocultar un enlace nunca basta (ROUTES, reglas especiales). */
export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await requireSession();

  if (!hasRole(session, 'admin')) {
    return (
      <AuthShell space="admin" session={session} quiet>
        <PageState
          kind="forbidden"
          action={
            <NavButton href="/talent/dashboard" variant="secondary" icon="arrow-left">
              Ir a mi espacio
            </NavButton>
          }
        />
      </AuthShell>
    );
  }

  return (
    <AppShell space="admin" session={session}>
      {children}
    </AppShell>
  );
}
