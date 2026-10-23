'use server';

import type { AccountSettingsVM, ProfileFormVM } from '@/lib/models/profile';
import { requireSession } from '@/lib/session';
import { saveAccountSettings, saveProfile } from '@/lib/services/profiles';

/* Escrituras del perfil propio. Pasan por el servicio y siempre devuelven una simulación en la demo (DEC-006). */

export async function saveOwnProfile(input: ProfileFormVM) {
  const session = await requireSession();
  return saveProfile(session.userId, input);
}

export async function saveOwnSettings(input: AccountSettingsVM) {
  const session = await requireSession();
  return saveAccountSettings(session.userId, input);
}
