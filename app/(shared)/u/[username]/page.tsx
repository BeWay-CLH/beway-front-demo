import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PageState } from '@/components/PageState';
import { FollowedCompanies } from '@/components/company/FollowedCompanies';
import { PublicProfileView } from '@/components/profile/PublicProfileView';
import { getSession } from '@/lib/session';
import { getCompanyDirectory, getFollowedCompanies } from '@/lib/services/companies';
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

  /* Las empresas que sigue solo se cargan para su titular (C-05): para cualquier otra persona no viajan ni en el HTML. */
  let following: ReactNode;
  if (view.isOwner && session) {
    const [followed, directory] = await Promise.all([getFollowedCompanies(session.userId), getCompanyDirectory()]);
    following = (
      <FollowedCompanies
        userId={session.userId}
        initialIds={followed.map((c) => c.id)}
        directory={directory.map(({ id, slug, name, category, logo }) => ({ id, slug, name, category, logo }))}
      />
    );
  }

  return <PublicProfileView profile={view} isOwner={view.isOwner} visibility={view.visibility} following={following} />;
}
