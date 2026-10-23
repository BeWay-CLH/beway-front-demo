import type { Session } from '@/lib/models/session';
import { publicNav, talentHome, talentNav, type Space } from '@/lib/routes';
import { AppHeader } from './shells/AppHeader';

/* Cabecera de las páginas que no son de un espacio privado. La navegación sigue a quien mira, no a la URL
   (DEC-030): con sesión es la de Talent (la misma que dentro del espacio), sin sesión es la pública.
   `space` solo decide qué pestaña de la barra de demo se marca. */
export function SiteHeader({ session, space = 'public' }: { session: Session | null; space?: Space }) {
  if (session?.roles.includes('talent')) {
    return (
      <AppHeader space={space} homeHref={talentHome} homeLabel="BeWay, inicio de tu espacio" items={talentNav} session={session} />
    );
  }
  return (
    <AppHeader space="public" homeHref="/" homeLabel="BeWay, ir al inicio" items={publicNav} search session={session} />
  );
}
