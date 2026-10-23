import { redirect } from 'next/navigation';
import { requireSession } from '@/lib/session';

/* "Mi perfil" no tiene URL propia: siempre resuelve el nombre de usuario de la sesión, nunca un parámetro. */
export default async function OwnProfile() {
  const session = await requireSession();
  redirect(`/u/${session.username}`);
}
