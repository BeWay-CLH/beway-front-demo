import { AuthShell } from '@/components/shells/AuthShell';
import { getSession } from '@/lib/session';

/* Acceso, registro y recuperación. Sin navegación ni pie; si hay sesión, la cuenta sigue visible en la cabecera. */
export default async function AuthLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  return (
    <AuthShell session={session} quiet>
      {children}
    </AuthShell>
  );
}
