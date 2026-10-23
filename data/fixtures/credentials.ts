import type { CredentialRecord } from '@/lib/models/course';

/* Lucía tiene dos; Marcos ninguna, para probar el estado vacío. La UI nunca emite una credencial (DEC-010, DEC-021). */
export const credentialRecords: CredentialRecord[] = [
  {
    id: 'cred-visualizacion',
    userId: 'usr-lucia-martin',
    title: 'Visualización de datos',
    issuer: 'Orbital Labs',
    issuedAt: '2026-05-08',
    courseSlug: 'visualizacion-de-datos',
  },
  {
    id: 'cred-estadistica',
    userId: 'usr-lucia-martin',
    title: 'Introducción a la estadística aplicada',
    issuer: 'Universidad de ejemplo',
    issuedAt: '2026-02-20',
  },
];
