import { AppShell } from '@/components/shells/AppShell';
import { requireSession } from '@/lib/session';

/* Espacio Talent. Sin sesión, requireSession redirige a /login; proxy.ts ya habrá añadido ?next= antes. */
export default async function TalentLayout({ children }: { children: React.ReactNode }) {
  const session = await requireSession();
  return (
    <AppShell space="talent" session={session}>
      {children}
    </AppShell>
  );
}
