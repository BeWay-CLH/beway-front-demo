/* View Models de perfil del frontend. Cuando exista la API, un adapter traduce sus DTO a estos tipos (ARCHITECTURE §4). */

export type ProfileVisibility = 'private' | 'public';

/* Fechas en mes, formato AAAA-MM. Sin "end" = puesto actual. */
export type ExperienceVM = { id: string; role: string; organization: string; start?: string; end?: string };
export type EducationVM = { id: string; title: string; institution: string; start?: string; end?: string };

/* Lo que el titular edita. Los mismos campos sirven al onboarding y al editor. */
export type ProfileFormVM = {
  displayName: string;
  headline?: string;
  location?: string;
  about?: string;
  experience: ExperienceVM[];
  education: EducationVM[];
  interests: string[];
  /* Declaradas por la persona. Nunca "verificadas" (OI-009, DEC-021). */
  skills: string[];
};

/* Lo que se muestra de un perfil. Sin datos de cuenta: correo ni notificaciones. */
export type ProfileCardVM = ProfileFormVM & { username: string };

/* Lectura según quien mire (DEC-012). Un perfil privado no trae ningún dato personal. */
export type ProfileViewVM =
  | { kind: 'private'; username: string }
  | ({ kind: 'full'; visibility: ProfileVisibility; isOwner: boolean } & ProfileCardVM);

/* Cinco apartados cuentan para el porcentaje de completitud. */
export type CompletionItem = 'headline' | 'about' | 'experience' | 'education' | 'interests';
export type ProfileCompletionVM = { percent: number; missing: CompletionItem[] };

export type AccountSettingsVM = {
  email: string;
  username: string;
  visibility: ProfileVisibility;
  notifications: { surveys: boolean; courses: boolean; companyNews: boolean };
};

/* Registro del fixture: todo lo que guarda la cuenta, incluido lo que nunca sale en la vista pública. */
export type ProfileRecord = ProfileFormVM & {
  userId: string;
  username: string;
  visibility: ProfileVisibility;
  email: string;
  notifications: AccountSettingsVM['notifications'];
};
