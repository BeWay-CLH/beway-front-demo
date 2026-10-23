'use server';

import { requireSession } from '@/lib/session';
import { setCompanyFollowing } from '@/lib/services/companies';

/* Seguir o dejar de seguir. Pasa por el servicio y siempre devuelve una simulación en la demo (DEC-006). */
export async function setFollowing(companyId: string, following: boolean) {
  const session = await requireSession();
  return setCompanyFollowing(session.userId, companyId, following);
}
