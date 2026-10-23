/* View Models de cursos y credenciales del frontend (E-04). Cursos y credenciales son dominios distintos (DEC-010):
   un curso describe un programa; una credencial, un logro ya obtenido y emitido por un tercero. */

export type CourseFormat = 'online' | 'hybrid' | 'in-person';
export type CourseStatus = 'open' | 'upcoming' | 'closed';
export type CourseLevel = 'intro' | 'intermediate' | 'advanced';

export type CourseSummaryVM = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  provider: string;
  format: CourseFormat;
  /* "8 semanas": texto ya escrito, no se calcula. */
  durationLabel: string;
  level?: CourseLevel;
  status: CourseStatus;
  startsAt?: string;
  topics: string[];
  /* Un curso solo indica que otorga credencial; la credencial existe cuando la emite el emisor (DEC-010). */
  grantsCredential: boolean;
};

export type CourseDetailVM = CourseSummaryVM & {
  description: string;
  outcomes: string[];
  requirements: string[];
  syllabus: { title: string; durationLabel?: string }[];
  /* `url` solo si es real; sin enlace el CTA es "Me interesa", simulado. */
  enrollment: { kind: 'interest-only' } | { kind: 'external'; url: string };
};

export type CourseFilter = { format?: CourseFormat; status?: CourseStatus };

/* Emisor y fecha, sin sello de "verificada" (DEC-021). */
export type CredentialVM = {
  id: string;
  title: string;
  issuer: string;
  issuedAt: string;
  /* Solo si viene de un curso de BeWay. */
  courseSlug?: string;
  courseTitle?: string;
};

/* Registro del fixture de credenciales: pertenecen a una persona. */
export type CredentialRecord = Omit<CredentialVM, 'courseTitle'> & { userId: string };
