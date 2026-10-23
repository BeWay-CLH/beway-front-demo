import { formatDate } from '@/lib/format';
import type { CourseFormat, CourseLevel, CourseStatus, CourseSummaryVM } from '@/lib/models/course';

/* Textos de cursos, compartidos por el catálogo, el detalle y el inicio. Sin datos ni efectos. */

export const courseFormats: CourseFormat[] = ['online', 'hybrid', 'in-person'];

export const formatLabel: Record<CourseFormat, string> = {
  online: 'En línea',
  hybrid: 'Mixto',
  'in-person': 'Presencial',
};

export const statusLabel: Record<CourseStatus, string> = {
  open: 'Abierto',
  upcoming: 'Próximo',
  closed: 'Cerrado',
};

export const statusBadge: Record<CourseStatus, { label: string; tone: 'success' | 'neutral' }> = {
  open: { label: statusLabel.open, tone: 'success' },
  upcoming: { label: statusLabel.upcoming, tone: 'neutral' },
  closed: { label: statusLabel.closed, tone: 'neutral' },
};

export const levelLabel: Record<CourseLevel, string> = {
  intro: 'Nivel inicial',
  intermediate: 'Nivel intermedio',
  advanced: 'Nivel avanzado',
};

/* "Empieza el 3 nov 2026" / "Empezó el 7 sept 2026". Sin fecha, no se escribe nada. */
export function startText(c: Pick<CourseSummaryVM, 'startsAt' | 'status'>): string | undefined {
  if (!c.startsAt) return undefined;
  return `${c.status === 'closed' ? 'Empezó' : 'Empieza'} el ${formatDate(c.startsAt)}`;
}

/* "Datalia, en línea y 8 semanas" para una línea de apoyo. */
export const courseMeta = (c: Pick<CourseSummaryVM, 'provider' | 'format' | 'durationLabel'>) =>
  `${c.provider}, ${formatLabel[c.format].toLowerCase()} y ${c.durationLabel}`;
