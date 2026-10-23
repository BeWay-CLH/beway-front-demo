import { profileRecords } from '@/data/fixtures/profiles';
import type { Simulated } from '@/lib/models/common';
import type { AccountSettingsVM, ProfileCardVM, ProfileFormVM, ProfileRecord, ProfileViewVM } from '@/lib/models/profile';

/* Única puerta a los datos de perfil. Hoy lee fixtures; con la API cambia el cuerpo, no la firma (ARCHITECTURE §4). */

const byUsername = (username: string) => profileRecords.find((r) => r.username === username);
const byUserId = (userId: string) => profileRecords.find((r) => r.userId === userId);

function toForm(r: ProfileRecord): ProfileFormVM {
  return {
    displayName: r.displayName,
    headline: r.headline,
    location: r.location,
    about: r.about,
    experience: r.experience,
    education: r.education,
    interests: r.interests,
    skills: r.skills,
  };
}

function toCard(r: ProfileRecord): ProfileCardVM {
  return { ...toForm(r), username: r.username };
}

/* Perfil tal como lo ve quien consulta. Un perfil privado solo devuelve que es privado (DEC-012). */
export async function getProfileForViewer(username: string, viewerId?: string): Promise<ProfileViewVM | null> {
  const r = byUsername(username);
  if (!r) return null;
  const isOwner = viewerId === r.userId;
  if (r.visibility === 'private' && !isOwner) return { kind: 'private', username };
  return { kind: 'full', visibility: r.visibility, isOwner, ...toCard(r) };
}

/* Datos editables del titular: onboarding y editor. */
export async function getProfileForm(userId: string): Promise<ProfileFormVM | null> {
  const r = byUserId(userId);
  return r ? toForm(r) : null;
}

/* Lo que vería alguien con el enlace, sin mirar la visibilidad. Solo para la vista previa del propio titular. */
export async function getPreviewCard(userId: string): Promise<ProfileCardVM | null> {
  const r = byUserId(userId);
  return r ? toCard(r) : null;
}

export async function getAccountSettings(userId: string): Promise<AccountSettingsVM | null> {
  const r = byUserId(userId);
  if (!r) return null;
  return { email: r.email, username: r.username, visibility: r.visibility, notifications: r.notifications };
}

/* Escrituras simuladas: no cambian ningún dato (DEC-006). El contrato ya es el definitivo. */
export async function saveProfile(_userId: string, _input: ProfileFormVM): Promise<Simulated> {
  return { simulated: true };
}

export async function saveAccountSettings(_userId: string, _input: AccountSettingsVM): Promise<Simulated> {
  return { simulated: true };
}
