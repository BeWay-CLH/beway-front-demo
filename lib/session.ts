import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { demoAccounts, isDemoAccountId } from '@/data/fixtures/accounts';
import { SESSION_COOKIE, type Role, type Session } from '@/lib/models/session';

/* Sesión de la demo, leída de la cookie. No es seguridad: el backend decide qué se puede hacer (BE-001, BE-003). */

export async function getSession(): Promise<Session | null> {
  const id = (await cookies()).get(SESSION_COOKIE)?.value;
  return id && isDemoAccountId(id) ? demoAccounts[id] : null;
}

/* Para las páginas que exigen sesión. Sin ella vuelve al acceso. */
export async function requireSession(): Promise<Session> {
  const session = await getSession();
  if (!session) redirect('/login');
  return session;
}

export function hasRole(session: Session, role: Role): boolean {
  return session.roles.includes(role);
}
