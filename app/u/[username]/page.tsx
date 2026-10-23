import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PageState } from '@/components/PageState';
import { PublicProfileView } from '@/components/profile/PublicProfileView';
import { getSession } from '@/lib/session';
import { getProfileForViewer } from '@/lib/services/profiles';

type Params = { params: Promise<{ username: string }> };

/* Perfil compartible. Privado por defecto: un visitante no recibe ningún dato, ni en el HTML ni en el título (DEC-012). */
export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { username } = await params;
  const session = await getSession();
  const view = await getProfileForViewer(username, session?.userId);
  if (!view) return { title: 'Perfil no encontrado · BeWay', robots: { index: false } };
  if (view.kind === 'private') return { title: 'Perfil privado · BeWay', robots: { index: false, follow: false } };
  return {
    title: `${view.displayName} · BeWay`,
    robots: view.visibility === 'private' ? { index: false, follow: false } : undefined,
  };
}

export default async function ProfilePage({ params }: Params) {
  const { username } = await params;
  const session = await getSession();
  const view = await getProfileForViewer(username, session?.userId);

  /* Un nombre de usuario que ya no existe da 404 (OI-011: sin redirección). */
  if (!view) notFound();

  if (view.kind === 'private') return <PageState kind="private" />;

  return <PublicProfileView profile={view} isOwner={view.isOwner} visibility={view.visibility} />;
}
