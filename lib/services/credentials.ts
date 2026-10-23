import { courseRecords } from '@/data/fixtures/courses';
import { credentialRecords } from '@/data/fixtures/credentials';
import type { CredentialVM } from '@/lib/models/course';

/* Única puerta a las credenciales. Hoy lee fixtures; con la API cambia el cuerpo, no la firma (ARCHITECTURE §4).
   Credenciales y cursos son dominios distintos (DEC-010): una credencial es un logro ya emitido por un tercero. */

/* Credenciales de una persona (BE-015), las más recientes primero. Solo se listan: nunca se emiten desde la UI. */
export async function getCredentials(userId: string): Promise<CredentialVM[]> {
  return credentialRecords
    .filter((r) => r.userId === userId)
    .map(({ userId: _owner, ...rest }): CredentialVM => ({
      ...rest,
      courseTitle: rest.courseSlug ? courseRecords.find((c) => c.slug === rest.courseSlug)?.title : undefined,
    }))
    .sort((a, b) => b.issuedAt.localeCompare(a.issuedAt));
}
