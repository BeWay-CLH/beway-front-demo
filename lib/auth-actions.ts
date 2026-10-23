'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { isDemoAccountId } from '@/data/fixtures/accounts';
import { SESSION_COOKIE } from '@/lib/models/session';
import { safeNext } from '@/lib/navigation';

/* Entrada de la demo. No comprueba correo ni contraseña: los campos de contraseña no tienen "name",
   así que no viajan en el formulario. Solo se envían "account" y "next". */
export async function signInAs(formData: FormData) {
  const account = String(formData.get('account') ?? '');
  const next = safeNext(String(formData.get('next') ?? ''));
  if (!isDemoAccountId(account)) redirect('/login');
  (await cookies()).set(SESSION_COOKIE, account, { httpOnly: true, sameSite: 'lax', path: '/', maxAge: 60 * 60 * 8 });
  redirect(next);
}

export async function signOut() {
  (await cookies()).delete(SESSION_COOKIE);
  redirect('/');
}
