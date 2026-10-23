import type { Session } from '@/lib/models/session';
import { publicNav } from '@/lib/routes';
import { AppHeader } from './shells/AppHeader';

/* Cabecera del espacio público. Con sesión: "Mi espacio" y la cuenta. Sin sesión: acceso y registro. */
export function SiteHeader({ session }: { session: Session | null }) {
  return (
    <AppHeader space="public" homeHref="/" homeLabel="BeWay, ir al inicio" items={publicNav} search session={session} />
  );
}
