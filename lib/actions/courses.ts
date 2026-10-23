'use server';

import { requireSession } from '@/lib/session';
import { setCourseInterest } from '@/lib/services/courses';

/* Marcar o quitar el interés en un curso. Pasa por el servicio y siempre devuelve una simulación en la demo (DEC-006). */
export async function setInterest(courseId: string, interested: boolean) {
  const session = await requireSession();
  return setCourseInterest(session.userId, courseId, interested);
}
