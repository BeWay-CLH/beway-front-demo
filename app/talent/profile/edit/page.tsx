import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { requireSession } from '@/lib/session';
import { getProfileForm } from '@/lib/services/profiles';
import { ProfileEditor } from './ProfileEditor';

export const metadata: Metadata = { title: 'Editar perfil · BeWay' };

export default async function EditProfilePage() {
  const session = await requireSession();
  const form = await getProfileForm(session.userId);
  if (!form) notFound();
  return <ProfileEditor initial={form} username={session.username} />;
}
