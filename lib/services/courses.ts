import { courseRecords } from '@/data/fixtures/courses';
import type { Simulated } from '@/lib/models/common';
import type { CourseDetailVM, CourseFilter, CourseSummaryVM } from '@/lib/models/course';

/* Única puerta a los datos de cursos. Hoy lee fixtures; con la API cambia el cuerpo, no la firma (ARCHITECTURE §4). */

function toSummary(r: CourseDetailVM): CourseSummaryVM {
  const { id, slug, title, summary, provider, format, durationLabel, level, status, startsAt, topics, grantsCredential } = r;
  return { id, slug, title, summary, provider, format, durationLabel, level, status, startsAt, topics, grantsCredential };
}

/* Abiertos primero (por fecha de inicio), luego próximos y al final los cerrados. */
const ORDER = { open: 0, upcoming: 1, closed: 2 } as const;
const byRelevance = (a: CourseSummaryVM, b: CourseSummaryVM) =>
  ORDER[a.status] - ORDER[b.status] || (a.startsAt ?? '').localeCompare(b.startsAt ?? '');

/* Catálogo (BE-013). Filtra por formato y estado en servidor. */
export async function getCourses(filter: CourseFilter = {}): Promise<CourseSummaryVM[]> {
  return courseRecords
    .filter((r) => (!filter.format || r.format === filter.format) && (!filter.status || r.status === filter.status))
    .map(toSummary)
    .sort(byRelevance);
}

/* Detalle (BE-014). `null` = no existe → notFound(). */
export async function getCourseBySlug(slug: string): Promise<CourseDetailVM | null> {
  return courseRecords.find((r) => r.slug === slug) ?? null;
}

/* "Me interesa" simulado: no guarda nada (DEC-006). */
export async function setCourseInterest(_userId: string, _courseId: string, _interested: boolean): Promise<Simulated> {
  return { simulated: true };
}
